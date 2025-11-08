import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-word-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-clock.component.html',
  styleUrl: './word-clock.component.css'
})
export class WordClockComponent implements OnInit, OnDestroy {
  wordTime = '';
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
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes();
    this.wordTime = this.timeToWords(hours, minutes);
  }

  private timeToWords(hours: number, minutes: number): string {
    const hourWords = ['twelve', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];
    const minuteWords = ['o\'clock', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'quarter', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine', 'half'];

    if (minutes === 0) {
      return `It's ${hourWords[hours]} ${minuteWords[0]}`;
    } else if (minutes === 15) {
      return `It's quarter past ${hourWords[hours]}`;
    } else if (minutes === 30) {
      return `It's half past ${hourWords[hours]}`;
    } else if (minutes === 45) {
      return `It's quarter to ${hourWords[(hours % 12) + 1]}`;
    } else if (minutes < 30) {
      return `It's ${minuteWords[minutes]} past ${hourWords[hours]}`;
    } else {
      return `It's ${minuteWords[60 - minutes]} to ${hourWords[(hours % 12) + 1]}`;
    }
  }
}