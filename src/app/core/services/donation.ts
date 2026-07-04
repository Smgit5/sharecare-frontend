import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { DonationInitiationResponse, DonationRequest, RazorpayPaymentSuccessResponse, RazorpayPaymentVerificationRequest } from '../models/donation.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/page.model';

@Service()
export class DonationService {
    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:8080/donations'

    donate(donationRequest: DonationRequest): Observable<DonationInitiationResponse> {
        return this.http.post<DonationInitiationResponse>(`${this.baseUrl}`, donationRequest);
    }

    verifyRazorpayPayment(razorpayPaymentSuccessResponse: RazorpayPaymentSuccessResponse): Observable<ApiResponse> {
        const razorpayPaymentVerificationRequest: RazorpayPaymentVerificationRequest = {
            razorpayOrderId: razorpayPaymentSuccessResponse.razorpay_order_id,
            razorpayPaymentId: razorpayPaymentSuccessResponse.razorpay_payment_id,
            razorpaySignature: razorpayPaymentSuccessResponse.razorpay_signature
        }
        return this.http.post<ApiResponse>(`${this.baseUrl}/razorpay/verify`, razorpayPaymentVerificationRequest);
    }
}
