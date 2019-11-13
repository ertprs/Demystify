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
var rBIData_1 = require("../../../model/rBIData");
var rBIDataDetail_1 = require("../../../model/rBIDataDetail");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var rBIData_service_1 = require("../../../service/admin/rBIData.service");
var rBIDataDetail_service_1 = require("../../../service/admin/rBIDataDetail.service");
var RBIDatasAdminComponent = /** @class */ (function () {
    function RBIDatasAdminComponent(formBuilder, activatedRoute, _rBIDataService, _rBIDataDetailService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._rBIDataService = _rBIDataService;
        this._rBIDataDetailService = _rBIDataDetailService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
        this.itemDetailRBIDatas = { index: -1 };
        this.indexRBIData = -1;
        this.excelRBIDataServerPath = global_1.Global.RBIDATA_EXCEL_FILEPATH;
        this.excelServerPath = global_1.Global.RBIDATA_DETAIL_EXCEL_FILEPATH;
        this.pdfServerPath = global_1.Global.RBIDATA_DETAIL_PDF_FILEPATH;
    }
    RBIDatasAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.indexRBIData = (params["indexRBIData"]) ? parseInt(params["indexRBIData"]) : -1;
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
            _this.sortingRBIDataField = params["sortingRBIDataField"];
            _this.sortingRBIDataDirection = params["sortingRBIDataDirection"];
            _this.sortingRBIDataDetailField = params["sortingRBIDataDetailField"];
            _this.sortingRBIDataDetailDirection = params["sortingRBIDataDetailDirection"];
        });
        this.frmRBIData = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetRBIData(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    RBIDatasAdminComponent.prototype.GetRBIData = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getRBIDataRequest = new rBIData_1.GetRBIDataRequest();
        getRBIDataRequest.SearchText = searchText;
        getRBIDataRequest.IsActive = null;
        getRBIDataRequest.OrderBy = this.sortingRBIDataField;
        getRBIDataRequest.OrderByDirection = this.sortingRBIDataDirection;
        getRBIDataRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getRBIDataRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._rBIDataService.getRBIData(getRBIDataRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rBIDatas = data.Response;
                if (_this.indexRBIData != -1 && _this.rBIDatas.length > 0) {
                    _this.itemDetailRBIDatas.index = _this.indexRBIData;
                    _this.GetRBIDataDetail(_this.itemDetailRBIDatas.index, _this.rBIDatas[_this.itemDetailRBIDatas.index].RBIDataId, true);
                }
                _this.pageSize = getRBIDataRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RBIDatasAdminComponent.prototype.SearchRBIData = function (formData) {
        this.indexRBIData = -1;
        this.itemDetailRBIDatas.index = this.indexRBIData;
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.ReloadPage(false);
        this.GetRBIData(this.searchText, this.currentPage, this.pageSize);
    };
    RBIDatasAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.ReloadPage(true);
        this.GetRBIData(this.searchText, pageNumber, this.pageSize);
    };
    RBIDatasAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.ReloadPage(false);
        this.GetRBIData(this.searchText, null, this.pageSize);
    };
    RBIDatasAdminComponent.prototype.EditRBIData = function (rBIDataId) {
        this.router.navigate(['/admin/secure/rbidata/' + this._global.encryptValue(rBIDataId)], {
            queryParams: {
                indexRBIData: this.indexRBIData, sortingRBIDataField: this.sortingRBIDataField, sortingRBIDataDirection: this.sortingRBIDataDirection, sortingRBIDataDetailField: this.sortingRBIDataDetailField, sortingRBIDataDetailDirection: this.sortingRBIDataDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RBIDatasAdminComponent.prototype.AddRBIDataDetail = function (rBIDataId, index) {
        this.router.navigate(['/admin/secure/rbidatadetail/' + this._global.encryptValue(rBIDataId)], {
            queryParams: {
                indexRBIData: this.indexRBIData, sortingRBIDataField: this.sortingRBIDataField, sortingRBIDataDirection: this.sortingRBIDataDirection, sortingRBIDataDetailField: this.sortingRBIDataDetailField, sortingRBIDataDetailDirection: this.sortingRBIDataDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RBIDatasAdminComponent.prototype.EditRBIDataDetail = function (rBIDataId, rBIDataDetailId) {
        this.router.navigate(['/admin/secure/rbidatadetail/' + this._global.encryptValue(rBIDataId) + '/' + this._global.encryptValue(rBIDataDetailId)], {
            queryParams: {
                indexRBIData: this.indexRBIData, sortingRBIDataField: this.sortingRBIDataField, sortingRBIDataDirection: this.sortingRBIDataDirection, sortingRBIDataDetailField: this.sortingRBIDataDetailField, sortingRBIDataDetailDirection: this.sortingRBIDataDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RBIDatasAdminComponent.prototype.ReloadPage = function (isPageChange) {
        if (isPageChange == true) {
            this.indexRBIData = -1;
            this.itemDetailRBIDatas.index = this.indexRBIData;
        }
        this.router.navigate(['/admin/secure/rbidatas'], {
            queryParams: {
                indexRBIData: this.indexRBIData, sortingRBIDataField: this.sortingRBIDataField, sortingRBIDataDirection: this.sortingRBIDataDirection, sortingRBIDataDetailField: this.sortingRBIDataDetailField, sortingRBIDataDetailDirection: this.sortingRBIDataDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    RBIDatasAdminComponent.prototype.DeleteRBIData = function (rBIDataId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteRBIData = {
                "RBIDataId": rBIDataId
            };
            this._rBIDataService.deleteRBIData(deleteRBIData)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { closeButton: true });
                    _this.GetRBIData();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RBIDatasAdminComponent.prototype.DeleteRBIDataDetail = function (rBIDataId, rBIDataDetailId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteRBIDataDetail = {
                "RBIDataDetailId": rBIDataDetailId
            };
            this._rBIDataDetailService.deleteRBIDataDetail(deleteRBIDataDetail)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { closeButton: true });
                    _this.GetRBIDataDetail(_this.itemDetailRBIDatas.index, rBIDataId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RBIDatasAdminComponent.prototype.UpDownRBIDataArrow = function (index) {
        if (index === this.itemDetailRBIDatas.index) {
            this.itemDetailRBIDatas.index = null;
        }
        else {
            this.itemDetailRBIDatas.index = index;
        }
    };
    RBIDatasAdminComponent.prototype.GetRBIDataDetail = function (index, rBIDataId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getRBIDataDetailRequest = new rBIDataDetail_1.GetRBIDataDetailRequest();
        getRBIDataDetailRequest.RBIDataId = rBIDataId;
        getRBIDataDetailRequest.IsActive = null;
        getRBIDataDetailRequest.OrderBy = this.sortingRBIDataDetailField;
        getRBIDataDetailRequest.OrderByDirection = this.sortingRBIDataDetailDirection;
        getRBIDataDetailRequest.PageNumber = 1;
        getRBIDataDetailRequest.PageSize = 100000;
        this._rBIDataDetailService.getRBIDataDetail(getRBIDataDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rBIDataDetails = data.Response;
                if (isDeleted != true) {
                    _this.UpDownRBIDataArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RBIDatasAdminComponent.prototype.ShowRBIDataDetail = function (index, rBIDataId) {
        this.indexRBIData = -1;
        this.rBIDataId = null;
        if (this.itemDetailRBIDatas.index !== index) {
            if (rBIDataId) {
                this.rBIDataId = rBIDataId;
                this.indexRBIData = index;
                this.GetRBIDataDetail(index, rBIDataId, false);
            }
        }
        else {
            this.UpDownRBIDataArrow(index);
        }
        this.ReloadPage(false);
    };
    RBIDatasAdminComponent.prototype.OnRBIDataSort = function (fieldName) {
        this.sortingRBIDataDirection = (this.sortingRBIDataField == fieldName) ? (this.sortingRBIDataDirection == "A") ? "D" : "A" : "A";
        this.sortingRBIDataField = fieldName;
        this.ReloadPage(true);
        this.GetRBIData(this.searchText, this.currentPage, this.pageSize);
    };
    RBIDatasAdminComponent.prototype.OnRBIDataDetailSort = function (rBIDataId, fieldName) {
        this.sortingRBIDataDetailDirection = (this.sortingRBIDataDetailField == fieldName) ? (this.sortingRBIDataDetailDirection == "A") ? "D" : "A" : "A";
        this.sortingRBIDataDetailField = fieldName;
        this.ReloadPage(false);
        this.GetRBIDataDetail(this.itemDetailRBIDatas.index, rBIDataId, true);
    };
    RBIDatasAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './rBIDatas.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, rBIData_service_1.RBIDataAdminService, rBIDataDetail_service_1.RBIDataDetailAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], RBIDatasAdminComponent);
    return RBIDatasAdminComponent;
}());
exports.RBIDatasAdminComponent = RBIDatasAdminComponent;
//# sourceMappingURL=rBIDatas.component.js.map