import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-penalties-readonly',
  templateUrl: './penalties-readonly.component.html',
  styleUrl: './penalties-readonly.component.scss'
})
export class PenaltiesReadonlyComponent {
  @Input() chui1: number = 0;
  @Input() chui2: number = 0;
  @Input() chui3: number = 0;
  @Input() hansokuChui: number = 0;
  @Input() hansoku: number = 0;
}
