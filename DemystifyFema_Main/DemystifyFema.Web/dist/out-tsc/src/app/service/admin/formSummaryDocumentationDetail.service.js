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
var FormSummaryDocumentationDetailAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function FormSummaryDocumentationDetailAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    FormSummaryDocumentationDetailAdminService.prototype.getFormSummaryDocumentationDetail = function (getFormSummaryDocumentationDetailRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
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
        //return this._http.get(Global.API_SITE + "admin/api/formsummarydocumentationdetails", requestOptions)
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
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/formsummarydocumentationdetails", { params: params });
    };
    FormSummaryDocumentationDetailAdminService.prototype.addFormSummaryDocumentationDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/formsummarydocumentationdetails/add", body, { headers: headers });
    };
    FormSummaryDocumentationDetailAdminService.prototype.updateFormSummaryDocumentationDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/formsummarydocumentationdetails/update", body, { headers: headers });
    };
    FormSummaryDocumentationDetailAdminService.prototype.deleteFormSummaryDocumentationDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/formsummarydocumentationdetails/delete", body, { headers: headers });
    };
    FormSummaryDocumentationDetailAdminService.prototype.wordFileUpload = function (formData) {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/uploadwordfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/formsummarydocumentationdetails/uploadwordfiles", formData);
    };
    FormSummaryDocumentationDetailAdminService.prototype.excelFileUpload = function (formData) {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/uploadexcelfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/formsummarydocumentationdetails/uploadexcelfiles", formData);
    };
    FormSummaryDocumentationDetailAdminService.prototype.pdfFileUpload = function (formData) {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentationdetails/uploadpdffiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/formsummarydocumentationdetails/uploadpdffiles", formData);
    };
    FormSummaryDocumentationDetailAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], FormSummaryDocumentationDetailAdminService);
    return FormSummaryDocumentationDetailAdminService;
}());
exports.FormSummaryDocumentationDetailAdminService = FormSummaryDocumentationDetailAdminService;
//# sourceMappingURL=formSummaryDocumentationDetail.service.js.map