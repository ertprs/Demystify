export class SubscriptionPackage {
    PackageId: number;
    PackageName: string;
    PackageAmount: number;
    PackageDetail: string;
    IsDeleted: boolean;
    IsActive: boolean;
    CreatedDate: string;
    ModifiedDate: string;
}

export class GetSubscriptionPackageRequest {
    PackageId: number;
    SearchText: string;
    IsActive: boolean;
    PageNumber: number;
    PageSize: number;
    OrderBy: string;
    OrderByDirection: string;
}

