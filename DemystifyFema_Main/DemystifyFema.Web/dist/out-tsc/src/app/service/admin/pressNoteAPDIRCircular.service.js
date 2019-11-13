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
var PressNoteAPDIRCircularAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function PressNoteAPDIRCircularAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    PressNoteAPDIRCircularAdminService.prototype.getPressNoteAPDIRCircular = function (getPressNoteAPDIRCircularRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('PressNoteAPDIRCircularId', (getPressNoteAPDIRCircularRequest.PressNoteAPDIRCircularId != null) ? getPressNoteAPDIRCircularRequest.PressNoteAPDIRCircularId.toString() : null);
        //search.set('PressNoteId', (getPressNoteAPDIRCircularRequest.PressNoteId != null) ? getPressNoteAPDIRCircularRequest.PressNoteId.toString() : null);
        //search.set('SearchText', getPressNoteAPDIRCircularRequest.SearchText);
        //search.set('IsActive', (getPressNoteAPDIRCircularRequest.IsActive != null) ? getPressNoteAPDIRCircularRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getPressNoteAPDIRCircularRequest.PageNumber != null) ? getPressNoteAPDIRCircularRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getPressNoteAPDIRCircularRequest.PageSize != null) ? getPressNoteAPDIRCircularRequest.PageSize.toString() : null);
        //search.set('OrderBy', getPressNoteAPDIRCircularRequest.OrderBy);
        //search.set('OrderByDirection', getPressNoteAPDIRCircularRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/pressnoteapdircirculars", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            PressNoteAPDIRCircularId: (getPressNoteAPDIRCircularRequest.PressNoteAPDIRCircularId != null) ? getPressNoteAPDIRCircularRequest.PressNoteAPDIRCircularId.toString() : null,
            PressNoteId: (getPressNoteAPDIRCircularRequest.PressNoteId != null) ? getPressNoteAPDIRCircularRequest.PressNoteId.toString() : null,
            SearchText: getPressNoteAPDIRCircularRequest.SearchText,
            IsActive: (getPressNoteAPDIRCircularRequest.IsActive != null) ? getPressNoteAPDIRCircularRequest.IsActive.toString() : null,
            PageNumber: (getPressNoteAPDIRCircularRequest.PageNumber != null) ? getPressNoteAPDIRCircularRequest.PageNumber.toString() : null,
            PageSize: (getPressNoteAPDIRCircularRequest.PageSize != null) ? getPressNoteAPDIRCircularRequest.PageSize.toString() : null,
            OrderBy: getPressNoteAPDIRCircularRequest.OrderBy,
            OrderByDirection: getPressNoteAPDIRCircularRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/pressnoteapdircirculars", { params: params });
    };
    PressNoteAPDIRCircularAdminService.prototype.addPressNoteAPDIRCircular = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/pressnoteapdircirculars/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/pressnoteapdircirculars/add", body, { headers: headers });
    };
    PressNoteAPDIRCircularAdminService.prototype.updatePressNoteAPDIRCircular = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/pressnoteapdircirculars/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/pressnoteapdircirculars/update", body, { headers: headers });
    };
    PressNoteAPDIRCircularAdminService.prototype.deletePressNoteAPDIRCircular = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/pressnoteapdircirculars/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/pressnoteapdircirculars/delete", body, { headers: headers });
    };
    PressNoteAPDIRCircularAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], PressNoteAPDIRCircularAdminService);
    return PressNoteAPDIRCircularAdminService;
}());
exports.PressNoteAPDIRCircularAdminService = PressNoteAPDIRCircularAdminService;
//# sourceMappingURL=pressNoteAPDIRCircular.service.js.map