import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-progress-ring-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-ring-clock.component.html',
  styleUrl: './progress-ring-clock.component.css'
})
export class ProgressRingClockComponent implements OnInit, OnDestroy {
  hoursProgress = 0;
  minutesProgress = 0;
  secondsProgress = 0;
  private intervalId: any;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.updateTime();
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateTime() {
    const now = this.timeService.getCurrentTime()();
    this.hoursProgress = (now.getHours() % 12) / 12;
    this.minutesProgress = now.getMinutes() / 60;
    this.secondsProgress = now.getSeconds() / 60;
  }
}