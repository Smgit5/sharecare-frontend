import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const isPublicRequest =
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/register') ||
    req.url.includes('/auth/refresh') ||
    req.url.includes('/auth/logout') ||
    req.url.includes('/auth/forgot-password') ||
    req.url.includes('/auth/reset-password') ||
    (
      req.method === 'GET' &&
      req.url.includes('/campaigns') &&
      !req.url.includes('/campaigns/my')
    ) ||
    req.url.includes('/donations/razorpay/verify');

  if (isPublicRequest) {
    return next(req);
  }

  const accessToken = authService.fetchAccessToken();
  if (!accessToken) {
    return next(req);
  }
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
  });
  return next(authReq);
};
