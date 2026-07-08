import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../../services/toast';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 0) {
        toastService.showErrorToast('Unable to connect to the server.');
        return throwError(() => error); 
      }
      const message = typeof error.error?.message === 'string' ? error.error?.message : null;
      if(message) {
        toastService.showErrorToast(message);
      } else {
        toastService.showGenericErrorToast();
      }
      return throwError(() => error);
    })
  );
};
