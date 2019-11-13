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
var aPDIRCircular_1 = require("../../../model/aPDIRCircular");
var aPDIRCircularBefore_1 = require("../../../model/aPDIRCircularBefore");
var aPDIRCircularAfter_1 = require("../../../model/aPDIRCircularAfter");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var aPDIRCircular_service_1 = require("../../../service/admin/aPDIRCircular.service");
var aPDIRCircularBefore_service_1 = require("../../../service/admin/aPDIRCircularBefore.service");
var aPDIRCircularAfter_service_1 = require("../../../service/admin/aPDIRCircularAfter.service");
var APDIRCircularsAdminComponent = /** @class */ (function () {
    function APDIRCircularsAdminComponent(formBuilder, activatedRoute, _aPDIRCircularService, _aPDIRCircularBeforeService, _aPDIRCircularAfterService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._aPDIRCircularService = _aPDIRCircularService;
        this._aPDIRCircularBeforeService = _aPDIRCircularBeforeService;
        this._aPDIRCircularAfterService = _aPDIRCircularAfterService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
        this.pdfServerPath = global_1.Global.APDIRCIRCULAR_PDF_FILEPATH;
        this.itemDetailAPDIRCirculars1 = { index: -1 };
        this.itemDetailAPDIRCirculars2 = { index: -1 };
        this.indexAPDIRCircular1 = -1;
        this.indexAPDIRCircular2 = -1;
    }
    APDIRCircularsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.indexAPDIRCircular1 = (params["indexAPDIRCircular1"]) ? parseInt(params["indexAPDIRCircular1"]) : -1;
            _this.indexAPDIRCircular2 = (params["indexAPDIRCircular2"]) ? parseInt(params["indexAPDIRCircular2"]) : -1;
            _this.sortingAPDIRCircularField = (params["sortingAPDIRCircularField"]) ? params["sortingAPDIRCircularField"] : "APDIRCircularDate";
            _this.sortingAPDIRCircularDirection = (params["sortingAPDIRCircularDirection"]) ? params["sortingAPDIRCircularDirection"] : "D";
            _this.sortingAPDIRCircularBeforeField = params["sortingAPDIRCircularBeforeField"];
            _this.sortingAPDIRCircularBeforeDirection = params["sortingAPDIRCircularBeforeDirection"];
            _this.sortingAPDIRCircularAfterField = params["sortingAPDIRCircularAfterField"];
            _this.sortingAPDIRCircularAfterDirection = params["sortingAPDIRCircularAfterDirection"];
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmAPDIRCircular = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetAPDIRCircular(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    APDIRCircularsAdminComponent.prototype.GetAPDIRCircular = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getAPDIRCircularRequest = new aPDIRCircular_1.GetAPDIRCircularRequest();
        getAPDIRCircularRequest.SearchText = searchText;
        getAPDIRCircularRequest.IsActive = null;
        getAPDIRCircularRequest.OrderBy = this.sortingAPDIRCircularField;
        getAPDIRCircularRequest.OrderByDirection = this.sortingAPDIRCircularDirection;
        getAPDIRCircularRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getAPDIRCircularRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._aPDIRCircularService.getAPDIRCircular(getAPDIRCircularRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.aPDIRCirculars = data.Response;
                if (_this.indexAPDIRCircular1 != -1 && _this.aPDIRCirculars.length > 0) {
                    _this.itemDetailAPDIRCirculars1.index = _this.indexAPDIRCircular1;
                    _this.GetAPDIRCircularBefore(_this.itemDetailAPDIRCirculars1.index, _this.aPDIRCirculars[_this.itemDetailAPDIRCirculars1.index].APDIRCircularId, true);
                }
                if (_this.indexAPDIRCircular2 != -1 && _this.aPDIRCirculars.length > 0) {
                    _this.itemDetailAPDIRCirculars2.index = _this.indexAPDIRCircular2;
                    _this.GetAPDIRCircularAfter(_this.itemDetailAPDIRCirculars2.index, _this.aPDIRCirculars[_this.itemDetailAPDIRCirculars2.index].APDIRCircularId, true);
                }
                _this.pageSize = getAPDIRCircularRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    APDIRCircularsAdminComponent.prototype.SearchAPDIRCircular = function (formData) {
        this.indexAPDIRCircular1 = -1;
        this.indexAPDIRCircular2 = -1;
        this.itemDetailAPDIRCirculars1.index = this.indexAPDIRCircular1;
        this.itemDetailAPDIRCirculars2.index = this.indexAPDIRCircular2;
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.ReloadPage(false);
        this.GetAPDIRCircular(this.searchText, this.currentPage, this.pageSize);
    };
    APDIRCircularsAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.ReloadPage(true);
        this.GetAPDIRCircular(this.searchText, pageNumber, this.pageSize);
    };
    APDIRCircularsAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.ReloadPage(false);
        this.GetAPDIRCircular(this.searchText, null, this.pageSize);
    };
    APDIRCircularsAdminComponent.prototype.EditAPDIRCircular = function (aPDIRCircularId) {
        this.router.navigate(['/admin/secure/apdircircular/' + this._global.encryptValue(aPDIRCircularId)], {
            queryParams: {
                indexAPDIRCircular1: this.indexAPDIRCircular1, indexAPDIRCircular2: this.indexAPDIRCircular2, sortingAPDIRCircularField: this.sortingAPDIRCircularField, sortingAPDIRCircularDirection: this.sortingAPDIRCircularDirection, sortingAPDIRCircularBeforeField: this.sortingAPDIRCircularBeforeField, sortingAPDIRCircularBeforeDirection: this.sortingAPDIRCircularBeforeDirection, sortingAPDIRCircularAfterField: this.sortingAPDIRCircularAfterField, sortingAPDIRCircularAfterDirection: this.sortingAPDIRCircularAfterDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    APDIRCircularsAdminComponent.prototype.AddAPDIRCircularBefore = function (aPDIRCircularId, index) {
        this.router.navigate(['/admin/secure/apdircircularbefore/' + this._global.encryptValue(aPDIRCircularId)], {
            queryParams: {
                indexAPDIRCircular1: this.indexAPDIRCircular1, indexAPDIRCircular2: this.indexAPDIRCircular2, sortingAPDIRCircularField: this.sortingAPDIRCircularField, sortingAPDIRCircularDirection: this.sortingAPDIRCircularDirection, sortingAPDIRCircularBeforeField: this.sortingAPDIRCircularBeforeField, sortingAPDIRCircularBeforeDirection: this.sortingAPDIRCircularBeforeDirection, sortingAPDIRCircularAfterField: this.sortingAPDIRCircularAfterField, sortingAPDIRCircularAfterDirection: this.sortingAPDIRCircularAfterDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    APDIRCircularsAdminComponent.prototype.EditAPDIRCircularBefore = function (aPDIRCircularBeforeId, aPDIRCircularId) {
        this.router.navigate(['/admin/secure/apdircircularbefore/' + this._global.encryptValue(aPDIRCircularId) + "/" + this._global.encryptValue(aPDIRCircularBeforeId)], {
            queryParams: {
                indexAPDIRCircular1: this.indexAPDIRCircular1, indexAPDIRCircular2: this.indexAPDIRCircular2, sortingAPDIRCircularField: this.sortingAPDIRCircularField, sortingAPDIRCircularDirection: this.sortingAPDIRCircularDirection, sortingAPDIRCircularBeforeField: this.sortingAPDIRCircularBeforeField, sortingAPDIRCircularBeforeDirection: this.sortingAPDIRCircularBeforeDirection, sortingAPDIRCircularAfterField: this.sortingAPDIRCircularAfterField, sortingAPDIRCircularAfterDirection: this.sortingAPDIRCircularAfterDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    APDIRCircularsAdminComponent.prototype.AddAPDIRCircularAfter = function (aPDIRCircularId, index) {
        this.router.navigate(['/admin/secure/apdircircularafter/' + this._global.encryptValue(aPDIRCircularId)], {
            queryParams: {
                indexAPDIRCircular1: this.indexAPDIRCircular1, indexAPDIRCircular2: this.indexAPDIRCircular2, sortingAPDIRCircularField: this.sortingAPDIRCircularField, sortingAPDIRCircularDirection: this.sortingAPDIRCircularDirection, sortingAPDIRCircularBeforeField: this.sortingAPDIRCircularBeforeField, sortingAPDIRCircularBeforeDirection: this.sortingAPDIRCircularBeforeDirection, sortingAPDIRCircularAfterField: this.sortingAPDIRCircularAfterField, sortingAPDIRCircularAfterDirection: this.sortingAPDIRCircularAfterDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    APDIRCircularsAdminComponent.prototype.EditAPDIRCircularAfter = function (aPDIRCircularAfterId, aPDIRCircularId) {
        this.router.navigate(['/admin/secure/apdircircularafter/' + this._global.encryptValue(aPDIRCircularId) + "/" + this._global.encryptValue(aPDIRCircularAfterId)], {
            queryParams: {
                indexAPDIRCircular1: this.indexAPDIRCircular1, indexAPDIRCircular2: this.indexAPDIRCircular2, sortingAPDIRCircularField: this.sortingAPDIRCircularField, sortingAPDIRCircularDirection: this.sortingAPDIRCircularDirection, sortingAPDIRCircularBeforeField: this.sortingAPDIRCircularBeforeField, sortingAPDIRCircularBeforeDirection: this.sortingAPDIRCircularBeforeDirection, sortingAPDIRCircularAfterField: this.sortingAPDIRCircularAfterField, sortingAPDIRCircularAfterDirection: this.sortingAPDIRCircularAfterDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    APDIRCircularsAdminComponent.prototype.ReloadPage = function (isPageChange) {
        if (isPageChange == true) {
            this.indexAPDIRCircular1 = -1;
            this.indexAPDIRCircular2 = -1;
            this.itemDetailAPDIRCirculars1.index = this.indexAPDIRCircular1;
            this.itemDetailAPDIRCirculars2.index = this.indexAPDIRCircular2;
        }
        this.router.navigate(['/admin/secure/apdircirculars'], {
            queryParams: {
                indexAPDIRCircular1: this.indexAPDIRCircular1, indexAPDIRCircular2: this.indexAPDIRCircular2, sortingAPDIRCircularField: this.sortingAPDIRCircularField, sortingAPDIRCircularDirection: this.sortingAPDIRCircularDirection, sortingAPDIRCircularBeforeField: this.sortingAPDIRCircularBeforeField, sortingAPDIRCircularBeforeDirection: this.sortingAPDIRCircularBeforeDirection, sortingAPDIRCircularAfterField: this.sortingAPDIRCircularAfterField, sortingAPDIRCircularAfterDirection: this.sortingAPDIRCircularAfterDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    APDIRCircularsAdminComponent.prototype.DeleteAPDIRCircular = function (aPDIRCircularId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteAPDIRCircular = {
                "APDIRCircularId": aPDIRCircularId
            };
            this._aPDIRCircularService.deleteAPDIRCircular(deleteAPDIRCircular)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
                    _this.GetAPDIRCircular();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    APDIRCircularsAdminComponent.prototype.DeleteAPDIRCircularBefore = function (aPDIRCircularId, aPDIRCircularBeforeId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteAPDIRCircularBefore = {
                "APDIRCircularBeforeId": aPDIRCircularBeforeId
            };
            this._aPDIRCircularBeforeService.deleteAPDIRCircularBefore(deleteAPDIRCircularBefore)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
                    _this.GetAPDIRCircularBefore(_this.itemDetailAPDIRCirculars1.index, aPDIRCircularId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    APDIRCircularsAdminComponent.prototype.DeleteAPDIRCircularAfter = function (aPDIRCircularId, aPDIRCircularAfterId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteAPDIRCircularAfter = {
                "APDIRCircularAfterId": aPDIRCircularAfterId
            };
            this._aPDIRCircularAfterService.deleteAPDIRCircularAfter(deleteAPDIRCircularAfter)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
                    _this.GetAPDIRCircularAfter(_this.itemDetailAPDIRCirculars2.index, aPDIRCircularId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    APDIRCircularsAdminComponent.prototype.UpDownAPDIRCircular1Arrow = function (index) {
        if (index === this.itemDetailAPDIRCirculars1.index) {
            this.itemDetailAPDIRCirculars1.index = null;
        }
        else {
            this.itemDetailAPDIRCirculars1.index = index;
        }
    };
    APDIRCircularsAdminComponent.prototype.UpDownAPDIRCircular2Arrow = function (index) {
        if (index === this.itemDetailAPDIRCirculars2.index) {
            this.itemDetailAPDIRCirculars2.index = null;
        }
        else {
            this.itemDetailAPDIRCirculars2.index = index;
        }
    };
    APDIRCircularsAdminComponent.prototype.GetAPDIRCircularBefore = function (index, aPDIRCircularId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getAPDIRCircularBeforeRequest = new aPDIRCircularBefore_1.GetAPDIRCircularBeforeRequest();
        getAPDIRCircularBeforeRequest.APDIRCircularParentId = aPDIRCircularId;
        getAPDIRCircularBeforeRequest.IsActive = null;
        getAPDIRCircularBeforeRequest.OrderBy = this.sortingAPDIRCircularBeforeField;
        getAPDIRCircularBeforeRequest.OrderByDirection = this.sortingAPDIRCircularBeforeDirection;
        getAPDIRCircularBeforeRequest.PageNumber = 1;
        getAPDIRCircularBeforeRequest.PageSize = 100000;
        this._aPDIRCircularBeforeService.getAPDIRCircularBefore(getAPDIRCircularBeforeRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.aPDIRCircularBefores = data.Response;
                if (isDeleted != true) {
                    _this.UpDownAPDIRCircular1Arrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    APDIRCircularsAdminComponent.prototype.GetAPDIRCircularAfter = function (index, aPDIRCircularId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getAPDIRCircularAfterRequest = new aPDIRCircularAfter_1.GetAPDIRCircularAfterRequest();
        getAPDIRCircularAfterRequest.APDIRCircularParentId = aPDIRCircularId;
        getAPDIRCircularAfterRequest.IsActive = null;
        getAPDIRCircularAfterRequest.OrderBy = this.sortingAPDIRCircularBeforeField;
        getAPDIRCircularAfterRequest.OrderByDirection = this.sortingAPDIRCircularBeforeDirection;
        getAPDIRCircularAfterRequest.PageNumber = 1;
        getAPDIRCircularAfterRequest.PageSize = 100000;
        this._aPDIRCircularAfterService.getAPDIRCircularAfter(getAPDIRCircularAfterRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.aPDIRCircularAfters = data.Response;
                if (isDeleted != true) {
                    _this.UpDownAPDIRCircular2Arrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    APDIRCircularsAdminComponent.prototype.ShowAPDIRCircularBefore = function (index, aPDIRCircularId) {
        this.indexAPDIRCircular1 = -1;
        if (this.itemDetailAPDIRCirculars1.index !== index) {
            if (aPDIRCircularId) {
                this.indexAPDIRCircular1 = index;
                this.GetAPDIRCircularBefore(index, aPDIRCircularId, false);
            }
        }
        else {
            this.UpDownAPDIRCircular1Arrow(index);
        }
        this.ReloadPage(false);
    };
    APDIRCircularsAdminComponent.prototype.ShowAPDIRCircularAfter = function (index, aPDIRCircularId) {
        this.indexAPDIRCircular2 = -1;
        if (this.itemDetailAPDIRCirculars2.index !== index) {
            if (aPDIRCircularId) {
                this.indexAPDIRCircular2 = index;
                this.GetAPDIRCircularAfter(index, aPDIRCircularId, false);
            }
        }
        else {
            this.UpDownAPDIRCircular2Arrow(index);
        }
        this.ReloadPage(false);
    };
    APDIRCircularsAdminComponent.prototype.OnAPDIRCircularSort = function (fieldName) {
        this.sortingAPDIRCircularDirection = (this.sortingAPDIRCircularField == fieldName) ? (this.sortingAPDIRCircularDirection == "A") ? "D" : "A" : "A";
        this.sortingAPDIRCircularField = fieldName;
        this.ReloadPage(true);
        this.GetAPDIRCircular(this.searchText, this.currentPage, this.pageSize);
    };
    APDIRCircularsAdminComponent.prototype.OnAPDIRCircularBeforeSort = function (aPDIRCircularId, fieldName) {
        this.sortingAPDIRCircularBeforeDirection = (this.sortingAPDIRCircularBeforeField == fieldName) ? (this.sortingAPDIRCircularBeforeDirection == "A") ? "D" : "A" : "A";
        this.sortingAPDIRCircularBeforeField = fieldName;
        this.ReloadPage(false);
        this.GetAPDIRCircularBefore(this.itemDetailAPDIRCirculars1.index, aPDIRCircularId, true);
    };
    APDIRCircularsAdminComponent.prototype.OnAPDIRCircularAfterSort = function (aPDIRCircularId, fieldName) {
        this.sortingAPDIRCircularAfterDirection = (this.sortingAPDIRCircularAfterField == fieldName) ? (this.sortingAPDIRCircularAfterDirection == "A") ? "D" : "A" : "A";
        this.sortingAPDIRCircularAfterField = fieldName;
        this.ReloadPage(false);
        this.GetAPDIRCircularAfter(this.itemDetailAPDIRCirculars2.index, aPDIRCircularId, true);
    };
    APDIRCircularsAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './aPDIRCirculars.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, aPDIRCircular_service_1.APDIRCircularAdminService, aPDIRCircularBefore_service_1.APDIRCircularBeforeAdminService, aPDIRCircularAfter_service_1.APDIRCircularAfterAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], APDIRCircularsAdminComponent);
    return APDIRCircularsAdminComponent;
}());
exports.APDIRCircularsAdminComponent = APDIRCircularsAdminComponent;
//# sourceMappingURL=aPDIRCirculars.component.js.map