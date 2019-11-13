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
var sector_1 = require("../../../model/sector");
var sectorDetail_1 = require("../../../model/sectorDetail");
var subSector_1 = require("../../../model/subSector");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var sector_service_1 = require("../../../service/admin/sector.service");
var sectorDetail_service_1 = require("../../../service/admin/sectorDetail.service");
var subSector_service_1 = require("../../../service/admin/subSector.service");
var SectorsAdminComponent = /** @class */ (function () {
    function SectorsAdminComponent(formBuilder, activatedRoute, _sectorService, _sectorDetailService, _subSectorService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._sectorService = _sectorService;
        this._sectorDetailService = _sectorDetailService;
        this._subSectorService = _subSectorService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
        this.itemDetailSectors1 = { index: -1 };
        this.itemDetailSectors2 = { index: -1 };
        this.indexSector1 = -1;
        this.indexSector2 = -1;
    }
    SectorsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.indexSector1 = (params["indexSector1"]) ? parseInt(params["indexSector1"]) : -1;
            _this.indexSector2 = (params["indexSector2"]) ? parseInt(params["indexSector2"]) : -1;
            _this.sortingSectorField = (params["sortingSectorField"]) ? params["sortingSectorField"] : "Name";
            _this.sortingSectorDirection = (params["sortingSectorDirection"]) ? params["sortingSectorDirection"] : "A";
            _this.sortingSectorDetailField = params["sortingSectorDetailField"];
            _this.sortingSectorDetailDirection = params["sortingSectorDetailDirection"];
            _this.sortingSubSectorField = (params["sortingSubSectorField"]) ? params["sortingSubSectorField"] : "Name";
            _this.sortingSubSectorDirection = (params["sortingSubSectorDirection"]) ? params["sortingSubSectorDirection"] : "A";
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmSector = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetSector(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    SectorsAdminComponent.prototype.GetSector = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getSectorRequest = new sector_1.GetSectorRequest();
        getSectorRequest.SearchText = searchText;
        getSectorRequest.IsActive = null;
        getSectorRequest.OrderBy = this.sortingSectorField;
        getSectorRequest.OrderByDirection = this.sortingSectorDirection;
        getSectorRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getSectorRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._sectorService.getSector(getSectorRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.sectors = data.Response;
                if (_this.indexSector1 != -1) {
                    _this.itemDetailSectors1.index = _this.indexSector1;
                    _this.GetSectorDetail(_this.itemDetailSectors1.index, _this.sectors[_this.itemDetailSectors1.index].SectorId, true);
                }
                if (_this.indexSector2 != -1) {
                    _this.itemDetailSectors2.index = _this.indexSector2;
                    _this.GetSubSector(_this.itemDetailSectors2.index, _this.sectors[_this.itemDetailSectors2.index].SectorId, true);
                }
                _this.pageSize = getSectorRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SectorsAdminComponent.prototype.SearchSector = function (formData) {
        this.indexSector1 = -1;
        this.indexSector2 = -1;
        this.itemDetailSectors1.index = this.indexSector1;
        this.itemDetailSectors2.index = this.indexSector2;
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.ReloadPage(false);
        this.GetSector(this.searchText, this.currentPage, this.pageSize);
    };
    SectorsAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.ReloadPage(true);
        this.GetSector(this.searchText, pageNumber, this.pageSize);
    };
    SectorsAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.ReloadPage(false);
        this.GetSector(this.searchText, null, this.pageSize);
    };
    SectorsAdminComponent.prototype.EditSector = function (sectorId) {
        this.router.navigate(['/admin/secure/sector/' + this._global.encryptValue(sectorId)], {
            queryParams: {
                indexSector1: this.indexSector1, indexSector2: this.indexSector2, sortingSectorField: this.sortingSectorField, sortingSectorDirection: this.sortingSectorDirection, sortingSectorDetailField: this.sortingSectorDetailField, sortingSectorDetailDirection: this.sortingSectorDetailDirection, sortingSubSectorField: this.sortingSubSectorField, sortingSubSectorDirection: this.sortingSubSectorDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    SectorsAdminComponent.prototype.AddSectorDetail = function (sectorId, index) {
        this.router.navigate(['/admin/secure/sectordetail/' + this._global.encryptValue(sectorId)], {
            queryParams: {
                indexSector1: this.indexSector1, indexSector2: this.indexSector2, sortingSectorField: this.sortingSectorField, sortingSectorDirection: this.sortingSectorDirection, sortingSectorDetailField: this.sortingSectorDetailField, sortingSectorDetailDirection: this.sortingSectorDetailDirection, sortingSubSectorField: this.sortingSubSectorField, sortingSubSectorDirection: this.sortingSubSectorDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    SectorsAdminComponent.prototype.EditSectorDetail = function (sectorId, sectorDetailId) {
        this.router.navigate(['/admin/secure/sectordetail/' + this._global.encryptValue(sectorId) + '/' + this._global.encryptValue(sectorDetailId)], {
            queryParams: {
                indexSector1: this.indexSector1, indexSector2: this.indexSector2, sortingSectorField: this.sortingSectorField, sortingSectorDirection: this.sortingSectorDirection, sortingSectorDetailField: this.sortingSectorDetailField, sortingSectorDetailDirection: this.sortingSectorDetailDirection, sortingSubSectorField: this.sortingSubSectorField, sortingSubSectorDirection: this.sortingSubSectorDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    SectorsAdminComponent.prototype.AddSubSector = function (sectorId, index) {
        this.router.navigate(['/admin/secure/subsector/' + this._global.encryptValue(sectorId)], {
            queryParams: {
                indexSector1: this.indexSector1, indexSector2: this.indexSector2, sortingSectorField: this.sortingSectorField, sortingSectorDirection: this.sortingSectorDirection, sortingSectorDetailField: this.sortingSectorDetailField, sortingSectorDetailDirection: this.sortingSectorDetailDirection, sortingSubSectorField: this.sortingSubSectorField, sortingSubSectorDirection: this.sortingSubSectorDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    SectorsAdminComponent.prototype.EditSubSector = function (sectorId, subSectorId) {
        this.router.navigate(['/admin/secure/subsector/' + this._global.encryptValue(sectorId) + '/' + this._global.encryptValue(subSectorId)], {
            queryParams: {
                indexSector1: this.indexSector1, indexSector2: this.indexSector2, sortingSectorField: this.sortingSectorField, sortingSectorDirection: this.sortingSectorDirection, sortingSectorDetailField: this.sortingSectorDetailField, sortingSectorDetailDirection: this.sortingSectorDetailDirection, sortingSubSectorField: this.sortingSubSectorField, sortingSubSectorDirection: this.sortingSubSectorDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    SectorsAdminComponent.prototype.ReloadPage = function (isPageChange) {
        if (isPageChange == true) {
            this.indexSector1 = -1;
            this.indexSector2 = -1;
            this.itemDetailSectors1.index = this.indexSector1;
            this.itemDetailSectors2.index = this.indexSector2;
        }
        this.router.navigate(['/admin/secure/sectors'], {
            queryParams: {
                indexSector1: this.indexSector1, indexSector2: this.indexSector2, sortingSectorField: this.sortingSectorField, sortingSectorDirection: this.sortingSectorDirection, sortingSectorDetailField: this.sortingSectorDetailField, sortingSectorDetailDirection: this.sortingSectorDetailDirection, sortingSubSectorField: this.sortingSubSectorField, sortingSubSectorDirection: this.sortingSubSectorDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    SectorsAdminComponent.prototype.DeleteSector = function (sectorId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteSector = {
                "SectorId": sectorId
            };
            this._sectorService.deleteSector(deleteSector)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { closeButton: true });
                    _this.GetSector();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    SectorsAdminComponent.prototype.DeleteSectorDetail = function (sectorId, sectorDetailId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteSectorDetail = {
                "SectorDetailId": sectorDetailId
            };
            this._sectorDetailService.deleteSectorDetail(deleteSectorDetail)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { closeButton: true });
                    _this.GetSectorDetail(_this.itemDetailSectors1.index, sectorId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    SectorsAdminComponent.prototype.DeleteSubSector = function (sectorId, subSectorId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteSubSector = {
                "SubSectorId": subSectorId
            };
            this._subSectorService.deleteSubSector(deleteSubSector)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { closeButton: true });
                    _this.GetSubSector(_this.itemDetailSectors2.index, sectorId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    SectorsAdminComponent.prototype.UpDownSectorArrow1 = function (index) {
        if (index === this.itemDetailSectors1.index) {
            this.itemDetailSectors1.index = null;
        }
        else {
            this.itemDetailSectors1.index = index;
        }
    };
    SectorsAdminComponent.prototype.UpDownSectorArrow2 = function (index) {
        if (index === this.itemDetailSectors2.index) {
            this.itemDetailSectors2.index = null;
        }
        else {
            this.itemDetailSectors2.index = index;
        }
    };
    SectorsAdminComponent.prototype.GetSectorDetail = function (index, sectorId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getSectorDetailRequest = new sectorDetail_1.GetSectorDetailRequest();
        getSectorDetailRequest.SectorId = sectorId;
        getSectorDetailRequest.IsActive = null;
        getSectorDetailRequest.OrderBy = this.sortingSectorDetailField;
        getSectorDetailRequest.OrderByDirection = this.sortingSectorDetailDirection;
        getSectorDetailRequest.PageNumber = 1;
        getSectorDetailRequest.PageSize = 100000;
        this._sectorDetailService.getSectorDetail(getSectorDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.sectorDetails = data.Response;
                if (isDeleted != true) {
                    _this.UpDownSectorArrow1(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SectorsAdminComponent.prototype.GetSubSector = function (index, sectorId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getSubSectorRequest = new subSector_1.GetSubSectorRequest();
        getSubSectorRequest.SectorId = sectorId;
        getSubSectorRequest.IsActive = null;
        getSubSectorRequest.OrderBy = this.sortingSubSectorField;
        getSubSectorRequest.OrderByDirection = this.sortingSubSectorDirection;
        getSubSectorRequest.PageNumber = 1;
        getSubSectorRequest.PageSize = 100000;
        this._subSectorService.getSubSector(getSubSectorRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.subSectors = data.Response;
                if (isDeleted != true) {
                    _this.UpDownSectorArrow2(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SECTOR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SectorsAdminComponent.prototype.ShowSectorDetail = function (index, sectorId) {
        this.indexSector1 = -1;
        if (this.itemDetailSectors1.index !== index) {
            if (sectorId) {
                this.indexSector1 = index;
                this.GetSectorDetail(index, sectorId, false);
            }
        }
        else {
            this.UpDownSectorArrow1(index);
        }
        this.ReloadPage(false);
    };
    SectorsAdminComponent.prototype.ShowSubSector = function (index, sectorId) {
        this.indexSector2 = -1;
        if (this.itemDetailSectors2.index !== index) {
            if (sectorId) {
                this.indexSector2 = index;
                this.GetSubSector(index, sectorId, false);
            }
        }
        else {
            this.UpDownSectorArrow2(index);
        }
        this.ReloadPage(false);
    };
    SectorsAdminComponent.prototype.OnSectorSort = function (fieldName) {
        this.sortingSectorDirection = (this.sortingSectorField == fieldName) ? (this.sortingSectorDirection == "A") ? "D" : "A" : "A";
        this.sortingSectorField = fieldName;
        this.ReloadPage(true);
        this.GetSector(this.searchText, this.currentPage, this.pageSize);
    };
    SectorsAdminComponent.prototype.OnSectorDetailSort = function (sectorId, fieldName) {
        this.sortingSectorDetailDirection = (this.sortingSectorDetailField == fieldName) ? (this.sortingSectorDetailDirection == "A") ? "D" : "A" : "A";
        this.sortingSectorDetailField = fieldName;
        this.ReloadPage(false);
        this.GetSectorDetail(this.itemDetailSectors1.index, sectorId, true);
    };
    SectorsAdminComponent.prototype.OnSubSectorSort = function (sectorId, fieldName) {
        this.sortingSubSectorDirection = (this.sortingSubSectorField == fieldName) ? (this.sortingSubSectorDirection == "A") ? "D" : "A" : "A";
        this.sortingSubSectorField = fieldName;
        this.ReloadPage(false);
        this.GetSubSector(this.itemDetailSectors2.index, sectorId, true);
    };
    SectorsAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './sectors.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, sector_service_1.SectorAdminService, sectorDetail_service_1.SectorDetailAdminService, subSector_service_1.SubSectorAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], SectorsAdminComponent);
    return SectorsAdminComponent;
}());
exports.SectorsAdminComponent = SectorsAdminComponent;
//# sourceMappingURL=sectors.component.js.map