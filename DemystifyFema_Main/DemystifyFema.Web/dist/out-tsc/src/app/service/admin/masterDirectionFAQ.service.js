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
var MasterDirectionFAQAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function MasterDirectionFAQAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    MasterDirectionFAQAdminService.prototype.getMasterDirectionFAQ = function (getMasterDirectionFAQRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('MasterDirectionFAQId', (getMasterDirectionFAQRequest.MasterDirectionFAQId != null) ? getMasterDirectionFAQRequest.MasterDirectionFAQId.toString() : null);
        //search.set('MasterDirectionId', (getMasterDirectionFAQRequest.MasterDirectionId != null) ? getMasterDirectionFAQRequest.MasterDirectionId.toString() : null);
        //search.set('SearchText', getMasterDirectionFAQRequest.SearchText);
        //search.set('IsActive', (getMasterDirectionFAQRequest.IsActive != null) ? getMasterDirectionFAQRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterDirectionFAQRequest.PageNumber != null) ? getMasterDirectionFAQRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterDirectionFAQRequest.PageSize != null) ? getMasterDirectionFAQRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterDirectionFAQRequest.OrderBy);
        //search.set('OrderByDirection', getMasterDirectionFAQRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/masterdirectionfaqs", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            MasterDirectionFAQId: (getMasterDirectionFAQRequest.MasterDirectionFAQId != null) ? getMasterDirectionFAQRequest.MasterDirectionFAQId.toString() : null,
            MasterDirectionId: (getMasterDirectionFAQRequest.MasterDirectionId != null) ? getMasterDirectionFAQRequest.MasterDirectionId.toString() : null,
            SearchText: getMasterDirectionFAQRequest.SearchText,
            IsActive: (getMasterDirectionFAQRequest.IsActive != null) ? getMasterDirectionFAQRequest.IsActive.toString() : null,
            PageNumber: (getMasterDirectionFAQRequest.PageNumber != null) ? getMasterDirectionFAQRequest.PageNumber.toString() : null,
            PageSize: (getMasterDirectionFAQRequest.PageSize != null) ? getMasterDirectionFAQRequest.PageSize.toString() : null,
            OrderBy: getMasterDirectionFAQRequest.OrderBy,
            OrderByDirection: getMasterDirectionFAQRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/masterdirectionfaqs", { params: params });
    };
    MasterDirectionFAQAdminService.prototype.addMasterDirectionFAQ = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionfaqs/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/masterdirectionfaqs/add", body, { headers: headers });
    };
    MasterDirectionFAQAdminService.prototype.updateMasterDirectionFAQ = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionfaqs/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/masterdirectionfaqs/update", body, { headers: headers });
    };
    MasterDirectionFAQAdminService.prototype.deleteMasterDirectionFAQ = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/masterdirectionfaqs/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/masterdirectionfaqs/delete", body, { headers: headers });
    };
    MasterDirectionFAQAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], MasterDirectionFAQAdminService);
    return MasterDirectionFAQAdminService;
}());
exports.MasterDirectionFAQAdminService = MasterDirectionFAQAdminService;
//# sourceMappingURL=masterDirectionFAQ.service.js.map