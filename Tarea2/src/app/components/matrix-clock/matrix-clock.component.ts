import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-matrix-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matrix-clock.component.html',
  styleUrl: './matrix-clock.component.css'
})
export class MatrixClockComponent implements OnInit, OnDestroy {
  matrixTime = '';
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
    const timeStr = now.toLocaleTimeString();
    this.matrixTime = timeStr.split('').map(char => this.randomChar() + char).join('');
  }

  private randomChar(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return chars[Math.floor(Math.random() * chars.length)];
  }
}