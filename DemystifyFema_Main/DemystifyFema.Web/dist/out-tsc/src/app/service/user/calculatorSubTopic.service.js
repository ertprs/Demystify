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
var CalculatorSubTopicUserService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function CalculatorSubTopicUserService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    CalculatorSubTopicUserService.prototype.getCalculatorSubTopic = function (getCalculatorSubTopicRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('CalculatorSubTopicId', (getCalculatorSubTopicRequest.CalculatorSubTopicId != null) ? getCalculatorSubTopicRequest.CalculatorSubTopicId.toString() : null);
        //search.set('FEMAModuleId', (getCalculatorSubTopicRequest.FEMAModuleId != null) ? getCalculatorSubTopicRequest.FEMAModuleId.toString() : null);
        //search.set('SearchText', getCalculatorSubTopicRequest.SearchText);
        //search.set('IsActive', (getCalculatorSubTopicRequest.IsActive != null) ? getCalculatorSubTopicRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getCalculatorSubTopicRequest.PageNumber != null) ? getCalculatorSubTopicRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getCalculatorSubTopicRequest.PageSize != null) ? getCalculatorSubTopicRequest.PageSize.toString() : null);
        //search.set('OrderBy', getCalculatorSubTopicRequest.OrderBy);
        //search.set('OrderByDirection', getCalculatorSubTopicRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/calculatorsubtopics", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            CalculatorSubTopicId: (getCalculatorSubTopicRequest.CalculatorSubTopicId != null) ? getCalculatorSubTopicRequest.CalculatorSubTopicId.toString() : null,
            FEMAModuleId: (getCalculatorSubTopicRequest.FEMAModuleId != null) ? getCalculatorSubTopicRequest.FEMAModuleId.toString() : null,
            SearchText: getCalculatorSubTopicRequest.SearchText,
            IsActive: (getCalculatorSubTopicRequest.IsActive != null) ? getCalculatorSubTopicRequest.IsActive.toString() : null,
            PageNumber: (getCalculatorSubTopicRequest.PageNumber != null) ? getCalculatorSubTopicRequest.PageNumber.toString() : null,
            PageSize: (getCalculatorSubTopicRequest.PageSize != null) ? getCalculatorSubTopicRequest.PageSize.toString() : null,
            OrderBy: getCalculatorSubTopicRequest.OrderBy,
            OrderByDirection: getCalculatorSubTopicRequest.OrderByDirection,
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/calculatorsubtopics", { params: params });
    };
    CalculatorSubTopicUserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CalculatorSubTopicUserService);
    return CalculatorSubTopicUserService;
}());
exports.CalculatorSubTopicUserService = CalculatorSubTopicUserService;
//# sourceMappingURL=calculatorSubTopic.service.js.map