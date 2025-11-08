import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-polar-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './polar-clock.component.html',
  styleUrl: './polar-clock.component.css'
})
export class PolarClockComponent implements OnInit, OnDestroy {
  hoursArc = '';
  minutesArc = '';
  secondsArc = '';
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
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    this.hoursArc = this.createArc(50, (hours / 12) * 360);
    this.minutesArc = this.createArc(70, (minutes / 60) * 360);
    this.secondsArc = this.createArc(90, (seconds / 60) * 360);
  }

  private createArc(radius: number, angle: number): string {
    const x = 100 + radius * Math.cos((angle - 90) * Math.PI / 180);
    const y = 100 + radius * Math.sin((angle - 90) * Math.PI / 180);
    const largeArcFlag = angle > 180 ? 1 : 0;
    return `M 100 100 L 100 ${100 - radius} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x} ${y} Z`;
  }
}