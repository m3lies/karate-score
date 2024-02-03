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

  constructor(private sharedDataService: SharedDataService, private changeDetectorRef: ChangeDetectorRef) {
  }
  ngOnInit() {
    window.addEventListener('message', this.handleMessage.bind(this), false);
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.handleMessage.bind(this), false);
  }

  private handleMessage(event: MessageEvent) {
    // Validate the origin if known, to enhance security
    // if (event.origin !== "YOUR_EXPECTED_ORIGIN") return;
    console.log("Received message:", event.data);
    const { totalScores, scores } = event.data;
    this.totalScores = totalScores;
    this.scores = scores;
    if (event.data.type === 'totalScoresUpdate' && event.data.data) {
      this.totalScores = event.data.data;
      this.changeDetectorRef.detectChanges();
    } else if (event.data.type === 'timerUpdate' && event.data.data !== undefined) {
      // Handle timer update
      this.changeDetectorRef.detectChanges();
    }
    this.changeDetectorRef.detectChanges(); // Trigger change detection to update the view
  }

}
