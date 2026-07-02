import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const publicUrls = [
    "/auth/register", 
    "/auth/login", 
    "/auth/refresh", 
    "/auth/logout", 
    "/auth/forgot-password",
    "/auth/reset-password"
  ];
  
  const isPublicUrl = publicUrls.some(url => req.url.includes(url));
  if(isPublicUrl) {
    return next(req);
  }
  const accessToken = auth.fetchAccessToken();
  if(!accessToken) {
    return next(req);
  }
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
  });
  return next(authReq);
};
