import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ERROR_CODE, ERROR_MESSAGE } from '../../../constants/error-response';
import { ToastService } from '../../services/toast';
import { ApiResponse } from '../../models/page.model';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const response = error.error as ApiResponse;
      const code = response.code;
      let message: string;
      console.log(code);
      switch(code) {
        case ERROR_CODE.VALIDATION_ERROR:
        case ERROR_CODE.RESOURCE_NOT_FOUND:
        message = response.message;
          toastService.showErrorToast(error.error.message);
          break;

        default:
          message = ERROR_MESSAGE[code as keyof typeof ERROR_MESSAGE];
      }
      toastService.showErrorToast(message);
      return throwError(() => error);
    })
  );
};
