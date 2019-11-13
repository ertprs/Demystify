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
var fetersCode_1 = require("../../../model/fetersCode");
var fetersCodeDetail_1 = require("../../../model/fetersCodeDetail");
var fetersCodeGroupDetail_1 = require("../../../model/fetersCodeGroupDetail");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var fetersCode_service_1 = require("../../../service/admin/fetersCode.service");
var fetersCodeDetail_service_1 = require("../../../service/admin/fetersCodeDetail.service");
var fetersCodeGroupDetail_service_1 = require("../../../service/admin/fetersCodeGroupDetail.service");
var FetersCodesAdminComponent = /** @class */ (function () {
    function FetersCodesAdminComponent(formBuilder, activatedRoute, _fetersCodeService, _fetersCodeDetailService, _fetersCodeGroupDetailService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._fetersCodeService = _fetersCodeService;
        this._fetersCodeDetailService = _fetersCodeDetailService;
        this._fetersCodeGroupDetailService = _fetersCodeGroupDetailService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
        this.pdfServerPath = global_1.Global.FETERSCODE_PDF_FILEPATH;
        this.itemDetailFetersCodes = { index: -1 };
        this.itemDetailFetersCodeDetails = { index: -1 };
        this.indexFetersCode = -1;
        this.indexFetersCodeDetail = -1;
    }
    FetersCodesAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.indexFetersCode = (params["indexFetersCode"]) ? parseInt(params["indexFetersCode"]) : -1;
            _this.indexFetersCodeDetail = (params["indexFetersCodeDetail"]) ? parseInt(params["indexFetersCodeDetail"]) : -1;
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
            _this.sortingFetersCodeField = params["sortingFetersCodeField"];
            _this.sortingFetersCodeDirection = params["sortingFetersCodeDirection"];
            _this.sortingFetersCodeDetailField = params["sortingFetersCodeDetailField"];
            _this.sortingFetersCodeDetailDirection = params["sortingFetersCodeDetailDirection"];
            _this.sortingFetersCodeGroupDetailField = params["sortingFetersCodeGroupDetailField"];
            _this.sortingFetersCodeGroupDetailDirection = params["sortingFetersCodeGroupDetailDirection"];
        });
        this.frmFetersCode = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetFetersCode(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    FetersCodesAdminComponent.prototype.GetFetersCode = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getFetersCodeRequest = new fetersCode_1.GetFetersCodeRequest();
        getFetersCodeRequest.SearchText = searchText;
        getFetersCodeRequest.IsActive = null;
        getFetersCodeRequest.OrderBy = this.sortingFetersCodeField;
        getFetersCodeRequest.OrderByDirection = this.sortingFetersCodeDirection;
        getFetersCodeRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getFetersCodeRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._fetersCodeService.getFetersCode(getFetersCodeRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fetersCodes = data.Response;
                if (_this.indexFetersCode != -1 && _this.fetersCodes.length > 0) {
                    _this.itemDetailFetersCodes.index = _this.indexFetersCode;
                    _this.GetFetersCodeDetail(_this.itemDetailFetersCodes.index, _this.fetersCodes[_this.itemDetailFetersCodes.index].FetersCodeId, true);
                }
                _this.pageSize = getFetersCodeRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FetersCodesAdminComponent.prototype.SearchFetersCode = function (formData) {
        this.indexFetersCode = -1;
        this.itemDetailFetersCodes.index = this.indexFetersCode;
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.ReloadPage(false);
        this.GetFetersCode(this.searchText, this.currentPage, this.pageSize);
    };
    FetersCodesAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.ReloadPage(true);
        this.GetFetersCode(this.searchText, pageNumber, this.pageSize);
    };
    FetersCodesAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.ReloadPage(false);
        this.GetFetersCode(this.searchText, null, this.pageSize);
    };
    FetersCodesAdminComponent.prototype.EditFetersCode = function (fetersCodeId) {
        this.router.navigate(['/admin/secure/feterscode/' + this._global.encryptValue(fetersCodeId)], {
            queryParams: {
                indexFetersCode: this.indexFetersCode, indexFetersCodeDetail: this.indexFetersCodeDetail, sortingFetersCodeField: this.sortingFetersCodeField, sortingFetersCodeDirection: this.sortingFetersCodeDirection, sortingFetersCodeDetailField: this.sortingFetersCodeDetailField, sortingFetersCodeDetailDirection: this.sortingFetersCodeDetailDirection, sortingFetersCodeGroupDetailField: this.sortingFetersCodeGroupDetailField, sortingFetersCodeGroupDetailDirection: this.sortingFetersCodeGroupDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FetersCodesAdminComponent.prototype.AddFetersCodeDetail = function (fetersCodeId, index) {
        this.router.navigate(['/admin/secure/feterscodedetail/' + this._global.encryptValue(fetersCodeId)], {
            queryParams: {
                indexFetersCode: this.indexFetersCode, indexFetersCodeDetail: this.indexFetersCodeDetail, sortingFetersCodeField: this.sortingFetersCodeField, sortingFetersCodeDirection: this.sortingFetersCodeDirection, sortingFetersCodeDetailField: this.sortingFetersCodeDetailField, sortingFetersCodeDetailDirection: this.sortingFetersCodeDetailDirection, sortingFetersCodeGroupDetailField: this.sortingFetersCodeGroupDetailField, sortingFetersCodeGroupDetailDirection: this.sortingFetersCodeGroupDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FetersCodesAdminComponent.prototype.EditFetersCodeDetail = function (fetersCodeId, fetersCodeDetailId) {
        this.router.navigate(['/admin/secure/feterscodedetail/' + this._global.encryptValue(fetersCodeId) + '/' + this._global.encryptValue(fetersCodeDetailId)], {
            queryParams: {
                indexFetersCode: this.indexFetersCode, indexFetersCodeDetail: this.indexFetersCodeDetail, sortingFetersCodeField: this.sortingFetersCodeField, sortingFetersCodeDirection: this.sortingFetersCodeDirection, sortingFetersCodeDetailField: this.sortingFetersCodeDetailField, sortingFetersCodeDetailDirection: this.sortingFetersCodeDetailDirection, sortingFetersCodeGroupDetailField: this.sortingFetersCodeGroupDetailField, sortingFetersCodeGroupDetailDirection: this.sortingFetersCodeGroupDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FetersCodesAdminComponent.prototype.AddFetersCodeGroupDetail = function (fetersCodeId, fetersCodeDetailId, index) {
        this.router.navigate(['/admin/secure/feterscodegroupdetail/' + this._global.encryptValue(fetersCodeId) + '/' + this._global.encryptValue(fetersCodeDetailId)], {
            queryParams: {
                indexFetersCode: this.indexFetersCode, indexFetersCodeDetail: this.indexFetersCodeDetail, sortingFetersCodeField: this.sortingFetersCodeField, sortingFetersCodeDirection: this.sortingFetersCodeDirection, sortingFetersCodeDetailField: this.sortingFetersCodeDetailField, sortingFetersCodeDetailDirection: this.sortingFetersCodeDetailDirection, sortingFetersCodeGroupDetailField: this.sortingFetersCodeGroupDetailField, sortingFetersCodeGroupDetailDirection: this.sortingFetersCodeGroupDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FetersCodesAdminComponent.prototype.EditFetersCodeGroupDetail = function (fetersCodeId, fetersCodeDetailId, fetersCodeGroupDetailId) {
        this.router.navigate(['/admin/secure/feterscodegroupdetail/' + this._global.encryptValue(fetersCodeId) + '/' + this._global.encryptValue(fetersCodeDetailId) + '/' + this._global.encryptValue(fetersCodeGroupDetailId)], {
            queryParams: {
                indexFetersCode: this.indexFetersCode, indexFetersCodeDetail: this.indexFetersCodeDetail, sortingFetersCodeField: this.sortingFetersCodeField, sortingFetersCodeDirection: this.sortingFetersCodeDirection, sortingFetersCodeDetailField: this.sortingFetersCodeDetailField, sortingFetersCodeDetailDirection: this.sortingFetersCodeDetailDirection, sortingFetersCodeGroupDetailField: this.sortingFetersCodeGroupDetailField, sortingFetersCodeGroupDetailDirection: this.sortingFetersCodeGroupDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FetersCodesAdminComponent.prototype.ReloadPage = function (isPageChange) {
        if (isPageChange == true) {
            this.indexFetersCode = -1;
            this.itemDetailFetersCodes.index = this.indexFetersCode;
        }
        this.router.navigate(['/admin/secure/feterscodes'], {
            queryParams: {
                indexFetersCode: this.indexFetersCode, indexFetersCodeDetail: this.indexFetersCodeDetail, sortingFetersCodeField: this.sortingFetersCodeField, sortingFetersCodeDirection: this.sortingFetersCodeDirection, sortingFetersCodeDetailField: this.sortingFetersCodeDetailField, sortingFetersCodeDetailDirection: this.sortingFetersCodeDetailDirection, sortingFetersCodeGroupDetailField: this.sortingFetersCodeGroupDetailField, sortingFetersCodeGroupDetailDirection: this.sortingFetersCodeGroupDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    FetersCodesAdminComponent.prototype.DeleteFetersCode = function (fetersCodeId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteFetersCode = {
                "FetersCodeId": fetersCodeId
            };
            this._fetersCodeService.deleteFetersCode(deleteFetersCode)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { closeButton: true });
                    _this.GetFetersCode();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FetersCodesAdminComponent.prototype.DeleteFetersCodeDetail = function (fetersCodeId, fetersCodeDetailId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteFetersCodeDetail = {
                "FetersCodeDetailId": fetersCodeDetailId
            };
            this._fetersCodeDetailService.deleteFetersCodeDetail(deleteFetersCodeDetail)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { closeButton: true });
                    _this.GetFetersCodeDetail(_this.itemDetailFetersCodes.index, fetersCodeId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FetersCodesAdminComponent.prototype.DeleteFetersCodeGroupDetail = function (fetersCodeDetailId, fetersCodeGroupDetailId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteFetersCodeGroupDetail = {
                "FetersCodeGroupDetailId": fetersCodeGroupDetailId
            };
            this._fetersCodeGroupDetailService.deleteFetersCodeGroupDetail(deleteFetersCodeGroupDetail)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { closeButton: true });
                    _this.GetFetersCodeGroupDetail(_this.itemDetailFetersCodeDetails.index, fetersCodeDetailId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FetersCodesAdminComponent.prototype.UpDownFetersCodeArrow = function (index) {
        this.itemDetailFetersCodeDetails.index = -1;
        if (index === this.itemDetailFetersCodes.index) {
            this.itemDetailFetersCodes.index = null;
        }
        else {
            this.itemDetailFetersCodes.index = index;
        }
    };
    FetersCodesAdminComponent.prototype.UpDownFetersCodeDetailArrow = function (index) {
        if (index === this.itemDetailFetersCodeDetails.index) {
            this.itemDetailFetersCodeDetails.index = null;
        }
        else {
            this.itemDetailFetersCodeDetails.index = index;
        }
    };
    FetersCodesAdminComponent.prototype.GetFetersCodeDetail = function (index, fetersCodeId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getFetersCodeDetailRequest = new fetersCodeDetail_1.GetFetersCodeDetailRequest();
        getFetersCodeDetailRequest.FetersCodeId = fetersCodeId;
        getFetersCodeDetailRequest.IsActive = null;
        getFetersCodeDetailRequest.OrderBy = this.sortingFetersCodeDetailField;
        getFetersCodeDetailRequest.OrderByDirection = this.sortingFetersCodeDetailDirection;
        getFetersCodeDetailRequest.PageNumber = 1;
        getFetersCodeDetailRequest.PageSize = 100000;
        this._fetersCodeDetailService.getFetersCodeDetail(getFetersCodeDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fetersCodeDetails = data.Response;
                if (_this.indexFetersCodeDetail != -1 && _this.fetersCodeDetails.length > 0) {
                    _this.itemDetailFetersCodeDetails.index = _this.indexFetersCodeDetail;
                    _this.GetFetersCodeGroupDetail(_this.itemDetailFetersCodeDetails.index, _this.fetersCodeDetails[_this.itemDetailFetersCodeDetails.index].FetersCodeDetailId, true);
                }
                if (isDeleted != true) {
                    _this.UpDownFetersCodeArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FetersCodesAdminComponent.prototype.GetFetersCodeGroupDetail = function (index, fetersCodeDetailId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getFetersCodeGroupDetailRequest = new fetersCodeGroupDetail_1.GetFetersCodeGroupDetailRequest();
        getFetersCodeGroupDetailRequest.FetersCodeDetailId = fetersCodeDetailId;
        getFetersCodeGroupDetailRequest.IsActive = null;
        getFetersCodeGroupDetailRequest.OrderBy = this.sortingFetersCodeGroupDetailField;
        getFetersCodeGroupDetailRequest.OrderByDirection = this.sortingFetersCodeGroupDetailDirection;
        getFetersCodeGroupDetailRequest.PageNumber = 1;
        getFetersCodeGroupDetailRequest.PageSize = 100000;
        this._fetersCodeGroupDetailService.getFetersCodeGroupDetail(getFetersCodeGroupDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fetersCodeGroupDetails = data.Response;
                if (isDeleted != true) {
                    _this.UpDownFetersCodeDetailArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FETERSCODE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FetersCodesAdminComponent.prototype.ShowFetersCodeDetail = function (index, fetersCodeId) {
        this.indexFetersCode = -1;
        this.indexFetersCodeDetail = -1;
        this.fetersCodeId = null;
        if (this.itemDetailFetersCodes.index !== index) {
            if (fetersCodeId) {
                this.fetersCodeId = fetersCodeId;
                this.indexFetersCode = index;
                this.GetFetersCodeDetail(index, fetersCodeId, false);
            }
        }
        else {
            this.UpDownFetersCodeArrow(index);
        }
        this.ReloadPage(false);
    };
    FetersCodesAdminComponent.prototype.ShowFetersCodeGroupDetail = function (index, fetersCodeDetailId) {
        this.indexFetersCodeDetail = -1;
        this.fetersCodeDetailId = null;
        if (this.itemDetailFetersCodeDetails.index !== index) {
            if (fetersCodeDetailId) {
                this.fetersCodeDetailId = fetersCodeDetailId;
                this.indexFetersCodeDetail = index;
                this.GetFetersCodeGroupDetail(index, fetersCodeDetailId, false);
            }
        }
        else {
            this.UpDownFetersCodeDetailArrow(index);
        }
        this.ReloadPage(false);
    };
    FetersCodesAdminComponent.prototype.OnFetersCodeSort = function (fieldName) {
        this.sortingFetersCodeDirection = (this.sortingFetersCodeField == fieldName) ? (this.sortingFetersCodeDirection == "A") ? "D" : "A" : "A";
        this.sortingFetersCodeField = fieldName;
        this.GetFetersCode(this.searchText, this.currentPage, this.pageSize);
    };
    FetersCodesAdminComponent.prototype.OnFetersCodeDetailSort = function (fetersCodeId, fieldName) {
        this.indexFetersCodeDetail = -1;
        this.itemDetailFetersCodeDetails.index = this.indexFetersCodeDetail;
        this.sortingFetersCodeDetailDirection = (this.sortingFetersCodeDetailField == fieldName) ? (this.sortingFetersCodeDetailDirection == "A") ? "D" : "A" : "A";
        this.sortingFetersCodeDetailField = fieldName;
        this.ReloadPage(false);
        this.GetFetersCodeDetail(this.itemDetailFetersCodes.index, fetersCodeId, true);
    };
    FetersCodesAdminComponent.prototype.OnFetersCodeGroupDetailSort = function (fetersCodeDetailId, fieldName) {
        this.sortingFetersCodeGroupDetailDirection = (this.sortingFetersCodeGroupDetailField == fieldName) ? (this.sortingFetersCodeGroupDetailDirection == "A") ? "D" : "A" : "A";
        this.sortingFetersCodeGroupDetailField = fieldName;
        this.ReloadPage(false);
        this.GetFetersCodeGroupDetail(this.itemDetailFetersCodeDetails.index, fetersCodeDetailId, true);
    };
    FetersCodesAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fetersCodes.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, fetersCode_service_1.FetersCodeAdminService, fetersCodeDetail_service_1.FetersCodeDetailAdminService, fetersCodeGroupDetail_service_1.FetersCodeGroupDetailAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], FetersCodesAdminComponent);
    return FetersCodesAdminComponent;
}());
exports.FetersCodesAdminComponent = FetersCodesAdminComponent;
//# sourceMappingURL=fetersCodes.component.js.map