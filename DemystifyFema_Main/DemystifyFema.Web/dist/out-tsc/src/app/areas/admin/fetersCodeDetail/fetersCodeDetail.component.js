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
var fetersCodeDetail_1 = require("../../../model/fetersCodeDetail");
var fetersCode_1 = require("../../../model/fetersCode");
var fetersCodeDetail_service_1 = require("../../../service/admin/fetersCodeDetail.service");
var fetersCode_service_1 = require("../../../service/admin/fetersCode.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var FetersCodeDetailAdminComponent = /** @class */ (function () {
    function FetersCodeDetailAdminComponent(formBuilder, toastr, activatedRoute, router, _fetersCodeDetailService, _fetersCodeService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._fetersCodeDetailService = _fetersCodeDetailService;
        this._fetersCodeService = _fetersCodeService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.fetersCode = new fetersCode_1.FetersCode();
        this.fetersCodeDetailId = 0;
        this.isSubmited = false;
        this.pdfServerPath = global_1.Global.FETERSCODE_PDF_FILEPATH;
    }
    FetersCodeDetailAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var fetersCodeId = _this._global.decryptValue(params['fetersCodeId']);
            var fetersCodeDetailId = _this._global.decryptValue(params['fetersCodeDetailId']);
            _this.fetersCodeId = parseInt(fetersCodeId);
            if (fetersCodeId) {
                _this.GetFetersCode(_this.fetersCodeId);
                if (fetersCodeDetailId) {
                    _this.addUpdateText = "Update";
                    _this.fetersCodeDetailId = parseInt(fetersCodeDetailId);
                    _this.EditFetersCodeDetail(parseInt(fetersCodeDetailId));
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
        this.frmFetersCodeDetailGroup = this.formBuilder.group({
            FetersCodeDetailId: [''],
            FetersCodeId: [this.fetersCodeId],
            GroupNo: ['', forms_1.Validators.required],
            PurposeGroupName: ['', forms_1.Validators.required]
        });
        this.frmFetersCodeDetailLRS = this.formBuilder.group({
            FetersCodeDetailId: [''],
            FetersCodeId: [this.fetersCodeId],
            LRSItem: ['', forms_1.Validators.required],
            LRSFetersCode: ['', forms_1.Validators.required]
        });
    };
    FetersCodeDetailAdminComponent.prototype.GetFetersCode = function (fetersCodeId) {
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
    FetersCodeDetailAdminComponent.prototype.EditFetersCodeDetail = function (fetersCodeDetailId) {
        var _this = this;
        this.spinnerService.show();
        var getFetersCodeDetailRequest = new fetersCodeDetail_1.GetFetersCodeDetailRequest();
        getFetersCodeDetailRequest.FetersCodeDetailId = fetersCodeDetailId;
        getFetersCodeDetailRequest.IsActive = null;
        this._fetersCodeDetailService.getFetersCodeDetail(getFetersCodeDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.frmFetersCodeDetailGroup.setValue({
                FetersCodeDetailId: fetersCodeDetailId,
                FetersCodeId: data.Response[0].FetersCodeId,
                GroupNo: data.Response[0].GroupNo,
                PurposeGroupName: data.Response[0].PurposeGroupName
            });
            _this.frmFetersCodeDetailLRS.setValue({
                FetersCodeDetailId: fetersCodeDetailId,
                FetersCodeId: data.Response[0].FetersCodeId,
                LRSItem: data.Response[0].LRSItem,
                LRSFetersCode: data.Response[0].LRSFetersCode
            });
            _this.frmFetersCodeDetailGroup.updateValueAndValidity();
            _this.frmFetersCodeDetailLRS.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    FetersCodeDetailAdminComponent.prototype.SaveFetersCodeDetail = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.FetersCodeDetailId) {
            this._fetersCodeDetailService.updateFetersCodeDetail(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/feterscodes'], {
                            queryParams: {
                                indexFetersCode: params["indexFetersCode"], indexFetersCodeDetail: params["indexFetersCodeDetail"], sortingFetersCodeField: params["sortingFetersCodeField"], sortingFetersCodeDirection: params["sortingFetersCodeDirection"], sortingFetersCodeDetailField: params["sortingFetersCodeDetailField"], sortingFetersCodeDetailDirection: params["sortingFetersCodeDetailDirection"], sortingFetersCodeGroupDetailField: params["sortingFetersCodeGroupDetailField"], sortingFetersCodeGroupDetailDirection: params["sortingFetersCodeGroupDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_DETAIL_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_DETAIL_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FETERSCODE_DETAIL_TITLE, { enableHtml: true });
            });
        }
        else {
            this._fetersCodeDetailService.addFetersCodeDetail(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/feterscodes'], {
                            queryParams: {
                                indexFetersCode: params["indexFetersCode"], indexFetersCodeDetail: params["indexFetersCodeDetail"], sortingFetersCodeField: params["sortingFetersCodeField"], sortingFetersCodeDirection: params["sortingFetersCodeDirection"], sortingFetersCodeDetailField: params["sortingFetersCodeDetailField"], sortingFetersCodeDetailDirection: params["sortingFetersCodeDetailDirection"], sortingFetersCodeGroupDetailField: params["sortingFetersCodeGroupDetailField"], sortingFetersCodeGroupDetailDirection: params["sortingFetersCodeGroupDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_DETAIL_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_DETAIL_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FETERSCODE_DETAIL_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FetersCodeDetailAdminComponent.prototype.OnSubmitFetersCodeDetailGroup = function (formData) {
        this.isSubmited = true;
        if (this.frmFetersCodeDetailGroup.valid) {
            this.SaveFetersCodeDetail(formData);
        }
    };
    FetersCodeDetailAdminComponent.prototype.OnSubmitFetersCodeDetailLRS = function (formData) {
        this.isSubmited = true;
        if (this.frmFetersCodeDetailLRS.valid) {
            this.SaveFetersCodeDetail(formData);
        }
    };
    FetersCodeDetailAdminComponent.prototype.CancelFetersCodeDetail = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/feterscodes'], {
                queryParams: {
                    indexFetersCode: params["indexFetersCode"], indexFetersCodeDetail: params["indexFetersCodeDetail"], sortingFetersCodeField: params["sortingFetersCodeField"], sortingFetersCodeDirection: params["sortingFetersCodeDirection"], sortingFetersCodeDetailField: params["sortingFetersCodeDetailField"], sortingFetersCodeDetailDirection: params["sortingFetersCodeDetailDirection"], sortingFetersCodeGroupDetailField: params["sortingFetersCodeGroupDetailField"], sortingFetersCodeGroupDetailDirection: params["sortingFetersCodeGroupDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    FetersCodeDetailAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fetersCodeDetail.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, fetersCodeDetail_service_1.FetersCodeDetailAdminService, fetersCode_service_1.FetersCodeAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], FetersCodeDetailAdminComponent);
    return FetersCodeDetailAdminComponent;
}());
exports.FetersCodeDetailAdminComponent = FetersCodeDetailAdminComponent;
//# sourceMappingURL=fetersCodeDetail.component.js.map