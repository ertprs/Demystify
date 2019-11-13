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
var RBICompoundingOrderUserService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function RBICompoundingOrderUserService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    RBICompoundingOrderUserService.prototype.getRBICompoundingOrder = function (getRBICompoundingOrderRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('RBICompoundingOrderId', (getRBICompoundingOrderRequest.RBICompoundingOrderId != null) ? getRBICompoundingOrderRequest.RBICompoundingOrderId.toString() : null);
        //search.set('SearchText', getRBICompoundingOrderRequest.SearchText);
        //search.set('IsActive', (getRBICompoundingOrderRequest.IsActive != null) ? getRBICompoundingOrderRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRBICompoundingOrderRequest.PageNumber != null) ? getRBICompoundingOrderRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRBICompoundingOrderRequest.PageSize != null) ? getRBICompoundingOrderRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRBICompoundingOrderRequest.OrderBy);
        //search.set('OrderByDirection', getRBICompoundingOrderRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/rbicompoundingorders", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            RBICompoundingOrderId: (getRBICompoundingOrderRequest.RBICompoundingOrderId != null) ? getRBICompoundingOrderRequest.RBICompoundingOrderId.toString() : null,
            SearchText: getRBICompoundingOrderRequest.SearchText,
            IsActive: (getRBICompoundingOrderRequest.IsActive != null) ? getRBICompoundingOrderRequest.IsActive.toString() : null,
            PageNumber: (getRBICompoundingOrderRequest.PageNumber != null) ? getRBICompoundingOrderRequest.PageNumber.toString() : null,
            PageSize: (getRBICompoundingOrderRequest.PageSize != null) ? getRBICompoundingOrderRequest.PageSize.toString() : null,
            OrderBy: getRBICompoundingOrderRequest.OrderBy,
            OrderByDirection: getRBICompoundingOrderRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/rbicompoundingorders", { params: params });
    };
    RBICompoundingOrderUserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], RBICompoundingOrderUserService);
    return RBICompoundingOrderUserService;
}());
exports.RBICompoundingOrderUserService = RBICompoundingOrderUserService;
//# sourceMappingURL=rBICompoundingOrder.service.js.map