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
var APDIRCircularOfFEMASubModuleDetailUserService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function APDIRCircularOfFEMASubModuleDetailUserService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    APDIRCircularOfFEMASubModuleDetailUserService.prototype.getAPDIRCircularOfFEMASubModuleDetail = function (getFEMASubModuleDetailRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('APDIRCircularId', (getFEMASubModuleDetailRequest.APDIRCircularId != null) ? getFEMASubModuleDetailRequest.APDIRCircularId.toString() : null);
        //search.set('MasterDirectionId', (getFEMASubModuleDetailRequest.MasterDirectionId != null) ? getFEMASubModuleDetailRequest.MasterDirectionId.toString() : null);
        //search.set('Year', getFEMASubModuleDetailRequest.Year);
        //search.set('SearchText', getFEMASubModuleDetailRequest.SearchText);
        //search.set('IsActive', (getFEMASubModuleDetailRequest.IsActive != null) ? getFEMASubModuleDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFEMASubModuleDetailRequest.PageNumber != null) ? getFEMASubModuleDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFEMASubModuleDetailRequest.PageSize != null) ? getFEMASubModuleDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFEMASubModuleDetailRequest.OrderBy);
        //search.set('OrderByDirection', getFEMASubModuleDetailRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/apdircirculars", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            APDIRCircularId: (getFEMASubModuleDetailRequest.APDIRCircularId != null) ? getFEMASubModuleDetailRequest.APDIRCircularId.toString() : null,
            MasterDirectionId: (getFEMASubModuleDetailRequest.MasterDirectionId != null) ? getFEMASubModuleDetailRequest.MasterDirectionId.toString() : null,
            Year: getFEMASubModuleDetailRequest.Year,
            SearchText: getFEMASubModuleDetailRequest.SearchText,
            IsActive: (getFEMASubModuleDetailRequest.IsActive != null) ? getFEMASubModuleDetailRequest.IsActive.toString() : null,
            PageNumber: (getFEMASubModuleDetailRequest.PageNumber != null) ? getFEMASubModuleDetailRequest.PageNumber.toString() : null,
            PageSize: (getFEMASubModuleDetailRequest.PageSize != null) ? getFEMASubModuleDetailRequest.PageSize.toString() : null,
            OrderBy: getFEMASubModuleDetailRequest.OrderBy,
            OrderByDirection: getFEMASubModuleDetailRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/apdircirculars", { params: params });
    };
    APDIRCircularOfFEMASubModuleDetailUserService.prototype.getAPDIRCircularYears = function () {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.get(Global.API_SITE + "user/api/apdircircularyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/apdircircularyears");
    };
    APDIRCircularOfFEMASubModuleDetailUserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], APDIRCircularOfFEMASubModuleDetailUserService);
    return APDIRCircularOfFEMASubModuleDetailUserService;
}());
exports.APDIRCircularOfFEMASubModuleDetailUserService = APDIRCircularOfFEMASubModuleDetailUserService;
//# sourceMappingURL=aPDIRCircularOfFEMASubModuleDetail.service.js.map