import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  timeLeft = 300; // 5 minutes in seconds
  timerId: any;

  ngOnInit() {}

  startTimer() {
    this.timerId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timerId);
      }
    }, 1000);
  }
}
