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
var SupportTicketReplyAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function SupportTicketReplyAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    SupportTicketReplyAdminService.prototype.getSupportTicketReply = function (getSupportTicketReplyRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('SupportTicketId', (getSupportTicketReplyRequest.SupportTicketId != null) ? getSupportTicketReplyRequest.SupportTicketId.toString() : null);
        //search.set('SearchText', getSupportTicketReplyRequest.SearchText);
        //search.set('IsActive', (getSupportTicketReplyRequest.IsActive != null) ? getSupportTicketReplyRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getSupportTicketReplyRequest.PageNumber != null) ? getSupportTicketReplyRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getSupportTicketReplyRequest.PageSize != null) ? getSupportTicketReplyRequest.PageSize.toString() : null);
        //search.set('OrderBy', getSupportTicketReplyRequest.OrderBy);
        //search.set('OrderByDirection', getSupportTicketReplyRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/supportticketreplies", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            SupportTicketId: (getSupportTicketReplyRequest.SupportTicketId != null) ? getSupportTicketReplyRequest.SupportTicketId.toString() : null,
            SearchText: getSupportTicketReplyRequest.SearchText,
            IsActive: (getSupportTicketReplyRequest.IsActive != null) ? getSupportTicketReplyRequest.IsActive.toString() : null,
            PageNumber: (getSupportTicketReplyRequest.PageNumber != null) ? getSupportTicketReplyRequest.PageNumber.toString() : null,
            PageSize: (getSupportTicketReplyRequest.PageSize != null) ? getSupportTicketReplyRequest.PageSize.toString() : null,
            OrderBy: getSupportTicketReplyRequest.OrderBy,
            OrderByDirection: getSupportTicketReplyRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/supportticketreplies", { params: params });
    };
    SupportTicketReplyAdminService.prototype.addSupportTicketReply = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/supportticketreplies/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/supportticketreplies/add", body, { headers: headers });
    };
    SupportTicketReplyAdminService.prototype.deleteSupportTicketReply = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/supportticketreplies/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/supportticketreplies/delete", body, { headers: headers });
    };
    SupportTicketReplyAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SupportTicketReplyAdminService);
    return SupportTicketReplyAdminService;
}());
exports.SupportTicketReplyAdminService = SupportTicketReplyAdminService;
//# sourceMappingURL=supportTicketReply.service.js.map