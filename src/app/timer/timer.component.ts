import { Component, Input } from '@angular/core';

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
  audio = new Audio('assets/sound-file.mp3');

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
  }


  stopTimer() {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.intervalId);
    }
  }

  resetTimer() {
    this.stopTimer();
    this.timerValue = this.calculateTotalSeconds();
    this.isLast15Seconds = false; // Reset the last 15 seconds flag
  }

  updateTimer() {
    this.timerValue = this.calculateTotalSeconds();
    this.stopTimer();
    this.isLast15Seconds = false; // Reset the last 15 seconds flag
  }
}
