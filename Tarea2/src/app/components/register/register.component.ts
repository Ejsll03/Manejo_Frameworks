import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }
    if (this.authService.register(this.username, this.password)) {
      this.successMessage = 'Registro exitoso. Ahora puedes iniciar sesión.';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    } else {
      this.errorMessage = 'Usuario ya existe';
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}