import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Service()
export class DemoTestService {
    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:8080';

    getMyProfile(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/users/me`);
    }

    viewMyDonationHistory(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/donations/my`);
    }

    getMyCampaigns(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/campaigns/my`);
    }
}
