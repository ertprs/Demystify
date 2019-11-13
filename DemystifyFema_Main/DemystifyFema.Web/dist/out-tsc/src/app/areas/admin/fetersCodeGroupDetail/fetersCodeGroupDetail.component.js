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
var fetersCodeGroupDetail_1 = require("../../../model/fetersCodeGroupDetail");
var fetersCodeDetail_1 = require("../../../model/fetersCodeDetail");
var fetersCode_1 = require("../../../model/fetersCode");
var fetersCodeGroupDetail_service_1 = require("../../../service/admin/fetersCodeGroupDetail.service");
var fetersCodeDetail_service_1 = require("../../../service/admin/fetersCodeDetail.service");
var fetersCode_service_1 = require("../../../service/admin/fetersCode.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var FetersCodeGroupDetailAdminComponent = /** @class */ (function () {
    function FetersCodeGroupDetailAdminComponent(formBuilder, toastr, activatedRoute, router, _fetersCodeGroupDetailService, _fetersCodeDetailService, _fetersCodeService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._fetersCodeGroupDetailService = _fetersCodeGroupDetailService;
        this._fetersCodeDetailService = _fetersCodeDetailService;
        this._fetersCodeService = _fetersCodeService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.fetersCodeDetail = new fetersCodeDetail_1.FetersCodeDetail();
        this.fetersCode = new fetersCode_1.FetersCode();
        this.fetersCodeGroupDetailId = 0;
        this.isSubmited = false;
        this.pdfServerPath = global_1.Global.FETERSCODE_PDF_FILEPATH;
    }
    FetersCodeGroupDetailAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var fetersCodeId = _this._global.decryptValue(params['fetersCodeId']);
            var fetersCodeDetailId = _this._global.decryptValue(params['fetersCodeDetailId']);
            var fetersCodeGroupDetailId = _this._global.decryptValue(params['fetersCodeGroupDetailId']);
            _this.fetersCodeId = parseInt(fetersCodeId);
            _this.fetersCodeDetailId = parseInt(fetersCodeDetailId);
            if (fetersCodeId && fetersCodeDetailId) {
                _this.GetFetersCode(_this.fetersCodeId);
                _this.GetFetersCodeDetail(_this.fetersCodeDetailId);
                if (fetersCodeGroupDetailId) {
                    _this.addUpdateText = "Update";
                    _this.fetersCodeGroupDetailId = parseInt(fetersCodeGroupDetailId);
                    _this.EditFetersCodeGroupDetail(parseInt(fetersCodeGroupDetailId));
                }
                else {
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/feterscodes'], {
                        queryParams: {
                            indexFetersCode: params["indexFetersCode"], indexFetersCodeDetail: params["indexFetersCodeDetail"], sortingFetersCodeField: params["sortingFetersCodeField"], sortingFetersCodeDirection: params["sortingFetersCodeDirection"], sortingFetersCodeDetailField: params["sortingFetersCodeDetailField"], sortingFetersCodeDetailDirection: params["sortingFetersCodeDetailDirection"], sortingFetersCodeGroupDetailField: params["sortingFetersCodeGroupDetailField"], sortingFetersCodeGroupDetailDirection: params["sortingFetersCodeGroupDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
        this.frmFetersCodeGroupDetail = this.formBuilder.group({
            FetersCodeGroupDetailId: [''],
            FetersCodeDetailId: [this.fetersCodeDetailId],
            PurposeCode: ['', forms_1.Validators.required],
            Description: ['', forms_1.Validators.required]
        });
    };
    FetersCodeGroupDetailAdminComponent.prototype.GetFetersCode = function (fetersCodeId) {
        var _this = this;
        this.spinnerService.show();
        var getFetersCodeRequest = new fetersCode_1.GetFetersCodeRequest();
        getFetersCodeRequest.FetersCodeId = fetersCodeId;
        getFetersCodeRequest.IsActive = null;
        this._fetersCodeService.getFetersCode(getFetersCodeRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fetersCode = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    FetersCodeGroupDetailAdminComponent.prototype.GetFetersCodeDetail = function (fetersCodeDetailId) {
        var _this = this;
        this.spinnerService.show();
        var getFetersCodeDetailRequest = new fetersCodeDetail_1.GetFetersCodeDetailRequest();
        getFetersCodeDetailRequest.FetersCodeDetailId = fetersCodeDetailId;
        getFetersCodeDetailRequest.IsActive = null;
        this._fetersCodeDetailService.getFetersCodeDetail(getFetersCodeDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fetersCodeDetail = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    FetersCodeGroupDetailAdminComponent.prototype.EditFetersCodeGroupDetail = function (fetersCodeGroupDetailId) {
        var _this = this;
        this.spinnerService.show();
        var getFetersCodeGroupDetailRequest = new fetersCodeGroupDetail_1.GetFetersCodeGroupDetailRequest();
        getFetersCodeGroupDetailRequest.FetersCodeGroupDetailId = fetersCodeGroupDetailId;
        getFetersCodeGroupDetailRequest.IsActive = null;
        this._fetersCodeGroupDetailService.getFetersCodeGroupDetail(getFetersCodeGroupDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.frmFetersCodeGroupDetail.setValue({
                FetersCodeGroupDetailId: fetersCodeGroupDetailId,
                FetersCodeDetailId: data.Response[0].FetersCodeDetailId,
                PurposeCode: data.Response[0].PurposeCode,
                Description: data.Response[0].Description
            });
            _this.frmFetersCodeGroupDetail.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    FetersCodeGroupDetailAdminComponent.prototype.SaveFetersCodeGroupDetail = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.FetersCodeGroupDetailId) {
            this._fetersCodeGroupDetailService.updateFetersCodeGroupDetail(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/feterscodes'], {
                            queryParams: {
                                indexFetersCode: params["indexFetersCode"], indexFetersCodeDetail: params["indexFetersCodeDetail"], sortingFetersCodeField: params["sortingFetersCodeField"], sortingFetersCodeDirection: params["sortingFetersCodeDirection"], sortingFetersCodeDetailField: params["sortingFetersCodeDetailField"], sortingFetersCodeDetailDirection: params["sortingFetersCodeDetailDirection"], sortingFetersCodeGroupDetailField: params["sortingFetersCodeGroupDetailField"], sortingFetersCodeGroupDetailDirection: params["sortingFetersCodeGroupDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_GROUP_DETAIL_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_GROUP_DETAIL_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FETERSCODE_GROUP_DETAIL_TITLE, { enableHtml: true });
            });
        }
        else {
            this._fetersCodeGroupDetailService.addFetersCodeGroupDetail(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/feterscodes'], {
                            queryParams: {
                                indexFetersCode: params["indexFetersCode"], indexFetersCodeDetail: params["indexFetersCodeDetail"], sortingFetersCodeField: params["sortingFetersCodeField"], sortingFetersCodeDirection: params["sortingFetersCodeDirection"], sortingFetersCodeDetailField: params["sortingFetersCodeDetailField"], sortingFetersCodeDetailDirection: params["sortingFetersCodeDetailDirection"], sortingFetersCodeGroupDetailField: params["sortingFetersCodeGroupDetailField"], sortingFetersCodeGroupDetailDirection: params["sortingFetersCodeGroupDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_GROUP_DETAIL_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_GROUP_DETAIL_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FETERSCODE_GROUP_DETAIL_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FetersCodeGroupDetailAdminComponent.prototype.OnSubmitFetersCodeGroupDetail = function (formData) {
        this.isSubmited = true;
        if (this.frmFetersCodeGroupDetail.valid) {
            this.SaveFetersCodeGroupDetail(formData);
        }
    };
    FetersCodeGroupDetailAdminComponent.prototype.CancelFetersCodeGroupDetail = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/feterscodes'], {
                queryParams: {
                    indexFetersCode: params["indexFetersCode"], indexFetersCodeDetail: params["indexFetersCodeDetail"], sortingFetersCodeField: params["sortingFetersCodeField"], sortingFetersCodeDirection: params["sortingFetersCodeDirection"], sortingFetersCodeDetailField: params["sortingFetersCodeDetailField"], sortingFetersCodeDetailDirection: params["sortingFetersCodeDetailDirection"], sortingFetersCodeGroupDetailField: params["sortingFetersCodeGroupDetailField"], sortingFetersCodeGroupDetailDirection: params["sortingFetersCodeGroupDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    FetersCodeGroupDetailAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fetersCodeGroupDetail.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, fetersCodeGroupDetail_service_1.FetersCodeGroupDetailAdminService, fetersCodeDetail_service_1.FetersCodeDetailAdminService, fetersCode_service_1.FetersCodeAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], FetersCodeGroupDetailAdminComponent);
    return FetersCodeGroupDetailAdminComponent;
}());
exports.FetersCodeGroupDetailAdminComponent = FetersCodeGroupDetailAdminComponent;
//# sourceMappingURL=fetersCodeGroupDetail.component.js.map