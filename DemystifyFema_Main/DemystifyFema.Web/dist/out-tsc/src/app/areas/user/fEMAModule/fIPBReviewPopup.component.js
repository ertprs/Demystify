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
var fIPBReview_1 = require("../../../model/fIPBReview");
var dIPPClarification_1 = require("../../../model/dIPPClarification");
var fIPBPressReleaseCase_1 = require("../../../model/fIPBPressReleaseCase");
var fIPBReview_service_1 = require("../../../service/user/fIPBReview.service");
var dIPPClarification_service_1 = require("../../../service/user/dIPPClarification.service");
var fIPBPressReleaseCase_service_1 = require("../../../service/user/fIPBPressReleaseCase.service");
var FIPBReviewPopupUserComponent = /** @class */ (function () {
    function FIPBReviewPopupUserComponent(formBuilder, _spinnerService, _toastrService, _fIPBReviewService, _dIPPClarificationService, _fIPBPressReleaseCaseService, sanitizer) {
        this.formBuilder = formBuilder;
        this._spinnerService = _spinnerService;
        this._toastrService = _toastrService;
        this._fIPBReviewService = _fIPBReviewService;
        this._dIPPClarificationService = _dIPPClarificationService;
        this._fIPBPressReleaseCaseService = _fIPBPressReleaseCaseService;
        this.sanitizer = sanitizer;
        this.fIPBReviews = [];
        this.dIPPClarifications = [];
        this.fIPBPressReleaseCases = [];
        this.fIPBReviewPDFServerPath = global_1.Global.FIPBREVIEW_PDF_FILEPATH;
        this.dIPPClarificationPDFServerPath = global_1.Global.DIPPCLARIFICATION_PDF_FILEPATH;
        this.fIPBPressReleaseCasePDFServerPath = global_1.Global.FIPB_PRESS_RELEASE_CASE_PDF_FILEPATH;
        this._global = new global_1.Global();
    }
    FIPBReviewPopupUserComponent.prototype.dialogInit = function (refernce, options) {
        this.OnClickModuleTab('fipbReview');
    };
    FIPBReviewPopupUserComponent.prototype.GetFIPBReview = function () {
        var _this = this;
        this._spinnerService.show();
        var getFIPBReviewRequest = new fIPBReview_1.GetFIPBReviewRequest();
        this._fIPBReviewService.getFIPBReview(getFIPBReviewRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fIPBReviews = data.Response;
                if (_this.fIPBReviews.length > 0)
                    _this.OnChangeFIPBReview(data.Response[0].FIPBReviewId);
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_FIPBREVIEW_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FIPBREVIEW_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FIPBReviewPopupUserComponent.prototype.OnChangeFIPBReview = function (fIPBReviewId) {
        var fIPBReviewDetail = this.fIPBReviews.filter(function (el) { return el.FIPBReviewId == fIPBReviewId; })[0];
        this.fIPBReviewPDFUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this._global.getPDFPath(this.fIPBReviewPDFServerPath + fIPBReviewDetail.PDF));
        var interval = setInterval(function () {
            var minusHeight = (document.querySelector('body').clientWidth > 766) ? 170 : (document.querySelector('body').clientWidth > 480) ? 255 : 220;
            document.getElementById("iframe1").style.height = (document.querySelector('.modal-body').clientHeight - minusHeight) + "px";
            clearInterval(interval);
        }, 100);
    };
    FIPBReviewPopupUserComponent.prototype.GetDIPPClarification = function () {
        var _this = this;
        this._spinnerService.show();
        var getDIPPClarificationRequest = new dIPPClarification_1.GetDIPPClarificationRequest();
        this._dIPPClarificationService.getDIPPClarification(getDIPPClarificationRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.dIPPClarifications = data.Response;
                if (_this.dIPPClarifications.length > 0)
                    _this.OnChangeDIPPClarification(data.Response[0].DIPPClarificationId);
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_DIPPCLARIFICATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_DIPPCLARIFICATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FIPBReviewPopupUserComponent.prototype.OnChangeDIPPClarification = function (dIPPClarificationId) {
        var dIPPClarificationDetail = this.dIPPClarifications.filter(function (el) { return el.DIPPClarificationId == dIPPClarificationId; })[0];
        this.dIPPClarificationPDFUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this._global.getPDFPath(this.dIPPClarificationPDFServerPath + dIPPClarificationDetail.PDF));
        var interval = setInterval(function () {
            var minusHeight = (document.querySelector('body').clientWidth > 766) ? 170 : (document.querySelector('body').clientWidth > 480) ? 255 : 220;
            document.getElementById("iframe2").style.height = (document.querySelector('.modal-body').clientHeight - minusHeight) + "px";
            clearInterval(interval);
        }, 100);
    };
    FIPBReviewPopupUserComponent.prototype.GetFIPBPressReleaseCase = function () {
        var _this = this;
        this._spinnerService.show();
        var getFIPBPressReleaseCaseRequest = new fIPBPressReleaseCase_1.GetFIPBPressReleaseCaseRequest();
        this._fIPBPressReleaseCaseService.getFIPBPressReleaseCase(getFIPBPressReleaseCaseRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fIPBPressReleaseCases = data.Response;
                if (_this.fIPBPressReleaseCases.length > 0)
                    _this.OnChangeFIPBPressReleaseCase(data.Response[0].FIPBPressReleaseCaseId);
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_FIPB_PRESS_RELEASE_CASE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FIPB_PRESS_RELEASE_CASE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FIPBReviewPopupUserComponent.prototype.OnChangeFIPBPressReleaseCase = function (fIPBPressReleaseCaseId) {
        var fIPBPressReleaseCaseDetail = this.fIPBPressReleaseCases.filter(function (el) { return el.FIPBPressReleaseCaseId == fIPBPressReleaseCaseId; })[0];
        this.fIPBPressReleaseCasePDFUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this._global.getPDFPath(this.fIPBPressReleaseCasePDFServerPath + fIPBPressReleaseCaseDetail.PDF));
        var interval = setInterval(function () {
            var minusHeight = (document.querySelector('body').clientWidth > 766) ? 170 : (document.querySelector('body').clientWidth > 480) ? 255 : 220;
            document.getElementById("iframe3").style.height = (document.querySelector('.modal-body').clientHeight - minusHeight) + "px";
            clearInterval(interval);
        }, 100);
    };
    FIPBReviewPopupUserComponent.prototype.OnClickModuleTab = function (moduleTab) {
        this.moduleTab = moduleTab;
        if (moduleTab == "fipbReview") {
            this.GetFIPBReview();
        }
        else if (moduleTab == "clarifications") {
            this.GetDIPPClarification();
        }
        else if (moduleTab == "fipbPressReleaseCase") {
            this.GetFIPBPressReleaseCase();
        }
    };
    FIPBReviewPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fIPBReviewPopup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            spinner_service_1.SpinnerService,
            ngx_toastr_1.ToastrService,
            fIPBReview_service_1.FIPBReviewUserService,
            dIPPClarification_service_1.DIPPClarificationUserService,
            fIPBPressReleaseCase_service_1.FIPBPressReleaseCaseUserService,
            platform_browser_1.DomSanitizer])
    ], FIPBReviewPopupUserComponent);
    return FIPBReviewPopupUserComponent;
}());
exports.FIPBReviewPopupUserComponent = FIPBReviewPopupUserComponent;
//# sourceMappingURL=fIPBReviewPopup.component.js.map