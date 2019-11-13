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
var RBIDataDetailAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function RBIDataDetailAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    RBIDataDetailAdminService.prototype.getRBIDataDetail = function (getRBIDataDetailRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('RBIDataDetailId', (getRBIDataDetailRequest.RBIDataDetailId != null) ? getRBIDataDetailRequest.RBIDataDetailId.toString() : null);
        //search.set('RBIDataId', (getRBIDataDetailRequest.RBIDataId != null) ? getRBIDataDetailRequest.RBIDataId.toString() : null);
        //search.set('Year', (getRBIDataDetailRequest.Year != null) ? getRBIDataDetailRequest.Year.toString() : null);
        //search.set('Month', (getRBIDataDetailRequest.Month != null) ? getRBIDataDetailRequest.Month.toString() : null);
        //search.set('SearchText', getRBIDataDetailRequest.SearchText);
        //search.set('IsActive', (getRBIDataDetailRequest.IsActive != null) ? getRBIDataDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRBIDataDetailRequest.PageNumber != null) ? getRBIDataDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRBIDataDetailRequest.PageSize != null) ? getRBIDataDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRBIDataDetailRequest.OrderBy);
        //search.set('OrderByDirection', getRBIDataDetailRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/rbidatadetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            RBIDataDetailId: (getRBIDataDetailRequest.RBIDataDetailId != null) ? getRBIDataDetailRequest.RBIDataDetailId.toString() : null,
            RBIDataId: (getRBIDataDetailRequest.RBIDataId != null) ? getRBIDataDetailRequest.RBIDataId.toString() : null,
            Year: (getRBIDataDetailRequest.Year != null) ? getRBIDataDetailRequest.Year.toString() : null,
            Month: (getRBIDataDetailRequest.Month != null) ? getRBIDataDetailRequest.Month.toString() : null,
            SearchText: getRBIDataDetailRequest.SearchText,
            IsActive: (getRBIDataDetailRequest.IsActive != null) ? getRBIDataDetailRequest.IsActive.toString() : null,
            PageNumber: (getRBIDataDetailRequest.PageNumber != null) ? getRBIDataDetailRequest.PageNumber.toString() : null,
            PageSize: (getRBIDataDetailRequest.PageSize != null) ? getRBIDataDetailRequest.PageSize.toString() : null,
            OrderBy: getRBIDataDetailRequest.OrderBy,
            OrderByDirection: getRBIDataDetailRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/rbidatadetails", { params: params });
    };
    RBIDataDetailAdminService.prototype.addRBIDataDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rbidatadetails/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/rbidatadetails/add", body, { headers: headers });
    };
    RBIDataDetailAdminService.prototype.updateRBIDataDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rbidatadetails/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/rbidatadetails/update", body, { headers: headers });
    };
    RBIDataDetailAdminService.prototype.deleteRBIDataDetail = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rbidatadetails/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/rbidatadetails/delete", body, { headers: headers });
    };
    RBIDataDetailAdminService.prototype.getRBIDataDetailYear = function () {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.get(Global.API_SITE + "admin/api/rbidatadetailyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/rbidatadetailyears");
    };
    RBIDataDetailAdminService.prototype.getRBIDataDetailMonth = function () {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.get(Global.API_SITE + "admin/api/rbidatadetailmonths", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/rbidatadetailmonths");
    };
    RBIDataDetailAdminService.prototype.excelFileUpload = function (formData) {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.post(Global.API_SITE + "admin/api/rbidatadetails/uploadexcelfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/rbidatadetails/uploadexcelfiles", formData);
    };
    RBIDataDetailAdminService.prototype.pdfFileUpload = function (formData) {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.post(Global.API_SITE + "admin/api/rbidatadetails/uploadpdffiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/rbidatadetails/uploadpdffiles", formData);
    };
    RBIDataDetailAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], RBIDataDetailAdminService);
    return RBIDataDetailAdminService;
}());
exports.RBIDataDetailAdminService = RBIDataDetailAdminService;
//# sourceMappingURL=rBIDataDetail.service.js.map