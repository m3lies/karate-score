import {Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {SharedDataService} from '../shared-data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-score-readonly',
  templateUrl: './score-readonly.component.html',
  styleUrls: ['./score-readonly.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreReadOnlyComponent implements OnInit {
  totalScores: number[] = [0, 0];
  scores: { yuko: number; wazaAri: number; ippon: number }[] = [
    {yuko: 0, wazaAri: 0, ippon: 0}, // Participant 1 scores
    {yuko: 0, wazaAri: 0, ippon: 0}, // Participant 2 scores
  ];
  timeLeft: number = 0;
  private totalScoresSubscription: Subscription | undefined;
  private scoresSubscription: Subscription | undefined;
  timerReadOnlyComponent: any;

  constructor(private sharedDataService: SharedDataService, private changeDetectorRef: ChangeDetectorRef) {
  }
  ngOnInit() {
    window.addEventListener('message', this.handleMessage.bind(this), false);
  }

  handleMessage(event: MessageEvent) {
    // Perform origin check here for security if needed
    if (event.data.type === 'update') {
      const { totalScores, scores, timerState } = event.data.data;
      this.totalScores = totalScores;
      this.scores = scores;
      this.timerReadOnlyComponent.updateTimer(timerState);
      // Pass timerState to TimerReadonlyComponent if necessary
      // For example, if TimerReadonlyComponent is a child component, you could use a service or direct component interaction
      this.changeDetectorRef.detectChanges(); // Since OnPush is used
    }
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.handleMessage.bind(this));

  }
}
