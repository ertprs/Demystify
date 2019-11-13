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
var AuthorWriteUpAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function AuthorWriteUpAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    AuthorWriteUpAdminService.prototype.getAuthorWriteUp = function (getAuthorWriteUpRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('AuthorWriteUpId', (getAuthorWriteUpRequest.AuthorWriteUpId != null) ? getAuthorWriteUpRequest.AuthorWriteUpId.toString() : null);
        //search.set('SearchText', getAuthorWriteUpRequest.SearchText);
        //search.set('IsActive', (getAuthorWriteUpRequest.IsActive != null) ? getAuthorWriteUpRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getAuthorWriteUpRequest.PageNumber != null) ? getAuthorWriteUpRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getAuthorWriteUpRequest.PageSize != null) ? getAuthorWriteUpRequest.PageSize.toString() : null);
        //search.set('OrderBy', getAuthorWriteUpRequest.OrderBy);
        //search.set('OrderByDirection', getAuthorWriteUpRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/authorwriteups", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            AuthorWriteUpId: (getAuthorWriteUpRequest.AuthorWriteUpId != null) ? getAuthorWriteUpRequest.AuthorWriteUpId.toString() : null,
            SearchText: getAuthorWriteUpRequest.SearchText,
            IsActive: (getAuthorWriteUpRequest.IsActive != null) ? getAuthorWriteUpRequest.IsActive.toString() : null,
            PageNumber: (getAuthorWriteUpRequest.PageNumber != null) ? getAuthorWriteUpRequest.PageNumber.toString() : null,
            PageSize: (getAuthorWriteUpRequest.PageSize != null) ? getAuthorWriteUpRequest.PageSize.toString() : null,
            OrderBy: getAuthorWriteUpRequest.OrderBy,
            OrderByDirection: getAuthorWriteUpRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/authorwriteups", { params: params });
    };
    AuthorWriteUpAdminService.prototype.addAuthorWriteUp = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorwriteups/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/authorwriteups/add", body, { headers: headers });
    };
    AuthorWriteUpAdminService.prototype.updateAuthorWriteUp = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorwriteups/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/authorwriteups/update", body, { headers: headers });
    };
    AuthorWriteUpAdminService.prototype.deleteAuthorWriteUp = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorwriteups/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/authorwriteups/delete", body, { headers: headers });
    };
    AuthorWriteUpAdminService.prototype.fileUpload = function (formData) {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.post(Global.API_SITE + "admin/api/authorwriteups/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/authorwriteups/uploadfiles", formData);
    };
    AuthorWriteUpAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AuthorWriteUpAdminService);
    return AuthorWriteUpAdminService;
}());
exports.AuthorWriteUpAdminService = AuthorWriteUpAdminService;
//# sourceMappingURL=authorWriteUp.service.js.map