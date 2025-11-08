import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-analog-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analog-clock.component.html',
  styleUrl: './analog-clock.component.css'
})
export class AnalogClockComponent implements OnInit, OnDestroy {
  @Input() time!: Date;
  private intervalId: any;

  hourAngle = 0;
  minuteAngle = 0;
  secondAngle = 0;

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.updateAngles();
    this.intervalId = setInterval(() => {
      this.updateAngles();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateAngles() {
    const now = this.timeService.getCurrentTime()();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    this.hourAngle = (hours * 30) + (minutes * 0.5);
    this.minuteAngle = minutes * 6;
    this.secondAngle = seconds * 6;
  }
}