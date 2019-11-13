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
var SupportTicketAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function SupportTicketAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    SupportTicketAdminService.prototype.getSupportTicket = function (getSupportTicketRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('SupportTicketId', (getSupportTicketRequest.SupportTicketId != null) ? getSupportTicketRequest.SupportTicketId.toString() : null);
        //search.set('IsCurrentUser', (getSupportTicketRequest.IsCurrentUser != null) ? getSupportTicketRequest.IsCurrentUser.toString() : null);
        //search.set('IsForPostQuery', (getSupportTicketRequest.IsForPostQuery != null) ? getSupportTicketRequest.IsForPostQuery.toString() : null);
        //search.set('TopicId', (getSupportTicketRequest.TopicId != null) ? getSupportTicketRequest.TopicId.toString() : null);
        //search.set('SubTopicId', (getSupportTicketRequest.SubTopicId != null) ? getSupportTicketRequest.SubTopicId.toString() : null);
        //search.set('SearchText', getSupportTicketRequest.SearchText);
        //search.set('IsActive', (getSupportTicketRequest.IsActive != null) ? getSupportTicketRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getSupportTicketRequest.PageNumber != null) ? getSupportTicketRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getSupportTicketRequest.PageSize != null) ? getSupportTicketRequest.PageSize.toString() : null);
        //search.set('OrderBy', getSupportTicketRequest.OrderBy);
        //search.set('OrderByDirection', getSupportTicketRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/supporttickets", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            SupportTicketId: (getSupportTicketRequest.SupportTicketId != null) ? getSupportTicketRequest.SupportTicketId.toString() : null,
            IsCurrentUser: (getSupportTicketRequest.IsCurrentUser != null) ? getSupportTicketRequest.IsCurrentUser.toString() : null,
            IsForPostQuery: (getSupportTicketRequest.IsForPostQuery != null) ? getSupportTicketRequest.IsForPostQuery.toString() : null,
            TopicId: (getSupportTicketRequest.TopicId != null) ? getSupportTicketRequest.TopicId.toString() : null,
            SubTopicId: (getSupportTicketRequest.SubTopicId != null) ? getSupportTicketRequest.SubTopicId.toString() : null,
            SearchText: getSupportTicketRequest.SearchText,
            IsActive: (getSupportTicketRequest.IsActive != null) ? getSupportTicketRequest.IsActive.toString() : null,
            PageNumber: (getSupportTicketRequest.PageNumber != null) ? getSupportTicketRequest.PageNumber.toString() : null,
            PageSize: (getSupportTicketRequest.PageSize != null) ? getSupportTicketRequest.PageSize.toString() : null,
            OrderBy: getSupportTicketRequest.OrderBy,
            OrderByDirection: getSupportTicketRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/supporttickets", { params: params });
    };
    SupportTicketAdminService.prototype.addSupportTicket = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/supporttickets/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/supporttickets/add", body, { headers: headers });
    };
    SupportTicketAdminService.prototype.deleteSupportTicket = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/supporttickets/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/supporttickets/delete", body, { headers: headers });
    };
    SupportTicketAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SupportTicketAdminService);
    return SupportTicketAdminService;
}());
exports.SupportTicketAdminService = SupportTicketAdminService;
//# sourceMappingURL=supportTicket.service.js.map