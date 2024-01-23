import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-readonly',
  templateUrl: './score-readonly.component.html',
  styleUrls: ['./score-readonly.component.scss'],
})
export class ScoreReadonlyComponent {
  @Input() participant1Score = 0;
  @Input() participant2Score = 0;
}
