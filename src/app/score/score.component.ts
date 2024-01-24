import {Component, ViewChild} from '@angular/core';
import {PenaltiesComponent} from "../penalties/penalties.component";
import {Router} from "@angular/router";
import {TimerComponent} from "../timer/timer.component";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent {
  @ViewChild("penalties1") penaltiesComponent1!: PenaltiesComponent;
  @ViewChild("penalties2") penaltiesComponent2!: PenaltiesComponent;
  @ViewChild(TimerComponent) timerComponent!: TimerComponent;

  constructor(private router: Router) {}
  totalScores: number[] = [0, 0];

  scores: { yuko: number, wazaAri: number, ippon: number }[] = [
    {yuko: 0, wazaAri: 0, ippon: 0}, // Participant 1 scores
    {yuko: 0, wazaAri: 0, ippon: 0}, // Participant 2 scores
  ];

  navigateToScoreReadonly() {
    // Convert data to URL-friendly format
    const totalScoresParam = this.totalScores.join(',');
    const scoresParam = JSON.stringify(this.scores);

    // Navigate to ScoreReadonlyComponent route with data
    this.router.navigate(['/score-readonly', totalScoresParam, scoresParam]);
  }

  // Inside your component
  addScore(scoreType: string, participantNumber: number) {
    if (scoreType === 'yuko') {
      this.scores[participantNumber - 1].yuko++;
      this.calculateTotalScores(participantNumber);
    } else if (scoreType === 'wazaAri') {
      this.scores[participantNumber - 1].wazaAri++;
      this.calculateTotalScores(participantNumber);
    } else if (scoreType === 'ippon') {
      this.scores[participantNumber - 1].ippon++;
      this.calculateTotalScores(participantNumber);
    }
  }

  removeScore(scoreType: string, participantNumber: number) {
    if (scoreType === 'yuko' && this.scores[participantNumber - 1].yuko > 0) {
      this.scores[participantNumber - 1].yuko--;
      this.calculateTotalScores(participantNumber);
    } else if (scoreType === 'wazaAri' && this.scores[participantNumber - 1].wazaAri > 0) {
      this.scores[participantNumber - 1].wazaAri--;
      this.calculateTotalScores(participantNumber);
    } else if (scoreType === 'ippon' && this.scores[participantNumber - 1].ippon > 0) {
      this.scores[participantNumber - 1].ippon--;
      this.calculateTotalScores(participantNumber);
    }
  }
  calculateTotalScores(participantNumber: number) {
    const scores = this.scores[participantNumber - 1];
    const totalScore = scores.yuko * 1 + scores.wazaAri * 2 + scores.ippon * 3;
    this.totalScores[participantNumber - 1] = totalScore;
  }
  resetScore() {
    // Reset the score properties to their initial values
    this.scores = [
      { yuko: 0, wazaAri: 0, ippon: 0 }, // Participant 1 scores
      { yuko: 0, wazaAri: 0, ippon: 0 }, // Participant 2 scores
    ];

    // Calculate and reset total scores
    this.calculateTotalScores(1);
    this.calculateTotalScores(2);
  }
  resetScoreTimerAndPenalties(){
    this.penaltiesComponent1.resetPenalties();
    this.penaltiesComponent2.resetPenalties();
    this.resetScore();
    this.timerComponent.resetTimer();

  }

}


