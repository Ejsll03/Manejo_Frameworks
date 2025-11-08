import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-binary-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './binary-clock.component.html',
  styleUrl: './binary-clock.component.css'
})
export class BinaryClockComponent implements OnInit, OnDestroy {
  hoursBinary: boolean[] = [];
  minutesBinary: boolean[] = [];
  secondsBinary: boolean[] = [];
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
    this.hoursBinary = this.toBinaryArray(now.getHours(), 5); // 0-23, 5 bits
    this.minutesBinary = this.toBinaryArray(now.getMinutes(), 6); // 0-59, 6 bits
    this.secondsBinary = this.toBinaryArray(now.getSeconds(), 6); // 0-59, 6 bits
  }

  private toBinaryArray(num: number, bits: number): boolean[] {
    const binary = num.toString(2).padStart(bits, '0');
    return binary.split('').map(bit => bit === '1');
  }
}