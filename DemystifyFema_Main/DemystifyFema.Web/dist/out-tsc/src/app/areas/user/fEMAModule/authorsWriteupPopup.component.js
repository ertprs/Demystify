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
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var authorWriteUp_1 = require("../../../model/authorWriteUp");
var authorWriteUp_service_1 = require("../../../service/user/authorWriteUp.service");
var authorWriteUpDetail_1 = require("../../../model/authorWriteUpDetail");
var authorWriteUpDetail_service_1 = require("../../../service/user/authorWriteUpDetail.service");
var AuthorsWriteupPopupUserComponent = /** @class */ (function () {
    function AuthorsWriteupPopupUserComponent(_spinnerService, _toastrService, _authorWriteUpUserService, _authorWriteUpDetailUserService, sanitizer) {
        this._spinnerService = _spinnerService;
        this._toastrService = _toastrService;
        this._authorWriteUpUserService = _authorWriteUpUserService;
        this._authorWriteUpDetailUserService = _authorWriteUpDetailUserService;
        this.sanitizer = sanitizer;
        this.authorWriteUpPDFServerPath = global_1.Global.AUTHOR_WRITE_UP_PDF_FILEPATH;
        this.authorWriteUpDetailPDFServerPath = global_1.Global.AUTHOR_WRITE_UP_DETAIL_PDF_FILEPATH;
        this._global = new global_1.Global();
    }
    AuthorsWriteupPopupUserComponent.prototype.dialogInit = function (refernce, options) {
        this.fEMAModuleId = options.data;
        this.GetAuthorWriteUp(this.fEMAModuleId);
    };
    AuthorsWriteupPopupUserComponent.prototype.GetAuthorWriteUp = function (fEMAModuleId) {
        var _this = this;
        this._spinnerService.show();
        var getAuthorWriteUpRequest = new authorWriteUp_1.GetAuthorWriteUpRequest();
        getAuthorWriteUpRequest.TopicId = this.fEMAModuleId;
        getAuthorWriteUpRequest.IsPagingRequired = false;
        this._authorWriteUpUserService.getAuthorWriteUp(getAuthorWriteUpRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.authorWriteUp = new authorWriteUp_1.AuthorWriteUp();
                if (data.Response.length > 0) {
                    _this.authorWriteUp = data.Response[0];
                    var getAuthorWriteUpDetailRequest = new authorWriteUpDetail_1.GetAuthorWriteUpDetailRequest();
                    getAuthorWriteUpDetailRequest.AuthorWriteUpId = _this.authorWriteUp.AuthorWriteUpId;
                    getAuthorWriteUpDetailRequest.IsPagingRequired = false;
                    _this.GetAuthorWriteUpDetail(getAuthorWriteUpDetailRequest);
                }
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    AuthorsWriteupPopupUserComponent.prototype.GetAuthorWriteUpDetail = function (getAuthorWriteUpDetailRequest) {
        var _this = this;
        this._spinnerService.show();
        this._authorWriteUpDetailUserService.getAuthorWriteUpDetail(getAuthorWriteUpDetailRequest)
            .subscribe(function (data) {
            _this._spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.authorWriteUpDetails = data.Response;
                if (_this.authorWriteUpDetails.length > 0) {
                    _this.GetSelectedSubTopic(_this.authorWriteUpDetails[0].AuthorWriteUpDetailId);
                }
            }
            else {
                _this._toastrService.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_DETAIL_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this._spinnerService.hide();
            _this._toastrService.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_DETAIL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    AuthorsWriteupPopupUserComponent.prototype.GetSelectedSubTopic = function (authorWriteUpDetailId) {
        var authorWriteUpDetail = this.authorWriteUpDetails.filter(function (el) { return el.AuthorWriteUpDetailId == authorWriteUpDetailId; })[0];
        this.subTopicPDFUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this._global.getPDFPath(this.authorWriteUpDetailPDFServerPath + authorWriteUpDetail.PDF));
        var interval = setInterval(function () {
            var minusHeight = (document.querySelector('body').clientWidth > 480) ? 115 : 80;
            document.getElementById("iframe").style.height = (document.querySelector('.modal-body').clientHeight - minusHeight) + "px";
            clearInterval(interval);
        }, 100);
    };
    AuthorsWriteupPopupUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './authorsWriteupPopup.component.html'
        }),
        __metadata("design:paramtypes", [spinner_service_1.SpinnerService,
            ngx_toastr_1.ToastrService,
            authorWriteUp_service_1.AuthorWriteUpUserService,
            authorWriteUpDetail_service_1.AuthorWriteUpDetailUserService,
            platform_browser_1.DomSanitizer])
    ], AuthorsWriteupPopupUserComponent);
    return AuthorsWriteupPopupUserComponent;
}());
exports.AuthorsWriteupPopupUserComponent = AuthorsWriteupPopupUserComponent;
//# sourceMappingURL=authorsWriteupPopup.component.js.map