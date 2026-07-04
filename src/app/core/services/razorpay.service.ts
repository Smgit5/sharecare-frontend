import { Service } from '@angular/core';
import { DonationInitiationResponse, RazorpayPaymentSuccessResponse } from '../models/donation.model';

declare const Razorpay: any;

@Service()
export class RazorpayService {
  openCheckout(
    initiationResponse: DonationInitiationResponse,
    campaignTitle: string,
    onSuccess: (response: RazorpayPaymentSuccessResponse) => void
  ): void {
    const options = {
      key: initiationResponse.keyId,
      amount: initiationResponse.amountInPaise,
      currency: initiationResponse.currency,
      name: 'ShareCare',
      description: campaignTitle,
      order_id: initiationResponse.providerOrderId,
      handler: (paymentResponse: RazorpayPaymentSuccessResponse) => {
        console.log('Payment Success', paymentResponse);
        onSuccess(paymentResponse);
      }
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  }
}
