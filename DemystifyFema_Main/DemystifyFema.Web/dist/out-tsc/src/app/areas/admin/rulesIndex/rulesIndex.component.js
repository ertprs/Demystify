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
var rulesIndex_1 = require("../../../model/rulesIndex");
var rules_1 = require("../../../model/rules");
var rulesIndex_service_1 = require("../../../service/admin/rulesIndex.service");
var rules_service_1 = require("../../../service/admin/rules.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var RulesIndexAdminComponent = /** @class */ (function () {
    function RulesIndexAdminComponent(formBuilder, toastr, activatedRoute, router, _rulesIndexService, _rulesService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._rulesIndexService = _rulesIndexService;
        this._rulesService = _rulesService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.rules = new rules_1.Rules();
        this.rulesIndexes = [];
        this.indexId = 0;
        this.isSubmited = false;
    }
    RulesIndexAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var rulesId = _this._global.decryptValue(params['rulesId']);
            var indexId = _this._global.decryptValue(params['indexId']);
            _this.rulesId = parseInt(rulesId);
            if (rulesId) {
                _this.GetRules(_this.rulesId);
                if (indexId) {
                    _this.addUpdateText = "Update";
                    _this.indexId = parseInt(indexId);
                    _this.EditRulesIndex(parseInt(indexId));
                }
                else {
                    _this.GetIndex(null);
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/rules'], {
                        queryParams: {
                            indexRules1: params["indexRules1"], indexRules2: params["indexRules2"], indexIndex: params["indexIndex"], sortingRulesField: params["sortingRulesField"], sortingRulesDirection: params["sortingRulesDirection"], sortingIndexField: params["sortingIndexField"], sortingIndexDirection: params["sortingIndexDirection"], sortingSubIndexField: params["sortingSubIndexField"], sortingSubIndexDirection: params["sortingSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
        this.frmRulesIndex = this.formBuilder.group({
            IndexId: [''],
            RulesId: [this.rulesId],
            IndexNo: ['', forms_1.Validators.required],
            IndexName: ['', forms_1.Validators.required],
            IndexContent: ['', forms_1.Validators.required],
            SaveAfterIndexId: ['']
        });
    };
    RulesIndexAdminComponent.prototype.GetRules = function (rulesId) {
        var _this = this;
        this.spinnerService.show();
        var getRulesRequest = new rules_1.GetRulesRequest();
        getRulesRequest.RulesId = rulesId;
        getRulesRequest.IsActive = null;
        this._rulesService.getRules(getRulesRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.rules = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    RulesIndexAdminComponent.prototype.GetIndex = function (indexData) {
        var _this = this;
        this.spinnerService.show();
        var getRulesIndexRequest = new rulesIndex_1.GetRulesIndexRequest();
        getRulesIndexRequest.RulesId = this.rulesId;
        this._rulesIndexService.getRulesIndex(getRulesIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.rulesIndexes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rulesIndexes.push({ IndexId: null, IndexNo: null, CreatedDate: null, IndexContent: null, IndexName: "--Select Index--", SortId: null, IsActive: null, IsDeleted: null, ModifiedDate: null, RulesId: null });
                data.Response.forEach(function (item) {
                    //if (data.Response.length != this.rulesIndexes.length)
                    _this.rulesIndexes.push({ IndexId: item.IndexId, IndexNo: item.IndexNo, CreatedDate: null, IndexContent: null, IndexName: item.IndexName, SortId: item.SortId, IsActive: null, IsDeleted: null, ModifiedDate: null, RulesId: null });
                });
                if (indexData) {
                    var index = _this.rulesIndexes.filter(function (x) { return x.SortId == (indexData.SortId - 1); });
                    _this.frmRulesIndex.get("SaveAfterIndexId").setValue((index.length > 0) ? index[0].IndexId : null);
                }
                else {
                    _this.frmRulesIndex.get("SaveAfterIndexId").setValue(null);
                }
                _this.frmRulesIndex.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_INDEX_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_INDEX_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RulesIndexAdminComponent.prototype.EditRulesIndex = function (indexId) {
        var _this = this;
        this.spinnerService.show();
        var getRulesIndexRequest = new rulesIndex_1.GetRulesIndexRequest();
        getRulesIndexRequest.IndexId = indexId;
        getRulesIndexRequest.IsActive = null;
        this._rulesIndexService.getRulesIndex(getRulesIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetIndex(data.Response[0]);
            _this.frmRulesIndex.setValue({
                IndexId: indexId,
                RulesId: data.Response[0].RulesId,
                IndexNo: data.Response[0].IndexNo,
                IndexName: data.Response[0].IndexName,
                IndexContent: data.Response[0].IndexContent,
                SaveAfterIndexId: null
            });
            _this.frmRulesIndex.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    RulesIndexAdminComponent.prototype.SaveRulesIndex = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.SaveAfterIndexId = (formData.value.SaveAfterIndexId && formData.value.SaveAfterIndexId != "null") ? formData.value.SaveAfterIndexId : null;
        if (formData.value.IndexId) {
            this._rulesIndexService.updateRulesIndex(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/rules'], {
                            queryParams: {
                                indexRules1: params["indexRules1"], indexRules2: params["indexRules2"], indexIndex: params["indexIndex"], sortingRulesField: params["sortingRulesField"], sortingRulesDirection: params["sortingRulesDirection"], sortingIndexField: params["sortingIndexField"], sortingIndexDirection: params["sortingIndexDirection"], sortingSubIndexField: params["sortingSubIndexField"], sortingSubIndexDirection: params["sortingSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RULES_INDEX_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_INDEX_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_INDEX_TITLE, { enableHtml: true });
            });
        }
        else {
            this._rulesIndexService.addRulesIndex(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/rules'], {
                            queryParams: {
                                indexRules1: params["indexRules1"], indexRules2: params["indexRules2"], indexIndex: params["indexIndex"], sortingRulesField: params["sortingRulesField"], sortingRulesDirection: params["sortingRulesDirection"], sortingIndexField: params["sortingIndexField"], sortingIndexDirection: params["sortingIndexDirection"], sortingSubIndexField: params["sortingSubIndexField"], sortingSubIndexDirection: params["sortingSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RULES_INDEX_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_INDEX_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_INDEX_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RulesIndexAdminComponent.prototype.OnSubmitRulesIndex = function (formData) {
        this.isSubmited = true;
        if (this.frmRulesIndex.valid) {
            this.SaveRulesIndex(formData);
        }
    };
    RulesIndexAdminComponent.prototype.CancelRulesIndex = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/rules'], {
                queryParams: {
                    indexRules1: params["indexRules1"], indexRules2: params["indexRules2"], indexIndex: params["indexIndex"], sortingRulesField: params["sortingRulesField"], sortingRulesDirection: params["sortingRulesDirection"], sortingIndexField: params["sortingIndexField"], sortingIndexDirection: params["sortingIndexDirection"], sortingSubIndexField: params["sortingSubIndexField"], sortingSubIndexDirection: params["sortingSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    RulesIndexAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './rulesIndex.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, rulesIndex_service_1.RulesIndexAdminService, rules_service_1.RulesAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], RulesIndexAdminComponent);
    return RulesIndexAdminComponent;
}());
exports.RulesIndexAdminComponent = RulesIndexAdminComponent;
//# sourceMappingURL=rulesIndex.component.js.map