import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponse } from '../models/page.model';
import { CampaignResponse } from '../models/campaign.model';

@Service()
export class Campaign {
    private http = inject(HttpClient);
    baseUrl = 'http://localhost:8080/campaigns';
    getCampaigns(): Observable<PageResponse<CampaignResponse>> {
        return this.http.get<PageResponse<CampaignResponse>>(`${this.baseUrl}`);
    }
}
