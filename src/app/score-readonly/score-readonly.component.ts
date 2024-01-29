import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-score-readonly',
  templateUrl: './score-readonly.component.html',
  styleUrls: ['./score-readonly.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ScoreReadonlyComponent implements OnInit {
  totalScores$: Observable<number[]>;
  scores$: Observable<{ yuko: number; wazaAri: number; ippon: number }[]>;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    this.totalScores$ = new Observable<number[]>();
    this.scores$ = new Observable<{ yuko: number; wazaAri: number; ippon: number }[]>();
  }

  ngOnInit() {
    // Use paramMap to retrieve query parameters
    this.route.queryParamMap.subscribe((paramMap) => {
      const totalScoresParam = paramMap.get('totalScores');
      const scoresParam = paramMap.get('scores');

      // Check if the parameters exist before using them
      if (totalScoresParam && scoresParam) {
        // Convert the URL params back to the appropriate format
        const totalScores = totalScoresParam.split(',').map(Number);
        const scores = JSON.parse(scoresParam);

        // Use the DataService to set the retrieved data
        this.dataService.setTotalScores(totalScores);
        this.dataService.setScores(scores);
      } else {
        // Handle the case where parameters are missing or undefined
        console.error('Parameters are missing or undefined.');
      }
    });
  }
}
