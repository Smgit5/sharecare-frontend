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
    password: ''
  };
  confirmPassword = '';

  togglePasswordVisibility(): void {
    this.showPassword.update((isVisible) => !isVisible);
  }

  register(): void {
    this.authService.register(this.userRegisterRequest).subscribe({
      next: (response) => {
        console.log(response);
        this.toastService.showSuccessToast('Registration successful. Please login.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
