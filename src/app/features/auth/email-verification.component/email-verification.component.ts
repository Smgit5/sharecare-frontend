import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastService } from '../../../core/services/toast';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css',
})
export class EmailVerificationComponent implements OnInit {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);
  title = signal('Verifying your email...');
  message = signal('Please wait while we verify your email address.');
  isVerificationSuccessful = signal(false);
  isVerificationFailed = signal(false);

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.title.set('Verification Failed');
      this.message.set('Email could not be verified. Contact administration if the issue persists.');
      this.isVerificationFailed.set(true);
      this.toastService.showErrorToast('Email could not be verified.');
      return;
    }
    this.authService.verifyEmail(token).subscribe({
      next: (response) => {
        this.title.set('Email Verified!');
        this.message.set('Your email has been verified successfully.');
        this.isVerificationSuccessful.set(true);
        this.toastService.showSuccessToast('Email verified successfully.');
      },
      error: (error) => {
        this.title.set('Verification Failed');
        this.message.set('The verification link is invalid or has expired.');
        this.isVerificationFailed.set(true);
        this.toastService.showErrorToast('Verification link is invalid or expired.');
      }
    });
  }
}
