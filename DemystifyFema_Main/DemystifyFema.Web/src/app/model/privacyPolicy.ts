export class PrivacyPolicy {
    ID: number;
    PrivacyPolicy: string;
    EnteredDate: string;
    UpdateDate: string;
}

export class GetPrivacyPolicyRequest {
    ID: number;
    PrivacyPolicy: string;
    SearchText: string;
    IsActive: boolean;
    PageNumber: number;
    PageSize: number;
    OrderBy: string;
    OrderByDirection: string;
    IsPagingRequired: boolean;
}

