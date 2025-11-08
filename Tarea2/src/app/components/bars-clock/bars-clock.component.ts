import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-bars-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bars-clock.component.html',
  styleUrl: './bars-clock.component.css'
})
export class BarsClockComponent implements OnInit, OnDestroy {
  hours = 0;
  minutes = 0;
  seconds = 0;
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
    this.hours = now.getHours();
    this.minutes = now.getMinutes();
    this.seconds = now.getSeconds();
  }
}