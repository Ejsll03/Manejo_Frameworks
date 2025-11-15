import { Component, computed, inject } from '@angular/core';
import { TimeService } from '../../services/time.service';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-activity-clock',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './activity-clock.component.html',
  styleUrl: './activity-clock.component.css'
})
export class ActivityClockComponent {
  timeService = inject(TimeService);
  sanitizer = inject(DomSanitizer);

  currentTime = computed(() => this.timeService.getCurrentTime()());

  activity = computed(() => {
    const hour = this.currentTime().getHours();
    if (hour >= 6 && hour < 9) return {
      text: 'Desayuno y comenzar el día',
      image: this.sanitizer.bypassSecurityTrustHtml(`<svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C13.1 2 14 2.9 14 4V5H16V7H8V5H10V4C10 3.45 10.45 3 11 3C11.55 3 12 3.45 12 4V5H14V4C14 2.9 13.1 2 12 2ZM8 8H16V20C16 21.1 15.1 22 14 22H10C8.9 22 8 21.1 8 20V8ZM10 10V18H12V10H10ZM14 10V18H16V10H14Z" fill="#8B4513"/><circle cx="6" cy="12" r="2" fill="#FFD700"/><circle cx="18" cy="12" r="2" fill="#FFD700"/></svg>`),
      bgColor: '#FFE4B5'
    };
    if (hour >= 9 && hour < 12) return {
      text: 'Trabajo o estudio',
      image: this.sanitizer.bypassSecurityTrustHtml(`<svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="14" rx="2" fill="#4169E1"/><rect x="7" y="7" width="10" height="8" fill="#FFFFFF"/><rect x="9" y="9" width="6" height="1" fill="#000000"/><rect x="9" y="11" width="4" height="1" fill="#000000"/><rect x="9" y="13" width="5" height="1" fill="#000000"/></svg>`),
      bgColor: '#E6E6FA'
    };
    if (hour >= 12 && hour < 14) return {
      text: 'Almuerzo',
      image: this.sanitizer.bypassSecurityTrustHtml(`<svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 9H13V11H11V9ZM11 13H13V15H11V13ZM11 5H13V7H11V5ZM17 9H19V11H17V9ZM17 13H19V15H17V13ZM17 5H19V7H17V5ZM5 9H7V11H5V9ZM5 13H7V15H5V13ZM5 5H7V7H5V5Z" fill="#228B22"/><rect x="2" y="2" width="20" height="16" rx="2" fill="#8B4513"/><rect x="4" y="4" width="16" height="12" fill="#FFFFFF"/></svg>`),
      bgColor: '#FFFACD'
    };
    if (hour >= 14 && hour < 18) return {
      text: 'Actividad física o hobbies',
      image: this.sanitizer.bypassSecurityTrustHtml(`<svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" fill="#FF6347"/><circle cx="12" cy="12" r="6" fill="#FFFFFF"/><rect x="11" y="6" width="2" height="12" fill="#FF6347"/><rect x="6" y="11" width="12" height="2" fill="#FF6347"/></svg>`),
      bgColor: '#F0FFF0'
    };
    if (hour >= 18 && hour < 21) return {
      text: 'Cena en familia',
      image: this.sanitizer.bypassSecurityTrustHtml(`<svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#FFD700"/><circle cx="8" cy="18" r="3" fill="#8B4513"/><circle cx="16" cy="18" r="3" fill="#8B4513"/><circle cx="12" cy="20" r="2" fill="#8B4513"/></svg>`),
      bgColor: '#FFE4E1'
    };
    if (hour >= 21 && hour < 23) return {
      text: 'Relajación y entretenimiento',
      image: this.sanitizer.bypassSecurityTrustHtml(`<svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="6" width="20" height="12" rx="2" fill="#000000"/><rect x="4" y="8" width="16" height="8" fill="#4169E1"/><circle cx="12" cy="12" r="2" fill="#FFFFFF"/></svg>`),
      bgColor: '#F5F5DC'
    };
    return {
      text: 'Descanso y sueño',
      image: this.sanitizer.bypassSecurityTrustHtml(`<svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 14C7 11.24 9.24 9 12 9C14.76 9 17 11.24 17 14V16H7V14Z" fill="#4169E1"/><rect x="9" y="4" width="6" height="8" rx="3" fill="#FFD700"/><circle cx="6" cy="6" r="1" fill="#FFD700"/><circle cx="18" cy="6" r="1" fill="#FFD700"/><path d="M12 2C13.1 2 14 2.9 14 4V5H16V7H8V5H10V4C10 3.45 10.45 3 11 3C11.55 3 12 3.45 12 4V5H14V4C14 2.9 13.1 2 12 2Z" fill="#FFD700"/></svg>`),
      bgColor: '#DDA0DD'
    };
  });
}