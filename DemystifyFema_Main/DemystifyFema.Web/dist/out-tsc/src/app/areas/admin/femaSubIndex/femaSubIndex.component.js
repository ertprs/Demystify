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
var femaSubIndex_1 = require("../../../model/femaSubIndex");
var femaIndex_1 = require("../../../model/femaIndex");
var regulation_1 = require("../../../model/regulation");
var femaSubIndex_service_1 = require("../../../service/admin/femaSubIndex.service");
var femaIndex_service_1 = require("../../../service/admin/femaIndex.service");
var regulation_service_1 = require("../../../service/admin/regulation.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var contentPopUp_component_1 = require("../../../areas/admin/contentPopUp/contentPopUp.component");
var FemaSubIndexAdminComponent = /** @class */ (function () {
    function FemaSubIndexAdminComponent(formBuilder, toastr, activatedRoute, router, _femaSubIndexService, _regulationService, _femaIndexService, vcr, spinnerService, modalService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._femaSubIndexService = _femaSubIndexService;
        this._regulationService = _regulationService;
        this._femaIndexService = _femaIndexService;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.modalService = modalService;
        this._global = new global_1.Global();
        this.regulation = new regulation_1.Regulation();
        this.femaIndex = new femaIndex_1.FemaIndex();
        this.femaSubIndexes = [];
        this.subIndexId = 0;
        this.isSubmited = false;
    }
    FemaSubIndexAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var regulationId = _this._global.decryptValue(params['regulationId']);
            var indexId = _this._global.decryptValue(params['indexId']);
            var subIndexId = _this._global.decryptValue(params['subIndexId']);
            _this.regulationId = parseInt(regulationId);
            _this.indexId = parseInt(indexId);
            if (regulationId && indexId) {
                _this.GetRegulation(_this.regulationId);
                _this.GetFemaIndex(_this.indexId);
                if (subIndexId) {
                    _this.addUpdateText = "Update";
                    _this.subIndexId = parseInt(subIndexId);
                    _this.EditFemaSubIndex(parseInt(subIndexId));
                }
                else {
                    _this.GetSubIndex(null);
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
        this.frmFemaSubIndex = this.formBuilder.group({
            SubIndexId: [''],
            IndexId: [this.indexId],
            SubIndexNo: ['', forms_1.Validators.required],
            SubIndexName: ['', forms_1.Validators.required],
            SubIndexContent: ['', forms_1.Validators.required],
            SaveAfterSubIndexId: ['']
        });
    };
    FemaSubIndexAdminComponent.prototype.GetRegulation = function (regulationId) {
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
    FemaSubIndexAdminComponent.prototype.GetFemaIndex = function (indexId) {
        var _this = this;
        this.spinnerService.show();
        var getFemaIndexRequest = new femaIndex_1.GetFemaIndexRequest();
        getFemaIndexRequest.IndexId = indexId;
        getFemaIndexRequest.IsActive = null;
        this._femaIndexService.getFemaIndex(getFemaIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.femaIndex = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    FemaSubIndexAdminComponent.prototype.GetSubIndex = function (subIndexData) {
        var _this = this;
        this.spinnerService.show();
        var getFemaSubIndexRequest = new femaSubIndex_1.GetFemaSubIndexRequest();
        getFemaSubIndexRequest.IndexId = this.indexId;
        this._femaSubIndexService.getFemaSubIndex(getFemaSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.femaSubIndexes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.femaSubIndexes.push({ SubIndexId: null, SubIndexNo: null, CreatedDate: null, SubIndexContent: null, SubIndexName: "--Select SubIndex--", SortId: null, IsActive: null, IsDeleted: null, ModifiedDate: null, IndexId: null });
                data.Response.forEach(function (item) {
                    //if (data.Response.length != this.femaSubIndexes.length)
                    _this.femaSubIndexes.push({ SubIndexId: item.SubIndexId, SubIndexNo: item.SubIndexNo, CreatedDate: null, SubIndexContent: null, SubIndexName: item.SubIndexName, SortId: item.SortId, IsActive: null, IsDeleted: null, ModifiedDate: null, IndexId: null });
                });
                if (subIndexData) {
                    var index = _this.femaSubIndexes.filter(function (x) { return x.SortId == (subIndexData.SortId - 1); });
                    _this.frmFemaSubIndex.get("SaveAfterSubIndexId").setValue((index.length > 0) ? index[0].SubIndexId : null);
                }
                else {
                    _this.frmFemaSubIndex.get("SaveAfterSubIndexId").setValue(null);
                }
                _this.frmFemaSubIndex.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_SUBINDEX_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_SUBINDEX_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FemaSubIndexAdminComponent.prototype.EditFemaSubIndex = function (subIndexId) {
        var _this = this;
        this.spinnerService.show();
        var getFemaSubIndexRequest = new femaSubIndex_1.GetFemaSubIndexRequest();
        getFemaSubIndexRequest.SubIndexId = subIndexId;
        getFemaSubIndexRequest.IsActive = null;
        this._femaSubIndexService.getFemaSubIndex(getFemaSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetSubIndex(data.Response[0]);
            _this.frmFemaSubIndex.setValue({
                SubIndexId: subIndexId,
                IndexId: data.Response[0].IndexId,
                SubIndexNo: data.Response[0].SubIndexNo,
                SubIndexName: data.Response[0].SubIndexName,
                SubIndexContent: data.Response[0].SubIndexContent,
                SaveAfterSubIndexId: null
            });
            _this.frmFemaSubIndex.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    FemaSubIndexAdminComponent.prototype.SaveFemaSubIndex = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.SaveAfterSubIndexId = (formData.value.SaveAfterSubIndexId && formData.value.SaveAfterSubIndexId != "null") ? formData.value.SaveAfterSubIndexId : null;
        if (formData.value.SubIndexId) {
            this._femaSubIndexService.updateFemaSubIndex(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/regulations'], {
                            queryParams: {
                                indexRegulation1: params["indexRegulation1"], indexRegulation2: params["indexRegulation2"], indexIndex: params["indexIndex"], sortingRegulationField: params["sortingRegulationField"], sortingRegulationDirection: params["sortingRegulationDirection"], sortingFemaIndexField: params["sortingFemaIndexField"], sortingFemaIndexDirection: params["sortingFemaIndexDirection"], sortingFemaSubIndexField: params["sortingFemaSubIndexField"], sortingFemaSubIndexDirection: params["sortingFemaSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
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
            this._femaSubIndexService.addFemaSubIndex(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/regulations'], {
                            queryParams: {
                                indexRegulation1: params["indexRegulation1"], indexRegulation2: params["indexRegulation2"], indexIndex: params["indexIndex"], sortingRegulationField: params["sortingRegulationField"], sortingRegulationDirection: params["sortingRegulationDirection"], sortingFemaIndexField: params["sortingFemaIndexField"], sortingFemaIndexDirection: params["sortingFemaIndexDirection"], sortingFemaSubIndexField: params["sortingFemaSubIndexField"], sortingFemaSubIndexDirection: params["sortingFemaSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
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
    FemaSubIndexAdminComponent.prototype.OnSubmitFemaSubIndex = function (formData) {
        this.isSubmited = true;
        if (this.frmFemaSubIndex.valid) {
            formData.value.IndexId = this.indexId;
            this.SaveFemaSubIndex(formData);
        }
    };
    FemaSubIndexAdminComponent.prototype.CancelFemaSubIndex = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/regulations'], {
                queryParams: {
                    indexRegulation1: params["indexRegulation1"], indexRegulation2: params["indexRegulation2"], indexIndex: params["indexIndex"], sortingRegulationField: params["sortingRegulationField"], sortingRegulationDirection: params["sortingRegulationDirection"], sortingFemaIndexField: params["sortingFemaIndexField"], sortingFemaIndexDirection: params["sortingFemaIndexDirection"], sortingFemaSubIndexField: params["sortingFemaSubIndexField"], sortingFemaSubIndexDirection: params["sortingFemaSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    FemaSubIndexAdminComponent.prototype.ShowContent = function (title, content) {
        this.modalService.openDialog(this.vcr, {
            title: title,
            childComponent: contentPopUp_component_1.ContentPopUpAdminComponent,
            data: content
        });
    };
    FemaSubIndexAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './femaSubIndex.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, femaSubIndex_service_1.FemaSubIndexAdminService, regulation_service_1.RegulationAdminService, femaIndex_service_1.FemaIndexAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, ngx_modal_dialog_1.ModalDialogService])
    ], FemaSubIndexAdminComponent);
    return FemaSubIndexAdminComponent;
}());
exports.FemaSubIndexAdminComponent = FemaSubIndexAdminComponent;
//# sourceMappingURL=femaSubIndex.component.js.map