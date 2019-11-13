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
var formSummaryDocumentation_1 = require("../../../model/formSummaryDocumentation");
var formSummaryDocumentation_service_1 = require("../../../service/admin/formSummaryDocumentation.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var SummaryAdminComponent = /** @class */ (function () {
    function SummaryAdminComponent(formBuilder, toastr, activatedRoute, router, _formSummaryDocumentationService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._formSummaryDocumentationService = _formSummaryDocumentationService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.formSummaryDocumentationId = 0;
        this.searchText = '';
        this.isSubmited = false;
    }
    SummaryAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmSummary = this.formBuilder.group({
            FormSummaryDocumentationId: [''],
            TopicName: ['', forms_1.Validators.required],
            SubMenuName: [global_1.Global.SUMMARY_TYPE]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var formSummaryDocumentationId = _this._global.decryptValue(params['formSummaryDocumentationId']);
            if (formSummaryDocumentationId) {
                _this.addUpdateText = "Update";
                _this.formSummaryDocumentationId = parseInt(formSummaryDocumentationId);
                _this.EditFormSummaryDocumentation(parseInt(formSummaryDocumentationId));
            }
            else {
                _this.addUpdateText = "Add";
            }
        });
    };
    SummaryAdminComponent.prototype.EditFormSummaryDocumentation = function (formSummaryDocumentationId) {
        var _this = this;
        this.spinnerService.show();
        var getFormSummaryDocumentationRequest = new formSummaryDocumentation_1.GetFormSummaryDocumentationRequest();
        getFormSummaryDocumentationRequest.FormSummaryDocumentationId = formSummaryDocumentationId;
        getFormSummaryDocumentationRequest.SubMenuName = global_1.Global.SUMMARY_TYPE;
        getFormSummaryDocumentationRequest.IsActive = null;
        this._formSummaryDocumentationService.getFormSummaryDocumentation(getFormSummaryDocumentationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.frmSummary.setValue({
                FormSummaryDocumentationId: formSummaryDocumentationId,
                TopicName: data.Response[0].TopicName,
                SubMenuName: global_1.Global.SUMMARY_TYPE
            });
            _this.frmSummary.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    SummaryAdminComponent.prototype.SaveSummary = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.FormSummaryDocumentationId) {
            this._formSummaryDocumentationService.updateFormSummaryDocumentation(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/summaries'], {
                            queryParams: {
                                indexSummary: params["indexSummary"], sortingSummaryField: params["sortingSummaryField"], sortingSummaryDirection: params["sortingSummaryDirection"], sortingSummaryDetailField: params["sortingSummaryDetailField"], sortingSummaryDetailDirection: params["sortingSummaryDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SUMMARY_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUMMARY_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUMMARY_TITLE, { enableHtml: true });
            });
        }
        else {
            this._formSummaryDocumentationService.addFormSummaryDocumentation(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/summaries'], {
                            queryParams: {
                                indexSummary: params["indexSummary"], sortingSummaryField: params["sortingSummaryField"], sortingSummaryDirection: params["sortingSummaryDirection"], sortingSummaryDetailField: params["sortingSummaryDetailField"], sortingSummaryDetailDirection: params["sortingSummaryDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SUMMARY_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUMMARY_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUMMARY_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    SummaryAdminComponent.prototype.OnSubmitSummary = function (formData) {
        this.isSubmited = true;
        if (this.frmSummary.valid) {
            this.SaveSummary(formData);
        }
    };
    SummaryAdminComponent.prototype.CancelSummary = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/summaries'], {
                queryParams: {
                    indexSummary: params["indexSummary"], sortingSummaryField: params["sortingSummaryField"], sortingSummaryDirection: params["sortingSummaryDirection"], sortingSummaryDetailField: params["sortingSummaryDetailField"], sortingSummaryDetailDirection: params["sortingSummaryDetailDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    SummaryAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './summary.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, formSummaryDocumentation_service_1.FormSummaryDocumentationAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], SummaryAdminComponent);
    return SummaryAdminComponent;
}());
exports.SummaryAdminComponent = SummaryAdminComponent;
//# sourceMappingURL=summary.component.js.map