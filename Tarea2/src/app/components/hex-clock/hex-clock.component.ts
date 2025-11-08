import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-hex-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hex-clock.component.html',
  styleUrl: './hex-clock.component.css'
})
export class HexClockComponent implements OnInit, OnDestroy {
  hexTime = '';
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
    const hours = now.getHours().toString(16).padStart(2, '0');
    const minutes = now.getMinutes().toString(16).padStart(2, '0');
    const seconds = now.getSeconds().toString(16).padStart(2, '0');
    this.hexTime = `${hours}:${minutes}:${seconds}`;
  }
}