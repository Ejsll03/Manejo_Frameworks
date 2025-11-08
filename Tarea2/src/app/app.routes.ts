import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ClockSwitcherComponent } from './components/clock-switcher/clock-switcher.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: ClockSwitcherComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];
