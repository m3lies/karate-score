import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private scoresSubject = new BehaviorSubject<{ yuko: number; wazaAri: number; ippon: number }[]>(
    [
      { yuko: 0, wazaAri: 0, ippon: 0 }, // Participant 1 scores
      { yuko: 0, wazaAri: 0, ippon: 0 }, // Participant 2 scores
    ]
  );

  private totalScoresSubject = new BehaviorSubject<number[]>([0, 0]);

  constructor(private router: Router) {}

  // Method to navigate to ScoreReadonlyComponent with parameters
  navigateToScoreReadonly(totalScores: number[], scores: { yuko: number; wazaAri: number; ippon: number }[]) {
    // Set data in the DataService
    this.setTotalScores(totalScores);
    this.setScores(scores);

    // Navigate to ScoreReadonlyComponent route with parameters
    this.router.navigate(['/score-readonly'], {
      queryParams: {
        totalScores: totalScores.join(','),
        scores: JSON.stringify(scores),
      },
    });
  }

  // Methods to retrieve scores and total scores as observables
  getScoresObservable() {
    return this.scoresSubject.asObservable();
  }

  getTotalScoresObservable() {
    return this.totalScoresSubject.asObservable();
  }

  // Methods to set scores and total scores
  setScores(scores: { yuko: number; wazaAri: number; ippon: number }[]) {
    this.scoresSubject.next(scores);
  }

  setTotalScores(totalScores: number[]) {
    this.totalScoresSubject.next(totalScores);
  }

  // Methods to add and remove scores
  addScore(scoreType: string, participantNumber: number) {
    const participantIndex = participantNumber - 1;
    const currentScores = this.scoresSubject.value.slice(); // Clone the current array

    if (scoreType === 'yuko') {
      currentScores[participantIndex].yuko++;
    } else if (scoreType === 'wazaAri') {
      currentScores[participantIndex].wazaAri++;
    } else if (scoreType === 'ippon') {
      currentScores[participantIndex].ippon++;
    }

    this.setScores(currentScores); // Update the BehaviorSubject with the new array
    this.calculateTotalScores();
  }

  removeScore(scoreType: string, participantNumber: number) {
    const participantIndex = participantNumber - 1;
    const currentScores = this.scoresSubject.value.slice(); // Clone the current array

    if (scoreType === 'yuko' && currentScores[participantIndex].yuko > 0) {
      currentScores[participantIndex].yuko--;
    } else if (scoreType === 'wazaAri' && currentScores[participantIndex].wazaAri > 0) {
      currentScores[participantIndex].wazaAri--;
    } else if (scoreType === 'ippon' && currentScores[participantIndex].ippon > 0) {
      currentScores[participantIndex].ippon--;
    }

    this.setScores(currentScores); // Update the BehaviorSubject with the new array
    this.calculateTotalScores();
  }

  // Method to reset scores
  resetScores() {
    const initialScores = [
      { yuko: 0, wazaAri: 0, ippon: 0 }, // Participant 1 scores
      { yuko: 0, wazaAri: 0, ippon: 0 }, // Participant 2 scores
    ];

    this.setScores(initialScores);
    this.setTotalScores([0, 0]);
  }

  // Method to calculate total scores
  private calculateTotalScores() {
    const currentScores = this.scoresSubject.value;
    const totalScores = [
      currentScores[0].yuko + currentScores[0].wazaAri * 2 + currentScores[0].ippon * 3,
      currentScores[1].yuko + currentScores[1].wazaAri * 2 + currentScores[1].ippon * 3,
    ];

    this.setTotalScores(totalScores);
  }
}
