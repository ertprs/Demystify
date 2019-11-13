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
var ngx_toastr_1 = require("ngx-toastr");
var fEMASubModuleOfModule_1 = require("../../../model/fEMASubModuleOfModule");
var commonField_1 = require("../../../model/commonField");
var rBIData_1 = require("../../../model/rBIData");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var commonField_service_1 = require("../../../service/common/commonField.service");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var fEMASubModuleOfModule_service_1 = require("../../../service/user/fEMASubModuleOfModule.service");
var rBIData_service_1 = require("../../../service/user/rBIData.service");
var subscription_1 = require("../../../model/subscription");
var subscription_service_1 = require("../../../service/user/subscription.service");
var regulationPopup_component_1 = require("../../../areas/user/fEMAModule/regulationPopup.component");
var authorsWriteupPopup_component_1 = require("../../../areas/user/fEMAModule/authorsWriteupPopup.component");
var actPopup_component_1 = require("../../../areas/user/fEMAModule/actPopup.component");
var masterDirectionPopup_component_1 = require("../../../areas/user/fEMAModule/masterDirectionPopup.component");
var fDICircularPopup_component_1 = require("../../../areas/user/fEMAModule/fDICircularPopup.component");
var nICCodePopup_component_1 = require("../../../areas/user/fEMAModule/nICCodePopup.component");
var fetersCodePopup_component_1 = require("../../../areas/user/fEMAModule/fetersCodePopup.component");
var formSummaryDocumentationPopup_component_1 = require("../../../areas/user/fEMAModule/formSummaryDocumentationPopup.component");
var manualPopup_component_1 = require("../../../areas/user/fEMAModule/manualPopup.component");
var fIPBReviewPopup_component_1 = require("../../../areas/user/fEMAModule/fIPBReviewPopup.component");
var rBIECBPopup_component_1 = require("../../../areas/user/fEMAModule/rBIECBPopup.component");
var rBIODIPopup_component_1 = require("../../../areas/user/fEMAModule/rBIODIPopup.component");
var rBICompoundingOrderPopup_component_1 = require("../../../areas/user/fEMAModule/rBICompoundingOrderPopup.component");
var keyDefinitionPopup_component_1 = require("../../../areas/user/fEMAModule/keyDefinitionPopup.component");
var keyEventPopup_component_1 = require("../../../areas/user/fEMAModule/keyEventPopup.component");
var sectorSnapshotPopup_component_1 = require("../../../areas/user/fEMAModule/sectorSnapshotPopup.component");
var fDIPenaltyCalculatorPopup_component_1 = require("../../../areas/user/fEMAModule/fDIPenaltyCalculatorPopup.component");
var eCBAverageMaturityCalculatorPopup_component_1 = require("../../../areas/user/fEMAModule/eCBAverageMaturityCalculatorPopup.component");
var compoundingPenaltyCalculatorPopup_component_1 = require("../../../areas/user/fEMAModule/compoundingPenaltyCalculatorPopup.component");
var lOBOPOEligibilityCalculatorPopup_component_1 = require("../../../areas/user/fEMAModule/lOBOPOEligibilityCalculatorPopup.component");
var subscriptionPopup_component_1 = require("../../../areas/user/subscription/subscriptionPopup.component");
var legalAggrement_component_1 = require("../../../areas/user/legalAggrement/legalAggrement.component");
var FEMAModulesUserComponent = /** @class */ (function () {
    function FEMAModulesUserComponent(formBuilder, activatedRoute, _fEMASubModuleOfModuleService, _rBIDataService, _commonFieldService, toastr, vcr, spinnerService, _subscriptionService, router, modalService) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._fEMASubModuleOfModuleService = _fEMASubModuleOfModuleService;
        this._rBIDataService = _rBIDataService;
        this._commonFieldService = _commonFieldService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this._subscriptionService = _subscriptionService;
        this.router = router;
        this.modalService = modalService;
        this._global = new global_1.Global();
        this.fEMASubModuleIds = [];
        this.fEMAModuleId = 1;
        this.rBIDataExcelServerPath = global_1.Global.RBIDATA_EXCEL_FILEPATH;
    }
    FEMAModulesUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.fEMAModuleId = (params["fEMAModuleId"]) ? parseInt(params["fEMAModuleId"]) : _this.fEMAModuleId;
            _this.CheckIsSubscribed();
        });
    };
    FEMAModulesUserComponent.prototype.CheckIsSubscribed = function () {
        var _this = this;
        var getSubscriptionRequest = new subscription_1.GetSubscriptionRequest();
        getSubscriptionRequest.UserId = parseInt(this._global.getCookie(global_1.Global.USER_ID));
        this._subscriptionService.getSubscription(getSubscriptionRequest)
            .subscribe(function (data) {
            if (data != null) {
                _this.spinnerService.hide();
                if (data.Response.length > 0 && data.Response[0].IsExpired == false && data.Response[0].IsActive == true) {
                    if (data.Response[0].StartDate)
                        _this._global.setCookie(global_1.Global.IS_SUBSCRIBED, true, 365);
                    else
                        _this._global.deleteCookie(global_1.Global.IS_SUBSCRIBED);
                }
                else {
                    _this._global.deleteCookie(global_1.Global.IS_SUBSCRIBED);
                }
                if (_this._global.getCookie(global_1.Global.IS_SUBSCRIBED)) {
                    _this.pageSizes = global_1.Global.PAGE_SIZES;
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
                        _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
                    });
                    if (data.Response[0].IsLegalAgreementAccepted == true)
                        _this.GetFEMAModule(_this.currentPage, _this.pageSizes[0]);
                    else
                        _this.OpenLegalAgreementPopup();
                }
                else {
                    _this.OpenSubscribePopup();
                }
            }
        }, function (error) { return _this.msg = error; });
    };
    FEMAModulesUserComponent.prototype.OpenSubscribePopup = function () {
        var t_this = this;
        this.modalService.openDialog(this.vcr, {
            settings: {
                headerClass: "hide",
                footerClass: "no-pad",
                contentClass: "subscribe-modal-content modal-content"
            },
            actionButtons: [{
                    text: "x", buttonClass: "pointer-cursor close-button", onAction: function () {
                        t_this.router.navigate(['/user/secure/subscription']);
                    }
                }],
            childComponent: subscriptionPopup_component_1.SubscriptionPopupUserComponent
        });
    };
    FEMAModulesUserComponent.prototype.OpenLegalAgreementPopup = function () {
        var t_this = this;
        this.modalService.openDialog(this.vcr, {
            settings: {
                headerClass: "hide",
                footerClass: "no-pad",
                contentClass: "modal-content"
                //contentClass: "subscribe-modal-content modal-content"
            },
            actionButtons: [{
                    text: "x", buttonClass: "pointer-cursor close-button", onAction: function () {
                        t_this.router.navigate(['/user/secure/legalAggrement']);
                    }
                }],
            childComponent: legalAggrement_component_1.LegalAggrementUserComponent
        });
    };
    FEMAModulesUserComponent.prototype.GetFEMAModule = function (pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getCommonFieldRequest = new commonField_1.GetCommonFieldRequest();
        getCommonFieldRequest.FieldTypeName = global_1.Global.COMMON_FIELD_FEMA_MODULE;
        this._commonFieldService.getCommonField(getCommonFieldRequest)
            .subscribe(function (data) {
            _this.GetFEMASubModule(_this.currentPage, _this.pageSizes[0]);
            _this.fEMAModules = data.Response;
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_MODULE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FEMAModulesUserComponent.prototype.GetFEMASubModule = function (pageNumber, pageSize) {
        var _this = this;
        var getCommonFieldRequest = new commonField_1.GetCommonFieldRequest();
        getCommonFieldRequest.FieldTypeName = global_1.Global.COMMON_FIELD_FEMA_SUBMODULE;
        this._commonFieldService.getCommonField(getCommonFieldRequest)
            .subscribe(function (data) {
            _this.GetFEMASubModuleOfModule(_this.currentPage, _this.pageSizes[0]);
            _this.fEMASubModules = data.Response;
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_MODULE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FEMAModulesUserComponent.prototype.GetFEMASubModuleOfModule = function (pageNumber, pageSize) {
        var _this = this;
        var getFEMASubModuleOfModuleRequest = new fEMASubModuleOfModule_1.GetFEMASubModuleOfModuleRequest();
        getFEMASubModuleOfModuleRequest.FEMAModuleId = this.fEMAModuleId;
        this._fEMASubModuleOfModuleService.getFEMASubModuleOfModule(getFEMASubModuleOfModuleRequest)
            .subscribe(function (data) {
            _this.GetRBIData();
            _this.fEMASubModuleIds = [];
            data.Response.forEach(function (item) {
                _this.fEMASubModuleIds.push(item.FEMASubModuleId);
            });
            _this.fEMASubModuleOfModules = data.Response;
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_FEMA_MODULE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    //OnClickModule(fEMAModuleId) {
    //    this.spinnerService.show();
    //    this.GetFEMASubModuleOfModule(fEMAModuleId, this.currentPage, this.pageSizes[0]);
    //}
    FEMAModulesUserComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.GetFEMAModule(pageNumber, this.pageSize);
    };
    FEMAModulesUserComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = 50;
        this.GetFEMAModule(null, this.pageSize);
    };
    FEMAModulesUserComponent.prototype.GetRBIData = function () {
        var _this = this;
        var getRBIDataRequest = new rBIData_1.GetRBIDataRequest();
        this._rBIDataService.getRBIData(getRBIDataRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.rBIDatas = data.Response;
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBIDATA_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    FEMAModulesUserComponent.prototype.ShowReadMorePopup = function (subModuleId, subModuleName) {
        var fEMASubModuleOfModule = this.fEMASubModuleOfModules.filter(function (x) { return x.FEMASubModuleId == subModuleId; })[0];
        var fEMASubModuleOfModuleId = fEMASubModuleOfModule.FEMASubModuleOfModuleId;
        var fEMAModuleId = fEMASubModuleOfModule.FEMAModuleId;
        var fEMASubModuleId = fEMASubModuleOfModule.FEMASubModuleId;
        if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_FEMA_REGULATIONS_FEMA_NOTIFICATIONS_GSR) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: regulationPopup_component_1.RegulationPopupUserComponent,
                data: fEMASubModuleOfModuleId
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_AUTHORSWRITEUP) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: authorsWriteupPopup_component_1.AuthorsWriteupPopupUserComponent,
                data: fEMAModuleId
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_FOREIGNEXCHANGEMANAGEMENTACT) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: actPopup_component_1.ActPopupUserComponent
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_MASTERDIRECTION_MASTERCIRCULAR_APDIRCIRCULAR) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: masterDirectionPopup_component_1.MasterDirectionPopupUserComponent,
                data: fEMASubModuleOfModuleId
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_FDICIRCULAR_PRESSNOTE) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: fDICircularPopup_component_1.FDICircularPopupUserComponent,
                data: fEMASubModuleOfModuleId
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_NICCODE) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: nICCodePopup_component_1.NICCodePopupUserComponent
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_FETERSCODE) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: fetersCodePopup_component_1.FetersCodePopupUserComponent
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_FORM_SUMMARY_DOCUMENTATION) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: formSummaryDocumentationPopup_component_1.FormSummaryDocumentationPopupUserComponent,
                data: fEMASubModuleOfModuleId
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_MANUAL) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: manualPopup_component_1.ManualPopupUserComponent
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_FIPBREVIEW_CLARIFICATION_FIBCPRESSRELEASECASE) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: fIPBReviewPopup_component_1.FIPBReviewPopupUserComponent
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_RBI_LO_DATA) {
            var rBIDataLOData = this.rBIDatas.filter(function (x) { return x.RBIDataName == global_1.Global.RBIDATA_LO_NAME; });
            if (rBIDataLOData.length > 0)
                window.location.href = this.rBIDataExcelServerPath + rBIDataLOData[0].Excel;
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_RBI_BO_DATA) {
            var rBIDataBOData = this.rBIDatas.filter(function (x) { return x.RBIDataName == global_1.Global.RBIDATA_BO_NAME; });
            if (rBIDataBOData.length > 0)
                window.location.href = this.rBIDataExcelServerPath + rBIDataBOData[0].Excel;
        }
        //else if (subModuleId == Global.COMMON_FIELD_MODULE_RBI_DIPP_FAQ) {
        //    this.modalService.openDialog(this.vcr, {
        //        settings: {
        //            headerClass: "hide"
        //        },
        //        actionButtons: [{
        //            text: "x", buttonClass: "pointer-cursor close-button"
        //        }],
        //        childComponent: RBIDIPPFAQPopupUserComponent,
        //        data: fEMASubModuleOfModuleId
        //    });
        //}
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_RBI_ECB_DATA) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: rBIECBPopup_component_1.RBIECBPopupUserComponent
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_RBI_ODI_DATA) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: rBIODIPopup_component_1.RBIODIPopupUserComponent
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_RBI_COMPOUNDING_ORDER) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: rBICompoundingOrderPopup_component_1.RBICompoundingOrderPopupUserComponent
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_KEYDEFINITION) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: keyDefinitionPopup_component_1.KeyDefinitionPopupUserComponent
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_KEYEVENT) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: keyEventPopup_component_1.KeyEventPopupUserComponent
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_SECTOR_SNAPSHOT) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: sectorSnapshotPopup_component_1.SectorSnapshotPopupUserComponent
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_FDI_PENALTY_CALCULATOR) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: fDIPenaltyCalculatorPopup_component_1.FDIPenaltyCalculatorPopupUserComponent
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_ECB_AVERAGE_MATURITY_CALCULATOR) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: eCBAverageMaturityCalculatorPopup_component_1.ECBAverageMaturityCalculatorPopupUserComponent
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_COMPOUNDING_CALCULATOR) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: compoundingPenaltyCalculatorPopup_component_1.CompoundingPenaltyCalculatorPopupUserComponent
            });
        }
        else if (subModuleId == global_1.Global.COMMON_FIELD_MODULE_LO_BO_PO_ELIGIBILITY_CALCULATOR) {
            this.modalService.openDialog(this.vcr, {
                settings: {
                    headerClass: "hide",
                    footerClass: "no-pad"
                },
                actionButtons: [{
                        text: "x", buttonClass: "pointer-cursor close-button"
                    }],
                childComponent: lOBOPOEligibilityCalculatorPopup_component_1.LOBOPOEligibilityCalculatorPopupUserComponent
            });
        }
    };
    FEMAModulesUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './fEMAModules.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            fEMASubModuleOfModule_service_1.FEMASubModuleOfModuleUserService,
            rBIData_service_1.RBIDataUserService,
            commonField_service_1.CommonFieldService,
            ngx_toastr_1.ToastrService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService,
            subscription_service_1.SubscriptionUserService,
            router_1.Router,
            ngx_modal_dialog_1.ModalDialogService])
    ], FEMAModulesUserComponent);
    return FEMAModulesUserComponent;
}());
exports.FEMAModulesUserComponent = FEMAModulesUserComponent;
//# sourceMappingURL=fEMAModules.component.js.map