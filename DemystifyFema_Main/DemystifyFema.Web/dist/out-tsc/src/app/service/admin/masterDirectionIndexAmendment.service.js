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
var MasterDirectionIndexAmendmentAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function MasterDirectionIndexAmendmentAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    MasterDirectionIndexAmendmentAdminService.prototype.getMasterDirectionIndexAmendment = function (getMasterDirectionIndexAmendmentRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('MasterDirectionIndexAmendmentId', (getMasterDirectionIndexAmendmentRequest.MasterDirectionIndexAmendmentId != null) ? getMasterDirectionIndexAmendmentRequest.MasterDirectionIndexAmendmentId.toString() : null);
        //search.set('MasterDirectionId', (getMasterDirectionIndexAmendmentRequest.MasterDirectionId != null) ? getMasterDirectionIndexAmendmentRequest.MasterDirectionId.toString() : null);
        //search.set('SearchText', getMasterDirectionIndexAmendmentRequest.SearchText);
        //search.set('IsActive', (getMasterDirectionIndexAmendmentRequest.IsActive != null) ? getMasterDirectionIndexAmendmentRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterDirectionIndexAmendmentRequest.PageNumber != null) ? getMasterDirectionIndexAmendmentRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterDirectionIndexAmendmentRequest.PageSize != null) ? getMasterDirectionIndexAmendmentRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterDirectionIndexAmendmentRequest.OrderBy);
        //search.set('OrderByDirection', getMasterDirectionIndexAmendmentRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/masterdirectionindexamendments", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            MasterDirectionIndexAmendmentId: (getMasterDirectionIndexAmendmentRequest.MasterDirectionIndexAmendmentId != null) ? getMasterDirectionIndexAmendmentRequest.MasterDirectionIndexAmendmentId.toString() : null,
            MasterDirectionId: (getMasterDirectionIndexAmendmentRequest.MasterDirectionId != null) ? getMasterDirectionIndexAmendmentRequest.MasterDirectionId.toString() : null,
            SearchText: getMasterDirectionIndexAmendmentRequest.SearchText,
            IsActive: (getMasterDirectionIndexAmendmentRequest.IsActive != null) ? getMasterDirectionIndexAmendmentRequest.IsActive.toString() : null,
            PageNumber: (getMasterDirectionIndexAmendmentRequest.PageNumber != null) ? getMasterDirectionIndexAmendmentRequest.PageNumber.toString() : null,
            PageSize: (getMasterDirectionIndexAmendmentRequest.PageSize != null) ? getMasterDirectionIndexAmendmentRequest.PageSize.toString() : null,
            OrderBy: getMasterDirectionIndexAmendmentRequest.OrderBy,
            OrderByDirection: getMasterDirectionIndexAmendmentRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/masterdirectionindexamendments", { params: params });
    };
    MasterDirectionIndexAmendmentAdminService.prototype.addMasterDirectionIndexAmendment = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionindexamendments/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/masterdirectionindexamendments/add", body, { headers: headers });
    };
    MasterDirectionIndexAmendmentAdminService.prototype.updateMasterDirectionIndexAmendment = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionindexamendments/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/masterdirectionindexamendments/update", body, { headers: headers });
    };
    MasterDirectionIndexAmendmentAdminService.prototype.deleteMasterDirectionIndexAmendment = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionindexamendments/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/masterdirectionindexamendments/delete", body, { headers: headers });
    };
    MasterDirectionIndexAmendmentAdminService.prototype.getMasterDirectionIndexAmendmentYear = function () {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.get(Global.API_SITE + "admin/api/masterdirectionindexamendmentyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/masterdirectionindexamendmentyears");
    };
    MasterDirectionIndexAmendmentAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], MasterDirectionIndexAmendmentAdminService);
    return MasterDirectionIndexAmendmentAdminService;
}());
exports.MasterDirectionIndexAmendmentAdminService = MasterDirectionIndexAmendmentAdminService;
//# sourceMappingURL=masterDirectionIndexAmendment.service.js.map