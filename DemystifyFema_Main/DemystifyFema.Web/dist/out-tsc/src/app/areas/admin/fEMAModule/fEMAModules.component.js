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
var ngx_toastr_1 = require("ngx-toastr");
var commonField_1 = require("../../../model/commonField");
var fEMASubModuleOfModule_1 = require("../../../model/fEMASubModuleOfModule");
var commonField_service_1 = require("../../../service/common/commonField.service");
var fEMASubModuleOfModule_service_1 = require("../../../service/admin/fEMASubModuleOfModule.service");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var FEMAModulesAdminComponent = /** @class */ (function () {
    function FEMAModulesAdminComponent(formBuilder, activatedRoute, _commonFieldService, _fEMASubModuleOfModuleService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._commonFieldService = _commonFieldService;
        this._fEMASubModuleOfModuleService = _fEMASubModuleOfModuleService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
        this.itemDetailFEMAModule = { index: -1 };
        this.indexFEMAModule = -1;
    }
    FEMAModulesAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.indexFEMAModule = (params["indexFEMAModule"]) ? parseInt(params["indexFEMAModule"]) : -1;
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
        });
        this.frmFEMAModule = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetFEMAModule(this.searchText);
    };
    FEMAModulesAdminComponent.prototype.GetFEMAModule = function (searchText) {
        var _this = this;
        this.spinnerService.show();
        var getCommonFieldRequest = new commonField_1.GetCommonFieldRequest();
        getCommonFieldRequest.FieldTypeName = global_1.Global.COMMON_FIELD_FEMA_MODULE;
        getCommonFieldRequest.SearchText = searchText;
        this._commonFieldService.getCommonField(getCommonFieldRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fEMAModules = data.Response;
                _this.totalRecords = data.Response.length;
                if (_this.indexFEMAModule != -1 && _this.fEMAModules.length > 0) {
                    _this.itemDetailFEMAModule.index = _this.indexFEMAModule;
                    _this.GetFEMASubModuleOfModule(_this.itemDetailFEMAModule.index, _this.fEMAModules[_this.itemDetailFEMAModule.index].FieldId, true);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FEMAModulesAdminComponent.prototype.SearchFEMAModule = function (formData) {
        this.indexFEMAModule = -1;
        this.itemDetailFEMAModule.index = this.indexFEMAModule;
        this.ReloadPage(false);
        this.searchText = formData.value.SearchText;
        this.GetFEMAModule(this.searchText);
    };
    FEMAModulesAdminComponent.prototype.AddFEMASubModuleOfModule = function (fEMAModuleId) {
        this.router.navigate(['/admin/secure/femamodule/' + this._global.encryptValue(fEMAModuleId)], {
            queryParams: {
                indexFEMAModule: this.indexFEMAModule, searchText: this.searchText
            }
        });
    };
    FEMAModulesAdminComponent.prototype.EditFEMASubModuleOfModule = function (fEMAModuleId, fEMASubModuleOfModuleId) {
        this.router.navigate(['/admin/secure/femamodule/' + this._global.encryptValue(fEMAModuleId) + '/' + this._global.encryptValue(fEMASubModuleOfModuleId)], {
            queryParams: {
                indexFEMAModule: this.indexFEMAModule, searchText: this.searchText
            }
        });
    };
    FEMAModulesAdminComponent.prototype.DeleteFEMASubModuleOfModule = function (fEMAModuleId, fEMASubModuleOfModuleId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteFEMASubModuleOfModule = {
                "FEMASubModuleOfModuleId": fEMASubModuleOfModuleId
            };
            this._fEMASubModuleOfModuleService.deleteFEMASubModuleOfModule(deleteFEMASubModuleOfModule)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { closeButton: true });
                    _this.GetFEMASubModuleOfModule(_this.itemDetailFEMAModule.index, fEMAModuleId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FEMAModulesAdminComponent.prototype.UpDownFEMAModuleArrow = function (index) {
        if (index === this.itemDetailFEMAModule.index) {
            this.itemDetailFEMAModule.index = null;
        }
        else {
            this.itemDetailFEMAModule.index = index;
        }
    };
    FEMAModulesAdminComponent.prototype.GetFEMASubModuleOfModule = function (index, fEMAModuleId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getFEMASubModuleOfModuleRequest = new fEMASubModuleOfModule_1.GetFEMASubModuleOfModuleRequest();
        getFEMASubModuleOfModuleRequest.FEMAModuleId = fEMAModuleId;
        this._fEMASubModuleOfModuleService.getFEMASubModuleOfModule(getFEMASubModuleOfModuleRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fEMASubModuleOfModules = data.Response;
                if (isDeleted != true) {
                    _this.UpDownFEMAModuleArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FEMAModulesAdminComponent.prototype.ShowFEMASubModuleOfModule = function (index, fEMAModuleId) {
        this.indexFEMAModule = -1;
        if (this.itemDetailFEMAModule.index !== index) {
            if (fEMAModuleId) {
                this.indexFEMAModule = index;
                this.GetFEMASubModuleOfModule(index, fEMAModuleId, false);
            }
        }
        else {
            this.UpDownFEMAModuleArrow(index);
        }
        this.ReloadPage(false);
    };
    FEMAModulesAdminComponent.prototype.ReloadPage = function (isPageChange) {
        if (isPageChange == true) {
            this.indexFEMAModule = -1;
            this.itemDetailFEMAModule.index = this.indexFEMAModule;
        }
        this.router.navigate(['/admin/secure/femamodules'], {
            queryParams: {
                indexFEMAModule: this.indexFEMAModule, searchText: this.searchText
            }
        });
    };
    FEMAModulesAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fEMAModules.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, commonField_service_1.CommonFieldService, fEMASubModuleOfModule_service_1.FEMASubModuleOfModuleAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], FEMAModulesAdminComponent);
    return FEMAModulesAdminComponent;
}());
exports.FEMAModulesAdminComponent = FEMAModulesAdminComponent;
//# sourceMappingURL=fEMAModules.component.js.map