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
var commonField_1 = require("../../../model/commonField");
var fEMASubModuleOfModule_1 = require("../../../model/fEMASubModuleOfModule");
var regulation_1 = require("../../../model/regulation");
var rules_1 = require("../../../model/rules");
var masterDirection_1 = require("../../../model/masterDirection");
var masterCircular_1 = require("../../../model/masterCircular");
var fAQ_1 = require("../../../model/fAQ");
var formSummaryDocumentation_1 = require("../../../model/formSummaryDocumentation");
var commonField_service_1 = require("../../../service/common/commonField.service");
var fEMASubModuleOfModule_service_1 = require("../../../service/admin/fEMASubModuleOfModule.service");
var regulation_service_1 = require("../../../service/admin/regulation.service");
var rules_service_1 = require("../../../service/admin/rules.service");
var masterDirection_service_1 = require("../../../service/admin/masterDirection.service");
var masterCircular_service_1 = require("../../../service/admin/masterCircular.service");
var fAQ_service_1 = require("../../../service/admin/fAQ.service");
var formSummaryDocumentation_service_1 = require("../../../service/admin/formSummaryDocumentation.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var FEMAModuleAdminComponent = /** @class */ (function () {
    function FEMAModuleAdminComponent(formBuilder, toastr, activatedRoute, router, _commonFieldService, _fEMASubModuleOfModuleService, _regulationService, _rulesService, _masterDirectionService, _masterCircularService, _fAQService, _formSummaryDocumentationService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._commonFieldService = _commonFieldService;
        this._fEMASubModuleOfModuleService = _fEMASubModuleOfModuleService;
        this._regulationService = _regulationService;
        this._rulesService = _rulesService;
        this._masterDirectionService = _masterDirectionService;
        this._masterCircularService = _masterCircularService;
        this._fAQService = _fAQService;
        this._formSummaryDocumentationService = _formSummaryDocumentationService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.fEMAModules = [];
        this.fEMASubModules = [];
        this.regulations = [];
        this.ruless = [];
        this.masterDirections = [];
        this.masterCirculars = [];
        this.rBIFAQs = [];
        this.formTopics = [];
        this.summaryTopics = [];
        this.documentationTopics = [];
        this.isRegulationRulesModuleDetailDisplay = false;
        this.isMasterDirectionCircularModuleDetailDisplay = false;
        this.isRBIFAQModuleDetailDisplay = false;
        this.isFormSummaryDocumentationModuleDetailDisplay = false;
        this.regulationDropDownSettings = {};
        this.rulesDropDownSettings = {};
        this.masterDirectionDropDownSettings = {};
        this.masterCircularDropDownSettings = {};
        this.rBIFAQDropDownSettings = {};
        this.formDropDownSettings = {};
        this.summaryDropDownSettings = {};
        this.documentationDropDownSettings = {};
        this.selectedRegulations = [];
        this.selectedRuless = [];
        this.selectedMasterDirections = [];
        this.selectedMasterCirculars = [];
        this.selectedRBIFAQs = [];
        this.selectedForms = [];
        this.selectedSummaries = [];
        this.selectedDocumentations = [];
        this.isSubmited = false;
    }
    FEMAModuleAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var fEMASubModuleOfModuleId = _this._global.decryptValue(params['fEMASubModuleOfModuleId']);
            var fEMAModuleId = _this._global.decryptValue(params['fEMAModuleId']);
            if (fEMAModuleId) {
                _this.fEMAModuleId = parseInt(fEMAModuleId);
                if (fEMASubModuleOfModuleId) {
                    _this.addUpdateText = "Update";
                    _this.fEMASubModuleOfModuleId = parseInt(fEMASubModuleOfModuleId);
                    _this.EditFEMASubModuleOfModule(parseInt(fEMASubModuleOfModuleId));
                }
                else {
                    _this.GetFEMASubModule(null);
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/femamodules'], {
                        queryParams: {
                            indexFEMAModule: params["indexFEMAModule"], searchText: params["searchText"]
                        }
                    });
                });
            }
        });
        this.frmFEMASubModuleOfModule = this.formBuilder.group({
            FEMASubModuleOfModuleId: [''],
            FEMAModuleId: [this.fEMAModuleId],
            FEMASubModuleId: ['', forms_1.Validators.required],
            RegulationKeyModuleDetail: [''],
            RulesKeyModuleDetail: [''],
            MasterDirectionKeyModuleDetail: [''],
            MasterCircularKeyModuleDetail: [''],
            RBIFAQKeyModuleDetail: [''],
            FormKeyModuleDetail: [''],
            SummaryKeyModuleDetail: [''],
            DocumentationKeyModuleDetail: ['']
        });
    };
    FEMAModuleAdminComponent.prototype.GetFEMASubModule = function (fEMASubModuleOfModuleData) {
        var _this = this;
        this.spinnerService.show();
        var getCommonFieldRequest = new commonField_1.GetCommonFieldRequest();
        getCommonFieldRequest.FieldTypeName = global_1.Global.COMMON_FIELD_FEMA_SUBMODULE;
        this._commonFieldService.getCommonField(getCommonFieldRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.fEMASubModules = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.fEMASubModules.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.fEMASubModules.push({ Value: item.FieldId, Text: item.FieldName });
                });
                _this.frmFEMASubModuleOfModule.get("FEMASubModuleId").setValue((fEMASubModuleOfModuleData != null) ? fEMASubModuleOfModuleData.FEMASubModuleId : "");
                _this.frmFEMASubModuleOfModule.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FEMAModuleAdminComponent.prototype.EditFEMASubModuleOfModule = function (fEMASubModuleOfModuleId) {
        var _this = this;
        this.spinnerService.show();
        var getFEMASubModuleOfModuleRequest = new fEMASubModuleOfModule_1.GetFEMASubModuleOfModuleRequest();
        getFEMASubModuleOfModuleRequest.FEMASubModuleOfModuleId = fEMASubModuleOfModuleId;
        this._fEMASubModuleOfModuleService.getFEMASubModuleOfModule(getFEMASubModuleOfModuleRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetFEMASubModule(data.Response[0]);
            var regulationKeyModuleDetailName = data.Response.filter(function (x) { return x.FEMAKeyModuleId == global_1.Global.COMMON_FIELD_REGULATION_FIELDID; });
            var rulesKeyModuleDetailName = data.Response.filter(function (x) { return x.FEMAKeyModuleId == global_1.Global.COMMON_FIELD_RULES_FIELDID; });
            var masterDirectionKeyModuleDetailName = data.Response.filter(function (x) { return x.FEMAKeyModuleId == global_1.Global.COMMON_FIELD_MASTERDIRECTION_FIELDID; });
            var masterCircularKeyModuleDetailName = data.Response.filter(function (x) { return x.FEMAKeyModuleId == global_1.Global.COMMON_FIELD_MASTERCIRCULAR_FIELDID; });
            var rBIFAQKeyModuleDetailName = data.Response.filter(function (x) { return x.FEMAKeyModuleId == global_1.Global.COMMON_FIELD_RBIFAQ_FIELDID; });
            var formKeyModuleDetailName = data.Response.filter(function (x) { return x.FEMAKeyModuleId == global_1.Global.COMMON_FIELD_FORM_FIELDID; });
            var summaryKeyModuleDetailName = data.Response.filter(function (x) { return x.FEMAKeyModuleId == global_1.Global.COMMON_FIELD_SUMMARY_FIELDID; });
            var documentationKeyModuleDetailName = data.Response.filter(function (x) { return x.FEMAKeyModuleId == global_1.Global.COMMON_FIELD_DOCUMENTATION_FIELDID; });
            if (data.Response[0].FEMASubModuleId == global_1.Global.COMMON_FIELD_MODULE_FEMA_REGULATIONS_FEMA_NOTIFICATIONS_GSR) {
                _this.isRegulationRulesModuleDetailDisplay = true;
                _this.GetRegulation((regulationKeyModuleDetailName.length > 0) ? regulationKeyModuleDetailName[0] : null);
                _this.GetRules((rulesKeyModuleDetailName.length > 0) ? rulesKeyModuleDetailName[0] : null);
            }
            if (data.Response[0].FEMASubModuleId == global_1.Global.COMMON_FIELD_MODULE_MASTERDIRECTION_MASTERCIRCULAR_APDIRCIRCULAR) {
                _this.isMasterDirectionCircularModuleDetailDisplay = true;
                _this.GetMasterDirection((masterDirectionKeyModuleDetailName.length > 0) ? masterDirectionKeyModuleDetailName[0] : null);
                _this.GetMasterCircular((masterCircularKeyModuleDetailName.length > 0) ? masterCircularKeyModuleDetailName[0] : null);
                _this.GetRBIFAQ((rBIFAQKeyModuleDetailName.length > 0) ? rBIFAQKeyModuleDetailName[0] : null);
            }
            if (data.Response[0].FEMASubModuleId == global_1.Global.COMMON_FIELD_MODULE_FORM_SUMMARY_DOCUMENTATION) {
                _this.isFormSummaryDocumentationModuleDetailDisplay = true;
                _this.GetForm((formKeyModuleDetailName.length > 0) ? formKeyModuleDetailName[0] : null);
                _this.GetSummary((summaryKeyModuleDetailName.length > 0) ? summaryKeyModuleDetailName[0] : null);
                _this.GetDocumentation((documentationKeyModuleDetailName.length > 0) ? documentationKeyModuleDetailName[0] : null);
            }
            //if (data.Response[0].FEMASubModuleId == Global.COMMON_FIELD_MODULE_RBI_DIPP_FAQ) {
            //    this.isRBIFAQModuleDetailDisplay = true;
            //    this.GetRBIFAQ((rBIFAQKeyModuleDetailName.length > 0) ? rBIFAQKeyModuleDetailName[0] : null);
            //}
            _this.frmFEMASubModuleOfModule.setValue({
                FEMASubModuleOfModuleId: fEMASubModuleOfModuleId,
                FEMAModuleId: _this.fEMAModuleId,
                FEMASubModuleId: data.Response[0].FEMASubModuleId,
                RegulationKeyModuleDetail: [],
                RulesKeyModuleDetail: [],
                MasterDirectionKeyModuleDetail: [],
                MasterCircularKeyModuleDetail: [],
                RBIFAQKeyModuleDetail: [],
                FormKeyModuleDetail: [],
                SummaryKeyModuleDetail: [],
                DocumentationKeyModuleDetail: []
            });
            _this.frmFEMASubModuleOfModule.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    FEMAModuleAdminComponent.prototype.SaveFEMASubModuleOfModule = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.FEMASubModuleOfModuleId) {
            this._fEMASubModuleOfModuleService.updateFEMASubModuleOfModule(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/femamodules'], {
                            queryParams: {
                                indexFEMAModule: params["indexFEMAModule"], searchText: params["searchText"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { enableHtml: true });
            });
        }
        else {
            this._fEMASubModuleOfModuleService.addFEMASubModuleOfModule(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/femamodules'], {
                            queryParams: {
                                indexFEMAModule: params["indexFEMAModule"], searchText: params["searchText"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    FEMAModuleAdminComponent.prototype.OnSubmitFEMASubModuleOfModule = function (formData) {
        this.isSubmited = true;
        if (formData.value.FEMASubModuleId == global_1.Global.COMMON_FIELD_MODULE_FEMA_REGULATIONS_FEMA_NOTIFICATIONS_GSR) {
            formData.value.RegulationKeyModuleDetail = (formData.value.RegulationKeyModuleDetail.map(function (x) { return x.Value; }).join(',')) ? formData.value.RegulationKeyModuleDetail.map(function (x) { return x.Value; }).join(',') : null;
            formData.value.RulesKeyModuleDetail = (formData.value.RulesKeyModuleDetail.map(function (x) { return x.Value; }).join(',')) ? formData.value.RulesKeyModuleDetail.map(function (x) { return x.Value; }).join(',') : null;
        }
        else {
            formData.value.RegulationKeyModuleDetail = null;
            formData.value.RulesKeyModuleDetail = null;
        }
        if (formData.value.FEMASubModuleId == global_1.Global.COMMON_FIELD_MODULE_MASTERDIRECTION_MASTERCIRCULAR_APDIRCIRCULAR) {
            formData.value.MasterDirectionKeyModuleDetail = (formData.value.MasterDirectionKeyModuleDetail.map(function (x) { return x.Value; }).join(',')) ? formData.value.MasterDirectionKeyModuleDetail.map(function (x) { return x.Value; }).join(',') : null;
            formData.value.MasterCircularKeyModuleDetail = (formData.value.MasterCircularKeyModuleDetail.map(function (x) { return x.Value; }).join(',')) ? formData.value.MasterCircularKeyModuleDetail.map(function (x) { return x.Value; }).join(',') : null;
            formData.value.RBIFAQKeyModuleDetail = (formData.value.RBIFAQKeyModuleDetail.map(function (x) { return x.Value; }).join(',')) ? formData.value.RBIFAQKeyModuleDetail.map(function (x) { return x.Value; }).join(',') : null;
        }
        else {
            formData.value.MasterDirectionKeyModuleDetail = null;
            formData.value.MasterCircularKeyModuleDetail = null;
            formData.value.RBIFAQKeyModuleDetail = null;
        }
        if (formData.value.FEMASubModuleId == global_1.Global.COMMON_FIELD_MODULE_FORM_SUMMARY_DOCUMENTATION) {
            formData.value.FormKeyModuleDetail = (formData.value.FormKeyModuleDetail.map(function (x) { return x.Value; }).join(',')) ? formData.value.FormKeyModuleDetail.map(function (x) { return x.Value; }).join(',') : null;
            formData.value.SummaryKeyModuleDetail = (formData.value.SummaryKeyModuleDetail.map(function (x) { return x.Value; }).join(',')) ? formData.value.SummaryKeyModuleDetail.map(function (x) { return x.Value; }).join(',') : null;
            formData.value.DocumentationKeyModuleDetail = (formData.value.DocumentationKeyModuleDetail.map(function (x) { return x.Value; }).join(',')) ? formData.value.DocumentationKeyModuleDetail.map(function (x) { return x.Value; }).join(',') : null;
        }
        else {
            formData.value.FormKeyModuleDetail = null;
            formData.value.SummaryKeyModuleDetail = null;
            formData.value.DocumentationKeyModuleDetail = null;
        }
        //if (formData.value.FEMASubModuleId == Global.COMMON_FIELD_MODULE_RBI_DIPP_FAQ) {
        //    formData.value.RBIFAQKeyModuleDetail = (formData.value.RBIFAQKeyModuleDetail.map(x => x.Value).join(',')) ? formData.value.RBIFAQKeyModuleDetail.map(x => x.Value).join(',') : null;
        //} else {
        //    formData.value.RBIFAQKeyModuleDetail = null;
        //}
        if (this.frmFEMASubModuleOfModule.valid) {
            this.SaveFEMASubModuleOfModule(formData);
        }
    };
    FEMAModuleAdminComponent.prototype.OnChangeFEMASubModule = function (fEMASubModuleId) {
        this.isRegulationRulesModuleDetailDisplay = false;
        this.isMasterDirectionCircularModuleDetailDisplay = false;
        this.isRBIFAQModuleDetailDisplay = false;
        this.isFormSummaryDocumentationModuleDetailDisplay = false;
        if (fEMASubModuleId == global_1.Global.COMMON_FIELD_MODULE_FEMA_REGULATIONS_FEMA_NOTIFICATIONS_GSR) {
            this.isRegulationRulesModuleDetailDisplay = true;
            this.GetRegulation(null);
            this.GetRules(null);
        }
        else if (fEMASubModuleId == global_1.Global.COMMON_FIELD_MODULE_MASTERDIRECTION_MASTERCIRCULAR_APDIRCIRCULAR) {
            this.isMasterDirectionCircularModuleDetailDisplay = true;
            this.GetMasterDirection(null);
            this.GetMasterCircular(null);
            this.GetRBIFAQ(null);
        }
        else if (fEMASubModuleId == global_1.Global.COMMON_FIELD_MODULE_FORM_SUMMARY_DOCUMENTATION) {
            this.isFormSummaryDocumentationModuleDetailDisplay = true;
            this.GetForm(null);
            this.GetSummary(null);
            this.GetDocumentation(null);
        }
        else if (fEMASubModuleId == global_1.Global.COMMON_FIELD_MODULE_RBI_DIPP_FAQ) {
            this.isRBIFAQModuleDetailDisplay = true;
            this.GetRBIFAQ(null);
        }
    };
    FEMAModuleAdminComponent.prototype.GetRegulation = function (fEMASubModuleOfModuleData) {
        var _this = this;
        this.spinnerService.show();
        var getRegulationRequest = new regulation_1.GetRegulationRequest();
        getRegulationRequest.IsActive = true;
        this._regulationService.getRegulation(getRegulationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.regulations = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (item) {
                    _this.regulations.push({ Value: item.RegulationId, Text: item.RegulationNumber });
                });
                _this.regulationDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: true,
                    allowSearchFilter: true
                };
                var selectedRegulations_1 = [];
                if (fEMASubModuleOfModuleData != null) {
                    fEMASubModuleOfModuleData.FEMAKeyModuleDetail.split(',').forEach(function (item) {
                        if (_this.regulations.filter(function (x) { return x.Value == item; })[0])
                            selectedRegulations_1.push({ Value: parseInt(item), Text: _this.regulations.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedRegulations = selectedRegulations_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FEMAModuleAdminComponent.prototype.GetRules = function (fEMASubModuleOfModuleData) {
        var _this = this;
        this.spinnerService.show();
        var getRulesRequest = new rules_1.GetRulesRequest();
        getRulesRequest.IsActive = true;
        this._rulesService.getRules(getRulesRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.ruless = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (item) {
                    _this.ruless.push({ Value: item.RulesId, Text: item.RulesName });
                });
                _this.rulesDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: true,
                    allowSearchFilter: true
                };
                var selectedRuless_1 = [];
                if (fEMASubModuleOfModuleData != null) {
                    fEMASubModuleOfModuleData.FEMAKeyModuleDetail.split(',').forEach(function (item) {
                        if (_this.ruless.filter(function (x) { return x.Value == item; })[0])
                            selectedRuless_1.push({ Value: parseInt(item), Text: _this.ruless.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedRuless = selectedRuless_1;
                }
                else {
                    _this.selectedRuless = _this.ruless;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FEMAModuleAdminComponent.prototype.GetMasterDirection = function (fEMASubModuleOfModuleData) {
        var _this = this;
        this.spinnerService.show();
        var getMasterDirectionRequest = new masterDirection_1.GetMasterDirectionRequest();
        getMasterDirectionRequest.IsActive = true;
        this._masterDirectionService.getMasterDirection(getMasterDirectionRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterDirections = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (item) {
                    _this.masterDirections.push({ Value: item.MasterDirectionId, Text: item.MasterDirectionName });
                });
                _this.masterDirectionDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: true,
                    allowSearchFilter: true
                };
                var selectedMasterDirections_1 = [];
                if (fEMASubModuleOfModuleData != null) {
                    fEMASubModuleOfModuleData.FEMAKeyModuleDetail.split(',').forEach(function (item) {
                        if (_this.masterDirections.filter(function (x) { return x.Value == item; })[0])
                            selectedMasterDirections_1.push({ Value: parseInt(item), Text: _this.masterDirections.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedMasterDirections = selectedMasterDirections_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FEMAModuleAdminComponent.prototype.GetMasterCircular = function (fEMASubModuleOfModuleData) {
        var _this = this;
        this.spinnerService.show();
        var getMasterCircularRequest = new masterCircular_1.GetMasterCircularRequest();
        getMasterCircularRequest.IsActive = true;
        this._masterCircularService.getMasterCircular(getMasterCircularRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.masterCirculars = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (item) {
                    _this.masterCirculars.push({ Value: item.MasterCircularId, Text: item.MasterCircularName });
                });
                _this.masterCircularDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: true,
                    allowSearchFilter: true
                };
                var selectedMasterCirculars_1 = [];
                if (fEMASubModuleOfModuleData != null) {
                    fEMASubModuleOfModuleData.FEMAKeyModuleDetail.split(',').forEach(function (item) {
                        if (_this.masterCirculars.filter(function (x) { return x.Value == item; })[0])
                            selectedMasterCirculars_1.push({ Value: parseInt(item), Text: _this.masterCirculars.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedMasterCirculars = selectedMasterCirculars_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FEMAModuleAdminComponent.prototype.GetRBIFAQ = function (fEMASubModuleOfModuleData) {
        var _this = this;
        this.spinnerService.show();
        var getFAQRequest = new fAQ_1.GetFAQRequest();
        getFAQRequest.IsActive = true;
        this._fAQService.getFAQ(getFAQRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.rBIFAQs = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.filter(function (x) { return x.CategoryName == "RBI FAQs"; }).forEach(function (item) {
                    _this.rBIFAQs.push({ Value: item.FAQId, Text: item.TopicName });
                });
                _this.rBIFAQDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: true,
                    allowSearchFilter: true
                };
                var selectedRBIFAQs_1 = [];
                if (fEMASubModuleOfModuleData != null) {
                    fEMASubModuleOfModuleData.FEMAKeyModuleDetail.split(',').forEach(function (item) {
                        if (_this.rBIFAQs.filter(function (x) { return x.Value == item; })[0])
                            selectedRBIFAQs_1.push({ Value: parseInt(item), Text: _this.rBIFAQs.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedRBIFAQs = selectedRBIFAQs_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FEMAModuleAdminComponent.prototype.GetForm = function (fEMASubModuleOfModuleData) {
        var _this = this;
        this.spinnerService.show();
        var getFormSummaryDocumentationRequest = new formSummaryDocumentation_1.GetFormSummaryDocumentationRequest();
        getFormSummaryDocumentationRequest.SubMenuName = global_1.Global.FORM_TYPE;
        this._formSummaryDocumentationService.getFormSummaryDocumentation(getFormSummaryDocumentationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.formTopics = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (item) {
                    _this.formTopics.push({ Value: item.FormSummaryDocumentationId, Text: item.TopicName });
                });
                _this.formDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: true,
                    allowSearchFilter: true
                };
                var selectedForms_1 = [];
                if (fEMASubModuleOfModuleData != null) {
                    fEMASubModuleOfModuleData.FEMAKeyModuleDetail.split(',').forEach(function (item) {
                        if (_this.formTopics.filter(function (x) { return x.Value == item; })[0])
                            selectedForms_1.push({ Value: parseInt(item), Text: _this.formTopics.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedForms = selectedForms_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FEMAModuleAdminComponent.prototype.GetSummary = function (fEMASubModuleOfModuleData) {
        var _this = this;
        this.spinnerService.show();
        var getFormSummaryDocumentationRequest = new formSummaryDocumentation_1.GetFormSummaryDocumentationRequest();
        getFormSummaryDocumentationRequest.SubMenuName = global_1.Global.SUMMARY_TYPE;
        this._formSummaryDocumentationService.getFormSummaryDocumentation(getFormSummaryDocumentationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.summaryTopics = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (item) {
                    _this.summaryTopics.push({ Value: item.FormSummaryDocumentationId, Text: item.TopicName });
                });
                _this.summaryDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: true,
                    allowSearchFilter: true
                };
                var selectedSummaries_1 = [];
                if (fEMASubModuleOfModuleData != null) {
                    fEMASubModuleOfModuleData.FEMAKeyModuleDetail.split(',').forEach(function (item) {
                        if (_this.summaryTopics.filter(function (x) { return x.Value == item; })[0])
                            selectedSummaries_1.push({ Value: parseInt(item), Text: _this.summaryTopics.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedSummaries = selectedSummaries_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FEMAModuleAdminComponent.prototype.GetDocumentation = function (fEMASubModuleOfModuleData) {
        var _this = this;
        this.spinnerService.show();
        var getFormSummaryDocumentationRequest = new formSummaryDocumentation_1.GetFormSummaryDocumentationRequest();
        getFormSummaryDocumentationRequest.SubMenuName = global_1.Global.DOCUMENTATION_TYPE;
        this._formSummaryDocumentationService.getFormSummaryDocumentation(getFormSummaryDocumentationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.documentationTopics = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                data.Response.forEach(function (item) {
                    _this.documentationTopics.push({ Value: item.FormSummaryDocumentationId, Text: item.TopicName });
                });
                _this.documentationDropDownSettings = {
                    singleSelection: false,
                    idField: 'Value',
                    textField: 'Text',
                    selectAllText: 'Select All',
                    unSelectAllText: 'UnSelect All',
                    enableCheckAll: true,
                    allowSearchFilter: true
                };
                var selectedDocumentations_1 = [];
                if (fEMASubModuleOfModuleData != null) {
                    fEMASubModuleOfModuleData.FEMAKeyModuleDetail.split(',').forEach(function (item) {
                        if (_this.documentationTopics.filter(function (x) { return x.Value == item; })[0])
                            selectedDocumentations_1.push({ Value: parseInt(item), Text: _this.documentationTopics.filter(function (x) { return x.Value == item; })[0].Text });
                    });
                    _this.selectedDocumentations = selectedDocumentations_1;
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_SUBMODULE_OF_MODULE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FEMAModuleAdminComponent.prototype.CancelFEMASubModuleOfModule = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/femamodules'], {
                queryParams: {
                    indexFEMAModule: params["indexFEMAModule"], searchText: params["searchText"]
                }
            });
        });
    };
    FEMAModuleAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fEMAModule.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            commonField_service_1.CommonFieldService,
            fEMASubModuleOfModule_service_1.FEMASubModuleOfModuleAdminService,
            regulation_service_1.RegulationAdminService,
            rules_service_1.RulesAdminService,
            masterDirection_service_1.MasterDirectionAdminService,
            masterCircular_service_1.MasterCircularAdminService,
            fAQ_service_1.FAQAdminService,
            formSummaryDocumentation_service_1.FormSummaryDocumentationAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService])
    ], FEMAModuleAdminComponent);
    return FEMAModuleAdminComponent;
}());
exports.FEMAModuleAdminComponent = FEMAModuleAdminComponent;
//# sourceMappingURL=fEMAModule.component.js.map