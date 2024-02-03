import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {Subscription, take} from 'rxjs';
import { PenaltiesComponent } from '../penalties/penalties.component';
import { TimerComponent } from '../timer/timer.component';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit, OnDestroy {
  @ViewChild('penalties1') penaltiesComponent1!: PenaltiesComponent;
  @ViewChild('penalties2') penaltiesComponent2!: PenaltiesComponent;
  @ViewChild(TimerComponent) timerComponent!: TimerComponent;

  totalScores: number[] = [0, 0];
  scores: { yuko: number; wazaAri: number; ippon: number }[] = [
    { yuko: 0, wazaAri: 0, ippon: 0 }, // Participant 1 scores
    { yuko: 0, wazaAri: 0, ippon: 0 }, // Participant 2 scores
  ];

  private totalScoresSubscription: Subscription | undefined;
  private scoresSubscription: Subscription | undefined;
  private timerUpdateSubscription: Subscription | undefined;
  constructor(
    private sharedDataService: SharedDataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Subscribe to the observables to get the values from SharedDataService
    this.totalScoresSubscription = this.sharedDataService.totalScores$.subscribe((totalScores) => {
      this.totalScores = totalScores;
      console.log('Total Scores updated:', totalScores);
    });

    this.scoresSubscription = this.sharedDataService.scores$.subscribe((scores) => {
      this.scores = scores;
      console.log('Scores updated:', scores);
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent further updates
    this.totalScoresSubscription?.unsubscribe();
    this.scoresSubscription?.unsubscribe();
  }

  addScore(scoreType: string, participantNumber: number) {
    this.sharedDataService.addScore(scoreType, participantNumber);
    console.log(`Adding score: ${scoreType} for Participant ${participantNumber}`);
    this.changeDetectorRef.detectChanges();
  }

  removeScore(scoreType: string, participantNumber: number) {
    this.sharedDataService.removeScore(scoreType, participantNumber);
    console.log(`Removing score: ${scoreType} for Participant ${participantNumber}`);
    this.changeDetectorRef.detectChanges();
  }

  resetScoreTimerAndPenalties() {
    this.penaltiesComponent1.resetPenalties();
    this.penaltiesComponent2.resetPenalties();
    this.sharedDataService.resetScores();
    this.timerComponent.resetTimer();
    this.changeDetectorRef.detectChanges();
  }

  scoreReadonlyWindow: Window | null = null;
// In ScoreComponent
  openScoreReadonlyInNewWindow() {
    const windowFeatures = 'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800,height=600,left=0,top=0';

    // Attempt to open the new window
    this.scoreReadonlyWindow = window.open('/score-readonly', '_blank', windowFeatures);

    // Check if the window opened successfully
    if (this.scoreReadonlyWindow) {
      this.scoreReadonlyWindow.onload = () => {
        this.postScoresToReadOnlyWindow(); // Post initial scores
      };

      // Setup subscriptions to post updates whenever scores change
      this.totalScoresSubscription = this.sharedDataService.totalScores$.subscribe(() => {
        this.postScoresToReadOnlyWindow(); // Post updated scores
      });

      this.scoresSubscription = this.sharedDataService.scores$.subscribe(() => {
        this.postScoresToReadOnlyWindow(); // Post updated scores
      });
    } else {
      console.error("Failed to open the new window. Check if popup blockers are enabled.");
    }
  }

  postScoresToReadOnlyWindow() {
    if (this.scoreReadonlyWindow && !this.scoreReadonlyWindow.closed) {
      const totalScoresPromise = this.sharedDataService.totalScores$.pipe(take(1)).toPromise();
      const scoresPromise = this.sharedDataService.scores$.pipe(take(1)).toPromise();
      // Subscribe to timer updates and post to readonly window
      this.timerComponent.timerState$.subscribe(timerValue => {
        if (this.scoreReadonlyWindow && !this.scoreReadonlyWindow.closed) {
          this.scoreReadonlyWindow.postMessage({ type: 'timerUpdate', data: timerValue }, '*');
        }
      });

      Promise.all([totalScoresPromise, scoresPromise]).then(([totalScores, scores]) => {
        const data = { totalScores, scores };
        // Now we're sure this.scoreReadonlyWindow is not null and not closed
        this.scoreReadonlyWindow?.postMessage(data, '*'); // Ensure to use a more specific target origin in production environments
      });
    } else {
      console.log("Readonly window is not open.");
    }
  }



}
