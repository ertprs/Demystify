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
var KeyDefinitionEventUserService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function KeyDefinitionEventUserService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    KeyDefinitionEventUserService.prototype.getKeyDefinitionEvent = function (getKeyDefinitionEventRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });
        //let search = new URLSearchParams();
        //search.set('KeyDefinitionEventId', (getKeyDefinitionEventRequest.KeyDefinitionEventId != null) ? getKeyDefinitionEventRequest.KeyDefinitionEventId.toString() : null);
        //search.set('DefinitionEventName', getKeyDefinitionEventRequest.DefinitionEventName);
        //search.set('SearchText', getKeyDefinitionEventRequest.SearchText);
        //search.set('IsActive', (getKeyDefinitionEventRequest.IsActive != null) ? getKeyDefinitionEventRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getKeyDefinitionEventRequest.PageNumber != null) ? getKeyDefinitionEventRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getKeyDefinitionEventRequest.PageSize != null) ? getKeyDefinitionEventRequest.PageSize.toString() : null);
        //search.set('OrderBy', getKeyDefinitionEventRequest.OrderBy);
        //search.set('OrderByDirection', getKeyDefinitionEventRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "user/api/keydefinitionevents", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            KeyDefinitionEventId: (getKeyDefinitionEventRequest.KeyDefinitionEventId != null) ? getKeyDefinitionEventRequest.KeyDefinitionEventId.toString() : null,
            DefinitionEventName: getKeyDefinitionEventRequest.DefinitionEventName,
            SearchText: getKeyDefinitionEventRequest.SearchText,
            IsActive: (getKeyDefinitionEventRequest.IsActive != null) ? getKeyDefinitionEventRequest.IsActive.toString() : null,
            PageNumber: (getKeyDefinitionEventRequest.PageNumber != null) ? getKeyDefinitionEventRequest.PageNumber.toString() : null,
            PageSize: (getKeyDefinitionEventRequest.PageSize != null) ? getKeyDefinitionEventRequest.PageSize.toString() : null,
            OrderBy: getKeyDefinitionEventRequest.OrderBy,
            OrderByDirection: getKeyDefinitionEventRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "user/api/keydefinitionevents", { params: params });
    };
    KeyDefinitionEventUserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], KeyDefinitionEventUserService);
    return KeyDefinitionEventUserService;
}());
exports.KeyDefinitionEventUserService = KeyDefinitionEventUserService;
//# sourceMappingURL=keyDefinitionEvent.service.js.map