import { Component } from '@angular/core';

@Component({
  selector: 'app-senshu',
  templateUrl: './senshu.component.html',
  styleUrls: ['./senshu.component.scss']
})
export class SenshuComponent {
  isSenshu: boolean=false; // Initialize to 1 by default

  toggleSenshu() {
    // Toggle between 1 and 2 for senshuParticipant
    this.isSenshu = !this.isSenshu;
  }
}
