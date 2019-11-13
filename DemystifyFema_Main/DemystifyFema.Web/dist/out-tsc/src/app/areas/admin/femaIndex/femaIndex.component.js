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
var femaIndex_1 = require("../../../model/femaIndex");
var regulation_1 = require("../../../model/regulation");
var femaIndex_service_1 = require("../../../service/admin/femaIndex.service");
var regulation_service_1 = require("../../../service/admin/regulation.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var FemaIndexAdminComponent = /** @class */ (function () {
    function FemaIndexAdminComponent(formBuilder, toastr, activatedRoute, router, _femaIndexService, _regulationService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._femaIndexService = _femaIndexService;
        this._regulationService = _regulationService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.regulation = new regulation_1.Regulation();
        this.femaIndexes = [];
        this.indexId = 0;
        this.isSubmited = false;
    }
    FemaIndexAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var regulationId = _this._global.decryptValue(params['regulationId']);
            var indexId = _this._global.decryptValue(params['indexId']);
            _this.regulationId = parseInt(regulationId);
            if (regulationId) {
                _this.GetRegulation(_this.regulationId);
                if (indexId) {
                    _this.addUpdateText = "Update";
                    _this.indexId = parseInt(indexId);
                    _this.EditFemaIndex(parseInt(indexId));
                }
                else {
                    _this.GetIndex(null);
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/regulations'], {
                        queryParams: {
                            indexRegulation1: params["indexRegulation1"], indexRegulation2: params["indexRegulation2"], indexIndex: params["indexIndex"], sortingRegulationField: params["sortingRegulationField"], sortingRegulationDirection: params["sortingRegulationDirection"], sortingFemaIndexField: params["sortingFemaIndexField"], sortingFemaIndexDirection: params["sortingFemaIndexDirection"], sortingFemaSubIndexField: params["sortingFemaSubIndexField"], sortingFemaSubIndexDirection: params["sortingFemaSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
        this.frmFemaIndex = this.formBuilder.group({
            IndexId: [''],
            RegulationId: [this.regulationId],
            IndexNo: ['', forms_1.Validators.required],
            IndexName: ['', forms_1.Validators.required],
            IndexContent: ['', forms_1.Validators.required],
            SaveAfterIndexId: ['']
        });
    };
    FemaIndexAdminComponent.prototype.GetRegulation = function (regulationId) {
        var _this = this;
        this.spinnerService.show();
        var getRegulationRequest = new regulation_1.GetRegulationRequest();
        getRegulationRequest.RegulationId = regulationId;
        getRegulationRequest.IsActive = null;
        this._regulationService.getRegulation(getRegulationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.regulation = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    FemaIndexAdminComponent.prototype.GetIndex = function (indexData) {
        var _this = this;
        this.spinnerService.show();
        var getFemaIndexRequest = new femaIndex_1.GetFemaIndexRequest();
        getFemaIndexRequest.RegulationId = this.regulationId;
        this._femaIndexService.getFemaIndex(getFemaIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.femaIndexes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.femaIndexes.push({ IndexId: null, IndexNo: null, CreatedDate: null, IndexContent: null, IndexName: "--Select Index--", SortId: null, IsActive: null, IsDeleted: null, ModifiedDate: null, RegulationId: null });
                data.Response.forEach(function (item) {
                    //if (data.Response.length != this.femaIndexes.length)
                    _this.femaIndexes.push({ IndexId: item.IndexId, IndexNo: item.IndexNo, CreatedDate: null, IndexContent: null, IndexName: item.IndexName, SortId: item.SortId, IsActive: null, IsDeleted: null, ModifiedDate: null, RegulationId: null });
                });
                if (indexData) {
                    var index = _this.femaIndexes.filter(function (x) { return x.SortId == (indexData.SortId - 1); });
                    _this.frmFemaIndex.get("SaveAfterIndexId").setValue((index.length > 0) ? index[0].IndexId : null);
                }
                else {
                    _this.frmFemaIndex.get("SaveAfterIndexId").setValue(null);
                }
                _this.frmFemaIndex.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_INDEX_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_INDEX_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FemaIndexAdminComponent.prototype.EditFemaIndex = function (indexId) {
        var _this = this;
        this.spinnerService.show();
        var getFemaIndexRequest = new femaIndex_1.GetFemaIndexRequest();
        getFemaIndexRequest.IndexId = indexId;
        getFemaIndexRequest.IsActive = null;
        this._femaIndexService.getFemaIndex(getFemaIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetIndex(data.Response[0]);
            _this.frmFemaIndex.setValue({
                IndexId: indexId,
                RegulationId: data.Response[0].RegulationId,
                IndexNo: data.Response[0].IndexNo,
                IndexName: data.Response[0].IndexName,
                IndexContent: data.Response[0].IndexContent,
                SaveAfterIndexId: null
            });
            _this.frmFemaIndex.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    FemaIndexAdminComponent.prototype.SaveFemaIndex = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.SaveAfterIndexId = (formData.value.SaveAfterIndexId && formData.value.SaveAfterIndexId != "null") ? formData.value.SaveAfterIndexId : null;
        if (formData.value.IndexId) {
            this._femaIndexService.updateFemaIndex(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/regulations'], {
                            queryParams: {
                                indexRegulation1: params["indexRegulation1"], indexRegulation2: params["indexRegulation2"], indexIndex: params["indexIndex"], sortingRegulationField: params["sortingRegulationField"], sortingRegulationDirection: params["sortingRegulationDirection"], sortingFemaIndexField: params["sortingFemaIndexField"], sortingFemaIndexDirection: params["sortingFemaIndexDirection"], sortingFemaSubIndexField: params["sortingFemaSubIndexField"], sortingFemaSubIndexDirection: params["sortingFemaSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_INDEX_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_INDEX_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_INDEX_TITLE, { enableHtml: true });
            });
        }
        else {
            this._femaIndexService.addFemaIndex(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/regulations'], {
                            queryParams: {
                                indexRegulation1: params["indexRegulation1"], indexRegulation2: params["indexRegulation2"], indexIndex: params["indexIndex"], sortingRegulationField: params["sortingRegulationField"], sortingRegulationDirection: params["sortingRegulationDirection"], sortingFemaIndexField: params["sortingFemaIndexField"], sortingFemaIndexDirection: params["sortingFemaIndexDirection"], sortingFemaSubIndexField: params["sortingFemaSubIndexField"], sortingFemaSubIndexDirection: params["sortingFemaSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_INDEX_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_INDEX_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_INDEX_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FemaIndexAdminComponent.prototype.OnSubmitFemaIndex = function (formData) {
        this.isSubmited = true;
        if (this.frmFemaIndex.valid) {
            this.SaveFemaIndex(formData);
        }
    };
    FemaIndexAdminComponent.prototype.CancelFemaIndex = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/regulations'], {
                queryParams: {
                    indexRegulation1: params["indexRegulation1"], indexRegulation2: params["indexRegulation2"], indexIndex: params["indexIndex"], sortingRegulationField: params["sortingRegulationField"], sortingRegulationDirection: params["sortingRegulationDirection"], sortingFemaIndexField: params["sortingFemaIndexField"], sortingFemaIndexDirection: params["sortingFemaIndexDirection"], sortingFemaSubIndexField: params["sortingFemaSubIndexField"], sortingFemaSubIndexDirection: params["sortingFemaSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    FemaIndexAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './femaIndex.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, femaIndex_service_1.FemaIndexAdminService, regulation_service_1.RegulationAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], FemaIndexAdminComponent);
    return FemaIndexAdminComponent;
}());
exports.FemaIndexAdminComponent = FemaIndexAdminComponent;
//# sourceMappingURL=femaIndex.component.js.map