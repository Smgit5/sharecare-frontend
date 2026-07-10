import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../../services/toast';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const authService = inject(AuthService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = typeof error.error?.message === 'string' ? error.error?.message : null;
      if(message) {
        toastService.showErrorToast(message);
        if(error.status === 401 && message === 'Your session has expired. Please login.') {
          setTimeout(() => {
            authService.clearTokens();
            router.navigate(['/login']);
          }, 2000);
        }
      } else {
        toastService.showGenericErrorToast();
      }

      return throwError(() => error);
    })
  );
};
