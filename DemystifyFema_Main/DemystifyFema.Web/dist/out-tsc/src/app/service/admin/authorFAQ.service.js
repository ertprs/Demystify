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
var AuthorFAQAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function AuthorFAQAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    AuthorFAQAdminService.prototype.getAuthorFAQ = function (getAuthorFAQRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('AuthorFAQId', (getAuthorFAQRequest.AuthorFAQId != null) ? getAuthorFAQRequest.AuthorFAQId.toString() : null);
        //search.set('SearchText', getAuthorFAQRequest.SearchText);
        //search.set('IsActive', (getAuthorFAQRequest.IsActive != null) ? getAuthorFAQRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getAuthorFAQRequest.PageNumber != null) ? getAuthorFAQRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getAuthorFAQRequest.PageSize != null) ? getAuthorFAQRequest.PageSize.toString() : null);
        //search.set('OrderBy', getAuthorFAQRequest.OrderBy);
        //search.set('OrderByDirection', getAuthorFAQRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/authorfaqs", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            AuthorFAQId: (getAuthorFAQRequest.AuthorFAQId != null) ? getAuthorFAQRequest.AuthorFAQId.toString() : null,
            SearchText: getAuthorFAQRequest.SearchText,
            IsActive: (getAuthorFAQRequest.IsActive != null) ? getAuthorFAQRequest.IsActive.toString() : null,
            PageNumber: (getAuthorFAQRequest.PageNumber != null) ? getAuthorFAQRequest.PageNumber.toString() : null,
            PageSize: (getAuthorFAQRequest.PageSize != null) ? getAuthorFAQRequest.PageSize.toString() : null,
            OrderBy: getAuthorFAQRequest.OrderBy,
            OrderByDirection: getAuthorFAQRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/authorfaqs", { params: params });
    };
    AuthorFAQAdminService.prototype.addAuthorFAQ = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqs/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/authorfaqs/add", body, { headers: headers });
    };
    AuthorFAQAdminService.prototype.updateAuthorFAQ = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqs/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/authorfaqs/update", body, { headers: headers });
    };
    AuthorFAQAdminService.prototype.deleteAuthorFAQ = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqs/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/authorfaqs/delete", body, { headers: headers });
    };
    AuthorFAQAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AuthorFAQAdminService);
    return AuthorFAQAdminService;
}());
exports.AuthorFAQAdminService = AuthorFAQAdminService;
//# sourceMappingURL=authorFAQ.service.js.map