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
var FDICircularIndexAmendmentAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function FDICircularIndexAmendmentAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    FDICircularIndexAmendmentAdminService.prototype.getFDICircularIndexAmendment = function (getFDICircularIndexAmendmentRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('FDICircularIndexAmendmentId', (getFDICircularIndexAmendmentRequest.FDICircularIndexAmendmentId != null) ? getFDICircularIndexAmendmentRequest.FDICircularIndexAmendmentId.toString() : null);
        //search.set('FDICircularId', (getFDICircularIndexAmendmentRequest.FDICircularId != null) ? getFDICircularIndexAmendmentRequest.FDICircularId.toString() : null);
        //search.set('SearchText', getFDICircularIndexAmendmentRequest.SearchText);
        //search.set('IsActive', (getFDICircularIndexAmendmentRequest.IsActive != null) ? getFDICircularIndexAmendmentRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFDICircularIndexAmendmentRequest.PageNumber != null) ? getFDICircularIndexAmendmentRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFDICircularIndexAmendmentRequest.PageSize != null) ? getFDICircularIndexAmendmentRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFDICircularIndexAmendmentRequest.OrderBy);
        //search.set('OrderByDirection', getFDICircularIndexAmendmentRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/fdicircularindexamendments", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FDICircularIndexAmendmentId: (getFDICircularIndexAmendmentRequest.FDICircularIndexAmendmentId != null) ? getFDICircularIndexAmendmentRequest.FDICircularIndexAmendmentId.toString() : null,
            FDICircularId: (getFDICircularIndexAmendmentRequest.FDICircularId != null) ? getFDICircularIndexAmendmentRequest.FDICircularId.toString() : null,
            SearchText: getFDICircularIndexAmendmentRequest.SearchText,
            IsActive: (getFDICircularIndexAmendmentRequest.IsActive != null) ? getFDICircularIndexAmendmentRequest.IsActive.toString() : null,
            PageNumber: (getFDICircularIndexAmendmentRequest.PageNumber != null) ? getFDICircularIndexAmendmentRequest.PageNumber.toString() : null,
            PageSize: (getFDICircularIndexAmendmentRequest.PageSize != null) ? getFDICircularIndexAmendmentRequest.PageSize.toString() : null,
            OrderBy: getFDICircularIndexAmendmentRequest.OrderBy,
            OrderByDirection: getFDICircularIndexAmendmentRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/fdicircularindexamendments", { params: params });
    };
    FDICircularIndexAmendmentAdminService.prototype.addFDICircularIndexAmendment = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularindexamendments/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/fdicircularindexamendments/add", body, { headers: headers });
    };
    FDICircularIndexAmendmentAdminService.prototype.updateFDICircularIndexAmendment = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularindexamendments/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/fdicircularindexamendments/update", body, { headers: headers });
    };
    FDICircularIndexAmendmentAdminService.prototype.deleteFDICircularIndexAmendment = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/fdicircularindexamendments/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/fdicircularindexamendments/delete", body, { headers: headers });
    };
    FDICircularIndexAmendmentAdminService.prototype.getFDICircularYear = function () {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.get(Global.API_SITE + "admin/api/fdicircularyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/fdicircularyears");
    };
    FDICircularIndexAmendmentAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], FDICircularIndexAmendmentAdminService);
    return FDICircularIndexAmendmentAdminService;
}());
exports.FDICircularIndexAmendmentAdminService = FDICircularIndexAmendmentAdminService;
//# sourceMappingURL=fDICircularIndexAmendment.service.js.map