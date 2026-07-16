import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth';
import { ToastService } from '../../../core/services/toast';
import { ResendVerificationEmailRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'app-resend-verification-email',
  imports: [FormsModule, RouterLink],
  templateUrl: './resend-verification-email.component.html',
  styleUrl: './resend-verification-email.component.css',
})
export class ResendVerificationEmailComponent {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  verificationEmailRequest: ResendVerificationEmailRequest = {
    email: ''
  }
  isSubmitting = signal(false);
  title = signal('Resend verification email');
  message = signal('Enter the email address you used while registering and we will send a new verification link.');

  canSubmit(): boolean {
    return this.verificationEmailRequest.email.trim().length > 0 && !this.isSubmitting();
  }

  resendEmail(): void {
    const trimmedEmail = this.verificationEmailRequest.email.trim();
    if (!trimmedEmail) {
      this.toastService.showErrorToast('Please enter your email address.');
      return;
    }

    this.isSubmitting.set(true);
    this.authService.resendVerificationEmail(this.verificationEmailRequest).pipe(
      finalize(() => {
        this.isSubmitting.set(false);
      })
    ).subscribe({
      next: () => {
        this.message.set('If the email address is registered, a new verification link has been sent.');
        this.toastService.showSuccessToast('If the email address is registered, a new verification link has been sent.');
      }
    });
  }
}
