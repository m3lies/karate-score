import {ChangeDetectorRef, Component, Input, NgZone} from '@angular/core';
import {PenaltiesService} from "../penalties.service";
import {SharedDataService} from "../shared-data.service";
import {BehaviorSubject, Observable} from "rxjs";
interface CustomWindow extends Window {
  scoreReadonlyWindow?: Window; // Optionally include your custom property
}
@Component({
  selector: 'app-senshu',
  templateUrl: './senshu.component.html',
  styleUrls: ['./senshu.component.scss']
})
export class SenshuComponent {
  @Input() participantNumber: number=1;
  isSenshu: boolean=false; // Initialize to 1 by default

  private senshuSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Expose senshuState as an observable
  public senshuState$1: Observable<boolean> = this.senshuSubject.asObservable();
  public senshuState$2: Observable<boolean> = this.senshuSubject.asObservable();

  constructor(private senshuService: SharedDataService, private changeDetectorRef: ChangeDetectorRef) {}
  toggleSenshu() {
    // Toggle between 1 and 2 for senshuParticipant
    this.isSenshu = !this.isSenshu;
    this.updateAndBroadcastSenshu();
  }

  resetSenshu(){
    this.isSenshu= false;
    this.updateAndBroadcastSenshu();
  }

  private updateAndBroadcastSenshu() {
    const senshuState = { isSenshu: this.isSenshu}
    // Determine which participant's penalties to update based on `participantNumber`
    if (this.participantNumber === 1) {
      this.senshuService.updateSenshuState1(senshuState);
    } else if (this.participantNumber === 2) {
      this.senshuService.updateSenshuState2(senshuState);
    } else {
      console.error('Invalid participant number:', this.participantNumber);
    }

    // Optionally, if you need to broadcast this update to another window or component, you can do so here
    const customWindow = window as CustomWindow;
    console.log('Sending senshu update message'); // Add this line for debugging
    customWindow.scoreReadonlyWindow?.postMessage({ type: 'senshuUpdate', data: { participantNumber: this.participantNumber, ...senshuState } }, '*');

    // Manually trigger change detection
    this.changeDetectorRef.detectChanges();
  }
}
