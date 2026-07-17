import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { NewPasswordRequest } from '../../../core/models/auth.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastService } from '../../../core/services/toast';
import { finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit{
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);
  isSubmitting = signal(false);
  isResetSuccessful = signal(false);
  title = signal('Reset your password');
  message = signal('Enter a new password for your ShareCare account.');
  confirmPassword = '';

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if(!token) {
      this.toastService.showErrorToast('Unable to reset password right now. Please try again later.');
      this.title.set('Reset link unavailable');
      this.message.set('The password reset link is missing or invalid.');
      return;
    }
    this.newPasswordRequest.token = token;
  }

  newPasswordRequest: NewPasswordRequest = {
    token: '',
    newPassword: ''
  }

  passwordsMatch(): boolean {
    return this.newPasswordRequest.newPassword === this.confirmPassword;
  }

  canReset(): boolean {
    return (
      this.newPasswordRequest.token.length > 0 &&
      this.newPasswordRequest.newPassword.trim().length > 0 &&
      this.confirmPassword.trim().length > 0 &&
      this.passwordsMatch() &&
      !this.isSubmitting()
    );
  }

  resetPassword(): void {
    const trimmedPassword = this.newPasswordRequest.newPassword.trim();
    const trimmedConfirmPassword = this.confirmPassword.trim();

    if (!this.newPasswordRequest.token) {
      this.toastService.showErrorToast('Unable to reset password right now. Please try again later.');
      return;
    }

    if (!trimmedPassword || !trimmedConfirmPassword) {
      this.toastService.showErrorToast('Please enter and confirm your new password.');
      return;
    }

    if (!this.passwordsMatch()) {
      this.toastService.showErrorToast('Passwords do not match.');
      return;
    }

    this.newPasswordRequest.newPassword = trimmedPassword;
    this.isSubmitting.set(true);

    this.authService.resetPassword(this.newPasswordRequest).pipe(
      finalize(() => {
        this.isSubmitting.set(false);
      })
    ).subscribe({
      next: () => {
        this.isResetSuccessful.set(true);
        this.title.set('Password reset successful');
        this.message.set('Your password has been reset successfully. You can go back to ShareCare and login with your new password.');
        this.toastService.showSuccessToast('Your password has been reset successfully.');
      }
    });
  }
}
