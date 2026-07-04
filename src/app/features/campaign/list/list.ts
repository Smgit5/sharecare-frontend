import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService } from '../../../core/services/campaign';
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
  private campaignService = inject(CampaignService);
  campaigns = signal<CampaignResponse[]>([]);
  page = signal<PageResponse<CampaignResponse> | null>(null);
  isLoading = signal(false);

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(page?: number): void {
    this.isLoading.set(true);

    this.campaignService.getCampaigns(page).subscribe({
      next: (response) => {
        this.campaigns.set(response.content);
        this.page.set(response);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.log('Failed to load campaigns.', error);
        this.isLoading.set(false);
      }
    });
  }

  nextPage(): void {
    const currentPage = this.page();

    if (!currentPage || currentPage.lastPage) {
      return;
    }

    this.loadCampaigns(currentPage.page + 1);
  }

  previousPage(): void {
    const currentPage = this.page();

    if (!currentPage || currentPage.page === 0) {
      return;
    }

    this.loadCampaigns(currentPage.page - 1);
  }

  viewDetails(id: string) {
    this.router.navigate(['/campaigns', id]);
  }
}
