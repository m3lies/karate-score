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

  private totalScoresSubscription: Subscription | undefined;
  private scoresSubscription: Subscription | undefined;

  constructor(private sharedDataService: SharedDataService, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    // Subscribe to the observables to get the values from SharedDataService
    this.totalScoresSubscription = this.sharedDataService.totalScores$.subscribe((totalScores) => {
      this.changeDetectorRef.detectChanges()
      this.totalScores = totalScores;
      console.log('Total Scores updated in readonly:', totalScores);
    });

    this.scoresSubscription = this.sharedDataService.scores$.subscribe((scores) => {
      this.changeDetectorRef.detectChanges()
      this.scores = scores;
      console.log('Scores updated in readonly:', scores);
    });
  }


}
