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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var fAQ_1 = require("../../../model/fAQ");
var rBIFAQOfFEMASubModuleDetail_1 = require("../../../model/rBIFAQOfFEMASubModuleDetail");
var fAQ_service_1 = require("../../../service/user/fAQ.service");
var rBIFAQOfFEMASubModuleDetail_service_1 = require("../../../service/user/rBIFAQOfFEMASubModuleDetail.service");
var RBIDIPPFAQPopupUserComponent = /** @class */ (function () {
    function RBIDIPPFAQPopupUserComponent(formBuilder, _spinnerService, _toastrService, _fAQUserService, _rBIFAQOfFEMASubModuleDetailUserService, _sanitizer) {
        this.formBuilder = formBuilder;
        this._spinnerService = _spinnerService;
        this._toastrService = _toastrService;
        this._fAQUserService = _fAQUserService;
        this._rBIFAQOfFEMASubModuleDetailUserService = _rBIFAQOfFEMASubModuleDetailUserService;
        this._sanitizer = _sanitizer;
        this.rBIFAQ = [];
        this.dIPPFAQ = [];
        this.fAQPDFServerPath = global_1.Global.FAQ_PDF_FILEPATH;
        this.moduleTab = 'rbifaq';
    }
    RBIDIPPFAQPopupUserComponent.prototype.dialogInit = function (refernce, options) {
        this.fEMAModuleId = options.data;
        this.GetRBIFAQ(this.fEMAModuleId);
    };
    RBIDIPPFAQPopupUserComponent.prototype.OnClickModuleTab = function (moduleTab) {
        this.moduleTab = moduleTab;
        if (moduleTab == "rbifaq") {
            this.GetRBIFAQ(this.fEMAModuleId);
        }
        else if (moduleTab == "dippfaq") {
            this.GetFAQ();
        }
    };
    RBIDIPPFAQPopupUserComponent.prototype.GetRBIFAQ = function (fEMAModuleId) {
        var _this = this;
        this._spinnerService.show();
        var getRBIFAQOfFEMASubModuleDetailRequest = new rBIFAQOfFEMASubModuleDetail_1.GetRBIFAQOfFEMASubModuleDetailRequest();
        getRBIFAQOfFEMASubModuleDetailRequest.FEMASubModuleOfModuleId = fEMAModuleId;
        this._rBIFAQOfFEMASubModuleDetailUserService.getRBIFAQOfFEMASubModuleDetail(getRBIFAQOfFEMASubModuleDetailRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rBIFAQ = data.Response;
                if (_this.rBIFAQ.length > 0)
                    _this.OnChangeRBIFAQ(_this.rBIFAQ[0].FAQId);
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { enableHtml: true, closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RBIDIPPFAQPopupUserComponent.prototype.OnChangeRBIFAQ = function (fAQId) {
        var rBIFAQDetail = this.rBIFAQ.filter(function (el) { return el.FAQId == fAQId; })[0];
        this.rBIFAQPDFUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.fAQPDFServerPath + rBIFAQDetail.PDF);
    };
    RBIDIPPFAQPopupUserComponent.prototype.GetFAQ = function () {
        var _this = this;
        this._spinnerService.show();
        var getFAQRequest = new fAQ_1.GetFAQRequest();
        this._fAQUserService.getFAQ(getFAQRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            _this.dIPPFAQ = data.Response.filter(function (x) { return x.CategoryName == "DIPP FAQs"; });
            if (_this.dIPPFAQ.length > 0)
                _this.OnChangeDIPPFAQ(_this.dIPPFAQ[0].FAQId);
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FAQ_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RBIDIPPFAQPopupUserComponent.prototype.OnChangeDIPPFAQ = function (fAQId) {
        var dIPPFAQDetail = this.dIPPFAQ.filter(function (el) { return el.FAQId == fAQId; })[0];
        this.dIPPFAQPDFUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.fAQPDFServerPath + dIPPFAQDetail.PDF);
    };
    RBIDIPPFAQPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './rBIDIPPFAQPopup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            spinner_service_1.SpinnerService,
            ngx_toastr_1.ToastrService,
            fAQ_service_1.FAQUserService,
            rBIFAQOfFEMASubModuleDetail_service_1.RBIFAQOfFEMASubModuleDetailUserService,
            platform_browser_1.DomSanitizer])
    ], RBIDIPPFAQPopupUserComponent);
    return RBIDIPPFAQPopupUserComponent;
}());
exports.RBIDIPPFAQPopupUserComponent = RBIDIPPFAQPopupUserComponent;
//# sourceMappingURL=rBIDIPPFAQPopup.component.js.map