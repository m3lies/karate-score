import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from '../timer.service'; // Ensure this path is correct
import { FormsModule } from '@angular/forms'; // Make sure to import FormsModule in your module

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() initialMinutes: number = 0;
  @Input() initialSeconds: number = 0;

  timerValue: number = 0;
  isRunning: boolean = false;
  isLast15Seconds: boolean = false;
  private subscriptions = new Subscription();

  constructor(private timerService: TimerService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.timerService.getTimerValue$().subscribe((value: number) => this.timerValue = value)
    );

    this.subscriptions.add(
      this.timerService.getIsRunning$().subscribe((status: boolean) => this.isRunning = status)
    );

    this.subscriptions.add(
      this.timerService.getIsLast15Seconds$().subscribe((status: boolean) => this.isLast15Seconds = status)
    );
  }

  // Method to ensure seconds input is within 0-59 range
  onInputSecondsChange() {
    this.initialSeconds = Math.max(0, Math.min(59, this.initialSeconds));
  }

  // Method to set and start the timer based on input values
  updateTimer() {
    this.timerService.resetTimer(this.initialMinutes, this.initialSeconds);

  }

  startTimer() {
    this.timerService.startTimer(this.initialMinutes, this.initialSeconds);
  }

  stopTimer() {
    this.timerService.stopTimer();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
