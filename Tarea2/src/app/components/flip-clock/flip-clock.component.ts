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
  animateHoursTens = '';
  animateHoursOnes = '';
  animateMinutesTens = '';
  animateMinutesOnes = '';
  animateSecondsTens = '';
  animateSecondsOnes = '';
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
    // Animar cada dígito por separado cuando cambie
    if (newHours[0] !== this.hours[0]) {
      this.animateHoursTens = 'flip-' + Date.now();
      setTimeout(() => (this.animateHoursTens = ''), 600);
    }
    if (newHours[1] !== this.hours[1]) {
      this.animateHoursOnes = 'flip-' + Date.now();
      setTimeout(() => (this.animateHoursOnes = ''), 600);
    }

    if (newMinutes[0] !== this.minutes[0]) {
      this.animateMinutesTens = 'flip-' + Date.now();
      setTimeout(() => (this.animateMinutesTens = ''), 600);
    }
    if (newMinutes[1] !== this.minutes[1]) {
      this.animateMinutesOnes = 'flip-' + Date.now();
      setTimeout(() => (this.animateMinutesOnes = ''), 600);
    }

    if (newSeconds[0] !== this.seconds[0]) {
      this.animateSecondsTens = 'flip-' + Date.now();
      setTimeout(() => (this.animateSecondsTens = ''), 600);
    }
    if (newSeconds[1] !== this.seconds[1]) {
      this.animateSecondsOnes = 'flip-' + Date.now();
      setTimeout(() => (this.animateSecondsOnes = ''), 600);
    }
    this.hours = newHours;
    this.minutes = newMinutes;
    this.seconds = newSeconds;
  }
}