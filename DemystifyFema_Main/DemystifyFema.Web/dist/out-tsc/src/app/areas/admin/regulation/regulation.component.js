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
var regulation_1 = require("../../../model/regulation");
var regulation_service_1 = require("../../../service/admin/regulation.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var RegulationAdminComponent = /** @class */ (function () {
    function RegulationAdminComponent(formBuilder, toastr, activatedRoute, router, _regulationService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._regulationService = _regulationService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.regulationId = 0;
        this.searchText = '';
        this.isSubmited = false;
        this.minDate = { year: 1970, month: 1, day: 1 };
    }
    RegulationAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmRegulation = this.formBuilder.group({
            RegulationId: [''],
            RegulationNumber: ['', forms_1.Validators.required],
            RegulationName: ['', forms_1.Validators.required],
            Year: ['', forms_1.Validators.required],
            PublicationDate: ['', forms_1.Validators.required],
        });
        this.activatedRoute.params.subscribe(function (params) {
            var regulationId = _this._global.decryptValue(params['regulationId']);
            if (regulationId) {
                _this.addUpdateText = "Update";
                _this.regulationId = parseInt(regulationId);
                _this.EditRegulation(parseInt(regulationId));
            }
            else {
                _this.GetRegulationYear(null);
                _this.addUpdateText = "Add";
            }
        });
    };
    RegulationAdminComponent.prototype.EditRegulation = function (regulationId) {
        var _this = this;
        this.spinnerService.show();
        var getRegulationRequest = new regulation_1.GetRegulationRequest();
        getRegulationRequest.RegulationId = regulationId;
        getRegulationRequest.IsActive = null;
        this._regulationService.getRegulation(getRegulationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetRegulationYear(data.Response[0]);
            var publicationDate = new Date(data.Response[0].PublicationDate);
            _this.frmRegulation.setValue({
                RegulationId: regulationId,
                RegulationNumber: data.Response[0].RegulationNumber,
                RegulationName: data.Response[0].RegulationName,
                Year: data.Response[0].Year,
                PublicationDate: { year: publicationDate.getFullYear(), month: publicationDate.getMonth() + 1, day: publicationDate.getDate() }
            });
            _this.frmRegulation.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    RegulationAdminComponent.prototype.GetRegulationYear = function (regulationData) {
        var _this = this;
        this.spinnerService.show();
        this._regulationService.getRegulationYear()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.regulationYears = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.regulationYears.push({ YearId: null, YearName: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.regulationYears.push({ YearId: item, YearName: item });
                });
                _this.frmRegulation.get("Year").setValue((regulationData != null) ? regulationData.Year : regulationData);
                _this.frmRegulation.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RegulationAdminComponent.prototype.SaveRegulation = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.PublicationDate = (formData.value.PublicationDate != null) ? formData.value.PublicationDate.year + "/" + formData.value.PublicationDate.month + "/" + formData.value.PublicationDate.day : null;
        if (formData.value.RegulationId) {
            this._regulationService.updateRegulation(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/regulations'], {
                            queryParams: {
                                indexRegulation1: params["indexRegulation1"], indexRegulation2: params["indexRegulation2"], indexIndex: params["indexIndex"], sortingRegulationField: params["sortingRegulationField"], sortingRegulationDirection: params["sortingRegulationDirection"], sortingFemaIndexField: params["sortingFemaIndexField"], sortingFemaIndexDirection: params["sortingFemaIndexDirection"], sortingFemaSubIndexField: params["sortingFemaSubIndexField"], sortingFemaSubIndexDirection: params["sortingFemaSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true });
            });
        }
        else {
            this._regulationService.addRegulation(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/regulations'], {
                            queryParams: {
                                indexRegulation1: params["indexRegulation1"], indexRegulation2: params["indexRegulation2"], indexIndex: params["indexIndex"], sortingRegulationField: params["sortingRegulationField"], sortingRegulationDirection: params["sortingRegulationDirection"], sortingFemaIndexField: params["sortingFemaIndexField"], sortingFemaIndexDirection: params["sortingFemaIndexDirection"], sortingFemaSubIndexField: params["sortingFemaSubIndexField"], sortingFemaSubIndexDirection: params["sortingFemaSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_REGULATION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RegulationAdminComponent.prototype.ClearDate = function () {
        this.frmRegulation.get("PublicationDate").setValue("");
        this.frmRegulation.updateValueAndValidity();
    };
    RegulationAdminComponent.prototype.OnSubmitRegulation = function (formData) {
        this.isSubmited = true;
        if (this.frmRegulation.valid) {
            this.SaveRegulation(formData);
        }
    };
    RegulationAdminComponent.prototype.CancelRegulation = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/regulations'], {
                queryParams: {
                    indexRegulation1: params["indexRegulation1"], indexRegulation2: params["indexRegulation2"], indexIndex: params["indexIndex"], sortingRegulationField: params["sortingRegulationField"], sortingRegulationDirection: params["sortingRegulationDirection"], sortingFemaIndexField: params["sortingFemaIndexField"], sortingFemaIndexDirection: params["sortingFemaIndexDirection"], sortingFemaSubIndexField: params["sortingFemaSubIndexField"], sortingFemaSubIndexDirection: params["sortingFemaSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    RegulationAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './regulation.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, regulation_service_1.RegulationAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], RegulationAdminComponent);
    return RegulationAdminComponent;
}());
exports.RegulationAdminComponent = RegulationAdminComponent;
//# sourceMappingURL=regulation.component.js.map