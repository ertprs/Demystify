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
var authorWriteUp_1 = require("../../../model/authorWriteUp");
var authorWriteUpDetail_1 = require("../../../model/authorWriteUpDetail");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var authorWriteUp_service_1 = require("../../../service/admin/authorWriteUp.service");
var authorWriteUpDetail_service_1 = require("../../../service/admin/authorWriteUpDetail.service");
var AuthorWriteUpsAdminComponent = /** @class */ (function () {
    function AuthorWriteUpsAdminComponent(formBuilder, activatedRoute, _authorWriteUpService, _authorWriteUpDetailService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._authorWriteUpService = _authorWriteUpService;
        this._authorWriteUpDetailService = _authorWriteUpDetailService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
        this.authorWriteUpPDFServerPath = global_1.Global.AUTHOR_WRITE_UP_PDF_FILEPATH;
        this.authorWriteUpDetailPDFServerPath = global_1.Global.AUTHOR_WRITE_UP_DETAIL_PDF_FILEPATH;
        this.itemDetailAuthorWriteUps = { index: -1 };
        this.indexAuthorWriteUp = -1;
    }
    AuthorWriteUpsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.indexAuthorWriteUp = (params["indexAuthorWriteUp"]) ? parseInt(params["indexAuthorWriteUp"]) : -1;
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
            _this.sortingAuthorWriteUpField = params["sortingAuthorWriteUpField"];
            _this.sortingAuthorWriteUpDirection = params["sortingAuthorWriteUpDirection"];
            _this.sortingAuthorWriteUpDetailField = params["sortingAuthorWriteUpDetailField"];
            _this.sortingAuthorWriteUpDetailDirection = params["sortingAuthorWriteUpDetailDirection"];
        });
        this.frmAuthorWriteUp = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetAuthorWriteUp(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    AuthorWriteUpsAdminComponent.prototype.GetAuthorWriteUp = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getAuthorWriteUpRequest = new authorWriteUp_1.GetAuthorWriteUpRequest();
        getAuthorWriteUpRequest.SearchText = searchText;
        getAuthorWriteUpRequest.IsActive = null;
        getAuthorWriteUpRequest.OrderBy = this.sortingAuthorWriteUpField;
        getAuthorWriteUpRequest.OrderByDirection = this.sortingAuthorWriteUpDirection;
        getAuthorWriteUpRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getAuthorWriteUpRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._authorWriteUpService.getAuthorWriteUp(getAuthorWriteUpRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.authorWriteUps = data.Response;
                if (_this.indexAuthorWriteUp != -1 && _this.authorWriteUps.length > 0) {
                    _this.itemDetailAuthorWriteUps.index = _this.indexAuthorWriteUp;
                    _this.GetAuthorWriteUpDetail(_this.itemDetailAuthorWriteUps.index, _this.authorWriteUps[_this.itemDetailAuthorWriteUps.index].AuthorWriteUpId, true);
                }
                _this.pageSize = getAuthorWriteUpRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    AuthorWriteUpsAdminComponent.prototype.SearchAuthorWriteUp = function (formData) {
        this.indexAuthorWriteUp = -1;
        this.itemDetailAuthorWriteUps.index = this.indexAuthorWriteUp;
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.ReloadPage(false);
        this.GetAuthorWriteUp(this.searchText, this.currentPage, this.pageSize);
    };
    AuthorWriteUpsAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.ReloadPage(true);
        this.GetAuthorWriteUp(this.searchText, pageNumber, this.pageSize);
    };
    AuthorWriteUpsAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.ReloadPage(false);
        this.GetAuthorWriteUp(this.searchText, null, this.pageSize);
    };
    AuthorWriteUpsAdminComponent.prototype.EditAuthorWriteUp = function (authorWriteUpId) {
        this.router.navigate(['/admin/secure/authorwriteup/' + this._global.encryptValue(authorWriteUpId)], {
            queryParams: {
                indexAuthorWriteUp: this.indexAuthorWriteUp, sortingAuthorWriteUpField: this.sortingAuthorWriteUpField, sortingAuthorWriteUpDirection: this.sortingAuthorWriteUpDirection, sortingAuthorWriteUpDetailField: this.sortingAuthorWriteUpDetailField, sortingAuthorWriteUpDetailDirection: this.sortingAuthorWriteUpDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    AuthorWriteUpsAdminComponent.prototype.AddAuthorWriteUpDetail = function (authorWriteUpId, index) {
        this.router.navigate(['/admin/secure/authorwriteupdetail/' + this._global.encryptValue(authorWriteUpId)], {
            queryParams: {
                indexAuthorWriteUp: this.indexAuthorWriteUp, sortingAuthorWriteUpField: this.sortingAuthorWriteUpField, sortingAuthorWriteUpDirection: this.sortingAuthorWriteUpDirection, sortingAuthorWriteUpDetailField: this.sortingAuthorWriteUpDetailField, sortingAuthorWriteUpDetailDirection: this.sortingAuthorWriteUpDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    AuthorWriteUpsAdminComponent.prototype.EditAuthorWriteUpDetail = function (authorWriteUpId, authorWriteUpDetailId) {
        this.router.navigate(['/admin/secure/authorwriteupdetail/' + this._global.encryptValue(authorWriteUpId) + '/' + this._global.encryptValue(authorWriteUpDetailId)], {
            queryParams: {
                indexAuthorWriteUp: this.indexAuthorWriteUp, sortingAuthorWriteUpField: this.sortingAuthorWriteUpField, sortingAuthorWriteUpDirection: this.sortingAuthorWriteUpDirection, sortingAuthorWriteUpDetailField: this.sortingAuthorWriteUpDetailField, sortingAuthorWriteUpDetailDirection: this.sortingAuthorWriteUpDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    AuthorWriteUpsAdminComponent.prototype.ReloadPage = function (isPageChange) {
        if (isPageChange == true) {
            this.indexAuthorWriteUp = -1;
            this.itemDetailAuthorWriteUps.index = this.indexAuthorWriteUp;
        }
        this.router.navigate(['/admin/secure/authorwriteups'], {
            queryParams: {
                indexAuthorWriteUp: this.indexAuthorWriteUp, sortingAuthorWriteUpField: this.sortingAuthorWriteUpField, sortingAuthorWriteUpDirection: this.sortingAuthorWriteUpDirection, sortingAuthorWriteUpDetailField: this.sortingAuthorWriteUpDetailField, sortingAuthorWriteUpDetailDirection: this.sortingAuthorWriteUpDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    AuthorWriteUpsAdminComponent.prototype.DeleteAuthorWriteUp = function (authorWriteUpId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteAuthorWriteUp = {
                "AuthorWriteUpId": authorWriteUpId
            };
            this._authorWriteUpService.deleteAuthorWriteUp(deleteAuthorWriteUp)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { closeButton: true });
                    _this.GetAuthorWriteUp();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    AuthorWriteUpsAdminComponent.prototype.DeleteAuthorWriteUpDetail = function (authorWriteUpId, authorWriteUpDetailId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteAuthorWriteUpDetail = {
                "AuthorWriteUpDetailId": authorWriteUpDetailId
            };
            this._authorWriteUpDetailService.deleteAuthorWriteUpDetail(deleteAuthorWriteUpDetail)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { closeButton: true });
                    _this.GetAuthorWriteUpDetail(_this.itemDetailAuthorWriteUps.index, authorWriteUpId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    AuthorWriteUpsAdminComponent.prototype.UpDownAuthorWriteUpArrow = function (index) {
        if (index === this.itemDetailAuthorWriteUps.index) {
            this.itemDetailAuthorWriteUps.index = null;
        }
        else {
            this.itemDetailAuthorWriteUps.index = index;
        }
    };
    AuthorWriteUpsAdminComponent.prototype.GetAuthorWriteUpDetail = function (index, authorWriteUpId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getAuthorWriteUpDetailRequest = new authorWriteUpDetail_1.GetAuthorWriteUpDetailRequest();
        getAuthorWriteUpDetailRequest.AuthorWriteUpId = authorWriteUpId;
        getAuthorWriteUpDetailRequest.IsActive = null;
        getAuthorWriteUpDetailRequest.OrderBy = this.sortingAuthorWriteUpDetailField;
        getAuthorWriteUpDetailRequest.OrderByDirection = this.sortingAuthorWriteUpDetailDirection;
        getAuthorWriteUpDetailRequest.PageNumber = 1;
        getAuthorWriteUpDetailRequest.PageSize = 100000;
        this._authorWriteUpDetailService.getAuthorWriteUpDetail(getAuthorWriteUpDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.authorWriteUpDetails = data.Response;
                if (isDeleted != true) {
                    _this.UpDownAuthorWriteUpArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    AuthorWriteUpsAdminComponent.prototype.ShowAuthorWriteUpDetail = function (index, authorWriteUpId) {
        this.indexAuthorWriteUp = -1;
        this.authorWriteUpId = null;
        if (this.itemDetailAuthorWriteUps.index !== index) {
            if (authorWriteUpId) {
                this.authorWriteUpId = authorWriteUpId;
                this.indexAuthorWriteUp = index;
                this.GetAuthorWriteUpDetail(index, authorWriteUpId, false);
            }
        }
        else {
            this.UpDownAuthorWriteUpArrow(index);
        }
        this.ReloadPage(false);
    };
    AuthorWriteUpsAdminComponent.prototype.OnAuthorWriteUpSort = function (fieldName) {
        this.sortingAuthorWriteUpDirection = (this.sortingAuthorWriteUpField == fieldName) ? (this.sortingAuthorWriteUpDirection == "A") ? "D" : "A" : "A";
        this.sortingAuthorWriteUpField = fieldName;
        this.ReloadPage(true);
        this.GetAuthorWriteUp(this.searchText, this.currentPage, this.pageSize);
    };
    AuthorWriteUpsAdminComponent.prototype.OnAuthorWriteUpDetailSort = function (authorWriteUpId, fieldName) {
        this.sortingAuthorWriteUpDetailDirection = (this.sortingAuthorWriteUpDetailField == fieldName) ? (this.sortingAuthorWriteUpDetailDirection == "A") ? "D" : "A" : "A";
        this.sortingAuthorWriteUpDetailField = fieldName;
        this.ReloadPage(false);
        this.GetAuthorWriteUpDetail(this.itemDetailAuthorWriteUps.index, authorWriteUpId, true);
    };
    AuthorWriteUpsAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './authorWriteUps.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, authorWriteUp_service_1.AuthorWriteUpAdminService, authorWriteUpDetail_service_1.AuthorWriteUpDetailAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], AuthorWriteUpsAdminComponent);
    return AuthorWriteUpsAdminComponent;
}());
exports.AuthorWriteUpsAdminComponent = AuthorWriteUpsAdminComponent;
//# sourceMappingURL=authorWriteUps.component.js.map