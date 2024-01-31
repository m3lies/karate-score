import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
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
  openScoreReadonlyInNewWindow() {
    // Check if the window is already open
    if (!this.scoreReadonlyWindow || this.scoreReadonlyWindow.closed) {
      // Define window features for a full-screen, borderless window
      const windowFeatures = 'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800,height=600,left=0,top=0';

      // Open the ScoreReadOnlyComponent in a new borderless, full-screen window
      this.scoreReadonlyWindow = window.open('/score-readonly', '_blank', windowFeatures);

      // Check if the new window was successfully opened
      if (this.scoreReadonlyWindow) {
        this.scoreReadonlyWindow.moveTo(0, 0); // Move the window to the top-left corner
      }
    } else {
      // If the window is already open, focus on it
      this.scoreReadonlyWindow.focus();
    }
  }

}
