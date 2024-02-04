import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timerValue = new BehaviorSubject<number>(0);
  private isRunning = new BehaviorSubject<boolean>(false);
  private isLast15Seconds = new BehaviorSubject<boolean>(false);
  private intervalId: any;

  audioEnd = new Audio('assets/bip-end.mp3');
  audio15Seconds = new Audio('assets/15bip.mp3');

  constructor() {}

  calculateTotalSeconds(minutes: number, seconds: number): number {
    return minutes * 60 + seconds;
  }

  startTimer(initialMinutes: number, initialSeconds: number) {
    if (this.isRunning.value) {
      this.stopTimer(); // Optionally reset the timer if it's already running
    }
    let time = this.calculateTotalSeconds(initialMinutes, initialSeconds);
    this.timerValue.next(time);
    this.isRunning.next(true);

    // Clear any existing interval to avoid multiple timers running
    clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      if (time > 0) {
        time--;
        this.timerValue.next(time);

        if (time === 15) {
          this.audio15Seconds.play().catch(error => console.error('Error playing 15-second warning sound:', error));
          this.isLast15Seconds.next(true);
        } else if (time < 15) {
          this.isLast15Seconds.next(true);
        } else {
          this.isLast15Seconds.next(false);
        }

        if (time === 0) {
          this.audioEnd.play().catch(error => console.error('Error playing end sound:', error));
          this.stopTimer(); // Automatically stop the timer when it reaches 0
        }
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
    this.isRunning.next(false);
    this.isLast15Seconds.next(false); // Reset the last 15 seconds flag when the timer is stopped
  }

  resetTimer(initialMinutes: number, initialSeconds: number) {
    this.stopTimer(); // Ensure the timer is stopped before resetting
    let time = this.calculateTotalSeconds(initialMinutes, initialSeconds);
    this.timerValue.next(time);
    // No need to explicitly call playEndSound or play15SecondWarning here
  }

  getTimerValue$(): Observable<number> {
    return this.timerValue.asObservable();
  }

  getIsRunning$(): Observable<boolean> {
    return this.isRunning.asObservable();
  }

  getIsLast15Seconds$(): Observable<boolean> {
    return this.isLast15Seconds.asObservable();
  }
}
