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
var masterDirection_1 = require("../../../model/masterDirection");
var masterDirectionFAQ_1 = require("../../../model/masterDirectionFAQ");
var fAQ_1 = require("../../../model/fAQ");
var masterDirection_service_1 = require("../../../service/admin/masterDirection.service");
var masterDirectionFAQ_service_1 = require("../../../service/admin/masterDirectionFAQ.service");
var fAQ_service_1 = require("../../../service/admin/fAQ.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var MasterDirectionFAQAdminComponent = /** @class */ (function () {
    function MasterDirectionFAQAdminComponent(formBuilder, toastr, activatedRoute, router, _masterDirection, _masterDirectionFAQService, _fAQService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._masterDirection = _masterDirection;
        this._masterDirectionFAQService = _masterDirectionFAQService;
        this._fAQService = _fAQService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.fAQs = [];
        this.masterDirection = new masterDirection_1.MasterDirection();
        this.masterDirectionId = 0;
        this.masterDirectionFAQId = 0;
        this.isSubmited = false;
        this.masterDirectionPDFPath = global_1.Global.MASTERDIRECTION_PDF_FILEPATH;
    }
    MasterDirectionFAQAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var masterDirectionId = _this._global.decryptValue(params['masterDirectionId']);
            var masterDirectionFAQId = _this._global.decryptValue(params['masterDirectionFAQId']);
            if (masterDirectionId) {
                _this.masterDirectionId = parseInt(masterDirectionId);
                _this.GetMasterDirection(_this.masterDirectionId);
                if (masterDirectionFAQId) {
                    _this.addUpdateText = "Update";
                    _this.masterDirectionFAQId = parseInt(masterDirectionFAQId);
                    _this.EditMasterDirectionFAQ(parseInt(masterDirectionFAQId));
                }
                else {
                    _this.GetFAQ(null);
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/masterdirections'], {
                        queryParams: {
                            indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
        this.frmMasterDirectionFAQ = this.formBuilder.group({
            MasterDirectionFAQId: [''],
            MasterDirectionId: [this.masterDirectionId],
            FAQId: ['', forms_1.Validators.required]
        });
    };
    MasterDirectionFAQAdminComponent.prototype.GetMasterDirection = function (masterDirectionId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionRequest = new masterDirection_1.GetMasterDirectionRequest();
        getMasterDirectionRequest.MasterDirectionId = masterDirectionId;
        getMasterDirectionRequest.IsActive = null;
        this._masterDirection.getMasterDirection(getMasterDirectionRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirection = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    MasterDirectionFAQAdminComponent.prototype.GetFAQ = function (masterDirectionFAQData) {
        var _this = this;
        this.spinnerService.show();
        var getFAQRequest = new fAQ_1.GetFAQRequest();
        this._fAQService.getFAQ(getFAQRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fAQs = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fAQs.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.fAQs.push({ Value: item.FAQId, Text: item.TopicName });
                });
                _this.frmMasterDirectionFAQ.get("FAQId").setValue((masterDirectionFAQData != null) ? masterDirectionFAQData.FAQId : "");
                _this.frmMasterDirectionFAQ.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_FAQ_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_FAQ_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    MasterDirectionFAQAdminComponent.prototype.EditMasterDirectionFAQ = function (masterDirectionFAQId) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionFAQRequest = new masterDirectionFAQ_1.GetMasterDirectionFAQRequest();
        getMasterDirectionFAQRequest.MasterDirectionFAQId = masterDirectionFAQId;
        getMasterDirectionFAQRequest.IsActive = null;
        this._masterDirectionFAQService.getMasterDirectionFAQ(getMasterDirectionFAQRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetFAQ(data.Response[0]);
            _this.frmMasterDirectionFAQ.setValue({
                MasterDirectionFAQId: masterDirectionFAQId,
                MasterDirectionId: data.Response[0].MasterDirectionId,
                FAQId: data.Response[0].FAQId
            });
            _this.frmMasterDirectionFAQ.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    MasterDirectionFAQAdminComponent.prototype.SaveMasterDirectionFAQ = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.MasterDirectionFAQId) {
            this._masterDirectionFAQService.updateMasterDirectionFAQ(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/masterdirections'], {
                            queryParams: {
                                indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_FAQ_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_FAQ_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_FAQ_TITLE, { enableHtml: true });
            });
        }
        else {
            this._masterDirectionFAQService.addMasterDirectionFAQ(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/masterdirections'], {
                            queryParams: {
                                indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_FAQ_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_FAQ_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_MASTER_DIRECTION_FAQ_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    MasterDirectionFAQAdminComponent.prototype.OnSubmitMasterDirectionFAQ = function (formData) {
        this.isSubmited = true;
        if (this.frmMasterDirectionFAQ.valid) {
            this.SaveMasterDirectionFAQ(formData);
        }
    };
    MasterDirectionFAQAdminComponent.prototype.CancelMasterDirectionFAQ = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/masterdirections'], {
                queryParams: {
                    indexMasterDirection1: params["indexMasterDirection1"], indexMasterDirection2: params["indexMasterDirection2"], indexMasterDirection3: params["indexMasterDirection3"], indexChapter: params["indexChapter"], indexIndex: params["indexIndex"], sortingMasterDirectionField: params["sortingMasterDirectionField"], sortingMasterDirectionDirection: params["sortingMasterDirectionDirection"], sortingFAQField: params["sortingFAQField"], sortingFAQDirection: params["sortingFAQDirection"], sortingMasterChapterField: params["sortingMasterChapterField"], sortingMasterChapterDirection: params["sortingMasterChapterDirection"], sortingMasterDirectionIndexField: params["sortingMasterDirectionIndexField"], sortingMasterDirectionIndexDirection: params["sortingMasterDirectionIndexDirection"], sortingMasterDirectionSubIndexField: params["sortingMasterDirectionSubIndexField"], sortingMasterDirectionSubIndexDirection: params["sortingMasterDirectionSubIndexDirection"], sortingMasterDirectionIndexAmendmentField: params["sortingMasterDirectionIndexAmendmentField"], sortingMasterDirectionIndexAmendmentDirection: params["sortingMasterDirectionIndexAmendmentDirection"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    MasterDirectionFAQAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './masterDirectionFAQ.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, masterDirection_service_1.MasterDirectionAdminService, masterDirectionFAQ_service_1.MasterDirectionFAQAdminService, fAQ_service_1.FAQAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], MasterDirectionFAQAdminComponent);
    return MasterDirectionFAQAdminComponent;
}());
exports.MasterDirectionFAQAdminComponent = MasterDirectionFAQAdminComponent;
//# sourceMappingURL=masterDirectionFAQ.component.js.map