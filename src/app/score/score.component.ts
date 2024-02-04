import {Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Subscription, take} from 'rxjs';
import {PenaltiesComponent} from '../penalties/penalties.component';
import {SenshuState, SharedDataService} from '../shared-data.service';
import {TimerService} from "../timer.service";
import {PenaltiesService} from "../penalties.service";
import {SenshuComponent} from "../senshu/senshu.component";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit, OnDestroy {
  @ViewChild('penalties1') penaltiesComponent1!: PenaltiesComponent;
  @ViewChild('penalties2') penaltiesComponent2!: PenaltiesComponent;
  @ViewChild('senshu1', { static: true }) senshuComponent1!: SenshuComponent;
  @ViewChild('senshu2',{ static: true }) senshuComponent2!: SenshuComponent;

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
    private timerService: TimerService,
    private penaltiesService: PenaltiesService
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
      }),

    );
    // Subscribe to senshu state updates for both participants
    this.subscriptions.push(
      this.sharedDataService.senshuState$1.subscribe((senshu) => {
        // Handle senshu state for Participant 1
        // You can access it as senshu.isSenshu
        this.postUpdatesToReadOnlyWindow();
      }),
      this.sharedDataService.senshuState$2.subscribe((senshu) => {
        // Handle senshu state for Participant 2
        // You can access it as senshu.isSenshu
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
    this.subscriptions.push(
      this.penaltiesService.penaltiesState$1.subscribe(penaltiesState => {
        // Handle penaltiesState1 updates here
        this.postUpdatesToReadOnlyWindow();
      }),
      this.penaltiesService.penaltiesState$2.subscribe(penaltiesState => {
        // Handle penaltiesState2 updates here
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
    this.senshuComponent1.resetSenshu();
    this.senshuComponent2.resetSenshu();

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
      const penaltiesState1 = this.preparePenaltiesState(this.penaltiesComponent1);
      const penaltiesState2 = this.preparePenaltiesState(this.penaltiesComponent2);
      const senshuState1 = this.prepareSenshuState(this.senshuComponent1);
      const senshuState2 = this.prepareSenshuState(this.senshuComponent2);
      // Ensure penalties states are included in the data object
      const data = {
        totalScores: this.sharedDataService.totalScoresSubject.value,
        scores: this.sharedDataService.scoresSubject.value,
        timerState: this.timerValue, // Ensure this is correctly fetching the current timer value
        penaltiesState1: penaltiesState1,
        penaltiesState2: penaltiesState2,
        senshuState1: senshuState1,
        senshuState2 : senshuState2
      };

      console.log('Sending updates to read-only window'); // Add this line for debugging

      // Post the complete data, including penalties states
      this.scoreReadonlyWindow.postMessage(data, '*'); // Consider specifying a more precise target origin in production
    }
  }

  prepareSenshuState(senshuComponent: SenshuComponent | null) {
    console.log("prepareSenshuState");
    return senshuComponent ? {
      isSenshu: senshuComponent.isSenshu
    } : null;
  }
  preparePenaltiesState(penaltiesComponent: PenaltiesComponent | null) {
    console.log("preparePenaltiesState")
    return penaltiesComponent ? {
      chui1: penaltiesComponent.isChui1Clicked ? 1 : 0,
      chui2: penaltiesComponent.isChui2Clicked ? 1 : 0,
      chui3: penaltiesComponent.isChui3Clicked ? 1 : 0,
      hansokuChui: penaltiesComponent.isHansokuChuiClicked ? 1 : 0,
      hansoku: penaltiesComponent.isHansokuClicked ? 1 : 0,
    } : null;
  }

}


