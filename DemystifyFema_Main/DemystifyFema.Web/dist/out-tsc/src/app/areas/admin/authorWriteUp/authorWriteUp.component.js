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
//import { AuthorWriteUp, GetAuthorWriteUpRequest, GetTopicRequest, Topic } from '../../../model/authorWriteUp';
var authorWriteUp_1 = require("../../../model/authorWriteUp");
var authorWriteUp_service_1 = require("../../../service/admin/authorWriteUp.service");
var commonField_1 = require("../../../model/commonField");
var commonField_service_1 = require("../../../service/common/commonField.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var AuthorWriteUpAdminComponent = /** @class */ (function () {
    function AuthorWriteUpAdminComponent(formBuilder, toastr, activatedRoute, router, _authorWriteUpService, vcr, spinnerService, _commonFieldService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._authorWriteUpService = _authorWriteUpService;
        this.spinnerService = spinnerService;
        this._commonFieldService = _commonFieldService;
        this._global = new global_1.Global();
        this.topics = [];
        this.authorWriteUpId = 0;
        this.searchText = '';
        this.pdfServerPath = global_1.Global.AUTHOR_WRITE_UP_PDF_FILEPATH;
        this.isSubmited = false;
    }
    AuthorWriteUpAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmAuthorWriteUp = this.formBuilder.group({
            AuthorWriteUpId: [''],
            TopicId: ['', forms_1.Validators.required],
            PDF: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var authorWriteUpId = _this._global.decryptValue(params['authorWriteUpId']);
            if (authorWriteUpId) {
                _this.addUpdateText = "Update";
                _this.authorWriteUpId = parseInt(authorWriteUpId);
                _this.EditAuthorWriteUp(parseInt(authorWriteUpId));
            }
            else {
                _this.GetTopic(null);
                _this.addUpdateText = "Add";
            }
        });
    };
    AuthorWriteUpAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/pdf") {
            this.frmAuthorWriteUp.get('PDF').setValue(this.files[0].name);
            this.frmAuthorWriteUp.updateValueAndValidity();
        }
        else {
            this.frmAuthorWriteUp.get('PDF').setValue(null);
            this.frmAuthorWriteUp.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { closeButton: true });
        }
    };
    AuthorWriteUpAdminComponent.prototype.GetTopic = function (authorWriteUpData) {
        var _this = this;
        this.spinnerService.show();
        //let getTopicRequest = new GetTopicRequest();
        var getCommonFieldRequest = new commonField_1.GetCommonFieldRequest();
        getCommonFieldRequest.FieldTypeName = global_1.Global.COMMON_FIELD_FEMA_MODULE;
        //this._authorWriteUpService.getTopic(getTopicRequest)
        this._commonFieldService.getCommonField(getCommonFieldRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.topics = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.topics.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.topics.push({ Value: item.FieldId, Text: item.FieldName });
                });
                _this.frmAuthorWriteUp.get("TopicId").setValue((authorWriteUpData != null) ? authorWriteUpData.TopicId : "");
                _this.frmAuthorWriteUp.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    AuthorWriteUpAdminComponent.prototype.EditAuthorWriteUp = function (authorWriteUpId) {
        var _this = this;
        this.spinnerService.show();
        var getAuthorWriteUpRequest = new authorWriteUp_1.GetAuthorWriteUpRequest();
        getAuthorWriteUpRequest.AuthorWriteUpId = authorWriteUpId;
        getAuthorWriteUpRequest.IsActive = null;
        this._authorWriteUpService.getAuthorWriteUp(getAuthorWriteUpRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.authorWriteUpPDFName = data.Response[0].PDF;
            _this.GetTopic(data.Response[0]);
            _this.frmAuthorWriteUp.setValue({
                AuthorWriteUpId: authorWriteUpId,
                TopicId: data.Response[0].TopicId,
                PDF: data.Response[0].PDF
            });
            _this.frmAuthorWriteUp.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    AuthorWriteUpAdminComponent.prototype.SaveAuthorWriteUp = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.AuthorWriteUpId) {
            this._authorWriteUpService.updateAuthorWriteUp(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/authorwriteups'], {
                            queryParams: {
                                indexAuthorWriteUp: params["indexAuthorWriteUp"], sortingAuthorWriteUpField: params["sortingAuthorWriteUpField"], sortingAuthorWriteUpDirection: params["sortingAuthorWriteUpDirection"], sortingAuthorWriteUpDetailField: params["sortingAuthorWriteUpDetailField"], sortingAuthorWriteUpDetailDirection: params["sortingAuthorWriteUpDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { enableHtml: true });
            });
        }
        else {
            this._authorWriteUpService.addAuthorWriteUp(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/authorwriteups'], {
                            queryParams: {
                                indexAuthorWriteUp: params["indexAuthorWriteUp"], sortingAuthorWriteUpField: params["sortingAuthorWriteUpField"], sortingAuthorWriteUpDirection: params["sortingAuthorWriteUpDirection"], sortingAuthorWriteUpDetailField: params["sortingAuthorWriteUpDetailField"], sortingAuthorWriteUpDetailDirection: params["sortingAuthorWriteUpDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    AuthorWriteUpAdminComponent.prototype.OnSubmitAuthorWriteUp = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmAuthorWriteUp.valid) {
            this.spinnerService.show();
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._authorWriteUpService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmAuthorWriteUp.get('PDF').setValue(response.Response);
                        _this.frmAuthorWriteUp.updateValueAndValidity();
                        formData.value.PDF = response.Response;
                        _this.files = null;
                        _this.SaveAuthorWriteUp(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.PDF) {
                    this.SaveAuthorWriteUp(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    AuthorWriteUpAdminComponent.prototype.CancelAuthorWriteUp = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/authorwriteups'], {
                queryParams: {
                    indexAuthorWriteUp: params["indexAuthorWriteUp"], sortingAuthorWriteUpField: params["sortingAuthorWriteUpField"], sortingAuthorWriteUpDirection: params["sortingAuthorWriteUpDirection"], sortingAuthorWriteUpDetailField: params["sortingAuthorWriteUpDetailField"], sortingAuthorWriteUpDetailDirection: params["sortingAuthorWriteUpDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    AuthorWriteUpAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './authorWriteUp.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, authorWriteUp_service_1.AuthorWriteUpAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, commonField_service_1.CommonFieldService])
    ], AuthorWriteUpAdminComponent);
    return AuthorWriteUpAdminComponent;
}());
exports.AuthorWriteUpAdminComponent = AuthorWriteUpAdminComponent;
//# sourceMappingURL=authorWriteUp.component.js.map