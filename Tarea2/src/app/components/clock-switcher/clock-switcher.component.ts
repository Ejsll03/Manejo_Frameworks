import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeService } from '../../services/time.service';
import { AnalogClockComponent } from '../analog-clock/analog-clock.component';
import { DigitalClockComponent } from '../digital-clock/digital-clock.component';
import { BarsClockComponent } from '../bars-clock/bars-clock.component';
import { BinaryClockComponent } from '../binary-clock/binary-clock.component';
import { FlipClockComponent } from '../flip-clock/flip-clock.component';
import { HexClockComponent } from '../hex-clock/hex-clock.component';
import { MatrixClockComponent } from '../matrix-clock/matrix-clock.component';
import { PolarClockComponent } from '../polar-clock/polar-clock.component';
import { ProgressRingClockComponent } from '../progress-ring-clock/progress-ring-clock.component';
import { WordClockComponent } from '../word-clock/word-clock.component';
import { ColorClockComponent } from '../color-clock/color-clock.component';

@Component({
  selector: 'app-clock-switcher',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AnalogClockComponent,
    DigitalClockComponent,
    BarsClockComponent,
    BinaryClockComponent,
    FlipClockComponent,
    HexClockComponent,
    MatrixClockComponent,
    PolarClockComponent,
    ProgressRingClockComponent,
    WordClockComponent,
    ColorClockComponent
  ],
  templateUrl: './clock-switcher.component.html',
  styleUrl: './clock-switcher.component.css'
})
export class ClockSwitcherComponent {
  selectedClock = 'analog';
  hours = 0;
  minutes = 0;
  seconds = 0;

  clocks = [
    { value: 'analog', label: 'Analog Clock' },
    { value: 'digital', label: 'Digital Clock' },
    { value: 'bars', label: 'Bars Clock' },
    { value: 'binary', label: 'Binary Clock' },
    { value: 'flip', label: 'Flip Clock' },
    { value: 'hex', label: 'Hex Clock' },
    { value: 'matrix', label: 'Matrix Clock' },
    { value: 'polar', label: 'Polar Clock' },
    { value: 'progress', label: 'Progress Ring Clock' },
    { value: 'word', label: 'Word Clock' },
    { value: 'color', label: 'Color Clock' }
  ];

  constructor(private timeService: TimeService) {
    this.updateSliders();
  }

  onClockChange() {
    // Update when clock changes
  }

  onTimeChange() {
    this.timeService.setTime(this.hours, this.minutes, this.seconds);
  }

  updateToCurrent() {
    this.timeService.updateToCurrentTime();
    this.updateSliders();
  }

  private updateSliders() {
    const now = this.timeService.getCurrentTime()();
    this.hours = now.getHours();
    this.minutes = now.getMinutes();
    this.seconds = now.getSeconds();
  }
}