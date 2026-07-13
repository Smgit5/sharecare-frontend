import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { signal } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse, LoginRequest, RefreshTokenRequest } from '../models/auth.model';
import { ApiResponse } from '../models/page.model';
import { Router } from '@angular/router';

@Service()
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private baseUrl = 'http://localhost:8080/auth';
    private authenticated = signal(!!this.fetchAccessToken());

    login(request: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request);
    }

    refresh(refreshTokenRequest: RefreshTokenRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/refresh`, refreshTokenRequest);
    }

    logout(refreshTokenRequest: RefreshTokenRequest): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.baseUrl}/logout`, refreshTokenRequest);
    }

    saveTokens(authResponse: AuthResponse) {
        localStorage.setItem('accessToken', authResponse.accessToken);
        localStorage.setItem('refreshToken', authResponse.refreshToken);
        this.authenticated.set(true);
    }
    clearTokens() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.authenticated.set(false);
    }

    performLocalLogout() {
        this.clearTokens();
        this.router.navigate(['/login']);
    }

    fetchAccessToken() {
        return localStorage.getItem('accessToken');
    }
    fetchRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    isAuthenticated() {
        return this.authenticated();
    }
}
