import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-score-readonly',
  templateUrl: './score-readonly.component.html',
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }
  `],
})
export class ScoreReadonlyComponent implements OnInit {


  totalScores: number[] = [0, 0];
  scores: { yuko: number; wazaAri: number; ippon: number }[] = [
    {yuko: 0, wazaAri: 0, ippon: 0},
    {yuko: 0, wazaAri: 0, ippon: 0}
  ]
  @Input() chui1: number = 0;
  @Input() chui2: number = 0;
  @Input() chui3: number = 0;
  @Input() hansokuChui: number = 0;


  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    // Retrieve route parameters and convert them to the appropriate data types
    this.route.params.subscribe(params => {
      this.totalScores = params['totalScores'].split(',').map(Number);
      this.scores = JSON.parse(params['scores']);
    });
  }
}
