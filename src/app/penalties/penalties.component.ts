import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-penalties',
  templateUrl: './penalties.component.html',
  styleUrls: ['./penalties.component.scss'],
})
export class PenaltiesComponent {
  constructor() {}
  @Input() participantNumber: number =1;
  participant1Penalties = 0;
  participant2Penalties = 0;

  // Flags to track if penalties have been applied
  participant1Chui1Applied = false;
  participant1Chui2Applied = false;
  participant1Chui3Applied = false;
  participant1HansokuChuiApplied = false;

  participant2Chui1Applied = false;
  participant2Chui2Applied = false;
  participant2Chui3Applied = false;
  participant2HansokuChuiApplied = false;

  // ... (previous methods)

  // Methods to check if penalties have been applied
  isChui1Disabled(participant: number): boolean {
    return (
      (participant === 1 && this.participant1Chui1Applied) ||
      (participant === 2 && this.participant2Chui1Applied)
    );
  }

  isChui2Disabled(participant: number): boolean {
    return (
      (participant === 1 && this.participant1Chui2Applied) ||
      (participant === 2 && this.participant2Chui2Applied)
    );
  }

  isChui3Disabled(participant: number): boolean {
    return (
      (participant === 1 && this.participant1Chui3Applied) ||
      (participant === 2 && this.participant2Chui3Applied)
    );
  }

  isHansokuChuiDisabled(participant: number): boolean {
    return (
      (participant === 1 && this.participant1HansokuChuiApplied) ||
      (participant === 2 && this.participant2HansokuChuiApplied)
    );
  }

  // Methods to apply penalties
  addChui1(participant: number) {
    this.applyChui1(participant);
  }

  addChui2(participant: number) {
    this.applyChui2(participant);
  }

  addChui3(participant: number) {
    this.applyChui3(participant);
  }

  addHansokuChui(participant: number) {
    this.applyHansokuChui(participant);
  }

  applyChui1(participant: number) {
    if (participant === 1) {
      this.participant1Chui1Applied = true;
    } else if (participant === 2) {
      this.participant2Chui1Applied = true;
    }
    this.incrementChuiCount(participant);
  }

  applyChui2(participant: number) {
    if (participant === 1) {
      this.participant1Chui2Applied = true;
    } else if (participant === 2) {
      this.participant2Chui2Applied = true;
    }
    this.incrementChuiCount(participant);
  }

  applyChui3(participant: number) {
    if (participant === 1) {
      this.participant1Chui3Applied = true;
    } else if (participant === 2) {
      this.participant2Chui3Applied = true;
    }
    this.incrementChuiCount(participant);
  }

  applyHansokuChui(participant: number) {
    if (participant === 1) {
      this.participant1HansokuChuiApplied = true;
    } else if (participant === 2) {
      this.participant2HansokuChuiApplied = true;
    }
    this.incrementChuiCount(participant);
  }

  incrementChuiCount(participant: number) {
    if (participant === 1) {
      this.participant1Penalties++;
    } else if (participant === 2) {
      this.participant2Penalties++;
    }
  }

  addHansoku(participantNumber: number) {

  }
}
