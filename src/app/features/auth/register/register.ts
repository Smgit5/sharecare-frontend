import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRegisterRequest } from '../../../core/models/auth.model';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { ToastService } from '../../../core/services/toast';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  showPassword = signal(false);

  userRegisterRequest: UserRegisterRequest = {
    username: '',
    password: '',
    email: ''
  };
  confirmPassword = '';

  togglePasswordVisibility(): void {
    this.showPassword.update((isVisible) => !isVisible);
  }

  passwordsMatch(): boolean {
    return this.userRegisterRequest.password === this.confirmPassword;
  }

  canRegister(): boolean {
    return (
      this.userRegisterRequest.username.trim().length > 0 &&
      this.userRegisterRequest.email.trim().length > 0 &&
      this.userRegisterRequest.password.length > 0 &&
      this.confirmPassword.length > 0 &&
      this.passwordsMatch()
    );
  }

  register(): void {
    if (!this.passwordsMatch()) {
      this.toastService.showErrorToast('Passwords do not match.');
      return;
    }

    this.authService.register(this.userRegisterRequest).subscribe({
      next: () => {
        this.toastService.showSuccessToast('Registration successful. An email has been sent to your gmail inbox. Please verify your email.', 5000);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
