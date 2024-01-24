import {Component} from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent {
  participant1Score = 0;
  participant2Score = 0;
  participant1YukoCount = 0;
  participant2YukoCount = 0;
  participant1WazariCount = 0;
  participant2WazariCount = 0;
  participant1IpponCount = 0;
  participant2IpponCount = 0;
  //Senshu
  participant1SenshuCount = 0;
  participant2SenshuCount = 0;

  scores: { yuko: number, wazaAri: number, ippon: number }[] = [
    {yuko: 0, wazaAri: 0, ippon: 0}, // Participant 1 scores
    {yuko: 0, wazaAri: 0, ippon: 0}, // Participant 2 scores
  ];

  generateArray(length: number): number[] {
    return Array.from({length}, (_, index) => index);
  }

  // Inside your component
  addScore(scoreType: string, participantNumber: number) {
    if (scoreType === 'yuko') {
      this.scores[participantNumber - 1].yuko++;
    } else if (scoreType === 'wazaAri') {
      this.scores[participantNumber - 1].wazaAri++;
    } else if (scoreType === 'ippon') {
      this.scores[participantNumber - 1].ippon++;
    }
  }

  removeScore(scoreType: string, participantNumber: number) {
    if (scoreType === 'yuko' && this.scores[participantNumber - 1].yuko > 0) {
      this.scores[participantNumber - 1].yuko--;
    } else if (scoreType === 'wazaAri' && this.scores[participantNumber - 1].wazaAri > 0) {
      this.scores[participantNumber - 1].wazaAri--;
    } else if (scoreType === 'ippon' && this.scores[participantNumber - 1].ippon > 0) {
      this.scores[participantNumber - 1].ippon--;
    }
  }


  addSenshu(participant: number) {
    // Add Senshu (1 point) and increment Senshu count by 1
    this.participant1SenshuCount += participant === 1 ? 1 : 0;
    this.participant2SenshuCount += participant === 2 ? 1 : 0;
  }

  incrementYukoCount(participant: number) {
    // Increment Yuko count
    if (participant === 1) {
      this.participant1YukoCount++;
    } else if (participant === 2) {
      this.participant2YukoCount++;
    }
  }

  incrementWazariCount(participant: number) {
    // Increment Waza-ari count
    if (participant === 1) {
      this.participant1WazariCount++;
    } else if (participant === 2) {
      this.participant2WazariCount++;
    }
  }

  incrementIpponCount(participant: number) {
    // Increment Ippon count
    if (participant === 1) {
      this.participant1IpponCount++;
    } else if (participant === 2) {
      this.participant2IpponCount++;
    }
  }


}


