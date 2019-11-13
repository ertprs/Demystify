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
var MasterCircularOfFEMASubModuleDetailUserService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function MasterCircularOfFEMASubModuleDetailUserService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    MasterCircularOfFEMASubModuleDetailUserService.prototype.getMasterCircularOfFEMASubModuleDetail = function (getFEMASubModuleDetailRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('FEMASubModuleOfModuleId', (getFEMASubModuleDetailRequest.FEMASubModuleOfModuleId != null) ? getFEMASubModuleDetailRequest.FEMASubModuleOfModuleId.toString() : null);
        //search.set('SearchText', getFEMASubModuleDetailRequest.SearchText);
        //search.set('IsActive', (getFEMASubModuleDetailRequest.IsActive != null) ? getFEMASubModuleDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFEMASubModuleDetailRequest.PageNumber != null) ? getFEMASubModuleDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFEMASubModuleDetailRequest.PageSize != null) ? getFEMASubModuleDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFEMASubModuleDetailRequest.OrderBy);
        //search.set('OrderByDirection', getFEMASubModuleDetailRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/mastercircularoffemasubmoduledetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            FEMASubModuleOfModuleId: (getFEMASubModuleDetailRequest.FEMASubModuleOfModuleId != null) ? getFEMASubModuleDetailRequest.FEMASubModuleOfModuleId.toString() : null,
            SearchText: getFEMASubModuleDetailRequest.SearchText,
            IsActive: (getFEMASubModuleDetailRequest.IsActive != null) ? getFEMASubModuleDetailRequest.IsActive.toString() : null,
            PageNumber: (getFEMASubModuleDetailRequest.PageNumber != null) ? getFEMASubModuleDetailRequest.PageNumber.toString() : null,
            PageSize: (getFEMASubModuleDetailRequest.PageSize != null) ? getFEMASubModuleDetailRequest.PageSize.toString() : null,
            OrderBy: getFEMASubModuleDetailRequest.OrderBy,
            OrderByDirection: getFEMASubModuleDetailRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/mastercircularoffemasubmoduledetails", { params: params });
    };
    MasterCircularOfFEMASubModuleDetailUserService.prototype.getMasterCircularDetailYear = function () {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.get(Global.API_SITE + "user/api/mastercirculardetailyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/mastercirculardetailyears");
    };
    MasterCircularOfFEMASubModuleDetailUserService.prototype.getMasterCircularDetail = function (getMasterCircularDetailRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('MasterCircularDetailId', (getMasterCircularDetailRequest.MasterCircularDetailId != null) ? getMasterCircularDetailRequest.MasterCircularDetailId.toString() : null);
        //search.set('MasterCircularId', (getMasterCircularDetailRequest.MasterCircularId != null) ? getMasterCircularDetailRequest.MasterCircularId.toString() : null);
        //search.set('Year', (getMasterCircularDetailRequest.Year != null) ? getMasterCircularDetailRequest.Year.toString() : null);
        //search.set('SearchText', getMasterCircularDetailRequest.SearchText);
        //search.set('IsActive', (getMasterCircularDetailRequest.IsActive != null) ? getMasterCircularDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getMasterCircularDetailRequest.PageNumber != null) ? getMasterCircularDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getMasterCircularDetailRequest.PageSize != null) ? getMasterCircularDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getMasterCircularDetailRequest.OrderBy);
        //search.set('OrderByDirection', getMasterCircularDetailRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/mastercirculardetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            MasterCircularDetailId: (getMasterCircularDetailRequest.MasterCircularDetailId != null) ? getMasterCircularDetailRequest.MasterCircularDetailId.toString() : null,
            MasterCircularId: (getMasterCircularDetailRequest.MasterCircularId != null) ? getMasterCircularDetailRequest.MasterCircularId.toString() : null,
            Year: (getMasterCircularDetailRequest.Year != null) ? getMasterCircularDetailRequest.Year.toString() : null,
            SearchText: getMasterCircularDetailRequest.SearchText,
            IsActive: (getMasterCircularDetailRequest.IsActive != null) ? getMasterCircularDetailRequest.IsActive.toString() : null,
            PageNumber: (getMasterCircularDetailRequest.PageNumber != null) ? getMasterCircularDetailRequest.PageNumber.toString() : null,
            PageSize: (getMasterCircularDetailRequest.PageSize != null) ? getMasterCircularDetailRequest.PageSize.toString() : null,
            OrderBy: getMasterCircularDetailRequest.OrderBy,
            OrderByDirection: getMasterCircularDetailRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/mastercirculardetails", { params: params });
    };
    MasterCircularOfFEMASubModuleDetailUserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], MasterCircularOfFEMASubModuleDetailUserService);
    return MasterCircularOfFEMASubModuleDetailUserService;
}());
exports.MasterCircularOfFEMASubModuleDetailUserService = MasterCircularOfFEMASubModuleDetailUserService;
//# sourceMappingURL=masterCircularOfFEMASubModuleDetail.service.js.map