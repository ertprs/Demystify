export class FormSummaryDocumentationOfFEMASubModuleDetail {
    FormSummaryDocumentationId: number;
    TopicName: string;
    IsDeleted: boolean;
    IsActive: boolean;
    CreatedDate: string;
    ModifiedDate: string;
}

export class GetFormSummaryDocumentationOfFEMASubModuleDetailRequest {
    FEMASubModuleOfModuleId: number;
    SubMenuName: string;
    SearchText: string;
    IsActive: boolean;
    PageNumber: number;
    PageSize: number;
    OrderBy: string;
    OrderByDirection: string;
}