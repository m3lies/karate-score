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
    // Penalties
    participant1Penalties = 0;
    participant2Penalties = 0;
    generateArray(length: number): number[] {
        return Array.from({length}, (_, index) => index);
    }

    addYuko(participant: number) {
        const scoreToAdd = 1; // Yuko is worth 1 point
        this.addScore(participant, scoreToAdd);
        this.incrementYukoCount(participant);
    }

    addWazari(participant: number) {
        const scoreToAdd = 2; // Waza-ari is worth 2 points
        this.addScore(participant, scoreToAdd);
        this.incrementWazariCount(participant);
    }

    addIppon(participant: number) {
        const scoreToAdd = 3; // Ippon is worth 3 points
        this.addScore(participant, scoreToAdd);
        this.incrementIpponCount(participant);
    }

    addScore(participant: number, scoreToAdd: number) {
        if (participant === 1) {
            this.participant1Score += scoreToAdd;
        } else if (participant === 2) {
            this.participant2Score += scoreToAdd;
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

    // Penalties
    addChui1(participant: number) {
        const penaltyValue = 0.1; // Chui 1 penalty value
        this.applyPenalty(participant, penaltyValue);
    }

    addChui2(participant: number) {
        const penaltyValue = 0.2; // Chui 2 penalty value
        this.applyPenalty(participant, penaltyValue);
    }

    addChui3(participant: number) {
        const penaltyValue = 0.3; // Chui 3 penalty value
        this.applyPenalty(participant, penaltyValue);
    }

    addHansokuChui(participant: number) {
        const penaltyValue = 1; // Hansoku Chui penalty value
        this.applyPenalty(participant, penaltyValue);
    }

    applyPenalty(participant: number, penaltyValue: number) {
        this.addScore(participant, -penaltyValue);
        if (participant === 1) {
            this.participant1Penalties++;
        } else if (participant === 2) {
            this.participant2Penalties++;
        }
    }

}


