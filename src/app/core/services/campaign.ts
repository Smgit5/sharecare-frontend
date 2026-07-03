import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponse } from '../models/page.model';
import { CampaignResponse } from '../models/campaign.model';

@Service()
export class Campaign {
    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:8080/campaigns';
    getCampaigns(page?: number): Observable<PageResponse<CampaignResponse>> {
        const options = page === undefined ? {} : { params: { page } };

        return this.http.get<PageResponse<CampaignResponse>>(`${this.baseUrl}`, options);
    }

    getCampaignById(id: string): Observable<CampaignResponse> {
        return this.http.get<CampaignResponse>(`${this.baseUrl}/${id}`);
    }
}
