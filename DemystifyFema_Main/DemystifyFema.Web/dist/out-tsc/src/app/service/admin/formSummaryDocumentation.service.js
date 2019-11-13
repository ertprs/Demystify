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
var FormSummaryDocumentationAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function FormSummaryDocumentationAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    FormSummaryDocumentationAdminService.prototype.getFormSummaryDocumentation = function (getFormSummaryDocumentationRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
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
        //return this._http.get(Global.API_SITE + "admin/api/formsummarydocumentations", requestOptions)
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
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/formsummarydocumentations", { params: params });
    };
    FormSummaryDocumentationAdminService.prototype.addFormSummaryDocumentation = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentations/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/formsummarydocumentations/add", body, { headers: headers });
    };
    FormSummaryDocumentationAdminService.prototype.updateFormSummaryDocumentation = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentations/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/formsummarydocumentations/update", body, { headers: headers });
    };
    FormSummaryDocumentationAdminService.prototype.deleteFormSummaryDocumentation = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/formsummarydocumentations/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/formsummarydocumentations/delete", body, { headers: headers });
    };
    FormSummaryDocumentationAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], FormSummaryDocumentationAdminService);
    return FormSummaryDocumentationAdminService;
}());
exports.FormSummaryDocumentationAdminService = FormSummaryDocumentationAdminService;
//# sourceMappingURL=formSummaryDocumentation.service.js.map