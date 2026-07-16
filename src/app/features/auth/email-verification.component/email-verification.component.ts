import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast';

@Component({
  selector: 'app-email-verification',
  imports: [],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css',
})
export class EmailVerificationComponent implements OnInit {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);
  title = signal('Verifying your email...');
  message = signal('Please wait while we verify your email address.');

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.title.set('Verification Failed');
      this.message.set('Email could not be verified. Contact administration if the issue persists.');
      this.toastService.showErrorToast('Email could not be verified.');
      return;
    }
    this.authService.verifyEmail(token).subscribe({
      next: (response) => {
        console.log(response);
        this.title.set('Email Verified!');
        this.message.set('Your email has been verified successfully. Redirecting you to login...');
        this.toastService.showSuccessToast('Email verified successfully.');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2500);
      },
      error: (error) => {
        this.title.set('Verification Failed');
        this.message.set('The verification link is invalid or has expired.');
        this.toastService.showErrorToast('Verification link is invalid or expired.');
      }
    });
  }
}
