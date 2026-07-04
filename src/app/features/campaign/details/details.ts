import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, output, signal } from '@angular/core';
import { CampaignResponse } from '../../../core/models/campaign.model';
import { CampaignService } from '../../../core/services/campaign';
import { ActivatedRoute } from '@angular/router';
import { DonationRequest, RazorpayPaymentSuccessResponse } from '../../../core/models/donation.model';
import { DonationService } from '../../../core/services/donation';
import { RazorpayService } from '../../../core/services/razorpay.service';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  campaign = signal<CampaignResponse | null>(null);
  isDonateModalOpen = signal(false);
  donationAmountInvalid = signal(false);
  private campaignId = '';

  private campaignService = inject(CampaignService);
  private route = inject(ActivatedRoute);
  private donationService = inject(DonationService);
  private razorpayService = inject(RazorpayService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.campaignId = id;

    this.loadCampaignDetails();
  }

  loadCampaignDetails() {
    this.campaignService.getCampaignById(this.campaignId).subscribe({
      next: (response) => {
        this.campaign.set(response);
      },
      error: (error) => {
        console.log('Campaign could not be loaded.', error);
      }
    });
  }

  openDonateModal(): void {
    this.donationAmountInvalid.set(false);
    this.isDonateModalOpen.set(true);
  }

  closeDonateModal(): void {
    this.isDonateModalOpen.set(false);
  }

  verifyRazorpayPayment(paymentResponse: RazorpayPaymentSuccessResponse) {
    this.donationService.verifyRazorpayPayment(paymentResponse).subscribe({
      next: (apiResponse) => {
        console.log(apiResponse.message);
        this.closeDonateModal();
        this.loadCampaignDetails();
      },
      error: (error) => {
        console.log('Payment verification failed.', error);
      }
    });
  }

  proceedToPayment(amount: number): void {
    const amountIsInvalid = Number.isNaN(amount) || amount <= 0;

    this.donationAmountInvalid.set(amountIsInvalid);

    if (!this.campaignId || amountIsInvalid) {
      return;
    }

    const donationRequest: DonationRequest = {
      campaignId: this.campaignId,
      amount: amount
    }

    this.donationService.donate(donationRequest).subscribe({
      next: (response) => {
        this.razorpayService.openCheckout(
          response,
          this.campaign()?.title ?? 'Campaign Donation',
          (paymentResponse) => {
            this.verifyRazorpayPayment(paymentResponse);
          }
        );
      },
      error: (error) => {
        console.log('Donation failed.', error);
      }
    });
  }
}
