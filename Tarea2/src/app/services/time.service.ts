import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private currentTime = signal(new Date());
  private offset = 0;
  private intervalId: any;

  constructor() {
    this.startAutoUpdate();
  }

  getCurrentTime() {
    return this.currentTime;
  }

  setTime(hours: number, minutes: number, seconds: number) {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(hours, minutes, seconds, 0);
    this.offset = targetTime.getTime() - now.getTime();
    this.currentTime.set(targetTime);
  }

  updateToCurrentTime() {
    this.offset = 0;
    this.currentTime.set(new Date());
  }

  private startAutoUpdate() {
    this.intervalId = setInterval(() => {
      const now = new Date();
      const adjustedTime = new Date(now.getTime() + this.offset);
      this.currentTime.set(adjustedTime);
    }, 1000);
  }
}