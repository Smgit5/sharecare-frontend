import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../services/auth';
import { RefreshTokenRequest } from '../../models/auth.model';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorCode = error.status;
      const message = error.error?.message;
      if(errorCode === 401 && message === 'Access token expired') {
        const currentRefreshToken = authService.fetchRefreshToken();
        if(!currentRefreshToken) {
          return throwError(() => error);
        }
        const refreshTokenRequest: RefreshTokenRequest = {
          token: currentRefreshToken
        }
        return authService.refresh(refreshTokenRequest).pipe(
          switchMap(response => {
            authService.saveTokens(response);
            const newAccessToken = response.accessToken;
            const authReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            });
            return next(authReq);
          }),

          catchError((refreshError: HttpErrorResponse) => {
            return throwError(() => refreshError);
          })
        );
      } else {
        return throwError(() => error);
      }
    })
  );
};
