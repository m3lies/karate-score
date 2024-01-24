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
  }

  toggleChui3() {
    this.isChui3Clicked = !this.isChui3Clicked;
  }

  toggleHansokuChui() {
    this.isHansokuChuiClicked = !this.isHansokuChuiClicked;
  }

  toggleHansoku() {
    this.isHansokuClicked = !this.isHansokuClicked;
  }

}
