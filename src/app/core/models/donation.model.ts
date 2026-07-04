export interface DonationInitiationResponse {
    keyId: string;
    amountInPaise: number;
    currency: string;
    providerOrderId: string;
}

export interface DonationRequest {
    campaignId: string;
    amount: number;
}

export interface RazorpayPaymentSuccessResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

export interface RazorpayPaymentVerificationRequest {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}
