import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { TimerReadOnlyComponent } from "../timer-readonly/timer-readonly.component";
import { PenaltiesReadonlyComponent } from "../penalties-readonly/penalties-readonly.component";
import { PenaltiesState } from '../penalties.service'; // Adjust the path as necessary
import{ SenshuState} from "../shared-data.service";
import {SenshuComponent} from "../senshu/senshu.component";
import {SenshuReadonlyComponent} from "../senshu-readonly/senshu-readonly.component";

@Component({
  selector: 'app-score-readonly',
  templateUrl: './score-readonly.component.html',
  styleUrls: ['./score-readonly.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreReadOnlyComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(TimerReadOnlyComponent) timerReadOnlyComponent!: TimerReadOnlyComponent;
  @ViewChild('penalties1') penaltiesReadonlyComponent1!: PenaltiesReadonlyComponent;
  @ViewChild('penalties2') penaltiesReadonlyComponent2!: PenaltiesReadonlyComponent;
  @ViewChild('senshu1') senshuReadOnlyComponent1!: SenshuReadonlyComponent;
  @ViewChild('senshu2') senshuReadOnlyComponent2!: SenshuReadonlyComponent;

  totalScores: number[] = [0, 0];
  scores: { yuko: number; wazaAri: number; ippon: number }[] = [
    {yuko: 0, wazaAri: 0, ippon: 0}, // Participant 1 scores
    {yuko: 0, wazaAri: 0, ippon: 0}, // Participant 2 scores
  ];

  senshuState1= {senshu:0}
  senshuState2={senshu:0}
  penaltiesState1 = { chui1: 0, chui2: 0, chui3: 0, hansokuChui: 0, hansoku: 0 };
  penaltiesState2 = { chui1: 0, chui2: 0, chui3: 0, hansokuChui: 0, hansoku: 0 };

  timeLeft: number = 0;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    window.addEventListener('message', this.handleMessage.bind(this), false);
    window.addEventListener('message', (event) => {
      if (event.data.type === 'penaltiesState1' || event.data.type === 'penaltiesState2') {
        // Update your component state based on event.data
        // Make sure to identify which penalties component (1 or 2) the update is for
        // and update the UI accordingly
        this.updatePenaltiesDisplay(event.data.type, event.data.data);
      }
    }, false);
    window.addEventListener('message', (event) => {
      if (event.data.type === 'senshuState1' || event.data.type === 'senshuState2') {
        // Update your component state based on event.data
        // Make sure to identify which senshu component (1 or 2) the update is for
        // and update the UI accordingly
        this.updateSenshuDisplay(event.data.type, event.data.data);
      }
    }, false);
  }

  ngAfterViewInit() {
    // This hook is called after Angular has fully initialized the component's view.
    // For your use case, it's more about confirming that timerReadOnlyComponent is now definitely available for interaction.
    // No specific action is required here for your current scenario.
    // Any interactions with timerReadOnlyComponent that depend on view initialization are now safe.
  }

  handleMessage(event: MessageEvent) {
    console.log('Received a message:', event.data);
    if (event.data) {
      const { totalScores, scores, timerState, penaltiesState1, penaltiesState2, senshuState1, senshuState2 } = event.data;
      console.log('totalScores:', totalScores);
      console.log('scores:', scores);
      console.log('timerState:', timerState);
      console.log('penaltiesState1:', penaltiesState1);
      console.log('penaltiesState2:', penaltiesState2);
      console.log('senshuState1:', senshuState1);
      console.log('senshuState2:', senshuState2);
      if (totalScores) this.totalScores = totalScores;
      if (scores) this.scores = scores;
      if (timerState !== undefined) {
        this.timerReadOnlyComponent.updateTimer(timerState);
      }

      // Handle penalties updates
      if (penaltiesState1) {
        this.penaltiesReadonlyComponent1.updatePenalties(penaltiesState1);
      }
      if (penaltiesState2) {
        this.penaltiesReadonlyComponent2.updatePenalties(penaltiesState2);
      }

      // Handle penalties updates
      if (senshuState1) {
        this.senshuReadOnlyComponent1.updateSenshu(senshuState1);
      }
      if (senshuState2) {
        this.senshuReadOnlyComponent2.updateSenshu(senshuState2);
      }

      // Trigger change detection to update the template immediately
      this.changeDetectorRef.detectChanges();
    }
  }


  updatePenaltiesDisplay(participantNumber: number, penaltiesState: any) {
    console.log('Updating penalties display for participant:', participantNumber);
    // Assuming penaltiesState includes { chui1, chui2, chui3, hansokuChui, hansoku }
    // and participantNumber indicates which penalties component to update (1 or 2)
    if (participantNumber === 1 && this.penaltiesReadonlyComponent1) {
      this.penaltiesReadonlyComponent1.updatePenalties(penaltiesState);
      // Manually trigger change detection for penaltiesReadonlyComponent1
      this.changeDetectorRef.detectChanges();
    } else if (participantNumber === 2 && this.penaltiesReadonlyComponent2) {
      this.penaltiesReadonlyComponent2.updatePenalties(penaltiesState);
      // Manually trigger change detection for penaltiesReadonlyComponent2
      this.changeDetectorRef.detectChanges();
    }
  }

  updateSenshuDisplay(participantNumber: number, senshuState: any) {
    console.log('Updating senshu display for participant:', participantNumber);
    if (participantNumber === 1 && this.senshuReadOnlyComponent1) {
      this.senshuReadOnlyComponent1.updateSenshu(senshuState);
      this.changeDetectorRef.detectChanges();
    } else if (participantNumber === 2 && this.senshuReadOnlyComponent2) {
      this.senshuReadOnlyComponent2.updateSenshu(senshuState);

      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.handleMessage.bind(this));
  }
}
