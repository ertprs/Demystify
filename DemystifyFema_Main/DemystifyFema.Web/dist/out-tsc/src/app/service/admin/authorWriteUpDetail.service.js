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
var AuthorWriteUpDetailAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function AuthorWriteUpDetailAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    AuthorWriteUpDetailAdminService.prototype.getAuthorWriteUpDetail = function (getAuthorWriteUpDetailRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('AuthorWriteUpDetailId', (getAuthorWriteUpDetailRequest.AuthorWriteUpDetailId != null) ? getAuthorWriteUpDetailRequest.AuthorWriteUpDetailId.toString() : null);
        //search.set('AuthorWriteUpId', (getAuthorWriteUpDetailRequest.AuthorWriteUpId != null) ? getAuthorWriteUpDetailRequest.AuthorWriteUpId.toString() : null);
        //search.set('SearchText', getAuthorWriteUpDetailRequest.SearchText);
        //search.set('IsActive', (getAuthorWriteUpDetailRequest.IsActive != null) ? getAuthorWriteUpDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getAuthorWriteUpDetailRequest.PageNumber != null) ? getAuthorWriteUpDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getAuthorWriteUpDetailRequest.PageSize != null) ? getAuthorWriteUpDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getAuthorWriteUpDetailRequest.OrderBy);
        //search.set('OrderByDirection', getAuthorWriteUpDetailRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/authorwriteupdetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            AuthorWriteUpDetailId: (getAuthorWriteUpDetailRequest.AuthorWriteUpDetailId != null) ? getAuthorWriteUpDetailRequest.AuthorWriteUpDetailId.toString() : null,
            AuthorWriteUpId: (getAuthorWriteUpDetailRequest.AuthorWriteUpId != null) ? getAuthorWriteUpDetailRequest.AuthorWriteUpId.toString() : null,
            SearchText: getAuthorWriteUpDetailRequest.SearchText,
            IsActive: (getAuthorWriteUpDetailRequest.IsActive != null) ? getAuthorWriteUpDetailRequest.IsActive.toString() : null,
            PageNumber: (getAuthorWriteUpDetailRequest.PageNumber != null) ? getAuthorWriteUpDetailRequest.PageNumber.toString() : null,
            PageSize: (getAuthorWriteUpDetailRequest.PageSize != null) ? getAuthorWriteUpDetailRequest.PageSize.toString() : null,
            OrderBy: getAuthorWriteUpDetailRequest.OrderBy,
            OrderByDirection: getAuthorWriteUpDetailRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/authorwriteupdetails", { params: params });
    };
    AuthorWriteUpDetailAdminService.prototype.addAuthorWriteUpDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorwriteupdetails/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/authorwriteupdetails/add", body, { headers: headers });
    };
    AuthorWriteUpDetailAdminService.prototype.updateAuthorWriteUpDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorwriteupdetails/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/authorwriteupdetails/update", body, { headers: headers });
    };
    AuthorWriteUpDetailAdminService.prototype.deleteAuthorWriteUpDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorwriteupdetails/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/authorwriteupdetails/delete", body, { headers: headers });
    };
    AuthorWriteUpDetailAdminService.prototype.fileUpload = function (formData) {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.post(Global.API_SITE + "admin/api/authorwriteupdetails/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/authorwriteupdetails/uploadfiles", formData);
    };
    AuthorWriteUpDetailAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AuthorWriteUpDetailAdminService);
    return AuthorWriteUpDetailAdminService;
}());
exports.AuthorWriteUpDetailAdminService = AuthorWriteUpDetailAdminService;
//# sourceMappingURL=authorWriteUpDetail.service.js.map