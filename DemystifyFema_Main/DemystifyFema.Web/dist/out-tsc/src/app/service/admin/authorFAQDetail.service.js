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
var AuthorFAQDetailAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function AuthorFAQDetailAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    AuthorFAQDetailAdminService.prototype.getAuthorFAQDetail = function (getAuthorFAQDetailRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('AuthorFAQDetailId', (getAuthorFAQDetailRequest.AuthorFAQDetailId != null) ? getAuthorFAQDetailRequest.AuthorFAQDetailId.toString() : null);
        //search.set('AuthorFAQId', (getAuthorFAQDetailRequest.AuthorFAQId != null) ? getAuthorFAQDetailRequest.AuthorFAQId.toString() : null);
        //search.set('SearchText', getAuthorFAQDetailRequest.SearchText);
        //search.set('IsActive', (getAuthorFAQDetailRequest.IsActive != null) ? getAuthorFAQDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getAuthorFAQDetailRequest.PageNumber != null) ? getAuthorFAQDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getAuthorFAQDetailRequest.PageSize != null) ? getAuthorFAQDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getAuthorFAQDetailRequest.OrderBy);
        //search.set('OrderByDirection', getAuthorFAQDetailRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/authorfaqdetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            AuthorFAQDetailId: (getAuthorFAQDetailRequest.AuthorFAQDetailId != null) ? getAuthorFAQDetailRequest.AuthorFAQDetailId.toString() : null,
            AuthorFAQId: (getAuthorFAQDetailRequest.AuthorFAQId != null) ? getAuthorFAQDetailRequest.AuthorFAQId.toString() : null,
            SearchText: getAuthorFAQDetailRequest.SearchText,
            IsActive: (getAuthorFAQDetailRequest.IsActive != null) ? getAuthorFAQDetailRequest.IsActive.toString() : null,
            PageNumber: (getAuthorFAQDetailRequest.PageNumber != null) ? getAuthorFAQDetailRequest.PageNumber.toString() : null,
            PageSize: (getAuthorFAQDetailRequest.PageSize != null) ? getAuthorFAQDetailRequest.PageSize.toString() : null,
            OrderBy: getAuthorFAQDetailRequest.OrderBy,
            OrderByDirection: getAuthorFAQDetailRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/authorfaqdetails", { params: params });
    };
    AuthorFAQDetailAdminService.prototype.addAuthorFAQDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqdetails/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/authorfaqdetails/add", body, { headers: headers });
    };
    AuthorFAQDetailAdminService.prototype.updateAuthorFAQDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqdetails/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/authorfaqdetails/update", body, { headers: headers });
    };
    AuthorFAQDetailAdminService.prototype.deleteAuthorFAQDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqdetails/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/authorfaqdetails/delete", body, { headers: headers });
    };
    AuthorFAQDetailAdminService.prototype.getSubTopic = function (getSubTopicRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('SubTopicId', (getSubTopicRequest.SubTopicId != null) ? getSubTopicRequest.SubTopicId.toString() : null);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/subTopics", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            SubTopicId: (getSubTopicRequest.SubTopicId != null) ? getSubTopicRequest.SubTopicId.toString() : null
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/subTopics", { params: params });
    };
    AuthorFAQDetailAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AuthorFAQDetailAdminService);
    return AuthorFAQDetailAdminService;
}());
exports.AuthorFAQDetailAdminService = AuthorFAQDetailAdminService;
//# sourceMappingURL=authorFAQDetail.service.js.map