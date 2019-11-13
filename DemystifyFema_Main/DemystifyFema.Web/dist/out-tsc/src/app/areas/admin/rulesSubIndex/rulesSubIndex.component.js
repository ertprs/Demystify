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
var rulesSubIndex_1 = require("../../../model/rulesSubIndex");
var rulesIndex_1 = require("../../../model/rulesIndex");
var rules_1 = require("../../../model/rules");
var rulesSubIndex_service_1 = require("../../../service/admin/rulesSubIndex.service");
var rulesIndex_service_1 = require("../../../service/admin/rulesIndex.service");
var rules_service_1 = require("../../../service/admin/rules.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var contentPopUp_component_1 = require("../../../areas/admin/contentPopUp/contentPopUp.component");
var RulesSubIndexAdminComponent = /** @class */ (function () {
    function RulesSubIndexAdminComponent(formBuilder, toastr, activatedRoute, router, _rulesSubIndexService, _rulesService, _rulesIndexService, vcr, spinnerService, modalService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._rulesSubIndexService = _rulesSubIndexService;
        this._rulesService = _rulesService;
        this._rulesIndexService = _rulesIndexService;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.modalService = modalService;
        this._global = new global_1.Global();
        this.rules = new rules_1.Rules();
        this.rulesIndex = new rulesIndex_1.RulesIndex();
        this.rulesSubIndexes = [];
        this.subIndexId = 0;
        this.isSubmited = false;
    }
    RulesSubIndexAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var rulesId = _this._global.decryptValue(params['rulesId']);
            var indexId = _this._global.decryptValue(params['indexId']);
            var subIndexId = _this._global.decryptValue(params['subIndexId']);
            _this.rulesId = parseInt(rulesId);
            _this.indexId = parseInt(indexId);
            if (rulesId && indexId) {
                _this.GetRules(_this.rulesId);
                _this.GetRulesIndex(_this.indexId);
                if (subIndexId) {
                    _this.addUpdateText = "Update";
                    _this.subIndexId = parseInt(subIndexId);
                    _this.EditRulesSubIndex(parseInt(subIndexId));
                }
                else {
                    _this.GetSubIndex(null);
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
        this.frmRulesSubIndex = this.formBuilder.group({
            SubIndexId: [''],
            IndexId: [this.indexId],
            SubIndexNo: ['', forms_1.Validators.required],
            SubIndexName: ['', forms_1.Validators.required],
            SubIndexContent: ['', forms_1.Validators.required],
            SaveAfterSubIndexId: ['']
        });
    };
    RulesSubIndexAdminComponent.prototype.GetRules = function (rulesId) {
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
    RulesSubIndexAdminComponent.prototype.GetRulesIndex = function (indexId) {
        var _this = this;
        this.spinnerService.show();
        var getRulesIndexRequest = new rulesIndex_1.GetRulesIndexRequest();
        getRulesIndexRequest.IndexId = indexId;
        getRulesIndexRequest.IsActive = null;
        this._rulesIndexService.getRulesIndex(getRulesIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.rulesIndex = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    RulesSubIndexAdminComponent.prototype.GetSubIndex = function (subIndexData) {
        var _this = this;
        this.spinnerService.show();
        var getRulesSubIndexRequest = new rulesSubIndex_1.GetRulesSubIndexRequest();
        getRulesSubIndexRequest.IndexId = this.indexId;
        this._rulesSubIndexService.getRulesSubIndex(getRulesSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.rulesSubIndexes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rulesSubIndexes.push({ SubIndexId: null, SubIndexNo: null, CreatedDate: null, SubIndexContent: null, SubIndexName: "--Select SubIndex--", SortId: null, IsActive: null, IsDeleted: null, ModifiedDate: null, IndexId: null });
                data.Response.forEach(function (item) {
                    //if (data.Response.length != this.rulesSubIndexes.length)
                    _this.rulesSubIndexes.push({ SubIndexId: item.SubIndexId, SubIndexNo: item.SubIndexNo, CreatedDate: null, SubIndexContent: null, SubIndexName: item.SubIndexName, SortId: item.SortId, IsActive: null, IsDeleted: null, ModifiedDate: null, IndexId: null });
                });
                if (subIndexData) {
                    var index = _this.rulesSubIndexes.filter(function (x) { return x.SortId == (subIndexData.SortId - 1); });
                    _this.frmRulesSubIndex.get("SaveAfterSubIndexId").setValue((index.length > 0) ? index[0].SubIndexId : null);
                }
                else {
                    _this.frmRulesSubIndex.get("SaveAfterSubIndexId").setValue(null);
                }
                _this.frmRulesSubIndex.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUBINDEX_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUBINDEX_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RulesSubIndexAdminComponent.prototype.EditRulesSubIndex = function (subIndexId) {
        var _this = this;
        this.spinnerService.show();
        var getRulesSubIndexRequest = new rulesSubIndex_1.GetRulesSubIndexRequest();
        getRulesSubIndexRequest.SubIndexId = subIndexId;
        getRulesSubIndexRequest.IsActive = null;
        this._rulesSubIndexService.getRulesSubIndex(getRulesSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetSubIndex(data.Response[0]);
            _this.frmRulesSubIndex.setValue({
                SubIndexId: subIndexId,
                IndexId: data.Response[0].IndexId,
                SubIndexNo: data.Response[0].SubIndexNo,
                SubIndexName: data.Response[0].SubIndexName,
                SubIndexContent: data.Response[0].SubIndexContent,
                SaveAfterSubIndexId: null
            });
            _this.frmRulesSubIndex.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    RulesSubIndexAdminComponent.prototype.SaveRulesSubIndex = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.SaveAfterSubIndexId = (formData.value.SaveAfterSubIndexId && formData.value.SaveAfterSubIndexId != "null") ? formData.value.SaveAfterSubIndexId : null;
        if (formData.value.SubIndexId) {
            this._rulesSubIndexService.updateRulesSubIndex(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/rules'], {
                            queryParams: {
                                indexRules1: params["indexRules1"], indexRules2: params["indexRules2"], indexIndex: params["indexIndex"], sortingRulesField: params["sortingRulesField"], sortingRulesDirection: params["sortingRulesDirection"], sortingIndexField: params["sortingIndexField"], sortingIndexDirection: params["sortingIndexDirection"], sortingSubIndexField: params["sortingSubIndexField"], sortingSubIndexDirection: params["sortingSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SUBINDEX_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUBINDEX_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUBINDEX_TITLE, { enableHtml: true });
            });
        }
        else {
            this._rulesSubIndexService.addRulesSubIndex(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/rules'], {
                            queryParams: {
                                indexRules1: params["indexRules1"], indexRules2: params["indexRules2"], indexIndex: params["indexIndex"], sortingRulesField: params["sortingRulesField"], sortingRulesDirection: params["sortingRulesDirection"], sortingIndexField: params["sortingIndexField"], sortingIndexDirection: params["sortingIndexDirection"], sortingSubIndexField: params["sortingSubIndexField"], sortingSubIndexDirection: params["sortingSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_SUBINDEX_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUBINDEX_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUBINDEX_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RulesSubIndexAdminComponent.prototype.OnSubmitRulesSubIndex = function (formData) {
        this.isSubmited = true;
        if (this.frmRulesSubIndex.valid) {
            formData.value.IndexId = this.indexId;
            this.SaveRulesSubIndex(formData);
        }
    };
    RulesSubIndexAdminComponent.prototype.CancelRulesSubIndex = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/rules'], {
                queryParams: {
                    indexRules1: params["indexRules1"], indexRules2: params["indexRules2"], indexIndex: params["indexIndex"], sortingRulesField: params["sortingRulesField"], sortingRulesDirection: params["sortingRulesDirection"], sortingIndexField: params["sortingIndexField"], sortingIndexDirection: params["sortingIndexDirection"], sortingSubIndexField: params["sortingSubIndexField"], sortingSubIndexDirection: params["sortingSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    RulesSubIndexAdminComponent.prototype.ShowContent = function (title, content) {
        this.modalService.openDialog(this.vcr, {
            title: title,
            childComponent: contentPopUp_component_1.ContentPopUpAdminComponent,
            data: content
        });
    };
    RulesSubIndexAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './rulesSubIndex.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, rulesSubIndex_service_1.RulesSubIndexAdminService, rules_service_1.RulesAdminService, rulesIndex_service_1.RulesIndexAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, ngx_modal_dialog_1.ModalDialogService])
    ], RulesSubIndexAdminComponent);
    return RulesSubIndexAdminComponent;
}());
exports.RulesSubIndexAdminComponent = RulesSubIndexAdminComponent;
//# sourceMappingURL=rulesSubIndex.component.js.map