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
var masterCircular_1 = require("../../../model/masterCircular");
var masterCircularDetail_1 = require("../../../model/masterCircularDetail");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var masterCircular_service_1 = require("../../../service/admin/masterCircular.service");
var masterCircularDetail_service_1 = require("../../../service/admin/masterCircularDetail.service");
var MasterCircularsAdminComponent = /** @class */ (function () {
    function MasterCircularsAdminComponent(formBuilder, activatedRoute, _masterCircularService, _masterCircularDetailService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._masterCircularService = _masterCircularService;
        this._masterCircularDetailService = _masterCircularDetailService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
        this.pdfServerPath = global_1.Global.MASTERCIRCULAR_PDF_FILEPATH;
        this.itemDetailMasterCirculars = { index: -1 };
        this.indexMasterCircular = -1;
    }
    MasterCircularsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.indexMasterCircular = (params["indexMasterCircular"]) ? parseInt(params["indexMasterCircular"]) : -1;
            _this.sortingMasterCircularField = params["sortingMasterCircularField"];
            _this.sortingMasterCircularDirection = params["sortingMasterCircularDirection"];
            _this.sortingMasterCircularDetailField = params["sortingMasterCircularDetailField"];
            _this.sortingMasterCircularDetailDirection = params["sortingMasterCircularDetailDirection"];
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmMasterCircular = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetMasterCircular(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    MasterCircularsAdminComponent.prototype.GetMasterCircular = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getMasterCircularRequest = new masterCircular_1.GetMasterCircularRequest();
        getMasterCircularRequest.SearchText = searchText;
        getMasterCircularRequest.IsActive = null;
        getMasterCircularRequest.OrderBy = this.sortingMasterCircularField;
        getMasterCircularRequest.OrderByDirection = this.sortingMasterCircularDirection;
        getMasterCircularRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getMasterCircularRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._masterCircularService.getMasterCircular(getMasterCircularRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterCirculars = data.Response;
                if (_this.indexMasterCircular != -1 && _this.masterCirculars.length > 0) {
                    _this.itemDetailMasterCirculars.index = _this.indexMasterCircular;
                    _this.GetMasterCircularDetail(_this.itemDetailMasterCirculars.index, _this.masterCirculars[_this.itemDetailMasterCirculars.index].MasterCircularId, true);
                }
                _this.pageSize = getMasterCircularRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterCircularsAdminComponent.prototype.SearchMasterCircular = function (formData) {
        this.indexMasterCircular = -1;
        this.itemDetailMasterCirculars.index = this.indexMasterCircular;
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.ReloadPage(false);
        this.GetMasterCircular(this.searchText, this.currentPage, this.pageSize);
    };
    MasterCircularsAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.ReloadPage(true);
        this.GetMasterCircular(this.searchText, pageNumber, this.pageSize);
    };
    MasterCircularsAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.ReloadPage(false);
        this.GetMasterCircular(this.searchText, null, this.pageSize);
    };
    MasterCircularsAdminComponent.prototype.EditMasterCircular = function (masterCircularId) {
        this.router.navigate(['/admin/secure/mastercircular/' + this._global.encryptValue(masterCircularId)], {
            queryParams: {
                indexMasterCircular: this.indexMasterCircular, sortingMasterCircularField: this.sortingMasterCircularField, sortingMasterCircularDirection: this.sortingMasterCircularDirection, sortingMasterCircularDetailField: this.sortingMasterCircularDetailField, sortingMasterCircularDetailDirection: this.sortingMasterCircularDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    MasterCircularsAdminComponent.prototype.AddMasterCircularDetail = function (masterCircularId, index) {
        this.router.navigate(['/admin/secure/mastercirculardetail/' + this._global.encryptValue(masterCircularId)], {
            queryParams: {
                indexMasterCircular: this.indexMasterCircular, sortingMasterCircularField: this.sortingMasterCircularField, sortingMasterCircularDirection: this.sortingMasterCircularDirection, sortingMasterCircularDetailField: this.sortingMasterCircularDetailField, sortingMasterCircularDetailDirection: this.sortingMasterCircularDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    MasterCircularsAdminComponent.prototype.EditMasterCircularDetail = function (masterCircularId, masterCircularDetailId) {
        this.router.navigate(['/admin/secure/mastercirculardetail/' + this._global.encryptValue(masterCircularId) + '/' + this._global.encryptValue(masterCircularDetailId)], {
            queryParams: {
                indexMasterCircular: this.indexMasterCircular, sortingMasterCircularField: this.sortingMasterCircularField, sortingMasterCircularDirection: this.sortingMasterCircularDirection, sortingMasterCircularDetailField: this.sortingMasterCircularDetailField, sortingMasterCircularDetailDirection: this.sortingMasterCircularDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    MasterCircularsAdminComponent.prototype.ReloadPage = function (isPageChange) {
        if (isPageChange == true) {
            this.indexMasterCircular = -1;
            this.itemDetailMasterCirculars.index = this.indexMasterCircular;
        }
        this.router.navigate(['/admin/secure/mastercirculars'], {
            queryParams: {
                indexMasterCircular: this.indexMasterCircular, sortingMasterCircularField: this.sortingMasterCircularField, sortingMasterCircularDirection: this.sortingMasterCircularDirection, sortingMasterCircularDetailField: this.sortingMasterCircularDetailField, sortingMasterCircularDetailDirection: this.sortingMasterCircularDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    MasterCircularsAdminComponent.prototype.DeleteMasterCircular = function (masterCircularId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteMasterCircular = {
                "MasterCircularId": masterCircularId
            };
            this._masterCircularService.deleteMasterCircular(deleteMasterCircular)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { closeButton: true });
                    _this.GetMasterCircular();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    MasterCircularsAdminComponent.prototype.DeleteMasterCircularDetail = function (masterCircularId, masterCircularDetailId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteMasterCircularDetail = {
                "MasterCircularDetailId": masterCircularDetailId
            };
            this._masterCircularDetailService.deleteMasterCircularDetail(deleteMasterCircularDetail)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { closeButton: true });
                    _this.GetMasterCircularDetail(_this.itemDetailMasterCirculars.index, masterCircularId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    MasterCircularsAdminComponent.prototype.UpDownMasterCircularArrow = function (index) {
        if (index === this.itemDetailMasterCirculars.index) {
            this.itemDetailMasterCirculars.index = null;
        }
        else {
            this.itemDetailMasterCirculars.index = index;
        }
    };
    MasterCircularsAdminComponent.prototype.GetMasterCircularDetail = function (index, masterCircularId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getMasterCircularDetailRequest = new masterCircularDetail_1.GetMasterCircularDetailRequest();
        getMasterCircularDetailRequest.MasterCircularId = masterCircularId;
        getMasterCircularDetailRequest.IsActive = null;
        getMasterCircularDetailRequest.OrderBy = this.sortingMasterCircularDetailField;
        getMasterCircularDetailRequest.OrderByDirection = this.sortingMasterCircularDetailDirection;
        getMasterCircularDetailRequest.PageNumber = 1;
        getMasterCircularDetailRequest.PageSize = 100000;
        this._masterCircularDetailService.getMasterCircularDetail(getMasterCircularDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.masterCircularDetails = data.Response;
                if (isDeleted != true) {
                    _this.UpDownMasterCircularArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterCircularsAdminComponent.prototype.ShowMasterCircularDetail = function (index, masterCircularId) {
        this.indexMasterCircular = -1;
        if (this.itemDetailMasterCirculars.index !== index) {
            if (masterCircularId) {
                this.indexMasterCircular = index;
                this.GetMasterCircularDetail(index, masterCircularId, false);
            }
        }
        else {
            this.UpDownMasterCircularArrow(index);
        }
        this.ReloadPage(false);
    };
    MasterCircularsAdminComponent.prototype.OnMasterCircularSort = function (fieldName) {
        this.sortingMasterCircularDirection = (this.sortingMasterCircularField == fieldName) ? (this.sortingMasterCircularDirection == "A") ? "D" : "A" : "A";
        this.sortingMasterCircularField = fieldName;
        this.ReloadPage(true);
        this.GetMasterCircular(this.searchText, this.currentPage, this.pageSize);
    };
    MasterCircularsAdminComponent.prototype.OnMasterCircularDetailSort = function (sectorId, fieldName) {
        this.sortingMasterCircularDetailDirection = (this.sortingMasterCircularDetailField == fieldName) ? (this.sortingMasterCircularDetailDirection == "A") ? "D" : "A" : "A";
        this.sortingMasterCircularDetailField = fieldName;
        this.ReloadPage(false);
        this.GetMasterCircularDetail(this.itemDetailMasterCirculars.index, sectorId, true);
    };
    MasterCircularsAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './masterCirculars.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, masterCircular_service_1.MasterCircularAdminService, masterCircularDetail_service_1.MasterCircularDetailAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], MasterCircularsAdminComponent);
    return MasterCircularsAdminComponent;
}());
exports.MasterCircularsAdminComponent = MasterCircularsAdminComponent;
//# sourceMappingURL=masterCirculars.component.js.map