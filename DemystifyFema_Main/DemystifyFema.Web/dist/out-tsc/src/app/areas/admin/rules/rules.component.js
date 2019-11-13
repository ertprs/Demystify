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
var rules_1 = require("../../../model/rules");
var rules_service_1 = require("../../../service/admin/rules.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var RulesAdminComponent = /** @class */ (function () {
    function RulesAdminComponent(formBuilder, toastr, activatedRoute, router, _rulesService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._rulesService = _rulesService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.rulesId = 0;
        this.searchText = '';
        this.isSubmited = false;
        this.minDate = { year: 1970, month: 1, day: 1 };
    }
    RulesAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmRules = this.formBuilder.group({
            RulesId: [''],
            RulesNo: ['', forms_1.Validators.required],
            RulesName: ['', forms_1.Validators.required],
            Year: ['', forms_1.Validators.required],
            PublicationDate: ['', forms_1.Validators.required],
        });
        this.activatedRoute.params.subscribe(function (params) {
            var rulesId = _this._global.decryptValue(params['rulesId']);
            if (rulesId) {
                _this.addUpdateText = "Update";
                _this.rulesId = parseInt(rulesId);
                _this.EditRules(parseInt(rulesId));
            }
            else {
                _this.GetRulesYear(null);
                _this.addUpdateText = "Add";
            }
        });
    };
    RulesAdminComponent.prototype.EditRules = function (rulesId) {
        var _this = this;
        this.spinnerService.show();
        var getRulesRequest = new rules_1.GetRulesRequest();
        getRulesRequest.RulesId = rulesId;
        getRulesRequest.IsActive = null;
        this._rulesService.getRules(getRulesRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            var publicationDate = new Date(data.Response[0].PublicationDate);
            _this.GetRulesYear(data.Response[0]);
            _this.frmRules.setValue({
                RulesId: rulesId,
                RulesNo: data.Response[0].RulesNo,
                RulesName: data.Response[0].RulesName,
                Year: data.Response[0].Year,
                PublicationDate: { year: publicationDate.getFullYear(), month: publicationDate.getMonth() + 1, day: publicationDate.getDate() }
            });
            _this.frmRules.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    RulesAdminComponent.prototype.GetRulesYear = function (rulesData) {
        var _this = this;
        this.spinnerService.show();
        this._rulesService.getRulesYear()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.rulesYears = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rulesYears.push({ YearId: null, YearName: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.rulesYears.push({ YearId: item, YearName: item });
                });
                _this.frmRules.get("Year").setValue((rulesData != null) ? rulesData.Year : rulesData);
                _this.frmRules.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RulesAdminComponent.prototype.SaveRules = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.PublicationDate = (formData.value.PublicationDate != null) ? formData.value.PublicationDate.year + "/" + formData.value.PublicationDate.month + "/" + formData.value.PublicationDate.day : null;
        if (formData.value.RulesId) {
            this._rulesService.updateRules(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/rules'], {
                            queryParams: {
                                indexRules1: params["indexRules1"], indexRules2: params["indexRules2"], indexIndex: params["indexIndex"], sortingRulesField: params["sortingRulesField"], sortingRulesDirection: params["sortingRulesDirection"], sortingIndexField: params["sortingIndexField"], sortingIndexDirection: params["sortingIndexDirection"], sortingSubIndexField: params["sortingSubIndexField"], sortingSubIndexDirection: params["sortingSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { enableHtml: true });
            });
        }
        else {
            this._rulesService.addRules(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/rules'], {
                            queryParams: {
                                indexRules1: params["indexRules1"], indexRules2: params["indexRules2"], indexIndex: params["indexIndex"], sortingRulesField: params["sortingRulesField"], sortingRulesDirection: params["sortingRulesDirection"], sortingIndexField: params["sortingIndexField"], sortingIndexDirection: params["sortingIndexDirection"], sortingSubIndexField: params["sortingSubIndexField"], sortingSubIndexDirection: params["sortingSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RulesAdminComponent.prototype.ClearDate = function () {
        this.frmRules.get("PublicationDate").setValue("");
        this.frmRules.updateValueAndValidity();
    };
    RulesAdminComponent.prototype.OnSubmitRules = function (formData) {
        this.isSubmited = true;
        if (this.frmRules.valid) {
            this.SaveRules(formData);
        }
    };
    RulesAdminComponent.prototype.CancelRules = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/rules'], {
                queryParams: {
                    indexRules1: params["indexRules1"], indexRules2: params["indexRules2"], indexIndex: params["indexIndex"], sortingRulesField: params["sortingRulesField"], sortingRulesDirection: params["sortingRulesDirection"], sortingIndexField: params["sortingIndexField"], sortingIndexDirection: params["sortingIndexDirection"], sortingSubIndexField: params["sortingSubIndexField"], sortingSubIndexDirection: params["sortingSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    RulesAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './rules.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, rules_service_1.RulesAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], RulesAdminComponent);
    return RulesAdminComponent;
}());
exports.RulesAdminComponent = RulesAdminComponent;
//# sourceMappingURL=rules.component.js.map