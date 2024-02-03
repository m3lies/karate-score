import { Component, Input } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  @Input() initialMinutes: number = 0;
  @Input() initialSeconds: number = 0;
  timerValue: number = this.calculateTotalSeconds();
  isRunning: boolean = false;
  intervalId: any;
  isLast15Seconds: boolean = false; // Add this property
  audio = new Audio('assets/bip-end.mp3');
  audio15Seconds = new Audio('assets/15bip.mp3');
  private timerState = new BehaviorSubject<number>(this.timerValue);
  timerState$ = this.timerState.asObservable(); // Public Observable for other components to subscribe to


  calculateTotalSeconds(): number {
    return this.initialMinutes * 60 + this.initialSeconds;

  }

  onInputSecondsChange() {
    if (this.initialSeconds < 0) {
      this.initialSeconds = 0;
    } else if (this.initialSeconds > 59) {
      this.initialSeconds = 59;
    }
  }

  startTimer() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.intervalId = setInterval(() => {
        if (this.timerValue > 0) {
          this.timerValue--;
          // Check if the timer is in the last 15 seconds
          if (this.timerValue <= 15) {
            if (this.timerValue == 15){
              const playPromise = this.audio15Seconds.play();

              if (playPromise !== undefined) {
                playPromise.then(_ => {
                  // Autoplay started successfully
                }).catch(error => {
                  // Autoplay was prevented
                  console.error('Error playing audio:', error);
                });
              }
            }
            this.isLast15Seconds = true;
          } else {
            this.isLast15Seconds = false;
          }

          } else {
          this.stopTimer();
          // Play the sound when the timer reaches zero
          const playPromise = this.audio.play();

          if (playPromise !== undefined) {
            playPromise.then(_ => {
              // Autoplay started successfully
            }).catch(error => {
              // Autoplay was prevented
              console.error('Error playing audio:', error);
            });
          }
        }
      }, 1000);
    }
    this.timerState.next(this.timerValue);
  }


  stopTimer() {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.intervalId);
    }
    this.timerState.next(this.timerValue);
  }

  resetTimer() {
    this.stopTimer();
    this.timerValue = this.calculateTotalSeconds();
    this.isLast15Seconds = false; // Reset the last 15 seconds flag
    this.timerState.next(this.timerValue);
  }

  updateTimer() {
    this.timerValue = this.calculateTotalSeconds();
    this.stopTimer();
    this.isLast15Seconds = false; // Reset the last 15 seconds flag
    this.timerState.next(this.timerValue);
  }
}
