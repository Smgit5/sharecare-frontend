import { LocationResponse } from "./location.model";

export interface CampaignModel {}
export interface CampaignResponse {
    id: string,
    title: string,
    description: string,
    targetAmount: number,
    raisedAmount: number,
    createdByUserId: string,
    createdAt: string,
    updatedAt: string,
    status: string,
    category: string,
    location: LocationResponse
}
