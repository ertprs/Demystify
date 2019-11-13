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
var AuthorFAQQuestionReplyAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function AuthorFAQQuestionReplyAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    AuthorFAQQuestionReplyAdminService.prototype.getAuthorFAQQuestionReply = function (getAuthorFAQQuestionReplyRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('AuthorFAQQuestionReplyId', (getAuthorFAQQuestionReplyRequest.AuthorFAQQuestionReplyId != null) ? getAuthorFAQQuestionReplyRequest.AuthorFAQQuestionReplyId.toString() : null);
        //search.set('AuthorFAQDetailId', (getAuthorFAQQuestionReplyRequest.AuthorFAQDetailId != null) ? getAuthorFAQQuestionReplyRequest.AuthorFAQDetailId.toString() : null);
        //search.set('SearchText', getAuthorFAQQuestionReplyRequest.SearchText);
        //search.set('IsActive', (getAuthorFAQQuestionReplyRequest.IsActive != null) ? getAuthorFAQQuestionReplyRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getAuthorFAQQuestionReplyRequest.PageNumber != null) ? getAuthorFAQQuestionReplyRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getAuthorFAQQuestionReplyRequest.PageSize != null) ? getAuthorFAQQuestionReplyRequest.PageSize.toString() : null);
        //search.set('OrderBy', getAuthorFAQQuestionReplyRequest.OrderBy);
        //search.set('OrderByDirection', getAuthorFAQQuestionReplyRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/authorfaqquestionreplies", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            AuthorFAQQuestionReplyId: (getAuthorFAQQuestionReplyRequest.AuthorFAQQuestionReplyId != null) ? getAuthorFAQQuestionReplyRequest.AuthorFAQQuestionReplyId.toString() : null,
            AuthorFAQDetailId: (getAuthorFAQQuestionReplyRequest.AuthorFAQDetailId != null) ? getAuthorFAQQuestionReplyRequest.AuthorFAQDetailId.toString() : null,
            SearchText: getAuthorFAQQuestionReplyRequest.SearchText,
            IsActive: (getAuthorFAQQuestionReplyRequest.IsActive != null) ? getAuthorFAQQuestionReplyRequest.IsActive.toString() : null,
            PageNumber: (getAuthorFAQQuestionReplyRequest.PageNumber != null) ? getAuthorFAQQuestionReplyRequest.PageNumber.toString() : null,
            PageSize: (getAuthorFAQQuestionReplyRequest.PageSize != null) ? getAuthorFAQQuestionReplyRequest.PageSize.toString() : null,
            OrderBy: getAuthorFAQQuestionReplyRequest.OrderBy,
            OrderByDirection: getAuthorFAQQuestionReplyRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/authorfaqquestionreplies", { params: params });
    };
    AuthorFAQQuestionReplyAdminService.prototype.addAuthorFAQQuestionReply = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqquestionreplies/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/authorfaqquestionreplies/add", body, { headers: headers });
    };
    AuthorFAQQuestionReplyAdminService.prototype.updateAuthorFAQQuestionReply = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqquestionreplies/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/authorfaqquestionreplies/update", body, { headers: headers });
    };
    AuthorFAQQuestionReplyAdminService.prototype.deleteAuthorFAQQuestionReply = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/authorfaqquestionreplies/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/authorfaqquestionreplies/delete", body, { headers: headers });
    };
    AuthorFAQQuestionReplyAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AuthorFAQQuestionReplyAdminService);
    return AuthorFAQQuestionReplyAdminService;
}());
exports.AuthorFAQQuestionReplyAdminService = AuthorFAQQuestionReplyAdminService;
//# sourceMappingURL=authorFAQQuestionReply.service.js.map