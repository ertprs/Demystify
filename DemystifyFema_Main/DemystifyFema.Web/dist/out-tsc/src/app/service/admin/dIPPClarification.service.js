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
var DIPPClarificationAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function DIPPClarificationAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    DIPPClarificationAdminService.prototype.getDIPPClarification = function (getDIPPClarificationRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('DIPPClarificationId', (getDIPPClarificationRequest.DIPPClarificationId != null) ? getDIPPClarificationRequest.DIPPClarificationId.toString() : null);
        //search.set('SearchText', getDIPPClarificationRequest.SearchText);
        //search.set('IsActive', (getDIPPClarificationRequest.IsActive != null) ? getDIPPClarificationRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getDIPPClarificationRequest.PageNumber != null) ? getDIPPClarificationRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getDIPPClarificationRequest.PageSize != null) ? getDIPPClarificationRequest.PageSize.toString() : null);
        //search.set('OrderBy', getDIPPClarificationRequest.OrderBy);
        //search.set('OrderByDirection', getDIPPClarificationRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/dippclarifications", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            DIPPClarificationId: (getDIPPClarificationRequest.DIPPClarificationId != null) ? getDIPPClarificationRequest.DIPPClarificationId.toString() : null,
            SearchText: getDIPPClarificationRequest.SearchText,
            IsActive: (getDIPPClarificationRequest.IsActive != null) ? getDIPPClarificationRequest.IsActive.toString() : null,
            PageNumber: (getDIPPClarificationRequest.PageNumber != null) ? getDIPPClarificationRequest.PageNumber.toString() : null,
            PageSize: (getDIPPClarificationRequest.PageSize != null) ? getDIPPClarificationRequest.PageSize.toString() : null,
            OrderBy: getDIPPClarificationRequest.OrderBy,
            OrderByDirection: getDIPPClarificationRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/dippclarifications", { params: params });
    };
    DIPPClarificationAdminService.prototype.addDIPPClarification = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/dippclarifications/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/dippclarifications/add", body, { headers: headers });
    };
    DIPPClarificationAdminService.prototype.updateDIPPClarification = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/dippclarifications/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/dippclarifications/update", body, { headers: headers });
    };
    DIPPClarificationAdminService.prototype.deleteDIPPClarification = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/dippclarifications/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/dippclarifications/delete", body, { headers: headers });
    };
    DIPPClarificationAdminService.prototype.fileUpload = function (formData) {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.post(Global.API_SITE + "admin/api/dippclarifications/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/dippclarifications/uploadfiles", formData);
    };
    DIPPClarificationAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], DIPPClarificationAdminService);
    return DIPPClarificationAdminService;
}());
exports.DIPPClarificationAdminService = DIPPClarificationAdminService;
//# sourceMappingURL=dIPPClarification.service.js.map