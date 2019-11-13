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
var fetersCode_1 = require("../../../model/fetersCode");
var fetersCode_service_1 = require("../../../service/user/fetersCode.service");
var FetersCodePopupUserComponent = /** @class */ (function () {
    function FetersCodePopupUserComponent(formBuilder, _spinnerService, _toastrService, _fetersCodeService, sanitizer) {
        this.formBuilder = formBuilder;
        this._spinnerService = _spinnerService;
        this._toastrService = _toastrService;
        this._fetersCodeService = _fetersCodeService;
        this.sanitizer = sanitizer;
        this.fetersCodes = [];
        this.fetersCodePDFServerPath = global_1.Global.FETERSCODE_PDF_FILEPATH;
        this._global = new global_1.Global();
    }
    FetersCodePopupUserComponent.prototype.dialogInit = function (refernce, options) {
        //this.frmGroupFetersCodeDetail = this.formBuilder.group({
        //    SearchText: [this.searchText]
        //});
        //this.frmLRSFetersCodeDetail = this.formBuilder.group({
        //    SearchText: [this.searchText]
        //});
        this.GetFetersCode();
    };
    FetersCodePopupUserComponent.prototype.GetFetersCode = function () {
        var _this = this;
        this._spinnerService.show();
        var getFetersCodeRequest = new fetersCode_1.GetFetersCodeRequest();
        this._fetersCodeService.getFetersCode(getFetersCodeRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fetersCodes = data.Response;
                if (data.Response.length > 0) {
                    _this.OnClickFetersCode(data.Response[0].FetersCodeId);
                }
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_NICCODE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    //SearchFetersCodeDetail(formData) {
    //    this.indexFetersCodeDetail = -1;
    //    this.itemDetailFetersCodeDetails.index = this.indexFetersCodeDetail;
    //    this.currentPage = 1;
    //    this.searchText = formData.value.SearchText;
    //    this.GetFetersCodeDetail(this.searchText, this.currentPage, this.pageSize);
    //}
    //OnPageChange(pageNumber: number) {
    //    this.currentPage = pageNumber;
    //    this.indexFetersCodeDetail = -1;
    //    this.itemDetailFetersCodeDetails.index = this.indexFetersCodeDetail;
    //    this.GetFetersCodeDetail(this.searchText, pageNumber, this.pageSize);
    //}
    //OnPageSizeChange() {
    //    this.currentPage = 1;
    //    this.GetFetersCodeDetail(this.searchText, null, this.pageSize);
    //}
    FetersCodePopupUserComponent.prototype.OnClickFetersCode = function (fetersCodeId) {
        this.moduleTab = fetersCodeId;
        this.fetersCodePDFUrl = "";
        //this.indexFetersCodeDetail = -1;
        //this.itemDetailFetersCodeDetails.index = this.indexFetersCodeDetail;
        //this.currentPage = 1;
        //this.searchText = "";
        //this.sortingFetersCodeDetailField = "";
        //this.sortingFetersCodeDetailDirection = "";
        //this.sortingFetersCodeGroupDetailField = "";
        //this.sortingFetersCodeGroupDetailDirection = "";
        var fetersCode = this.fetersCodes.filter(function (x) { return x.FetersCodeId == fetersCodeId; })[0];
        this.fetersCodePDFUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this._global.getPDFPath(this.fetersCodePDFServerPath + fetersCode.PDF));
        var interval = setInterval(function () {
            var minusHeight = (document.querySelector('body').clientWidth > 766) ? 140 : (document.querySelector('body').clientWidth > 480) ? 200 : (document.querySelector('body').clientWidth > 388) ? 170 : 225;
            document.getElementById(fetersCode.FetersCodeName).style.height = (document.querySelector('.modal-body').clientHeight - minusHeight) + "px";
            clearInterval(interval);
        }, 100);
        //if (fetersCode)
        //    this.GetFetersCodeDetail(this.searchText, this.currentPage, this.pageSize);
    };
    FetersCodePopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fetersCodePopup.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, spinner_service_1.SpinnerService, ngx_toastr_1.ToastrService, fetersCode_service_1.FetersCodeUserService, platform_browser_1.DomSanitizer])
    ], FetersCodePopupUserComponent);
    return FetersCodePopupUserComponent;
}());
exports.FetersCodePopupUserComponent = FetersCodePopupUserComponent;
//# sourceMappingURL=fetersCodePopup.component.js.map