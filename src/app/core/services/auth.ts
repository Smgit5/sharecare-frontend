import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

interface LoginRequest {
    username: string;
    password: string;
}
interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

@Service()
export class Auth {
    private http = inject(HttpClient);
    private baseUrl = "http://localhost:8080/auth";
    login(request: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request);
    }
}
