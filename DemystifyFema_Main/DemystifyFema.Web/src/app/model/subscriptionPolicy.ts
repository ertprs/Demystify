export class SubscriptionPolicy {
    ID: number;
    SubscriptionPolicy: string;
}

export class GetSubscriptionPolicyRequest {
    ID: number;
    SubscriptionPolicy: string;
    SearchText: string;
    PageNumber: number;
    PageSize: number;
    OrderBy: string;
    OrderByDirection: string;
    IsPagingRequired: boolean;
}

