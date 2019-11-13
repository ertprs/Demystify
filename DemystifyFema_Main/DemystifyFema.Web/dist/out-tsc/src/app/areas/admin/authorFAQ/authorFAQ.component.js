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
var authorFAQ_service_1 = require("../../../service/admin/authorFAQ.service");
var commonField_1 = require("../../../model/commonField");
var commonField_service_1 = require("../../../service/common/commonField.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var AuthorFAQAdminComponent = /** @class */ (function () {
    function AuthorFAQAdminComponent(formBuilder, toastr, activatedRoute, router, _authorFAQService, vcr, spinnerService, _commonFieldService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._authorFAQService = _authorFAQService;
        this.spinnerService = spinnerService;
        this._commonFieldService = _commonFieldService;
        this._global = new global_1.Global();
        this.topics = [];
        this.authorFAQId = 0;
        this.searchText = '';
        this.isSubmited = false;
    }
    AuthorFAQAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmAuthorFAQ = this.formBuilder.group({
            AuthorFAQId: [''],
            TopicId: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var authorFAQId = _this._global.decryptValue(params['authorFAQId']);
            if (authorFAQId) {
                _this.addUpdateText = "Update";
                _this.authorFAQId = parseInt(authorFAQId);
                _this.EditAuthorFAQ(parseInt(authorFAQId));
            }
            else {
                _this.GetTopic(null);
                _this.addUpdateText = "Add";
            }
        });
    };
    AuthorFAQAdminComponent.prototype.GetTopic = function (authorFAQData) {
        var _this = this;
        this.spinnerService.show();
        //let getTopicRequest = new GetTopicRequest();
        var getCommonFieldRequest = new commonField_1.GetCommonFieldRequest();
        getCommonFieldRequest.FieldTypeName = global_1.Global.COMMON_FIELD_FEMA_MODULE;
        //this._authorFAQService.getTopic(getTopicRequest)
        this._commonFieldService.getCommonField(getCommonFieldRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.topics = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.topics.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.topics.push({ Value: item.FieldId, Text: item.FieldName });
                });
                _this.frmAuthorFAQ.get("TopicId").setValue((authorFAQData != null) ? authorFAQData.TopicId : "");
                _this.frmAuthorFAQ.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    AuthorFAQAdminComponent.prototype.EditAuthorFAQ = function (authorFAQId) {
        var _this = this;
        this.spinnerService.show();
        var getAuthorFAQRequest = new authorFAQ_1.GetAuthorFAQRequest();
        getAuthorFAQRequest.AuthorFAQId = authorFAQId;
        getAuthorFAQRequest.IsActive = null;
        this._authorFAQService.getAuthorFAQ(getAuthorFAQRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetTopic(data.Response[0]);
            _this.frmAuthorFAQ.setValue({
                AuthorFAQId: authorFAQId,
                TopicId: data.Response[0].TopicId
            });
            _this.frmAuthorFAQ.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    AuthorFAQAdminComponent.prototype.SaveAuthorFAQ = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.AuthorFAQId) {
            this._authorFAQService.updateAuthorFAQ(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/authorfaqs'], {
                            queryParams: {
                                indexAuthorFAQ: params["indexAuthorFAQ"], indexAuthorFAQDetail: params["indexAuthorFAQDetail"], sortingAuthorFAQField: params["sortingAuthorFAQField"], sortingAuthorFAQDirection: params["sortingAuthorFAQDirection"], sortingAuthorFAQDetailField: params["sortingAuthorFAQDetailField"], sortingAuthorFAQDetailDirection: params["sortingAuthorFAQDetailDirection"], sortingAuthorFAQQuestionReplyField: params["sortingAuthorFAQQuestionReplyField"], sortingAuthorFAQQuestionReplyDirection: params["sortingAuthorFAQQuestionReplyDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { enableHtml: true });
            });
        }
        else {
            this._authorFAQService.addAuthorFAQ(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/authorfaqs'], {
                            queryParams: {
                                indexAuthorFAQ: params["indexAuthorFAQ"], indexAuthorFAQDetail: params["indexAuthorFAQDetail"], sortingAuthorFAQField: params["sortingAuthorFAQField"], sortingAuthorFAQDirection: params["sortingAuthorFAQDirection"], sortingAuthorFAQDetailField: params["sortingAuthorFAQDetailField"], sortingAuthorFAQDetailDirection: params["sortingAuthorFAQDetailDirection"], sortingAuthorFAQQuestionReplyField: params["sortingAuthorFAQQuestionReplyField"], sortingAuthorFAQQuestionReplyDirection: params["sortingAuthorFAQQuestionReplyDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_FAQ_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    AuthorFAQAdminComponent.prototype.OnSubmitAuthorFAQ = function (formData) {
        this.isSubmited = true;
        if (this.frmAuthorFAQ.valid) {
            this.SaveAuthorFAQ(formData);
        }
    };
    AuthorFAQAdminComponent.prototype.CancelAuthorFAQ = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/authorfaqs'], {
                queryParams: {
                    indexAuthorFAQ: params["indexAuthorFAQ"], indexAuthorFAQDetail: params["indexAuthorFAQDetail"], sortingAuthorFAQField: params["sortingAuthorFAQField"], sortingAuthorFAQDirection: params["sortingAuthorFAQDirection"], sortingAuthorFAQDetailField: params["sortingAuthorFAQDetailField"], sortingAuthorFAQDetailDirection: params["sortingAuthorFAQDetailDirection"], sortingAuthorFAQQuestionReplyField: params["sortingAuthorFAQQuestionReplyField"], sortingAuthorFAQQuestionReplyDirection: params["sortingAuthorFAQQuestionReplyDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    AuthorFAQAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './authorFAQ.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, authorFAQ_service_1.AuthorFAQAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, commonField_service_1.CommonFieldService])
    ], AuthorFAQAdminComponent);
    return AuthorFAQAdminComponent;
}());
exports.AuthorFAQAdminComponent = AuthorFAQAdminComponent;
//# sourceMappingURL=authorFAQ.component.js.map