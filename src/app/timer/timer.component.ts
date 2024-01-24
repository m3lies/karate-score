import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  @Input() initialMinutes: number = 0; // Initial minutes input
  @Input() initialSeconds: number = 0; // Initial seconds input
  timerValue: number = this.calculateTotalSeconds(); // Calculate total time in seconds
  isRunning: boolean = false;
  intervalId: any;

  // Calculate total time in seconds
  calculateTotalSeconds(): number {
    return this.initialMinutes * 60 + this.initialSeconds;
  }

  // Inside your TimerComponent class
  onInputSecondsChange() {
    // Ensure the seconds value is within the valid range (0-59)
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
  }
  updateTimer() {
    this.timerValue = this.calculateTotalSeconds();
    this.stopTimer();
  }
}
