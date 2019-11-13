export class TermsCondition {
    ID: number;
    TermsCondition: string;
}

export class GetTermsConditionRequest {
    ID: number;
    TermsCondition: string;
    SearchText: string;
    PageNumber: number;
    PageSize: number;
    OrderBy: string;
    OrderByDirection: string;
    IsPagingRequired: boolean;
}

