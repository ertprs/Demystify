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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var spinner_service_1 = require("../../../service/common/spinner.service");
var subscription_service_1 = require("../../../service/user/subscription.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var endUserLicenseAggrement_1 = require("src/app/model/endUserLicenseAggrement");
var endUserLicenseAggrement_service_1 = require("../../../service/admin/endUserLicenseAggrement.service");
var LegalAggrementUserComponent = /** @class */ (function () {
    function LegalAggrementUserComponent(formBuilder, activatedRoute, spinnerService, toastr, router, _subscriptionService, _EULAService) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this.spinnerService = spinnerService;
        this.toastr = toastr;
        this.router = router;
        this._subscriptionService = _subscriptionService;
        this._EULAService = _EULAService;
        this.toogleBool = true;
        this._global = new global_1.Global();
    }
    LegalAggrementUserComponent.prototype.ngOnInit = function () {
        this.GetEndUserLicenseAggrement();
        this.frmLegalAggrement = this.formBuilder.group({
            LegalAggrement: [false, forms_1.Validators.required]
        });
    };
    LegalAggrementUserComponent.prototype.dialogInit = function (reference, options) {
        options.actionButtons = [{
                text: "x", buttonClass: "waves-effect ml-auto close-button pointer-cursor"
            }];
    };
    //----- Legal Aggreement Submit Event --------------------------------------------------//
    LegalAggrementUserComponent.prototype.LegalAgreement = function (formData) {
        var _this = this;
        this.errorMessage = "";
        if (formData.value.LegalAggrement) {
            this.spinnerService.show();
            var LegalAggrementValues = {
                "IsLegalAgreementAccepted": formData.value.LegalAggrement,
            };
            this._subscriptionService.userLegalAgreement(LegalAggrementValues)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.spinnerService.hide();
                    _this.CloseAgreementPopup();
                    _this.router.navigate(['user/secure/femamodules'], { queryParams: { fEMAModuleId: 1 } });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_REGISTER_TITLE, { closeButton: true });
                    _this.errorMessage = data.Description;
                    return;
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_LOGIN_TITLE, { enableHtml: true, closeButton: true });
                _this.errorMessage = global_1.Global.ERROR_MESSAGE;
                return;
            });
        }
    };
    //----- Legal Aggreement Check Box Change Event ----------------------------------------//
    LegalAggrementUserComponent.prototype.LegalAgreementchangeEvent = function (event) {
        if (event.target.checked) {
            this.toogleBool = false;
        }
        else {
            this.toogleBool = true;
        }
    };
    //----- Pop Up Close Event --------------------------------------------------------------//
    LegalAggrementUserComponent.prototype.CloseAgreementPopup = function () {
        var closeButton = document.querySelector(".close-button");
        if (closeButton)
            closeButton.click();
    };
    //----- Display End User Legal Aggrement Text ------------------------------------------//
    LegalAggrementUserComponent.prototype.GetEndUserLicenseAggrement = function () {
        var _this = this;
        this.spinnerService.show();
        var getEULARequest = new endUserLicenseAggrement_1.GetEULARequest();
        this._EULAService.getUser_EndUserLicenseAggrement(getEULARequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                var divEULA = document.getElementById('divEULA');
                if (data.Response.length > 0) {
                    divEULA.innerHTML = data.Response[0].EULA;
                }
                else {
                    divEULA.innerHTML = global_1.Global.TOASTR_ADMIN_NO_END_USER_LICENSE_AGGREMENT_FOUND;
                }
                _this.pageSize = getEULARequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_END_USER_LICENSE_AGGREMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_END_USER_LICENSE_AGGREMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    //----Display HTML Text to Plain Text ---------------------------------------------------//
    LegalAggrementUserComponent.prototype.htmlToPlaintext = function (text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
    LegalAggrementUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './legalAggrement.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            spinner_service_1.SpinnerService,
            ngx_toastr_1.ToastrService,
            router_1.Router,
            subscription_service_1.SubscriptionUserService,
            endUserLicenseAggrement_service_1.EndUserLicenseAggrementAdminService])
    ], LegalAggrementUserComponent);
    return LegalAggrementUserComponent;
}());
exports.LegalAggrementUserComponent = LegalAggrementUserComponent;
//# sourceMappingURL=legalAggrement.component.js.map