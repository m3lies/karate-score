import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-penalties',
  templateUrl: './penalties.component.html',
  styleUrls: ['./penalties.component.scss'],
})
export class PenaltiesComponent {
  constructor() {}
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
  }


  toggleChui1() {
    this.isChui1Clicked = !this.isChui1Clicked;
  }

  toggleChui2() {
    this.isChui2Clicked = !this.isChui2Clicked;
    if(this.isChui2Clicked){
      this.isChui1Clicked=true;
    }
  }

  toggleChui3() {
    this.isChui3Clicked = !this.isChui3Clicked;
    if(this.isChui3Clicked){
      this.isChui1Clicked=true;
      this.isChui2Clicked = true;
    }
  }

  toggleHansokuChui() {

    this.isHansokuChuiClicked = !this.isHansokuChuiClicked;
    if (this.isHansokuChuiClicked) {
      this.isChui1Clicked = true;
      this.isChui2Clicked = true;
      this.isChui3Clicked = true;
    }
  }

  toggleHansoku() {
    this.isHansokuClicked = !this.isHansokuClicked;
    if (this.isHansokuClicked) {
      this.isChui1Clicked = true;
      this.isChui2Clicked = true;
      this.isChui3Clicked = true;
      this.isHansokuChuiClicked = true;
    }
  }

}
