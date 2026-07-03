import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from '../../../core/services/campaign';
import { PageResponse } from '../../../core/models/page.model';
import { CampaignResponse } from '../../../core/models/campaign.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit{
  private router = inject(Router);
  private campaignService = inject(Campaign);
  campaigns = signal<CampaignResponse[]>([]);
  ngOnInit(): void {
    this.campaignService.getCampaigns().subscribe({
      next: (response) => {
        this.campaigns.set(response.content);
      },
      error: (error) => {
        console.log('Failed to load campaigns.', error);
      }
    });
  }
  viewDetails(id: string) {
    this.router.navigate(['/campaigns', id]);
  }
}
