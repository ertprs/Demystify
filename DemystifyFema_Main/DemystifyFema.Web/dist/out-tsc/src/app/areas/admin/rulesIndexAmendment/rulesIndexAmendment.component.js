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
var rulesIndexAmendment_1 = require("../../../model/rulesIndexAmendment");
var gSRNotification_1 = require("../../../model/gSRNotification");
var rulesIndex_1 = require("../../../model/rulesIndex");
var rulesSubIndex_1 = require("../../../model/rulesSubIndex");
var rules_1 = require("../../../model/rules");
var rulesIndexAmendment_service_1 = require("../../../service/admin/rulesIndexAmendment.service");
var indexAmendment_1 = require("../../../model/indexAmendment");
var indexAmendment_service_1 = require("../../../service/admin/indexAmendment.service");
var gSRNotification_service_1 = require("../../../service/admin/gSRNotification.service");
var rulesIndex_service_1 = require("../../../service/admin/rulesIndex.service");
var rulesSubIndex_service_1 = require("../../../service/admin/rulesSubIndex.service");
var rules_service_1 = require("../../../service/admin/rules.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var RulesIndexAmendmentAdminComponent = /** @class */ (function () {
    function RulesIndexAmendmentAdminComponent(formBuilder, toastr, activatedRoute, router, _rulesIndexAmendmentService, _gSRNotificationService, _rulesIndexService, _rulesSubIndexService, _rulesService, _indexAmendmentService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._rulesIndexAmendmentService = _rulesIndexAmendmentService;
        this._gSRNotificationService = _gSRNotificationService;
        this._rulesIndexService = _rulesIndexService;
        this._rulesSubIndexService = _rulesSubIndexService;
        this._rulesService = _rulesService;
        this._indexAmendmentService = _indexAmendmentService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.gSRNotifications = [];
        this.rulesIndexes = [];
        this.rulesSubIndexes = [];
        this.gSRNotificationDropDownSettings = {};
        this.selectedGSRNotifications = [];
        this.rules = new rules_1.Rules();
        this.rulesId = 0;
        this.rulesIndexAmendmentId = 0;
        this.isSubmited = false;
    }
    RulesIndexAmendmentAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var rulesId = _this._global.decryptValue(params['rulesId']);
            var rulesIndexAmendmentId = _this._global.decryptValue(params['rulesIndexAmendmentId']);
            _this.rulesId = parseInt(rulesId);
            if (rulesId) {
                _this.GetRules(_this.rulesId);
                if (rulesIndexAmendmentId) {
                    _this.addUpdateText = "Update";
                    _this.rulesIndexAmendmentId = parseInt(rulesIndexAmendmentId);
                    _this.EditRulesIndexAmendment(parseInt(rulesIndexAmendmentId));
                }
                else {
                    _this.GetGSRNotification(null);
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/ruless'], {
                        queryParams: {
                            indexRules1: params["indexRules1"], indexRules2: params["indexRules2"], indexIndex: params["indexIndex"], sortingRulesField: params["sortingRulesField"], sortingRulesDirection: params["sortingRulesDirection"], sortingIndexField: params["sortingIndexField"], sortingIndexDirection: params["sortingIndexDirection"], sortingSubIndexField: params["sortingSubIndexField"], sortingSubIndexDirection: params["sortingSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
        this.frmRulesIndexAmendment = this.formBuilder.group({
            RulesIndexAmendmentId: [''],
            RulesId: [this.rulesId],
            GSRNotificationIds: ['', forms_1.Validators.required],
            IndexId: ['', forms_1.Validators.required],
            SubIndexId: [''],
            IndexAmendmentContent: this.formBuilder.array([this.CreateCKEditor(0, null, "Add")])
        });
    };
    RulesIndexAmendmentAdminComponent.prototype.CreateCKEditor = function (id, content, status) {
        return this.formBuilder.group({
            Id: id,
            Content: content,
            Status: status
        });
    };
    RulesIndexAmendmentAdminComponent.prototype.AddCKEditor = function (id, content, status) {
        this.IndexAmendmentContent = this.frmRulesIndexAmendment.get('IndexAmendmentContent');
        this.IndexAmendmentContent.push(this.CreateCKEditor(id, content, status));
    };
    RulesIndexAmendmentAdminComponent.prototype.RemoveCKEditor = function (index) {
        this.IndexAmendmentContent.removeAt(index);
    };
    RulesIndexAmendmentAdminComponent.prototype.GetRules = function (rulesId) {
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
    RulesIndexAmendmentAdminComponent.prototype.GetGSRNotification = function (rulesIndexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        var getGSRNotificationRequest = new gSRNotification_1.GetGSRNotificationRequest();
        getGSRNotificationRequest.RulesId = this.rulesId;
        this._gSRNotificationService.getGSRNotification(getGSRNotificationRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.GetIndex(rulesIndexAmendmentData);
            _this.gSRNotifications = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                //this.gSRNotifications.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.gSRNotifications.push({ Value: item.GSRNotificationId, Text: item.GSRNotificationNo });
                });
                //this.frmRulesIndexAmendment.get("GSRNotificationId").setValue((rulesIndexAmendmentData != null) ? rulesIndexAmendmentData.GSRNotificationId : "");
                //this.frmRulesIndexAmendment.updateValueAndValidity();
                _this.gSRNotificationDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: false,
                    allowSearchFilter: true
                };
                var selectedGSRNotifications_1 = [];
                if (rulesIndexAmendmentData != null) {
                    rulesIndexAmendmentData.GSRNotificationIds.split(',').forEach(function (item) {
                        if (item)
                            selectedGSRNotifications_1.push({ Value: parseInt(item), Text: _this.gSRNotifications.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedGSRNotifications = selectedGSRNotifications_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_INDEXAMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_INDEXAMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RulesIndexAmendmentAdminComponent.prototype.GetIndex = function (rulesIndexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        var getRulesIndexRequest = new rulesIndex_1.GetRulesIndexRequest();
        getRulesIndexRequest.RulesId = this.rulesId;
        this._rulesIndexService.getRulesIndex(getRulesIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.rulesIndexes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rulesIndexes.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.rulesIndexes.push({ Value: item.IndexId, Text: item.IndexNo + ' - ' + item.IndexName });
                });
                _this.frmRulesIndexAmendment.get("IndexId").setValue((rulesIndexAmendmentData != null) ? rulesIndexAmendmentData.IndexId : "");
                _this.frmRulesIndexAmendment.updateValueAndValidity();
                if (rulesIndexAmendmentData != null)
                    _this.GetSubIndex(rulesIndexAmendmentData.IndexId, rulesIndexAmendmentData);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_INDEXAMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_INDEXAMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RulesIndexAmendmentAdminComponent.prototype.OnIndexChange = function (indexId) {
        this.rulesSubIndexes = [];
        if (indexId.toString() != 'null') {
            this.GetSubIndex(indexId, null);
        }
        else {
            this.frmRulesIndexAmendment.get("IndexId").setValue('');
            this.frmRulesIndexAmendment.updateValueAndValidity();
        }
    };
    RulesIndexAmendmentAdminComponent.prototype.GetSubIndex = function (indexId, rulesIndexAmendmentData) {
        var _this = this;
        this.spinnerService.show();
        var getRulesSubIndexRequest = new rulesSubIndex_1.GetRulesSubIndexRequest();
        getRulesSubIndexRequest.IndexId = indexId;
        this._rulesSubIndexService.getRulesSubIndex(getRulesSubIndexRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.rulesSubIndexes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.rulesSubIndexes.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.rulesSubIndexes.push({ Value: item.SubIndexId, Text: item.SubIndexNo + ' - ' + item.SubIndexName });
                });
                _this.frmRulesIndexAmendment.get("SubIndexId").setValue((rulesIndexAmendmentData != null) ? rulesIndexAmendmentData.SubIndexId : "");
                _this.frmRulesIndexAmendment.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_INDEXAMENDMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_INDEXAMENDMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    RulesIndexAmendmentAdminComponent.prototype.EditRulesIndexAmendment = function (rulesIndexAmendmentId) {
        var _this = this;
        this.spinnerService.show();
        var t_this = this;
        var getRulesIndexAmendmentRequest = new rulesIndexAmendment_1.GetRulesIndexAmendmentRequest();
        getRulesIndexAmendmentRequest.RulesIndexAmendmentId = rulesIndexAmendmentId;
        getRulesIndexAmendmentRequest.RulesId = this.rulesId;
        getRulesIndexAmendmentRequest.IsActive = null;
        this._rulesIndexAmendmentService.getRulesIndexAmendment(getRulesIndexAmendmentRequest)
            .subscribe(function (data) {
            var getAmendmentContentRequest = new indexAmendment_1.GetAmendmentContentRequest();
            getAmendmentContentRequest.IndexAmendmentId = rulesIndexAmendmentId;
            getAmendmentContentRequest.AmendmentContentModuleId = global_1.Global.AMENDMENT_CONTENT_MODULE_FEMA_RULES;
            getAmendmentContentRequest.IsActive = null;
            t_this._indexAmendmentService.getAmendmentContent(getAmendmentContentRequest)
                .subscribe(function (content) {
                _this.spinnerService.hide();
                _this.GetGSRNotification(data.Response[0]);
                _this.GetIndex(data.Response[0]);
                _this.frmRulesIndexAmendment.setValue({
                    RulesIndexAmendmentId: rulesIndexAmendmentId,
                    RulesId: data.Response[0].RulesId,
                    GSRNotificationIds: [],
                    IndexId: data.Response[0].IndexId,
                    SubIndexId: data.Response[0].SubIndexId,
                    IndexAmendmentContent: (content.Response.length > 0) ? [{ Id: content.Response[0].AmendmentContentId, Content: content.Response[0].AmendmentContents, Status: "Update" }] : [{ Id: 0, Content: '', Status: "Add" }]
                });
                if (content.Response.length > 0)
                    content.Response.shift();
                content.Response.forEach(function (item) {
                    t_this.AddCKEditor(item.AmendmentContentId, item.AmendmentContents, "Update");
                });
                _this.frmRulesIndexAmendment.updateValueAndValidity();
            }, function (error) { return t_this.msg = error; });
        }, function (error) { return _this.msg = error; });
    };
    RulesIndexAmendmentAdminComponent.prototype.SaveRulesIndexAmendment = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.SubIndexId == 'null') {
            formData.value.SubIndexId = null;
        }
        if (formData.value.RulesIndexAmendmentId) {
            this._rulesIndexAmendmentService.updateRulesIndexAmendment(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/rules'], {
                            queryParams: {
                                indexRules1: params["indexRules1"], indexRules2: params["indexRules2"], indexIndex: params["indexIndex"], sortingRulesField: params["sortingRulesField"], sortingRulesDirection: params["sortingRulesDirection"], sortingIndexField: params["sortingIndexField"], sortingIndexDirection: params["sortingIndexDirection"], sortingSubIndexField: params["sortingSubIndexField"], sortingSubIndexDirection: params["sortingSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RULES_INDEXAMENDMENT_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_INDEXAMENDMENT_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_INDEXAMENDMENT_TITLE, { enableHtml: true });
            });
        }
        else {
            this._rulesIndexAmendmentService.addRulesIndexAmendment(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/rules'], {
                            queryParams: {
                                indexRules1: params["indexRules1"], indexRules2: params["indexRules2"], indexIndex: params["indexIndex"], sortingRulesField: params["sortingRulesField"], sortingRulesDirection: params["sortingRulesDirection"], sortingIndexField: params["sortingIndexField"], sortingIndexDirection: params["sortingIndexDirection"], sortingSubIndexField: params["sortingSubIndexField"], sortingSubIndexDirection: params["sortingSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RULES_INDEXAMENDMENT_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RULES_INDEXAMENDMENT_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RULES_INDEXAMENDMENT_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RulesIndexAmendmentAdminComponent.prototype.OnSubmitRulesIndexAmendment = function (formData) {
        this.isSubmited = true;
        if (this.frmRulesIndexAmendment.valid) {
            formData.value.GSRNotificationIds = this._global.convertArrayToCommaSeperatedString(formData.value.GSRNotificationIds);
            this.SaveRulesIndexAmendment(formData);
        }
    };
    RulesIndexAmendmentAdminComponent.prototype.CancelRulesIndexAmendment = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/rules'], {
                queryParams: {
                    indexRules1: params["indexRules1"], indexRules2: params["indexRules2"], indexIndex: params["indexIndex"], sortingRulesField: params["sortingRulesField"], sortingRulesDirection: params["sortingRulesDirection"], sortingIndexField: params["sortingIndexField"], sortingIndexDirection: params["sortingIndexDirection"], sortingSubIndexField: params["sortingSubIndexField"], sortingSubIndexDirection: params["sortingSubIndexDirection"], sortingIndexAmendmentField: params["sortingIndexAmendmentField"], sortingIndexAmendmentDirection: params["sortingIndexAmendmentDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    RulesIndexAmendmentAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './rulesIndexAmendment.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            rulesIndexAmendment_service_1.RulesIndexAmendmentAdminService,
            gSRNotification_service_1.GSRNotificationAdminService,
            rulesIndex_service_1.RulesIndexAdminService,
            rulesSubIndex_service_1.RulesSubIndexAdminService,
            rules_service_1.RulesAdminService,
            indexAmendment_service_1.IndexAmendmentAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService])
    ], RulesIndexAmendmentAdminComponent);
    return RulesIndexAmendmentAdminComponent;
}());
exports.RulesIndexAmendmentAdminComponent = RulesIndexAmendmentAdminComponent;
//# sourceMappingURL=rulesIndexAmendment.component.js.map