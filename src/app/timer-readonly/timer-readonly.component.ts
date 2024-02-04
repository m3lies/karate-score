import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timer-readonly',
  templateUrl: './timer-readonly.component.html',
  styleUrls: ['./timer-readonly.component.scss'],
})
export class TimerReadOnlyComponent {
// TimerReadOnlyComponent
  @Input() timeLeft: number = 0;
  updateTimer(timerState: number) {
    this.timeLeft = timerState; // This will trigger the setter and update the view
  }

}
