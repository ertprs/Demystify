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
var authorWriteUpDetail_1 = require("../../../model/authorWriteUpDetail");
var authorWriteUp_1 = require("../../../model/authorWriteUp");
var authorWriteUpDetail_service_1 = require("../../../service/admin/authorWriteUpDetail.service");
var authorWriteUp_service_1 = require("../../../service/admin/authorWriteUp.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var AuthorWriteUpDetailAdminComponent = /** @class */ (function () {
    function AuthorWriteUpDetailAdminComponent(formBuilder, toastr, activatedRoute, router, _authorWriteUpService, _authorWriteUpDetailService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._authorWriteUpService = _authorWriteUpService;
        this._authorWriteUpDetailService = _authorWriteUpDetailService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.authorWriteUpDetailId = 0;
        this.searchText = '';
        this.authorWriteUp = new authorWriteUp_1.AuthorWriteUp();
        this.authorWriteUpDetailPDFServerPath = global_1.Global.AUTHOR_WRITE_UP_DETAIL_PDF_FILEPATH;
        this.authorWriteUpPDFServerPath = global_1.Global.AUTHOR_WRITE_UP_PDF_FILEPATH;
        this.isSubmited = false;
    }
    AuthorWriteUpDetailAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var authorWriteUpDetailId = _this._global.decryptValue(params['authorWriteUpDetailId']);
            var authorWriteUpId = _this._global.decryptValue(params['authorWriteUpId']);
            if (authorWriteUpId) {
                _this.authorWriteUpId = parseInt(authorWriteUpId);
                _this.GetAuthorWriteUp(_this.authorWriteUpId);
                if (authorWriteUpDetailId) {
                    _this.addUpdateText = "Update";
                    _this.authorWriteUpDetailId = parseInt(authorWriteUpDetailId);
                    _this.EditAuthorWriteUpDetail(parseInt(authorWriteUpDetailId));
                }
                else {
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.router.navigate(['/admin/secure/authorwriteupdetails'], {
                    queryParams: {
                        indexAuthorWriteUp: params["indexAuthorWriteUp"], sortingAuthorWriteUpField: params["sortingAuthorWriteUpField"], sortingAuthorWriteUpDirection: params["sortingAuthorWriteUpDirection"], sortingAuthorWriteUpDetailField: params["sortingAuthorWriteUpDetailField"], sortingAuthorWriteUpDetailDirection: params["sortingAuthorWriteUpDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                    }
                });
            }
        });
        this.frmAuthorWriteUpDetail = this.formBuilder.group({
            AuthorWriteUpDetailId: [''],
            AuthorWriteUpId: [this.authorWriteUpId],
            SubTopicName: ['', forms_1.Validators.required],
            PDF: ['', forms_1.Validators.required]
        });
    };
    AuthorWriteUpDetailAdminComponent.prototype.GetAuthorWriteUp = function (authorWriteUpId) {
        var _this = this;
        this.spinnerService.show();
        var getAuthorWriteUpRequest = new authorWriteUp_1.GetAuthorWriteUpRequest();
        getAuthorWriteUpRequest.AuthorWriteUpId = authorWriteUpId;
        getAuthorWriteUpRequest.IsActive = null;
        this._authorWriteUpService.getAuthorWriteUp(getAuthorWriteUpRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.authorWriteUp = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    AuthorWriteUpDetailAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/pdf") {
            this.frmAuthorWriteUpDetail.get('PDF').setValue(this.files[0].name);
            this.frmAuthorWriteUpDetail.updateValueAndValidity();
        }
        else {
            this.frmAuthorWriteUpDetail.get('PDF').setValue(null);
            this.frmAuthorWriteUpDetail.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_DETAIL_TITLE, { closeButton: true });
        }
    };
    AuthorWriteUpDetailAdminComponent.prototype.EditAuthorWriteUpDetail = function (authorWriteUpDetailId) {
        var _this = this;
        this.spinnerService.show();
        var getAuthorWriteUpDetailRequest = new authorWriteUpDetail_1.GetAuthorWriteUpDetailRequest();
        getAuthorWriteUpDetailRequest.AuthorWriteUpDetailId = authorWriteUpDetailId;
        getAuthorWriteUpDetailRequest.IsActive = null;
        this._authorWriteUpDetailService.getAuthorWriteUpDetail(getAuthorWriteUpDetailRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.authorWriteUpDetailPDFName = data.Response[0].PDF;
            _this.frmAuthorWriteUpDetail.setValue({
                AuthorWriteUpDetailId: authorWriteUpDetailId,
                AuthorWriteUpId: data.Response[0].AuthorWriteUpId,
                SubTopicName: data.Response[0].SubTopicName,
                PDF: data.Response[0].PDF
            });
            _this.frmAuthorWriteUpDetail.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    AuthorWriteUpDetailAdminComponent.prototype.SaveAuthorWriteUpDetail = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.AuthorWriteUpDetailId) {
            this._authorWriteUpDetailService.updateAuthorWriteUpDetail(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/authorwriteups'], {
                            queryParams: {
                                indexAuthorWriteUp: params["indexAuthorWriteUp"], sortingAuthorWriteUpField: params["sortingAuthorWriteUpField"], sortingAuthorWriteUpDirection: params["sortingAuthorWriteUpDirection"], sortingAuthorWriteUpDetailField: params["sortingAuthorWriteUpDetailField"], sortingAuthorWriteUpDetailDirection: params["sortingAuthorWriteUpDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_DETAIL_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_DETAIL_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_DETAIL_TITLE, { enableHtml: true });
            });
        }
        else {
            this._authorWriteUpDetailService.addAuthorWriteUpDetail(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/authorwriteups'], {
                            queryParams: {
                                indexAuthorWriteUp: params["indexAuthorWriteUp"], sortingAuthorWriteUpField: params["sortingAuthorWriteUpField"], sortingAuthorWriteUpDirection: params["sortingAuthorWriteUpDirection"], sortingAuthorWriteUpDetailField: params["sortingAuthorWriteUpDetailField"], sortingAuthorWriteUpDetailDirection: params["sortingAuthorWriteUpDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_DETAIL_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_DETAIL_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_DETAIL_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    AuthorWriteUpDetailAdminComponent.prototype.OnSubmitAuthorWriteUpDetail = function (formData) {
        var _this = this;
        this.isSubmited = true;
        formData.value.AuthorWriteUpId = this.authorWriteUpId;
        if (this.frmAuthorWriteUpDetail.valid) {
            this.spinnerService.show();
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._authorWriteUpDetailService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmAuthorWriteUpDetail.get('PDF').setValue(response.Response);
                        _this.frmAuthorWriteUpDetail.updateValueAndValidity();
                        formData.value.PDF = response.Response;
                        _this.files = null;
                        _this.SaveAuthorWriteUpDetail(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_DETAIL_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_AUTHOR_WRITE_UP_DETAIL_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.PDF) {
                    this.SaveAuthorWriteUpDetail(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    AuthorWriteUpDetailAdminComponent.prototype.CancelAuthorWriteUpDetail = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/authorwriteups'], {
                queryParams: {
                    indexAuthorWriteUp: params["indexAuthorWriteUp"], sortingAuthorWriteUpField: params["sortingAuthorWriteUpField"], sortingAuthorWriteUpDirection: params["sortingAuthorWriteUpDirection"], sortingAuthorWriteUpDetailField: params["sortingAuthorWriteUpDetailField"], sortingAuthorWriteUpDetailDirection: params["sortingAuthorWriteUpDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    AuthorWriteUpDetailAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './authorWriteUpDetail.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, authorWriteUp_service_1.AuthorWriteUpAdminService, authorWriteUpDetail_service_1.AuthorWriteUpDetailAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], AuthorWriteUpDetailAdminComponent);
    return AuthorWriteUpDetailAdminComponent;
}());
exports.AuthorWriteUpDetailAdminComponent = AuthorWriteUpDetailAdminComponent;
//# sourceMappingURL=authorWriteUpDetail.component.js.map