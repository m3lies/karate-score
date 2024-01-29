import {Component, OnInit, ViewChild} from '@angular/core';
import {PenaltiesComponent} from '../penalties/penalties.component';
import {Router} from '@angular/router';
import {TimerComponent} from '../timer/timer.component';
import {DataService} from '../data.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
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

  constructor(private router: Router, private dataService: DataService) {
  }

  ngOnInit() {
    // Subscribe to the observables to get the values
    this.totalScoresSubscription = this.dataService.getTotalScoresObservable().subscribe((totalScores) => {
      this.totalScores = totalScores;
      console.log('Total Scores updated:', totalScores);
    });

    this.scoresSubscription = this.dataService.getScoresObservable().subscribe((scores) => {
      this.scores = scores;
      console.log('Scores updated:', scores);
    });
  }

  addScore(scoreType: string, participantNumber: number) {
    this.dataService.addScore(scoreType, participantNumber);
    this.dataService.setScores(this.scores);
    this.calculateTotalScores(participantNumber);
  }

  removeScore(scoreType: string, participantNumber: number) {
    this.dataService.removeScore(scoreType, participantNumber);
    this.calculateTotalScores(participantNumber);
  }

  calculateTotalScores(participantNumber: number) {
    const scores = this.scores[participantNumber - 1];
    this.totalScores[participantNumber - 1] = scores.yuko + scores.wazaAri * 2 + scores.ippon * 3;
  }

  resetScoreTimerAndPenalties() {
    this.penaltiesComponent1.resetPenalties();
    this.penaltiesComponent2.resetPenalties();
    this.dataService.resetScores();
    this.timerComponent.resetTimer();
  }

  openScoreReadonlyInNewWindow() {
    // Retrieve totalScores and scores from the DataService
    const totalScores = this.totalScores;
    const scores = this.scores;

    // Convert the data to query parameters
    const queryParams = {
      totalScores: totalScores.join(','),
      scores: JSON.stringify(scores),
    };

    // Generate the URL with query parameters
    const urlWithParams = this.router.createUrlTree(['/score-readonly'], { queryParams });

    // Open the new window with the generated URL
    window.open(urlWithParams.toString(), '_blank');
  }
}
