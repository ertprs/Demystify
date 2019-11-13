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
var authorFAQ_1 = require("../../../model/authorFAQ");
var authorFAQDetail_1 = require("../../../model/authorFAQDetail");
var authorFAQQuestionReply_1 = require("../../../model/authorFAQQuestionReply");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var authorFAQ_service_1 = require("../../../service/admin/authorFAQ.service");
var authorFAQDetail_service_1 = require("../../../service/admin/authorFAQDetail.service");
var authorFAQQuestionReply_service_1 = require("../../../service/admin/authorFAQQuestionReply.service");
var AuthorFAQsAdminComponent = /** @class */ (function () {
    function AuthorFAQsAdminComponent(formBuilder, activatedRoute, _authorFAQService, _authorFAQDetailService, _authorFAQQuestionReplyService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._authorFAQService = _authorFAQService;
        this._authorFAQDetailService = _authorFAQDetailService;
        this._authorFAQQuestionReplyService = _authorFAQQuestionReplyService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
        this.itemDetailAuthorFAQs = { index: -1 };
        this.indexAuthorFAQ = -1;
        this.itemDetailAuthorFAQDetails = { index: -1 };
        this.indexAuthorFAQDetail = -1;
    }
    AuthorFAQsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.indexAuthorFAQ = (params["indexAuthorFAQ"]) ? parseInt(params["indexAuthorFAQ"]) : -1;
            _this.indexAuthorFAQDetail = (params["indexAuthorFAQDetail"]) ? parseInt(params["indexAuthorFAQDetail"]) : -1;
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
            _this.sortingAuthorFAQField = params["sortingAuthorFAQField"];
            _this.sortingAuthorFAQDirection = params["sortingAuthorFAQDirection"];
            _this.sortingAuthorFAQDetailField = params["sortingAuthorFAQDetailField"];
            _this.sortingAuthorFAQDetailDirection = params["sortingAuthorFAQDetailDirection"];
            _this.sortingAuthorFAQQuestionReplyField = params["sortingAuthorFAQQuestionReplyField"];
            _this.sortingAuthorFAQQuestionReplyDirection = params["sortingAuthorFAQQuestionReplyDirection"];
        });
        this.frmAuthorFAQ = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetAuthorFAQ(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    AuthorFAQsAdminComponent.prototype.GetAuthorFAQ = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getAuthorFAQRequest = new authorFAQ_1.GetAuthorFAQRequest();
        getAuthorFAQRequest.SearchText = searchText;
        getAuthorFAQRequest.IsActive = null;
        getAuthorFAQRequest.OrderBy = this.sortingAuthorFAQField;
        getAuthorFAQRequest.OrderByDirection = this.sortingAuthorFAQDirection;
        getAuthorFAQRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getAuthorFAQRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._authorFAQService.getAuthorFAQ(getAuthorFAQRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.authorFAQs = data.Response;
                if (_this.indexAuthorFAQ != -1 && _this.authorFAQs.length > 0) {
                    _this.itemDetailAuthorFAQs.index = _this.indexAuthorFAQ;
                    _this.GetAuthorFAQDetail(_this.itemDetailAuthorFAQs.index, _this.authorFAQs[_this.itemDetailAuthorFAQs.index].AuthorFAQId, true);
                }
                _this.pageSize = getAuthorFAQRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    AuthorFAQsAdminComponent.prototype.SearchAuthorFAQ = function (formData) {
        this.indexAuthorFAQ = -1;
        this.indexAuthorFAQDetail = -1;
        this.itemDetailAuthorFAQs.index = this.indexAuthorFAQ;
        this.itemDetailAuthorFAQDetails.index = this.indexAuthorFAQDetail;
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.ReloadPage(false);
        this.GetAuthorFAQ(this.searchText, this.currentPage, this.pageSize);
    };
    AuthorFAQsAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.ReloadPage(true);
        this.GetAuthorFAQ(this.searchText, pageNumber, this.pageSize);
    };
    AuthorFAQsAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.ReloadPage(false);
        this.GetAuthorFAQ(this.searchText, null, this.pageSize);
    };
    AuthorFAQsAdminComponent.prototype.EditAuthorFAQ = function (authorFAQId) {
        this.router.navigate(['/admin/secure/authorfaq/' + this._global.encryptValue(authorFAQId)], {
            queryParams: {
                indexAuthorFAQ: this.indexAuthorFAQ, indexAuthorFAQDetail: this.indexAuthorFAQDetail, sortingAuthorFAQField: this.sortingAuthorFAQField, sortingAuthorFAQDirection: this.sortingAuthorFAQDirection, sortingAuthorFAQQuestionReplyField: this.sortingAuthorFAQQuestionReplyField, sortingAuthorFAQQuestionReplyDirection: this.sortingAuthorFAQQuestionReplyDirection, sortingAuthorFAQDetailField: this.sortingAuthorFAQDetailField, sortingAuthorFAQDetailDirection: this.sortingAuthorFAQDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    AuthorFAQsAdminComponent.prototype.AddAuthorFAQDetail = function (authorFAQId, index) {
        this.router.navigate(['/admin/secure/authorfaqdetail/' + this._global.encryptValue(authorFAQId)], {
            queryParams: {
                indexAuthorFAQ: this.indexAuthorFAQ, indexAuthorFAQDetail: this.indexAuthorFAQDetail, sortingAuthorFAQField: this.sortingAuthorFAQField, sortingAuthorFAQDirection: this.sortingAuthorFAQDirection, sortingAuthorFAQQuestionReplyField: this.sortingAuthorFAQQuestionReplyField, sortingAuthorFAQQuestionReplyDirection: this.sortingAuthorFAQQuestionReplyDirection, sortingAuthorFAQDetailField: this.sortingAuthorFAQDetailField, sortingAuthorFAQDetailDirection: this.sortingAuthorFAQDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    AuthorFAQsAdminComponent.prototype.EditAuthorFAQDetail = function (authorFAQId, authorFAQDetailId) {
        this.router.navigate(['/admin/secure/authorfaqdetail/' + this._global.encryptValue(authorFAQId) + '/' + this._global.encryptValue(authorFAQDetailId)], {
            queryParams: {
                indexAuthorFAQ: this.indexAuthorFAQ, indexAuthorFAQDetail: this.indexAuthorFAQDetail, sortingAuthorFAQField: this.sortingAuthorFAQField, sortingAuthorFAQDirection: this.sortingAuthorFAQDirection, sortingAuthorFAQQuestionReplyField: this.sortingAuthorFAQQuestionReplyField, sortingAuthorFAQQuestionReplyDirection: this.sortingAuthorFAQQuestionReplyDirection, sortingAuthorFAQDetailField: this.sortingAuthorFAQDetailField, sortingAuthorFAQDetailDirection: this.sortingAuthorFAQDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    AuthorFAQsAdminComponent.prototype.AddAuthorFAQQuestionReply = function (authorFAQId, authorFAQDetailId, index) {
        this.router.navigate(['/admin/secure/authorfaqquestionreply/' + this._global.encryptValue(authorFAQId) + '/' + this._global.encryptValue(authorFAQDetailId)], {
            queryParams: {
                indexAuthorFAQ: this.indexAuthorFAQ, indexAuthorFAQDetail: this.indexAuthorFAQDetail, sortingAuthorFAQField: this.sortingAuthorFAQField, sortingAuthorFAQDirection: this.sortingAuthorFAQDirection, sortingAuthorFAQQuestionReplyField: this.sortingAuthorFAQQuestionReplyField, sortingAuthorFAQQuestionReplyDirection: this.sortingAuthorFAQQuestionReplyDirection, sortingAuthorFAQDetailField: this.sortingAuthorFAQDetailField, sortingAuthorFAQDetailDirection: this.sortingAuthorFAQDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    AuthorFAQsAdminComponent.prototype.EditAuthorFAQQuestionReply = function (authorFAQId, authorFAQDetailId, authorFAQQuestionReplyId) {
        this.router.navigate(['/admin/secure/authorfaqquestionreply/' + this._global.encryptValue(authorFAQId) + '/' + this._global.encryptValue(authorFAQDetailId) + '/' + this._global.encryptValue(authorFAQQuestionReplyId)], {
            queryParams: {
                indexAuthorFAQ: this.indexAuthorFAQ, indexAuthorFAQDetail: this.indexAuthorFAQDetail, sortingAuthorFAQField: this.sortingAuthorFAQField, sortingAuthorFAQDirection: this.sortingAuthorFAQDirection, sortingAuthorFAQQuestionReplyField: this.sortingAuthorFAQQuestionReplyField, sortingAuthorFAQQuestionReplyDirection: this.sortingAuthorFAQQuestionReplyDirection, sortingAuthorFAQDetailField: this.sortingAuthorFAQDetailField, sortingAuthorFAQDetailDirection: this.sortingAuthorFAQDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    AuthorFAQsAdminComponent.prototype.ReloadPage = function (isPageChange) {
        if (isPageChange == true) {
            this.indexAuthorFAQ = -1;
            this.itemDetailAuthorFAQs.index = this.indexAuthorFAQ;
        }
        this.router.navigate(['/admin/secure/authorfaqs'], {
            queryParams: {
                indexAuthorFAQ: this.indexAuthorFAQ, indexAuthorFAQDetail: this.indexAuthorFAQDetail, sortingAuthorFAQField: this.sortingAuthorFAQField, sortingAuthorFAQDirection: this.sortingAuthorFAQDirection, sortingAuthorFAQQuestionReplyField: this.sortingAuthorFAQQuestionReplyField, sortingAuthorFAQQuestionReplyDirection: this.sortingAuthorFAQQuestionReplyDirection, sortingAuthorFAQDetailField: this.sortingAuthorFAQDetailField, sortingAuthorFAQDetailDirection: this.sortingAuthorFAQDetailDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    AuthorFAQsAdminComponent.prototype.DeleteAuthorFAQ = function (authorFAQId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteAuthorFAQ = {
                "AuthorFAQId": authorFAQId
            };
            this._authorFAQService.deleteAuthorFAQ(deleteAuthorFAQ)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { closeButton: true });
                    _this.GetAuthorFAQ();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    AuthorFAQsAdminComponent.prototype.DeleteAuthorFAQDetail = function (authorFAQId, authorFAQDetailId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteAuthorFAQDetail = {
                "AuthorFAQDetailId": authorFAQDetailId
            };
            this._authorFAQDetailService.deleteAuthorFAQDetail(deleteAuthorFAQDetail)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { closeButton: true });
                    _this.GetAuthorFAQDetail(_this.itemDetailAuthorFAQs.index, authorFAQId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    AuthorFAQsAdminComponent.prototype.DeleteAuthorFAQQuestionReply = function (authorFAQDetailId, authorFAQQuestionReplyId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deleteAuthorFAQQuestionReply = {
                "AuthorFAQQuestionReplyId": authorFAQQuestionReplyId
            };
            this._authorFAQQuestionReplyService.deleteAuthorFAQQuestionReply(deleteAuthorFAQQuestionReply)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { closeButton: true });
                    _this.GetAuthorFAQQuestionReply(_this.itemDetailAuthorFAQDetails.index, authorFAQDetailId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    AuthorFAQsAdminComponent.prototype.UpDownAuthorFAQArrow = function (index) {
        this.itemDetailAuthorFAQDetails.index = -1;
        if (index === this.itemDetailAuthorFAQs.index) {
            this.itemDetailAuthorFAQs.index = null;
        }
        else {
            this.itemDetailAuthorFAQs.index = index;
        }
    };
    AuthorFAQsAdminComponent.prototype.UpDownAuthorFAQDetailArrow = function (index) {
        if (index === this.itemDetailAuthorFAQDetails.index) {
            this.itemDetailAuthorFAQDetails.index = null;
        }
        else {
            this.itemDetailAuthorFAQDetails.index = index;
        }
    };
    AuthorFAQsAdminComponent.prototype.GetAuthorFAQDetail = function (index, authorFAQId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getAuthorFAQDetailRequest = new authorFAQDetail_1.GetAuthorFAQDetailRequest();
        getAuthorFAQDetailRequest.AuthorFAQId = authorFAQId;
        getAuthorFAQDetailRequest.IsActive = null;
        getAuthorFAQDetailRequest.OrderBy = this.sortingAuthorFAQDetailField;
        getAuthorFAQDetailRequest.OrderByDirection = this.sortingAuthorFAQDetailDirection;
        getAuthorFAQDetailRequest.PageNumber = 1;
        getAuthorFAQDetailRequest.PageSize = 100000;
        this._authorFAQDetailService.getAuthorFAQDetail(getAuthorFAQDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.authorFAQDetails = data.Response;
                if (_this.indexAuthorFAQDetail != -1 && _this.authorFAQDetails.length > 0) {
                    _this.itemDetailAuthorFAQDetails.index = _this.indexAuthorFAQDetail;
                    _this.GetAuthorFAQQuestionReply(_this.itemDetailAuthorFAQDetails.index, _this.authorFAQDetails[_this.itemDetailAuthorFAQDetails.index].AuthorFAQDetailId, true);
                }
                if (isDeleted != true) {
                    _this.UpDownAuthorFAQArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    AuthorFAQsAdminComponent.prototype.GetAuthorFAQQuestionReply = function (index, authorFAQDetailId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getAuthorFAQQuestionReplyRequest = new authorFAQQuestionReply_1.GetAuthorFAQQuestionReplyRequest();
        getAuthorFAQQuestionReplyRequest.AuthorFAQDetailId = authorFAQDetailId;
        getAuthorFAQQuestionReplyRequest.IsActive = null;
        getAuthorFAQQuestionReplyRequest.OrderBy = this.sortingAuthorFAQDetailField;
        getAuthorFAQQuestionReplyRequest.OrderByDirection = this.sortingAuthorFAQDetailDirection;
        getAuthorFAQQuestionReplyRequest.PageNumber = 1;
        getAuthorFAQQuestionReplyRequest.PageSize = 100000;
        this._authorFAQQuestionReplyService.getAuthorFAQQuestionReply(getAuthorFAQQuestionReplyRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.authorFAQQuestionReplies = data.Response;
                if (isDeleted != true) {
                    _this.UpDownAuthorFAQDetailArrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    AuthorFAQsAdminComponent.prototype.ShowAuthorFAQDetail = function (index, authorFAQId) {
        this.indexAuthorFAQ = -1;
        this.indexAuthorFAQDetail = -1;
        if (this.itemDetailAuthorFAQs.index !== index) {
            if (authorFAQId) {
                this.indexAuthorFAQ = index;
                this.GetAuthorFAQDetail(index, authorFAQId, false);
            }
        }
        else {
            this.UpDownAuthorFAQArrow(index);
        }
        this.ReloadPage(false);
    };
    AuthorFAQsAdminComponent.prototype.ShowAuthorFAQQuestionReply = function (index, authorFAQDetailId) {
        this.indexAuthorFAQDetail = -1;
        if (this.itemDetailAuthorFAQDetails.index !== index) {
            if (authorFAQDetailId) {
                this.indexAuthorFAQDetail = index;
                this.GetAuthorFAQQuestionReply(index, authorFAQDetailId, false);
            }
        }
        else {
            this.UpDownAuthorFAQDetailArrow(index);
        }
        this.ReloadPage(false);
    };
    AuthorFAQsAdminComponent.prototype.OnAuthorFAQSort = function (fieldName) {
        this.sortingAuthorFAQDirection = (this.sortingAuthorFAQField == fieldName) ? (this.sortingAuthorFAQDirection == "A") ? "D" : "A" : "A";
        this.sortingAuthorFAQField = fieldName;
        this.ReloadPage(true);
        this.GetAuthorFAQ(this.searchText, this.currentPage, this.pageSize);
    };
    AuthorFAQsAdminComponent.prototype.OnAuthorFAQDetailSort = function (authorFAQId, fieldName) {
        this.indexAuthorFAQDetail = -1;
        this.itemDetailAuthorFAQDetails.index = this.indexAuthorFAQDetail;
        this.sortingAuthorFAQDetailDirection = (this.sortingAuthorFAQDetailField == fieldName) ? (this.sortingAuthorFAQDetailDirection == "A") ? "D" : "A" : "A";
        this.sortingAuthorFAQDetailField = fieldName;
        this.ReloadPage(false);
        this.GetAuthorFAQDetail(this.itemDetailAuthorFAQs.index, authorFAQId, true);
    };
    AuthorFAQsAdminComponent.prototype.OnAuthorFAQQuestionReplySort = function (authorFAQDetailId, fieldName) {
        this.sortingAuthorFAQQuestionReplyDirection = (this.sortingAuthorFAQQuestionReplyField == fieldName) ? (this.sortingAuthorFAQQuestionReplyDirection == "A") ? "D" : "A" : "A";
        this.sortingAuthorFAQQuestionReplyField = fieldName;
        this.ReloadPage(false);
        this.GetAuthorFAQQuestionReply(this.itemDetailAuthorFAQDetails.index, authorFAQDetailId, true);
    };
    AuthorFAQsAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './authorFAQs.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, authorFAQ_service_1.AuthorFAQAdminService, authorFAQDetail_service_1.AuthorFAQDetailAdminService, authorFAQQuestionReply_service_1.AuthorFAQQuestionReplyAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], AuthorFAQsAdminComponent);
    return AuthorFAQsAdminComponent;
}());
exports.AuthorFAQsAdminComponent = AuthorFAQsAdminComponent;
//# sourceMappingURL=authorFAQs.component.js.map