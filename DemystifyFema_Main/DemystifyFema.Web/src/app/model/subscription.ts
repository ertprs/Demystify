export class GetSubscriptionRequest {
    UserId: number;
    SubscriptionId: number;
    SearchText: string;
    IsActive: boolean;
    IsLegalAgreementAccepted: boolean;
    PageNumber: number;
    PageSize: number;
    OrderBy: string;
    OrderByDirection: string;
}