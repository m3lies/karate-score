import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PenaltiesState {
  chui1: boolean;
  chui2: boolean;
  chui3: boolean;
  hansokuChui: boolean;
  hansoku: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PenaltiesService {
  private penaltiesStateSubject1 = new BehaviorSubject<PenaltiesState>({ chui1: false, chui2: false, chui3: false, hansokuChui: false, hansoku: false });
  private penaltiesStateSubject2 = new BehaviorSubject<PenaltiesState>({ chui1: false, chui2: false, chui3: false, hansokuChui: false, hansoku: false });

  penaltiesState$1: Observable<PenaltiesState> = this.penaltiesStateSubject1.asObservable();
  penaltiesState$2: Observable<PenaltiesState> = this.penaltiesStateSubject2.asObservable();

  constructor() {
    // Listen for messages from other windows
    window.addEventListener('message', this.handleMessage.bind(this), false);
  }

  updatePenaltiesState1(newState: PenaltiesState) {
    this.penaltiesStateSubject1.next(newState);
    this.broadcastChange('penaltiesState1', newState);
  }

  updatePenaltiesState2(newState: PenaltiesState) {
    this.penaltiesStateSubject2.next(newState);
    this.broadcastChange('penaltiesState2', newState);
  }

  private broadcastChange(participant: string, state: PenaltiesState) {
    // Assuming 'scoreReadonlyWindow' is the reference to the opened read-only window
    // This part needs to be adapted based on how you reference or access the read-only window
    const customEvent = { type: participant, data: state };
    window.postMessage(customEvent, '*'); // Use '*' for simplicity, consider more specific target origin for security
  }

  private handleMessage(event: MessageEvent) {
    // Handle incoming messages if needed
  }
}
