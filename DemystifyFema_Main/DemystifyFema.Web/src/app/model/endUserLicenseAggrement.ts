export class EULA {
    ID: number;
    EULA: string;
}

export class GetEULARequest {
    ID: number;
    EULA: string;
    SearchText: string;
    PageNumber: number;
    PageSize: number;
    OrderBy: string;
    OrderByDirection: string;
    IsPagingRequired: boolean;
}

