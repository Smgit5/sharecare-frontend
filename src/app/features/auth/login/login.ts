import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { LoginRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  showPassword = signal(false);

  loginRequest: LoginRequest = {
    username: '',
    password: ''
  }

  private authService = inject(AuthService);
  private router = inject(Router);

  togglePasswordVisibility(): void {
    this.showPassword.update((isVisible) => !isVisible);
  }

  login() {
    this.authService.login(this.loginRequest).subscribe({
      next: (response) => {
        this.authService.saveTokens(response);
        this.router.navigate(['/campaigns']);
      }
    });
  }
}
