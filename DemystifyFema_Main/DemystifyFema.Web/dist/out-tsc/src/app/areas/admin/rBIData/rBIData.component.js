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
var rBIData_1 = require("../../../model/rBIData");
var rBIData_service_1 = require("../../../service/admin/rBIData.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var RBIDataAdminComponent = /** @class */ (function () {
    function RBIDataAdminComponent(formBuilder, toastr, activatedRoute, router, _rBIDataService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._rBIDataService = _rBIDataService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.rBIDataId = 0;
        this.searchText = '';
        this.rBIDataNames = [];
        this.excelServerPath = global_1.Global.RBIDATA_EXCEL_FILEPATH;
        this.isSubmited = false;
    }
    RBIDataAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmRBIData = this.formBuilder.group({
            RBIDataId: [''],
            RBIDataName: ['', forms_1.Validators.required],
            Excel: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var rBIDataId = _this._global.decryptValue(params['rBIDataId']);
            if (rBIDataId) {
                _this.addUpdateText = "Update";
                _this.rBIDataId = parseInt(rBIDataId);
                _this.EditRBIData(parseInt(rBIDataId));
            }
            else {
                _this.GetRBIDataName(null);
                _this.addUpdateText = "Add";
            }
        });
    };
    RBIDataAdminComponent.prototype.GetRBIDataName = function (rBIData) {
        var _this = this;
        this.rBIDataNames.push({ Value: null, Text: "--Select--" });
        this._global.getRBIDataName().forEach(function (item) {
            _this.rBIDataNames.push({ Value: item, Text: item });
        });
        this.frmRBIData.get("RBIDataName").setValue((rBIData != null) ? rBIData.RBIDataName : rBIData);
        this.frmRBIData.updateValueAndValidity();
    };
    RBIDataAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/vnd.ms-excel" || this.files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            this.frmRBIData.get('Excel').setValue(this.files[0].name);
            this.frmRBIData.updateValueAndValidity();
        }
        else {
            this.frmRBIData.get('Excel').setValue(null);
            this.frmRBIData.updateValueAndValidity();
            this.toastr.error("Please upload proper excel file.", global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { closeButton: true });
        }
    };
    RBIDataAdminComponent.prototype.EditRBIData = function (rBIDataId) {
        var _this = this;
        this.spinnerService.show();
        var getRBIDataRequest = new rBIData_1.GetRBIDataRequest();
        getRBIDataRequest.RBIDataId = rBIDataId;
        getRBIDataRequest.IsActive = null;
        this._rBIDataService.getRBIData(getRBIDataRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.rBIDataExcelName = data.Response[0].Excel;
            _this.GetRBIDataName(data.Response[0].RBIDataName);
            _this.frmRBIData.setValue({
                RBIDataId: rBIDataId,
                RBIDataName: data.Response[0].RBIDataName,
                Excel: data.Response[0].Excel
            });
            _this.frmRBIData.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    RBIDataAdminComponent.prototype.SaveRBIData = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.RBIDataId) {
            this._rBIDataService.updateRBIData(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/rbidatas'], {
                            queryParams: {
                                indexRBIData: params["indexRBIData"], sortingRBIDataField: params["sortingRBIDataField"], sortingRBIDataDirection: params["sortingRBIDataDirection"], sortingRBIDataDetailField: params["sortingRBIDataDetailField"], sortingRBIDataDetailDirection: params["sortingRBIDataDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { enableHtml: true });
            });
        }
        else {
            this._rBIDataService.addRBIData(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/rbidatas'], {
                            queryParams: {
                                indexRBIData: params["indexRBIData"], sortingRBIDataField: params["sortingRBIDataField"], sortingRBIDataDirection: params["sortingRBIDataDirection"], sortingRBIDataDetailField: params["sortingRBIDataDetailField"], sortingRBIDataDetailDirection: params["sortingRBIDataDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RBIDataAdminComponent.prototype.OnSubmitRBIData = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmRBIData.valid) {
            this.spinnerService.show();
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._rBIDataService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmRBIData.get('Excel').setValue(response.Response);
                        _this.frmRBIData.updateValueAndValidity();
                        formData.value.Excel = response.Response;
                        _this.files = null;
                        _this.SaveRBIData(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.Excel) {
                    this.SaveRBIData(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    RBIDataAdminComponent.prototype.CancelRBIData = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/rbidatas'], {
                queryParams: {
                    indexRBIData: params["indexRBIData"], sortingRBIDataField: params["sortingRBIDataField"], sortingRBIDataDirection: params["sortingRBIDataDirection"], sortingRBIDataDetailField: params["sortingRBIDataDetailField"], sortingRBIDataDetailDirection: params["sortingRBIDataDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    RBIDataAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './rBIData.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, rBIData_service_1.RBIDataAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], RBIDataAdminComponent);
    return RBIDataAdminComponent;
}());
exports.RBIDataAdminComponent = RBIDataAdminComponent;
//# sourceMappingURL=rBIData.component.js.map