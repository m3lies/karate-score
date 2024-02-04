import {ChangeDetectorRef, Component, Input, NgZone} from '@angular/core';
import {PenaltiesService} from "../penalties.service";

interface CustomWindow extends Window {
  scoreReadonlyWindow?: Window; // Optionally include your custom property
}
@Component({
  selector: 'app-penalties',
  templateUrl: './penalties.component.html',
  styleUrls: ['./penalties.component.scss'],
})
export class PenaltiesComponent {
  // Inside PenaltiesComponent
  @Input() participantNumber: number=1;

  constructor(private penaltiesService: PenaltiesService, private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}

  isChui1Clicked: boolean = false;
  isChui2Clicked: boolean = false;
  isChui3Clicked: boolean = false;
  isHansokuChuiClicked: boolean = false;
  isHansokuClicked: boolean = false;

  penalties: boolean[] = [false, false, false, false, false]; // Array to store penalty states
  resetPenalties() {
    this.isChui1Clicked = false;
    this.isChui2Clicked = false;
    this.isChui3Clicked = false;
    this.isHansokuChuiClicked = false;
    this.isHansokuClicked = false;
    this.updateAndBroadcastPenalties();
  }


  toggleChui1() {
    this.ngZone.run(() => {
      this.isChui1Clicked = !this.isChui1Clicked;
      this.updateAndBroadcastPenalties();
    });
  }

  toggleChui2() {
    this.isChui2Clicked = !this.isChui2Clicked;
    if(this.isChui2Clicked){
      this.isChui1Clicked=true;
    }
    this.updateAndBroadcastPenalties();
  }

  toggleChui3() {
    this.isChui3Clicked = !this.isChui3Clicked;
    if(this.isChui3Clicked){
      this.isChui1Clicked=true;
      this.isChui2Clicked = true;
    }
    this.updateAndBroadcastPenalties();
  }

  toggleHansokuChui() {

    this.isHansokuChuiClicked = !this.isHansokuChuiClicked;
    if (this.isHansokuChuiClicked) {
      this.isChui1Clicked = true;
      this.isChui2Clicked = true;
      this.isChui3Clicked = true;
    }
    this.updateAndBroadcastPenalties();
  }

  toggleHansoku() {
    this.isHansokuClicked = !this.isHansokuClicked;
    if (this.isHansokuClicked) {
      this.isChui1Clicked = true;
      this.isChui2Clicked = true;
      this.isChui3Clicked = true;
      this.isHansokuChuiClicked = true;
    }
    this.updateAndBroadcastPenalties();
  }


  updateAndBroadcastPenalties() {
    const penaltiesState = {
      chui1: this.isChui1Clicked,
      chui2: this.isChui2Clicked,
      chui3: this.isChui3Clicked,
      hansokuChui: this.isHansokuChuiClicked,
      hansoku: this.isHansokuClicked,
    };

    // Determine which participant's penalties to update based on `participantNumber`
    if (this.participantNumber === 1) {
      this.penaltiesService.updatePenaltiesState1(penaltiesState);
    } else if (this.participantNumber === 2) {
      this.penaltiesService.updatePenaltiesState2(penaltiesState);
    } else {
      console.error('Invalid participant number:', this.participantNumber);
    }

    // Optionally, if you need to broadcast this update to another window or component, you can do so here
    const customWindow = window as CustomWindow;
    console.log('Sending penalties update message'); // Add this line for debugging
    customWindow.scoreReadonlyWindow?.postMessage({ type: 'penaltiesUpdate', data: { participantNumber: this.participantNumber, ...penaltiesState } }, '*');

    // Manually trigger change detection
    this.changeDetectorRef.detectChanges();
  }



}
