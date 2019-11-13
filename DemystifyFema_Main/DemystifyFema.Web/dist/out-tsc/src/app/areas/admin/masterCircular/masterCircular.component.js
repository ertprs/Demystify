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
var masterCircular_1 = require("../../../model/masterCircular");
var masterCircular_service_1 = require("../../../service/admin/masterCircular.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var MasterCircularAdminComponent = /** @class */ (function () {
    function MasterCircularAdminComponent(formBuilder, toastr, activatedRoute, router, _masterCircularService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._masterCircularService = _masterCircularService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.masterCircularId = 0;
        this.searchText = '';
        this.isSubmited = false;
    }
    MasterCircularAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmMasterCircular = this.formBuilder.group({
            MasterCircularId: [''],
            MasterCircularName: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var masterCircularId = _this._global.decryptValue(params['masterCircularId']);
            if (masterCircularId) {
                _this.addUpdateText = "Update";
                _this.masterCircularId = parseInt(masterCircularId);
                _this.EditMasterCircular(parseInt(masterCircularId));
            }
            else {
                _this.addUpdateText = "Add";
            }
        });
    };
    MasterCircularAdminComponent.prototype.EditMasterCircular = function (masterCircularId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterCircularRequest = new masterCircular_1.GetMasterCircularRequest();
        getMasterCircularRequest.MasterCircularId = masterCircularId;
        getMasterCircularRequest.IsActive = null;
        this._masterCircularService.getMasterCircular(getMasterCircularRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.frmMasterCircular.setValue({
                MasterCircularId: masterCircularId,
                MasterCircularName: data.Response[0].MasterCircularName
            });
            _this.frmMasterCircular.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    MasterCircularAdminComponent.prototype.SaveMasterCircular = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.MasterCircularId) {
            this._masterCircularService.updateMasterCircular(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/mastercirculars']).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { enableHtml: true });
            });
        }
        else {
            this._masterCircularService.addMasterCircular(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/mastercirculars']).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    MasterCircularAdminComponent.prototype.OnSubmitMasterCircular = function (formData) {
        this.isSubmited = true;
        if (this.frmMasterCircular.valid) {
            this.SaveMasterCircular(formData);
        }
    };
    MasterCircularAdminComponent.prototype.CancelMasterCircular = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/mastercirculars']);
        });
    };
    MasterCircularAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './masterCircular.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, masterCircular_service_1.MasterCircularAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], MasterCircularAdminComponent);
    return MasterCircularAdminComponent;
}());
exports.MasterCircularAdminComponent = MasterCircularAdminComponent;
//# sourceMappingURL=masterCircular.component.js.map