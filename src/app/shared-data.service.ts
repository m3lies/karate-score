import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  scoresSubject = new BehaviorSubject<{ yuko: number; wazaAri: number; ippon: number }[]>(
    [
      { yuko: 0, wazaAri: 0, ippon: 0 }, // Participant 1 scores
      { yuko: 0, wazaAri: 0, ippon: 0 }, // Participant 2 scores
    ]
  );


  scores$: Observable<{ yuko: number; wazaAri: number; ippon: number }[]> = this.scoresSubject.asObservable();

  totalScoresSubject = new BehaviorSubject<number[]>([0, 0]);

  totalScores$: Observable<number[]> = this.totalScoresSubject.asObservable();

  constructor(private router: Router) {}

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

    this.setScores(currentScores);
    console.log(`Score added: ${scoreType} for Participant ${participantNumber}`);
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

    this.setScores(currentScores);
    console.log(`Score removed: ${scoreType} for Participant ${participantNumber}`);
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

  // Private methods to update scores and total scores
  private setScores(scores: { yuko: number; wazaAri: number; ippon: number }[]) {
    this.scoresSubject.next(scores);
    this.calculateTotalScores();
    console.log(`Set scores called`);
  }

  private setTotalScores(totalScores: number[]) {
    this.totalScoresSubject.next(totalScores);
  }
  // Method to open the score readonly in a new window
  openScoreReadonlyInNewWindow(totalScores: number[], scores: { yuko: number; wazaAri: number; ippon: number }[]) {
    // Convert the data to query parameters
    const queryParams = {
      totalScores: totalScores.join(','),
      scores: JSON.stringify(scores),
    };

    // Generate the URL with query parameters
    const urlWithParams = this.router.createUrlTree(['/score-readonly'], { queryParams });
    console.log('Opening score readonly window with data:', queryParams); // Added console log
    // Open the new window with the generated URL
    window.open(urlWithParams.toString(), '_blank');
  }

}
