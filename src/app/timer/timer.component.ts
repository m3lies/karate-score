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
          this.isLast15Seconds = this.timerValue <= 15; // Check if timer is in last 15 seconds
        } else {
          this.stopTimer();
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
