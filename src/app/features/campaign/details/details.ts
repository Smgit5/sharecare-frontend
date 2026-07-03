import { Component, inject, OnInit, signal } from '@angular/core';
import { CampaignResponse } from '../../../core/models/campaign.model';
import { Campaign } from '../../../core/services/campaign';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit{
  campaign = signal<CampaignResponse | null>(null);
  private campaignService = inject(Campaign);
  private route = inject(ActivatedRoute);
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(!id) {
      return;
    }
    this.campaignService.getCampaignById(id).subscribe({
      next: (response) => {
        this.campaign.set(response);
      },
      error: (error) => {
        console.log('Campaign could not be loaded.', error);
      }
    });
  }
}
