import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../../services/auth';
import { RefreshTokenRequest } from '../../models/auth.model';
import { ERROR_CODE, ERROR_MESSAGE } from '../../../constants/error-response';
import { ToastService } from '../../services/toast';
import { Router } from '@angular/router';
import { ApiResponse } from '../../models/page.model';

let isRefreshing = false;
const refreshSubject = new BehaviorSubject<string | null>(null);

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);
  const authService = inject(AuthService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const response = error.error as ApiResponse;
      const code = response.code;
      if (code === ERROR_CODE.ACCESS_TOKEN_EXPIRED) {
        const currentRefreshToken = authService.fetchRefreshToken();
        if (!currentRefreshToken) {
          return throwError(() => error);
        }
        const refreshTokenRequest: RefreshTokenRequest = {
          token: currentRefreshToken
        }
        if (!isRefreshing) {
          isRefreshing = true;
          refreshSubject.next(null);

          return authService.refresh(refreshTokenRequest).pipe(
            switchMap(response => {
              authService.saveTokens(response);
              const newAccessToken = response.accessToken;
              refreshSubject.next(newAccessToken);
              isRefreshing = false;
              const authReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`
                }
              });
              return next(authReq);
            }),

            catchError((refreshError: HttpErrorResponse) => {
              isRefreshing = false;
              refreshSubject.next(null);
              toastService.showErrorToast(ERROR_MESSAGE.SESSION_EXPIRED);
              setTimeout(() => {
                authService.clearTokens();
                router.navigate(['/login']);
              }, 2000);
              return throwError(() => refreshError);
            })
          );
        } else {
          return refreshSubject.pipe(
            filter((token): token is string => token !== null),
            take(1),
            switchMap(token => {
              const authReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
              });
              return next(authReq);
            })
          );
        }
      }
      else {
        return throwError(() => error);
      }
    })
  );
};
