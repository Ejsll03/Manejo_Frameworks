import { Component, computed, inject, signal, effect } from '@angular/core';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-water-glasses-clock',
  standalone: true,
  templateUrl: './water-glasses-clock.component.html',
  styleUrl: './water-glasses-clock.component.css'
})
export class WaterGlassesClockComponent {
  timeService = inject(TimeService);

  currentTime = computed(() => this.timeService.getCurrentTime()());

  secondsLevel = computed(() => (this.currentTime().getSeconds() / 60) * 100);
  minutesLevel = computed(() => (this.currentTime().getMinutes() / 60) * 100);
  hoursLevel = computed(() => (this.currentTime().getHours() / 24) * 100);

  transferSecondToMinute = signal(false);
  transferMinuteToHour = signal(false);

  private previousSec = 0;
  private previousMin = 0;

  constructor() {
    effect(() => {
      const time = this.currentTime();
      const sec = time.getSeconds();
      const min = time.getMinutes();

      if (sec === 0 && this.previousSec === 59) {
        this.transferSecondToMinute.set(true);
        setTimeout(() => this.transferSecondToMinute.set(false), 2000);
      }
      this.previousSec = sec;

      if (min === 0 && this.previousMin === 59) {
        this.transferMinuteToHour.set(true);
        setTimeout(() => this.transferMinuteToHour.set(false), 2000);
      }
      this.previousMin = min;
    });
  }
}