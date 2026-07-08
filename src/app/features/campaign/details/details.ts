import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, NgZone, OnInit, signal } from '@angular/core';
import { CampaignResponse } from '../../../core/models/campaign.model';
import { CampaignService } from '../../../core/services/campaign';
import { ActivatedRoute } from '@angular/router';
import { DonationRequest, RazorpayPaymentSuccessResponse } from '../../../core/models/donation.model';
import { DonationService } from '../../../core/services/donation';
import { RazorpayService } from '../../../core/services/razorpay.service';
import { ToastService } from '../../../core/services/toast';

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
  private toastService = inject(ToastService);
  private ngZone = inject(NgZone);

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
      next: () => {
        this.loadCampaignDetails();
        this.toastService.showSuccessToast('Donation successful! Thank you for your contribution.');
        this.closeDonateModal();
      },
      error: (error) => {
        console.log('Payment verification failed.', error);
        this.toastService.showErrorToast('Payment verification failed. Please try again.');
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
            this.ngZone.run(() => this.verifyRazorpayPayment(paymentResponse));
          },
          () => {
            this.ngZone.run(() => {
              this.toastService.showInfoToast('Checkout closed. Donation was not completed.');
            });
          },
          (failureResponse) => {
            this.ngZone.run(() => {
              console.log(failureResponse);
              this.toastService.showErrorToast('Payment failed. Please try again.');
            });
          }
        );
      },
      error: (error) => {
        console.log('Donation failed.', error);
      }
    });
  }
}
