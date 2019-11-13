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
var authorFAQ_1 = require("../../../model/authorFAQ");
var authorFAQDetail_1 = require("../../../model/authorFAQDetail");
var authorFAQDetail_service_1 = require("../../../service/admin/authorFAQDetail.service");
var authorFAQ_service_1 = require("../../../service/admin/authorFAQ.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var AuthorFAQDetailAdminComponent = /** @class */ (function () {
    function AuthorFAQDetailAdminComponent(formBuilder, toastr, activatedRoute, router, _authorFAQService, _authorFAQDetailService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._authorFAQService = _authorFAQService;
        this._authorFAQDetailService = _authorFAQDetailService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.subTopics = [];
        this.authorFAQDetailId = 0;
        this.searchText = '';
        this.authorFAQ = new authorFAQ_1.AuthorFAQ();
        this.isSubmited = false;
    }
    AuthorFAQDetailAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var authorFAQDetailId = _this._global.decryptValue(params['authorFAQDetailId']);
            var authorFAQId = _this._global.decryptValue(params['authorFAQId']);
            if (authorFAQId) {
                _this.authorFAQId = parseInt(authorFAQId);
                _this.GetAuthorFAQ(_this.authorFAQId);
                if (authorFAQDetailId) {
                    _this.addUpdateText = "Update";
                    _this.authorFAQDetailId = parseInt(authorFAQDetailId);
                    _this.EditAuthorFAQDetail(parseInt(authorFAQDetailId));
                }
                else {
                    _this.GetSubTopic(null);
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.router.navigate(['/admin/secure/authorfaqdetails'], {
                    queryParams: {
                        indexAuthorFAQ: params["indexAuthorFAQ"], indexAuthorFAQDetail: params["indexAuthorFAQDetail"], sortingAuthorFAQField: params["sortingAuthorFAQField"], sortingAuthorFAQDirection: params["sortingAuthorFAQDirection"], sortingAuthorFAQDetailField: params["sortingAuthorFAQDetailField"], sortingAuthorFAQDetailDirection: params["sortingAuthorFAQDetailDirection"], sortingAuthorFAQQuestionReplyField: params["sortingAuthorFAQQuestionReplyField"], sortingAuthorFAQQuestionReplyDirection: params["sortingAuthorFAQQuestionReplyDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                    }
                });
            }
        });
        this.frmAuthorFAQDetail = this.formBuilder.group({
            AuthorFAQDetailId: [''],
            AuthorFAQId: [this.authorFAQId],
            SubTopicId: ['', forms_1.Validators.required]
        });
    };
    AuthorFAQDetailAdminComponent.prototype.GetAuthorFAQ = function (authorFAQId) {
        var _this = this;
        this.spinnerService.show();
        var getAuthorFAQRequest = new authorFAQ_1.GetAuthorFAQRequest();
        getAuthorFAQRequest.AuthorFAQId = authorFAQId;
        getAuthorFAQRequest.IsActive = null;
        this._authorFAQService.getAuthorFAQ(getAuthorFAQRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.authorFAQ = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    AuthorFAQDetailAdminComponent.prototype.GetSubTopic = function (authorFAQDetailData) {
        var _this = this;
        this.spinnerService.show();
        var getSubTopicRequest = new authorFAQDetail_1.GetSubTopicRequest();
        this._authorFAQDetailService.getSubTopic(getSubTopicRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.subTopics = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.subTopics.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.subTopics.push({ Value: item.SubTopicId, Text: item.SubTopicName });
                });
                _this.frmAuthorFAQDetail.get("SubTopicId").setValue((authorFAQDetailData != null) ? authorFAQDetailData.SubTopicId : "");
                _this.frmAuthorFAQDetail.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_DETAIL_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_DETAIL_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    AuthorFAQDetailAdminComponent.prototype.EditAuthorFAQDetail = function (authorFAQDetailId) {
        var _this = this;
        this.spinnerService.show();
        var getAuthorFAQDetailRequest = new authorFAQDetail_1.GetAuthorFAQDetailRequest();
        getAuthorFAQDetailRequest.AuthorFAQDetailId = authorFAQDetailId;
        getAuthorFAQDetailRequest.IsActive = null;
        this._authorFAQDetailService.getAuthorFAQDetail(getAuthorFAQDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetSubTopic(data.Response[0]);
            _this.frmAuthorFAQDetail.setValue({
                AuthorFAQDetailId: authorFAQDetailId,
                AuthorFAQId: data.Response[0].AuthorFAQId,
                SubTopicId: data.Response[0].SubTopicId,
            });
            _this.frmAuthorFAQDetail.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    AuthorFAQDetailAdminComponent.prototype.SaveAuthorFAQDetail = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.AuthorFAQDetailId) {
            this._authorFAQDetailService.updateAuthorFAQDetail(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/authorfaqs'], {
                            queryParams: {
                                indexAuthorFAQ: params["indexAuthorFAQ"], indexAuthorFAQDetail: params["indexAuthorFAQDetail"], sortingAuthorFAQField: params["sortingAuthorFAQField"], sortingAuthorFAQDirection: params["sortingAuthorFAQDirection"], sortingAuthorFAQDetailField: params["sortingAuthorFAQDetailField"], sortingAuthorFAQDetailDirection: params["sortingAuthorFAQDetailDirection"], sortingAuthorFAQQuestionReplyField: params["sortingAuthorFAQQuestionReplyField"], sortingAuthorFAQQuestionReplyDirection: params["sortingAuthorFAQQuestionReplyDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_DETAIL_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_DETAIL_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_DETAIL_TITLE, { enableHtml: true });
            });
        }
        else {
            this._authorFAQDetailService.addAuthorFAQDetail(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/authorfaqs'], {
                            queryParams: {
                                indexAuthorFAQ: params["indexAuthorFAQ"], indexAuthorFAQDetail: params["indexAuthorFAQDetail"], sortingAuthorFAQField: params["sortingAuthorFAQField"], sortingAuthorFAQDirection: params["sortingAuthorFAQDirection"], sortingAuthorFAQDetailField: params["sortingAuthorFAQDetailField"], sortingAuthorFAQDetailDirection: params["sortingAuthorFAQDetailDirection"], sortingAuthorFAQQuestionReplyField: params["sortingAuthorFAQQuestionReplyField"], sortingAuthorFAQQuestionReplyDirection: params["sortingAuthorFAQQuestionReplyDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_DETAIL_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_DETAIL_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_DETAIL_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    AuthorFAQDetailAdminComponent.prototype.OnSubmitAuthorFAQDetail = function (formData) {
        this.isSubmited = true;
        formData.value.AuthorFAQId = this.authorFAQId;
        if (this.frmAuthorFAQDetail.valid) {
            this.SaveAuthorFAQDetail(formData);
        }
    };
    AuthorFAQDetailAdminComponent.prototype.CancelAuthorFAQDetail = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/authorfaqs'], {
                queryParams: {
                    indexAuthorFAQ: params["indexAuthorFAQ"], indexAuthorFAQDetail: params["indexAuthorFAQDetail"], sortingAuthorFAQField: params["sortingAuthorFAQField"], sortingAuthorFAQDirection: params["sortingAuthorFAQDirection"], sortingAuthorFAQDetailField: params["sortingAuthorFAQDetailField"], sortingAuthorFAQDetailDirection: params["sortingAuthorFAQDetailDirection"], sortingAuthorFAQQuestionReplyField: params["sortingAuthorFAQQuestionReplyField"], sortingAuthorFAQQuestionReplyDirection: params["sortingAuthorFAQQuestionReplyDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    AuthorFAQDetailAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './authorFAQDetail.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, authorFAQ_service_1.AuthorFAQAdminService, authorFAQDetail_service_1.AuthorFAQDetailAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], AuthorFAQDetailAdminComponent);
    return AuthorFAQDetailAdminComponent;
}());
exports.AuthorFAQDetailAdminComponent = AuthorFAQDetailAdminComponent;
//# sourceMappingURL=authorFAQDetail.component.js.map