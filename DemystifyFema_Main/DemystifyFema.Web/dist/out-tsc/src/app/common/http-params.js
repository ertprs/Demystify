"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
function createHttpParams(params) {
    var httpParams = new http_1.HttpParams();
    Object.keys(params).forEach(function (param) {
        if (params[param]) {
            httpParams = httpParams.set(param, params[param]);
        }
    });
    return httpParams;
}
exports.createHttpParams = createHttpParams;
//# sourceMappingURL=http-params.js.map