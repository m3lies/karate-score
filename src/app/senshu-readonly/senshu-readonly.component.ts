import {Component, Input, NgZone} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-senshu-readonly',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './senshu-readonly.component.html',
  styleUrl: './senshu-readonly.component.scss'
})
export class SenshuReadonlyComponent {
  @Input() isSenshu: boolean = false;

  constructor(private ngZone: NgZone) {}

  updateSenshu(senshuState: {
    isSenshu: boolean;

  }) {
    this.isSenshu = senshuState.isSenshu;

    // Use NgZone to trigger change detection immediately
    this.ngZone.run(() => {});
  }
}
