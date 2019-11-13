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
var authorFAQQuestionReply_1 = require("../../../model/authorFAQQuestionReply");
var authorFAQQuestionReply_service_1 = require("../../../service/admin/authorFAQQuestionReply.service");
var authorFAQ_service_1 = require("../../../service/admin/authorFAQ.service");
var authorFAQDetail_service_1 = require("../../../service/admin/authorFAQDetail.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var AuthorFAQQuestionReplyAdminComponent = /** @class */ (function () {
    function AuthorFAQQuestionReplyAdminComponent(formBuilder, toastr, activatedRoute, router, _authorFAQService, _authorFAQDetailService, _authorFAQQuestionReplyService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._authorFAQService = _authorFAQService;
        this._authorFAQDetailService = _authorFAQDetailService;
        this._authorFAQQuestionReplyService = _authorFAQQuestionReplyService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.authorFAQQuestionReplyId = 0;
        this.searchText = '';
        this.authorFAQ = new authorFAQ_1.AuthorFAQ();
        this.authorFAQDetail = new authorFAQDetail_1.AuthorFAQDetail();
        this.isSubmited = false;
    }
    AuthorFAQQuestionReplyAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var authorFAQQuestionReplyId = _this._global.decryptValue(params['authorFAQQuestionReplyId']);
            var authorFAQDetailId = _this._global.decryptValue(params['authorFAQDetailId']);
            var authorFAQId = _this._global.decryptValue(params['authorFAQId']);
            if (authorFAQDetailId) {
                _this.authorFAQDetailId = parseInt(authorFAQDetailId);
                _this.GetAuthorFAQ(parseInt(authorFAQId));
                _this.GetAuthorFAQDetail(_this.authorFAQDetailId);
                if (authorFAQQuestionReplyId) {
                    _this.addUpdateText = "Update";
                    _this.authorFAQQuestionReplyId = parseInt(authorFAQQuestionReplyId);
                    _this.EditAuthorFAQQuestionReply(parseInt(authorFAQQuestionReplyId));
                }
                else {
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.router.navigate(['/admin/secure/authorfaqs'], {
                    queryParams: {
                        indexAuthorFAQ: params["indexAuthorFAQ"], indexAuthorFAQDetail: params["indexAuthorFAQDetail"], sortingAuthorFAQField: params["sortingAuthorFAQField"], sortingAuthorFAQDirection: params["sortingAuthorFAQDirection"], sortingAuthorFAQDetailField: params["sortingAuthorFAQDetailField"], sortingAuthorFAQDetailDirection: params["sortingAuthorFAQDetailDirection"], sortingAuthorFAQQuestionReplyField: params["sortingAuthorFAQQuestionReplyField"], sortingAuthorFAQQuestionReplyDirection: params["sortingAuthorFAQQuestionReplyDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                    }
                });
            }
        });
        this.frmAuthorFAQQuestionReply = this.formBuilder.group({
            AuthorFAQQuestionReplyId: [''],
            AuthorFAQDetailId: [this.authorFAQDetailId],
            Question: ['', forms_1.Validators.required],
            Reply: ['', forms_1.Validators.required]
        });
    };
    AuthorFAQQuestionReplyAdminComponent.prototype.GetAuthorFAQ = function (authorFAQId) {
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
    AuthorFAQQuestionReplyAdminComponent.prototype.GetAuthorFAQDetail = function (authorFAQDetailId) {
        var _this = this;
        this.spinnerService.show();
        var getAuthorFAQDetailRequest = new authorFAQDetail_1.GetAuthorFAQDetailRequest();
        getAuthorFAQDetailRequest.AuthorFAQDetailId = authorFAQDetailId;
        getAuthorFAQDetailRequest.IsActive = null;
        this._authorFAQDetailService.getAuthorFAQDetail(getAuthorFAQDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.authorFAQDetail = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    AuthorFAQQuestionReplyAdminComponent.prototype.EditAuthorFAQQuestionReply = function (authorFAQQuestionReplyId) {
        var _this = this;
        this.spinnerService.show();
        var getAuthorFAQQuestionReplyRequest = new authorFAQQuestionReply_1.GetAuthorFAQQuestionReplyRequest();
        getAuthorFAQQuestionReplyRequest.AuthorFAQQuestionReplyId = authorFAQQuestionReplyId;
        getAuthorFAQQuestionReplyRequest.IsActive = null;
        this._authorFAQQuestionReplyService.getAuthorFAQQuestionReply(getAuthorFAQQuestionReplyRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.frmAuthorFAQQuestionReply.setValue({
                AuthorFAQQuestionReplyId: authorFAQQuestionReplyId,
                AuthorFAQDetailId: data.Response[0].AuthorFAQDetailId,
                Question: data.Response[0].Question,
                Reply: data.Response[0].Reply
            });
            _this.frmAuthorFAQQuestionReply.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    AuthorFAQQuestionReplyAdminComponent.prototype.SaveAuthorFAQQuestionReply = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.AuthorFAQQuestionReplyId) {
            this._authorFAQQuestionReplyService.updateAuthorFAQQuestionReply(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/authorfaqs'], {
                            queryParams: {
                                indexAuthorFAQ: params["indexAuthorFAQ"], indexAuthorFAQDetail: params["indexAuthorFAQDetail"], sortingAuthorFAQField: params["sortingAuthorFAQField"], sortingAuthorFAQDirection: params["sortingAuthorFAQDirection"], sortingAuthorFAQDetailField: params["sortingAuthorFAQDetailField"], sortingAuthorFAQDetailDirection: params["sortingAuthorFAQDetailDirection"], sortingAuthorFAQQuestionReplyField: params["sortingAuthorFAQQuestionReplyField"], sortingAuthorFAQQuestionReplyDirection: params["sortingAuthorFAQQuestionReplyDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_QUESTION_REPLY_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_QUESTION_REPLY_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_QUESTION_REPLY_TITLE, { enableHtml: true });
            });
        }
        else {
            this._authorFAQQuestionReplyService.addAuthorFAQQuestionReply(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/authorfaqs'], {
                            queryParams: {
                                indexAuthorFAQ: params["indexAuthorFAQ"], indexAuthorFAQDetail: params["indexAuthorFAQDetail"], sortingAuthorFAQField: params["sortingAuthorFAQField"], sortingAuthorFAQDirection: params["sortingAuthorFAQDirection"], sortingAuthorFAQDetailField: params["sortingAuthorFAQDetailField"], sortingAuthorFAQDetailDirection: params["sortingAuthorFAQDetailDirection"], sortingAuthorFAQQuestionReplyField: params["sortingAuthorFAQQuestionReplyField"], sortingAuthorFAQQuestionReplyDirection: params["sortingAuthorFAQQuestionReplyDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_QUESTION_REPLY_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_QUESTION_REPLY_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_QUESTION_REPLY_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    AuthorFAQQuestionReplyAdminComponent.prototype.OnSubmitAuthorFAQQuestionReply = function (formData) {
        this.isSubmited = true;
        formData.value.AuthorFAQId = this.authorFAQDetailId;
        if (this.frmAuthorFAQQuestionReply.valid) {
            this.SaveAuthorFAQQuestionReply(formData);
        }
    };
    AuthorFAQQuestionReplyAdminComponent.prototype.CancelAuthorFAQQuestionReply = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/authorfaqs'], {
                queryParams: {
                    indexAuthorFAQ: params["indexAuthorFAQ"], indexAuthorFAQDetail: params["indexAuthorFAQDetail"], sortingAuthorFAQField: params["sortingAuthorFAQField"], sortingAuthorFAQDirection: params["sortingAuthorFAQDirection"], sortingAuthorFAQDetailField: params["sortingAuthorFAQDetailField"], sortingAuthorFAQDetailDirection: params["sortingAuthorFAQDetailDirection"], sortingAuthorFAQQuestionReplyField: params["sortingAuthorFAQQuestionReplyField"], sortingAuthorFAQQuestionReplyDirection: params["sortingAuthorFAQQuestionReplyDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    AuthorFAQQuestionReplyAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './authorFAQQuestionReply.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, authorFAQ_service_1.AuthorFAQAdminService, authorFAQDetail_service_1.AuthorFAQDetailAdminService, authorFAQQuestionReply_service_1.AuthorFAQQuestionReplyAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], AuthorFAQQuestionReplyAdminComponent);
    return AuthorFAQQuestionReplyAdminComponent;
}());
exports.AuthorFAQQuestionReplyAdminComponent = AuthorFAQQuestionReplyAdminComponent;
//# sourceMappingURL=authorFAQQuestionReply.component.js.map