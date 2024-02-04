import { ChangeDetectorRef, Component, Input, NgZone } from '@angular/core';

@Component({
  selector: 'app-penalties-readonly',
  templateUrl: './penalties-readonly.component.html',
  styleUrls: ['./penalties-readonly.component.scss'],
})
export class PenaltiesReadonlyComponent {
  @Input() chui1: boolean = false;
  @Input() chui2: boolean = false;
  @Input() chui3: boolean = false;
  @Input() hansokuChui: boolean = false;
  @Input() hansoku: boolean = false; // Ensure this is boolean

  constructor(private ngZone: NgZone) {}

  updatePenalties(penaltiesState: {
    chui1: boolean;
    chui2: boolean;
    chui3: boolean;
    hansokuChui: boolean;
    hansoku: boolean;
  }) {
    this.chui1 = penaltiesState.chui1;
    this.chui2 = penaltiesState.chui2;
    this.chui3 = penaltiesState.chui3;
    this.hansokuChui = penaltiesState.hansokuChui;
    this.hansoku = penaltiesState.hansoku;

    // Use NgZone to trigger change detection immediately
    this.ngZone.run(() => {});
  }
}
