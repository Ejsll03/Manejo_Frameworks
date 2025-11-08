import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-flip-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flip-clock.component.html',
  styleUrl: './flip-clock.component.css'
})
export class FlipClockComponent implements OnInit, OnDestroy {
  hours = '00';
  minutes = '00';
  seconds = '00';
  animateHours = '';
  animateMinutes = '';
  animateSeconds = '';
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
    const newHours = now.getHours().toString().padStart(2, '0');
    const newMinutes = now.getMinutes().toString().padStart(2, '0');
    const newSeconds = now.getSeconds().toString().padStart(2, '0');
    if (newHours !== this.hours) {
      this.animateHours = 'flip-' + Date.now();
      setTimeout(() => this.animateHours = '', 1000);
    }
    if (newMinutes !== this.minutes) {
      this.animateMinutes = 'flip-' + Date.now();
      setTimeout(() => this.animateMinutes = '', 1000);
    }
    if (newSeconds !== this.seconds) {
      this.animateSeconds = 'flip-' + Date.now();
      setTimeout(() => this.animateSeconds = '', 1000);
    }
    this.hours = newHours;
    this.minutes = newMinutes;
    this.seconds = newSeconds;
  }
}