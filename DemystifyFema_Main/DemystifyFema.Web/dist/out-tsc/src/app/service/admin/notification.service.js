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
var NotificationAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function NotificationAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    NotificationAdminService.prototype.getNotification = function (getNotificationRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('NotificationId', (getNotificationRequest.NotificationId != null) ? getNotificationRequest.NotificationId.toString() : null);
        //search.set('RegulationId', (getNotificationRequest.RegulationId != null) ? getNotificationRequest.RegulationId.toString() : null);
        //search.set('SearchText', getNotificationRequest.SearchText);
        //search.set('IsActive', (getNotificationRequest.IsActive != null) ? getNotificationRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getNotificationRequest.PageNumber != null) ? getNotificationRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getNotificationRequest.PageSize != null) ? getNotificationRequest.PageSize.toString() : null);
        //search.set('OrderBy', getNotificationRequest.OrderBy);
        //search.set('OrderByDirection', getNotificationRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/notifications", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            NotificationId: (getNotificationRequest.NotificationId != null) ? getNotificationRequest.NotificationId.toString() : null,
            RegulationId: (getNotificationRequest.RegulationId != null) ? getNotificationRequest.RegulationId.toString() : null,
            SearchText: getNotificationRequest.SearchText,
            IsActive: (getNotificationRequest.IsActive != null) ? getNotificationRequest.IsActive.toString() : null,
            PageNumber: (getNotificationRequest.PageNumber != null) ? getNotificationRequest.PageNumber.toString() : null,
            PageSize: (getNotificationRequest.PageSize != null) ? getNotificationRequest.PageSize.toString() : null,
            OrderBy: getNotificationRequest.OrderBy,
            OrderByDirection: getNotificationRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/notifications", { params: params });
    };
    NotificationAdminService.prototype.addNotification = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/notifications/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/notifications/add", body, { headers: headers });
    };
    NotificationAdminService.prototype.updateNotification = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/notifications/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/notifications/update", body, { headers: headers });
    };
    NotificationAdminService.prototype.deleteNotification = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/notifications/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/notifications/delete", body, { headers: headers });
    };
    NotificationAdminService.prototype.notificationPDFUpload = function (formData) {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.post(Global.API_SITE + "admin/api/notifications/uploadnotificationpdf", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/notifications/uploadnotificationpdf", formData);
    };
    NotificationAdminService.prototype.gSRPDFUpload = function (formData) {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.post(Global.API_SITE + "admin/api/notifications/uploadgsrpdf", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/notifications/uploadgsrpdf", formData);
    };
    NotificationAdminService.prototype.getNotificationType = function (getNotificationTypeRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('NotificationTypeId', (getNotificationTypeRequest.NotificationTypeId != null) ? getNotificationTypeRequest.NotificationTypeId.toString() : null);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/notificationtypes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            NotificationTypeId: (getNotificationTypeRequest.NotificationTypeId != null) ? getNotificationTypeRequest.NotificationTypeId.toString() : null
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/notificationtypes", { params: params });
    };
    NotificationAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], NotificationAdminService);
    return NotificationAdminService;
}());
exports.NotificationAdminService = NotificationAdminService;
//# sourceMappingURL=notification.service.js.map