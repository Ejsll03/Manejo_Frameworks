import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = signal(false);
  private currentUser = signal<string | null>(null);

  constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.isAuthenticated.set(true);
      this.currentUser.set(user);
    }
  }

  login(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === username && u.password === password);
    if (user) {
      this.isAuthenticated.set(true);
      this.currentUser.set(username);
      localStorage.setItem('user', username);
      return true;
    }
    return false;
  }

  register(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: any) => u.username === username)) {
      return false; // User already exists
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  logout() {
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}