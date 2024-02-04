import {Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Subscription, take} from 'rxjs';
import {PenaltiesComponent} from '../penalties/penalties.component';
import {TimerComponent} from '../timer/timer.component';
import {SharedDataService} from '../shared-data.service';
import {TimerService} from "../timer.service";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit, OnDestroy {
  @ViewChild('penalties1') penaltiesComponent1!: PenaltiesComponent;
  @ViewChild('penalties2') penaltiesComponent2!: PenaltiesComponent;

  totalScores: number[] = [0, 0];
  scores: { yuko: number; wazaAri: number; ippon: number }[] = [
    {yuko: 0, wazaAri: 0, ippon: 0}, // Participant 1 scores
    {yuko: 0, wazaAri: 0, ippon: 0}, // Participant 2 scores
  ];
  timerValue: number = 0;
  initialMinutes: number = 0; // Default value, adjust as needed
  initialSeconds: number = 30; // Default value, adjust as needed
  scoreReadonlyWindow: Window | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private sharedDataService: SharedDataService,
    private changeDetectorRef: ChangeDetectorRef,
    private timerService: TimerService
  ) {
  }

  ngOnInit() {
    // Subscribe to data updates from SharedDataService
    this.subscriptions.push(
      this.sharedDataService.totalScores$.subscribe(totalScores => {
        this.totalScores = totalScores;
        this.postUpdatesToReadOnlyWindow();
      }),
      this.sharedDataService.scores$.subscribe(scores => {
        this.scores = scores;
        this.postUpdatesToReadOnlyWindow();
      })
    );

    // Subscribe to timer updates from TimerService
    this.subscriptions.push(
      this.timerService.getTimerValue$().subscribe(timerValue => {
        // Use timerValue for whatever is needed
        this.postUpdatesToReadOnlyWindow();
      })
    );
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
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

    // Use the component's initialMinutes and initialSeconds as arguments
    this.timerService.resetTimer(this.initialMinutes, this.initialSeconds);


    this.changeDetectorRef.detectChanges();
  }

// In ScoreComponent
  openScoreReadonlyInNewWindow() {
    const windowFeatures = 'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800,height=600,left=0,top=0';
    this.scoreReadonlyWindow = window.open('/score-readonly', '_blank', windowFeatures);

    if (this.scoreReadonlyWindow) {
      // Post initial updates when the window loads
      this.scoreReadonlyWindow.onload = () => this.postUpdatesToReadOnlyWindow();
    } else {
      console.error("Failed to open the new window. Check if popup blockers are enabled.");
    }
  }

  postUpdatesToReadOnlyWindow() {
    if (this.scoreReadonlyWindow && !this.scoreReadonlyWindow.closed) {
      // Assuming you manage to capture the current timer value in a variable named `currentTimerValue`
      const currentTimerValue = this.timerValue; // You should obtain this value from subscription or another method
      const data = {
        type: 'update',
        data: {
          totalScores: this.sharedDataService.totalScoresSubject.value,
          scores: this.sharedDataService.scoresSubject.value,
          timerState: currentTimerValue // Use the current timer value instead of the observable
        }
      };
      this.scoreReadonlyWindow.postMessage(data, '*');
    }
  }


}
