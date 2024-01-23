import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timer-readonly',
  templateUrl: './timer-readonly.component.html',
  styleUrls: ['./timer-readonly.component.scss'],
})
export class TimerReadonlyComponent {
  @Input() timeLeft = 0;
}
