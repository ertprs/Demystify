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
var PressNoteAdminService = /** @class */ (function () {
    //constructor(private _http: Http) { }
    function PressNoteAdminService(_httpClient) {
        this._httpClient = _httpClient;
        this._global = new global_1.Global();
    }
    PressNoteAdminService.prototype.getPressNote = function (getPressNoteRequest) {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let search = new URLSearchParams();
        //search.set('PressNoteId', (getPressNoteRequest.PressNoteId != null) ? getPressNoteRequest.PressNoteId.toString() : null);
        //search.set('Year', getPressNoteRequest.Year);
        //search.set('SearchText', getPressNoteRequest.SearchText);
        //search.set('IsActive', (getPressNoteRequest.IsActive != null) ? getPressNoteRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getPressNoteRequest.PageNumber != null) ? getPressNoteRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getPressNoteRequest.PageSize != null) ? getPressNoteRequest.PageSize.toString() : null);
        //search.set('OrderBy', getPressNoteRequest.OrderBy);
        //search.set('OrderByDirection', getPressNoteRequest.OrderByDirection);
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;
        //return this._http.get(Global.API_SITE + "admin/api/pressnotes", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var params = http_params_1.createHttpParams({
            PressNoteId: (getPressNoteRequest.PressNoteId != null) ? getPressNoteRequest.PressNoteId.toString() : null,
            Year: getPressNoteRequest.Year,
            SearchText: getPressNoteRequest.SearchText,
            IsActive: (getPressNoteRequest.IsActive != null) ? getPressNoteRequest.IsActive.toString() : null,
            PageNumber: (getPressNoteRequest.PageNumber != null) ? getPressNoteRequest.PageNumber.toString() : null,
            PageSize: (getPressNoteRequest.PageSize != null) ? getPressNoteRequest.PageSize.toString() : null,
            OrderBy: getPressNoteRequest.OrderBy,
            OrderByDirection: getPressNoteRequest.OrderByDirection
        });
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/pressnotes", { params: params });
    };
    PressNoteAdminService.prototype.addPressNote = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/pressnotes/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/pressnotes/add", body, { headers: headers });
    };
    PressNoteAdminService.prototype.updatePressNote = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/pressnotes/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/pressnotes/update", body, { headers: headers });
    };
    PressNoteAdminService.prototype.deletePressNote = function (model) {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/pressnotes/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        var body = JSON.stringify(model);
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/pressnotes/delete", body, { headers: headers });
    };
    PressNoteAdminService.prototype.fileUpload = function (formData) {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.post(Global.API_SITE + "admin/api/pressnotes/uploadfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.post(global_1.Global.API_SITE + "admin/api/pressnotes/uploadfiles", formData);
    };
    PressNoteAdminService.prototype.getPressNoteYear = function () {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });
        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //return this._http.get(Global.API_SITE + "admin/api/pressnoteyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));
        return this._httpClient.get(global_1.Global.API_SITE + "admin/api/pressnoteyears");
    };
    PressNoteAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], PressNoteAdminService);
    return PressNoteAdminService;
}());
exports.PressNoteAdminService = PressNoteAdminService;
//# sourceMappingURL=pressNote.service.js.map