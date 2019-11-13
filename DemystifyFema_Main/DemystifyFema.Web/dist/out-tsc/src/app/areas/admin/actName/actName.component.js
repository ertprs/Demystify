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
var actName_1 = require("../../../model/actName");
var actName_service_1 = require("../../../service/admin/actName.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ActNameAdminComponent = /** @class */ (function () {
    function ActNameAdminComponent(formBuilder, toastr, activatedRoute, router, _actNameService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._actNameService = _actNameService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.actId = 0;
        this.searchText = '';
        this.pdfServerPath = global_1.Global.ACT_PDF_FILEPATH;
        this.isSubmited = false;
    }
    ActNameAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmAct = this.formBuilder.group({
            ActId: [''],
            LongTitle: ['', forms_1.Validators.required],
            ActPDF: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var actId = _this._global.decryptValue(params['actId']);
            if (actId) {
                _this.addUpdateText = "Update";
                _this.actId = parseInt(actId);
                _this.EditAct(parseInt(actId));
            }
            else {
                _this.addUpdateText = "Add";
            }
        });
    };
    ActNameAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/pdf") {
            this.frmAct.get('ActPDF').setValue(this.files[0].name);
            this.frmAct.updateValueAndValidity();
        }
        else {
            this.frmAct.get('ActPDF').setValue(null);
            this.frmAct.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { closeButton: true });
        }
    };
    ActNameAdminComponent.prototype.EditAct = function (actId) {
        var _this = this;
        this.spinnerService.show();
        var getActNameRequest = new actName_1.GetActNameRequest();
        getActNameRequest.ActId = actId;
        getActNameRequest.IsActive = null;
        this._actNameService.getActName(getActNameRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.actPDFName = data.Response[0].ActPDF;
            _this.frmAct.setValue({
                ActId: actId,
                LongTitle: data.Response[0].LongTitle,
                ActPDF: data.Response[0].ActPDF
            });
            _this.frmAct.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    ActNameAdminComponent.prototype.SaveAct = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.ActId) {
            this._actNameService.updateActName(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/actnames'], {
                            queryParams: {
                                indexAct: params["indexAct"], sortingActNameField: params["sortingActNameField"], sortingActNameDirection: params["sortingActNameDirection"], sortingDefinitionField: params["sortingDefinitionField"], sortingDefinitionDirection: params["sortingDefinitionDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { enableHtml: true });
            });
        }
        else {
            this._actNameService.addActName(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/actnames'], {
                            queryParams: {
                                indexAct: params["indexAct"], sortingActNameField: params["sortingActNameField"], sortingActNameDirection: params["sortingActNameDirection"], sortingDefinitionField: params["sortingDefinitionField"], sortingDefinitionDirection: params["sortingDefinitionDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    ActNameAdminComponent.prototype.OnSubmitAct = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmAct.valid) {
            this.spinnerService.show();
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._actNameService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmAct.get('ActPDF').setValue(response.Response);
                        _this.frmAct.updateValueAndValidity();
                        formData.value.ActPDF = response.Response;
                        _this.files = null;
                        _this.SaveAct(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_ACTNAME_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.ActPDF) {
                    this.SaveAct(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    ActNameAdminComponent.prototype.CancelAct = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/actnames'], {
                queryParams: {
                    indexAct: params["indexAct"], sortingActNameField: params["sortingActNameField"], sortingActNameDirection: params["sortingActNameDirection"], sortingDefinitionField: params["sortingDefinitionField"], sortingDefinitionDirection: params["sortingDefinitionDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    ActNameAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './actName.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, actName_service_1.ActNameAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], ActNameAdminComponent);
    return ActNameAdminComponent;
}());
exports.ActNameAdminComponent = ActNameAdminComponent;
//# sourceMappingURL=actName.component.js.map