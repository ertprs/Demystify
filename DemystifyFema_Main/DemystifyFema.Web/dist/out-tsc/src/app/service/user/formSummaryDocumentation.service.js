"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
var http_1 = require("@angular/common/http");
var global_1 = require("../../common/global");
var http_params_1 = require("../../common/http-params");
var FormSummaryDocumentationUserService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function FormSummaryDocumentationUserService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    FormSummaryDocumentationUserService.prototype.getFormSummaryDocumentationOfFEMASubModuleDetail = function (getFormSummaryDocumentationOfFEMASubModuleDetailRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('FEMASubModuleOfModuleId', (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.FEMASubModuleOfModuleId != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.FEMASubModuleOfModuleId.toString() : null);
        //search.set('SubMenuName', (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.SubMenuName != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.SubMenuName.toString() : null);
        //search.set('SearchText', getFormSummaryDocumentationOfFEMASubModuleDetailRequest.SearchText);
        //search.set('IsActive', (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.IsActive != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.PageNumber != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.PageSize != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFormSummaryDocumentationOfFEMASubModuleDetailRequest.OrderBy);
        //search.set('OrderByDirection', getFormSummaryDocumentationOfFEMASubModuleDetailRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/formsummarydocumentationoffemasubmoduledetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FEMASubModuleOfModuleId: (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.FEMASubModuleOfModuleId != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.FEMASubModuleOfModuleId.toString() : null,
            SubMenuName: (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.SubMenuName != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.SubMenuName.toString() : null,
            SearchText: getFormSummaryDocumentationOfFEMASubModuleDetailRequest.SearchText,
            IsActive: (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.IsActive != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.IsActive.toString() : null,
            PageNumber: (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.PageNumber != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.PageNumber.toString() : null,
            PageSize: (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.PageSize != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.PageSize.toString() : null,
            OrderBy: getFormSummaryDocumentationOfFEMASubModuleDetailRequest.OrderBy,
            OrderByDirection: getFormSummaryDocumentationOfFEMASubModuleDetailRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/formsummarydocumentationoffemasubmoduledetails", { params: params });
    };
    FormSummaryDocumentationUserService.prototype.getFormSummaryDocumentation = function (getFormSummaryDocumentationRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('FormSummaryDocumentationId', (getFormSummaryDocumentationRequest.FormSummaryDocumentationId != null) ? getFormSummaryDocumentationRequest.FormSummaryDocumentationId.toString() : null);
        //search.set('SubMenuName', getFormSummaryDocumentationRequest.SubMenuName);
        //search.set('SearchText', getFormSummaryDocumentationRequest.SearchText);
        //search.set('IsActive', (getFormSummaryDocumentationRequest.IsActive != null) ? getFormSummaryDocumentationRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFormSummaryDocumentationRequest.PageNumber != null) ? getFormSummaryDocumentationRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFormSummaryDocumentationRequest.PageSize != null) ? getFormSummaryDocumentationRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFormSummaryDocumentationRequest.OrderBy);
        //search.set('OrderByDirection', getFormSummaryDocumentationRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/formsummarydocumentations", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FormSummaryDocumentationId: (getFormSummaryDocumentationRequest.FormSummaryDocumentationId != null) ? getFormSummaryDocumentationRequest.FormSummaryDocumentationId.toString() : null,
            SubMenuName: getFormSummaryDocumentationRequest.SubMenuName,
            SearchText: getFormSummaryDocumentationRequest.SearchText,
            IsActive: (getFormSummaryDocumentationRequest.IsActive != null) ? getFormSummaryDocumentationRequest.IsActive.toString() : null,
            PageNumber: (getFormSummaryDocumentationRequest.PageNumber != null) ? getFormSummaryDocumentationRequest.PageNumber.toString() : null,
            PageSize: (getFormSummaryDocumentationRequest.PageSize != null) ? getFormSummaryDocumentationRequest.PageSize.toString() : null,
            OrderBy: getFormSummaryDocumentationRequest.OrderBy,
            OrderByDirection: getFormSummaryDocumentationRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/formsummarydocumentations", { params: params });
    };
    FormSummaryDocumentationUserService.prototype.getFormSummaryDocumentationDetail = function (getFormSummaryDocumentationDetailRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('FormSummaryDocumentationDetailId', (getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationDetailId != null) ? getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationDetailId.toString() : null);
        //search.set('FormSummaryDocumentationId', (getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationId != null) ? getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationId.toString() : null);
        //search.set('SubMenuName', getFormSummaryDocumentationDetailRequest.SubMenuName);
        //search.set('SearchText', getFormSummaryDocumentationDetailRequest.SearchText);
        //search.set('IsActive', (getFormSummaryDocumentationDetailRequest.IsActive != null) ? getFormSummaryDocumentationDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFormSummaryDocumentationDetailRequest.PageNumber != null) ? getFormSummaryDocumentationDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFormSummaryDocumentationDetailRequest.PageSize != null) ? getFormSummaryDocumentationDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFormSummaryDocumentationDetailRequest.OrderBy);
        //search.set('OrderByDirection', getFormSummaryDocumentationDetailRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/formsummarydocumentationdetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FormSummaryDocumentationDetailId: (getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationDetailId != null) ? getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationDetailId.toString() : null,
            FormSummaryDocumentationId: (getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationId != null) ? getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationId.toString() : null,
            SubMenuName: getFormSummaryDocumentationDetailRequest.SubMenuName,
            SearchText: getFormSummaryDocumentationDetailRequest.SearchText,
            IsActive: (getFormSummaryDocumentationDetailRequest.IsActive != null) ? getFormSummaryDocumentationDetailRequest.IsActive.toString() : null,
            PageNumber: (getFormSummaryDocumentationDetailRequest.PageNumber != null) ? getFormSummaryDocumentationDetailRequest.PageNumber.toString() : null,
            PageSize: (getFormSummaryDocumentationDetailRequest.PageSize != null) ? getFormSummaryDocumentationDetailRequest.PageSize.toString() : null,
            OrderBy: getFormSummaryDocumentationDetailRequest.OrderBy,
            OrderByDirection: getFormSummaryDocumentationDetailRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/formsummarydocumentationdetails", { params: params });
    };
    FormSummaryDocumentationUserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], FormSummaryDocumentationUserService);
    return FormSummaryDocumentationUserService;
}());
exports.FormSummaryDocumentationUserService = FormSummaryDocumentationUserService;
//# sourceMappingURL=formSummaryDocumentation.service.js.map