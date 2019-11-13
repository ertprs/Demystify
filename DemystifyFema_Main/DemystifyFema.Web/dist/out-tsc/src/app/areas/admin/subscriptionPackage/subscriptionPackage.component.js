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
var subscriptionPackage_1 = require("../../../model/subscriptionPackage");
var subscriptionPackage_service_1 = require("../../../service/admin/subscriptionPackage.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var SubscriptionPackageAdminComponent = /** @class */ (function () {
    function SubscriptionPackageAdminComponent(formBuilder, toastr, activatedRoute, router, _subscriptionPackageService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._subscriptionPackageService = _subscriptionPackageService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.PackageId = 0;
        this.searchText = '';
        this.isSubmited = false;
    }
    SubscriptionPackageAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var PackageId = _this._global.decryptValue(params['PackageId']);
            if (PackageId) {
                _this.addUpdateText = "Update";
                _this.PackageId = parseInt(PackageId);
                _this.EditSubscriptionPackage(parseInt(PackageId));
            }
            else {
                _this.addUpdateText = "Add";
            }
        });
        this.frmSubscriptionPackage = this.formBuilder.group({
            PackageId: [''],
            PackageName: ['', forms_1.Validators.required],
            PackageAmount: ['', forms_1.Validators.required],
            PackageDetail: ['', forms_1.Validators.required]
        });
    };
    SubscriptionPackageAdminComponent.prototype.EditSubscriptionPackage = function (PackageId) {
        var _this = this;
        this.spinnerService.show();
        var getSubPackageRequest = new subscriptionPackage_1.GetSubscriptionPackageRequest();
        getSubPackageRequest.PackageId = PackageId;
        getSubPackageRequest.IsActive = null;
        this._subscriptionPackageService.getSubscriptionPackage(getSubPackageRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.frmSubscriptionPackage.setValue({
                PackageId: PackageId,
                PackageName: data.Response[0].PackageName,
                PackageAmount: data.Response[0].PackageAmount,
                PackageDetail: data.Response[0].PackageDetail,
            });
            _this.frmSubscriptionPackage.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    SubscriptionPackageAdminComponent.prototype.numberOnly = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    };
    SubscriptionPackageAdminComponent.prototype.ClearSubscriptionPackageDate = function () {
        this.frmSubscriptionPackage.updateValueAndValidity();
    };
    SubscriptionPackageAdminComponent.prototype.OnSubmitSubscriptionPackage = function (formData) {
        this.isSubmited = true;
        if (this.frmSubscriptionPackage.valid) {
            this.spinnerService.show();
            this.SaveSubscriptionPackage(formData);
            this.spinnerService.hide();
        }
    };
    SubscriptionPackageAdminComponent.prototype.SaveSubscriptionPackage = function (formData) {
        var _this = this;
        formData.value.PackageName = formData.value.PackageName;
        formData.value.PackageAmount = (formData.value.PackageAmount != null) ? formData.value.PackageAmount : 0;
        formData.value.PackageDetail = formData.value.PackageDetail;
        ;
        if (formData.value.PackageId) {
            this._subscriptionPackageService.updateSubscriptionPackage(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/subscriptionPackages']).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SUBSCRIPTIONPACKAGE_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUBSCRIPTIONPACKAGE_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUBSCRIPTIONPACKAGE_TITLE, { enableHtml: true });
            });
        }
        else {
            this._subscriptionPackageService.addSubscriptionPackage(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/subscriptionPackages']).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SUBSCRIPTIONPACKAGE_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUBSCRIPTIONPACKAGE_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUBSCRIPTIONPACKAGE_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    SubscriptionPackageAdminComponent.prototype.CancelSubscriptionPackage = function () {
        this.router.navigate(['/admin/secure/subscriptionPackages']);
    };
    SubscriptionPackageAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './subscriptionPackage.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            subscriptionPackage_service_1.SubscriptionPackageAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService])
    ], SubscriptionPackageAdminComponent);
    return SubscriptionPackageAdminComponent;
}());
exports.SubscriptionPackageAdminComponent = SubscriptionPackageAdminComponent;
//# sourceMappingURL=subscriptionPackage.component.js.map