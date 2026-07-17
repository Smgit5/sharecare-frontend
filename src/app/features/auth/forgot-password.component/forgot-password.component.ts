import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ForgotPasswordRequest } from '../../../core/models/auth.model';
import { AuthService } from '../../../core/services/auth';
import { finalize } from 'rxjs';
import { ToastService } from '../../../core/services/toast';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  email = '';
  forgotPasswordRequest: ForgotPasswordRequest = {
    email: ''
  };
  isSubmitting = signal(false);
  title = signal('Forgot password');
  message = signal('Enter the email address you used while registering.');

  canSubmit(): boolean {
    return this.email.trim().length > 0 && !this.isSubmitting();
  }

  forgotPassword(): void {
    this.forgotPasswordRequest.email = this.email.trim();
    this.isSubmitting.set(true);

    this.authService.forgotPassword(this.forgotPasswordRequest).pipe(
      finalize(() => {
        this.isSubmitting.set(false);
      })
    ).subscribe({
      next: () => {
        this.title.set('Check your inbox');
        this.message.set('If the email address is registered, a password reset link has been sent to your inbox.');
        this.toastService.showSuccessToast('If the email address is registered, a password reset link has been sent to your inbox.');
      }
    });
  }
}
