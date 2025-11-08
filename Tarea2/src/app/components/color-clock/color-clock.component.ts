import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-color-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-clock.component.html',
  styleUrl: './color-clock.component.css'
})
export class ColorClockComponent implements OnInit, OnDestroy {
  backgroundColor = '';
  timeString = '';
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
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // HSL: Hue from hours (0-360), Saturation from minutes (0-100), Lightness from seconds (0-100)
    const hue = (hours / 24) * 360;
    const saturation = (minutes / 60) * 100;
    const lightness = (seconds / 60) * 100;
    this.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    this.timeString = now.toLocaleTimeString();
  }
}