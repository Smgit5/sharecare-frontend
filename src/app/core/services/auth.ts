import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse, LoginRequest, RefreshTokenRequest } from '../models/auth.model';

@Service()
export class AuthService {
    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:8080/auth';

    login(request: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request);
    }

    refresh(refreshTokenRequest: RefreshTokenRequest) {
        return this.http.post<AuthResponse>(`${this.baseUrl}/refresh`, refreshTokenRequest);
    }

    saveTokens(authResponse: AuthResponse) {
        localStorage.setItem('accessToken', authResponse.accessToken);
        localStorage.setItem('refreshToken', authResponse.refreshToken);
    }
    clearTokens() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
    fetchAccessToken() {
        return localStorage.getItem('accessToken');
    }
    fetchRefreshToken() {
        return localStorage.getItem('refreshToken');
    }
}
