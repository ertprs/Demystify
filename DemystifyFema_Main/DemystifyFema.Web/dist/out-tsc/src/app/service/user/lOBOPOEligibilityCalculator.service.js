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
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/http");
var global_1 = require("../../common/global");
var ngx_cookie_service_1 = require("ngx-cookie-service");
var LOBOPOEligibilityUserService = /** @class */ (function () {
    function LOBOPOEligibilityUserService(_http, _cookieService) {
        this._http = _http;
        this._cookieService = _cookieService;
        this._global = new global_1.Global(this._cookieService);
    }
    LOBOPOEligibilityUserService.prototype.getLOBOPOEligibility = function (getLOBOPOEligibilityRequest) {
        var headers = new http_1.Headers({ 'Authorization': this._global.getUserToken() });
        var search = new http_1.URLSearchParams();
        search.set('NatureOfOfficeId', (getLOBOPOEligibilityRequest.NatureOfOfficeId != null) ? getLOBOPOEligibilityRequest.NatureOfOfficeId.toString() : null);
        search.set('LOBOPOEligibilityTypeId', (getLOBOPOEligibilityRequest.LOBOPOEligibilityTypeId != null) ? getLOBOPOEligibilityRequest.LOBOPOEligibilityTypeId.toString() : null);
        search.set('Question', getLOBOPOEligibilityRequest.Question);
        var requestOptions = new http_1.RequestOptions();
        requestOptions.headers = headers;
        requestOptions.search = search;
        return this._http.get(global_1.Global.API_SITE + "user/api/lobopoeligibilities", requestOptions)
            .pipe(operators_1.map(function (response) { return response.json(); }), operators_1.catchError(function (e) { return rxjs_1.throwError(e); }));
    };
    LOBOPOEligibilityUserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, ngx_cookie_service_1.CookieService])
    ], LOBOPOEligibilityUserService);
    return LOBOPOEligibilityUserService;
}());
exports.LOBOPOEligibilityUserService = LOBOPOEligibilityUserService;
//# sourceMappingURL=lOBOPOEligibilityCalculator.service.js.map