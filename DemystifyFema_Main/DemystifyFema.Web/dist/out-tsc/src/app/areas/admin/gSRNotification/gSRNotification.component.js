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
var gSRNotification_1 = require("../../../model/gSRNotification");
var rules_1 = require("../../../model/rules");
var gSRNotification_service_1 = require("../../../service/admin/gSRNotification.service");
var rules_service_1 = require("../../../service/admin/rules.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var GSRNotificationAdminComponent = /** @class */ (function () {
    function GSRNotificationAdminComponent(formBuilder, toastr, activatedRoute, router, _gSRNotificationService, _rulesService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._gSRNotificationService = _gSRNotificationService;
        this._rulesService = _rulesService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.gSRNotificationTypes = [];
        this.ruless = [];
        this.gSRNotificationId = 0;
        this.searchText = '';
        this.pdfServerPath = global_1.Global.GSR_NOTIFICATION_PDF_FILEPATH;
        this.minDate = { year: 1970, month: 1, day: 1 };
        this.isSubmited = false;
    }
    GSRNotificationAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var gSRNotificationId = _this._global.decryptValue(params['gSRNotificationId']);
            if (gSRNotificationId) {
                _this.addUpdateText = "Update";
                _this.gSRNotificationId = parseInt(gSRNotificationId);
                _this.EditGSRNotification(parseInt(gSRNotificationId));
            }
            else {
                _this.GetGSRNotificationType(null);
                _this.addUpdateText = "Add";
            }
        });
        this.frmGSRNotification = this.formBuilder.group({
            GSRNotificationId: [''],
            RulesId: [''],
            GSRNotificationNo: ['', forms_1.Validators.required],
            GSRNotificationName: ['', forms_1.Validators.required],
            GSRNotificationDate: ['', forms_1.Validators.required],
            GSRNotificationEffectiveDate: ['', forms_1.Validators.required],
            GSRNotificationTypeId: ['', forms_1.Validators.required],
            PDF: ['', forms_1.Validators.required]
        });
    };
    GSRNotificationAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/pdf") {
            this.frmGSRNotification.get('PDF').setValue(this.files[0].name);
            this.frmGSRNotification.updateValueAndValidity();
        }
        else {
            this.frmGSRNotification.get('PDF').setValue(null);
            this.frmGSRNotification.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE, { closeButton: true });
        }
    };
    GSRNotificationAdminComponent.prototype.GetGSRNotificationType = function (gSRNotificationData) {
        var _this = this;
        this.spinnerService.show();
        var getGSRNotificationTypeRequest = new gSRNotification_1.GetGSRNotificationTypeRequest();
        this._gSRNotificationService.getGSRNotificationType(getGSRNotificationTypeRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.GetRules(gSRNotificationData);
            _this.gSRNotificationTypes = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.gSRNotificationTypes.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.gSRNotificationTypes.push({ Value: item.GSRNotificationTypeId, Text: item.GSRNotificationTypeName });
                });
                _this.frmGSRNotification.get("GSRNotificationTypeId").setValue((gSRNotificationData != null) ? gSRNotificationData.GSRNotificationTypeId : "");
                _this.frmGSRNotification.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    GSRNotificationAdminComponent.prototype.GetRules = function (gSRNotificationData) {
        var _this = this;
        this.spinnerService.show();
        var getRulesRequest = new rules_1.GetRulesRequest();
        this._rulesService.getRules(getRulesRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.ruless = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.ruless.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.ruless.push({ Value: item.RulesId, Text: item.RulesName });
                });
                _this.frmGSRNotification.get("RulesId").setValue((gSRNotificationData != null) ? (gSRNotificationData.RulesId) ? gSRNotificationData.RulesId : "" : "");
                _this.frmGSRNotification.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    GSRNotificationAdminComponent.prototype.EditGSRNotification = function (gSRNotificationId) {
        var _this = this;
        this.spinnerService.show();
        var getGSRNotificationRequest = new gSRNotification_1.GetGSRNotificationRequest();
        getGSRNotificationRequest.GSRNotificationId = gSRNotificationId;
        getGSRNotificationRequest.IsActive = null;
        this._gSRNotificationService.getGSRNotification(getGSRNotificationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetGSRNotificationType(data.Response[0]);
            _this.gsrNotificationPDFName = data.Response[0].PDF;
            var gSRNotificationDate = new Date(data.Response[0].GSRNotificationDate);
            var gSRNotificationEffectiveDate = new Date(data.Response[0].GSRNotificationEffectiveDate);
            _this.frmGSRNotification.setValue({
                GSRNotificationId: gSRNotificationId,
                RulesId: data.Response[0].RulesId,
                GSRNotificationNo: data.Response[0].GSRNotificationNo,
                GSRNotificationName: data.Response[0].GSRNotificationName,
                GSRNotificationDate: { year: gSRNotificationDate.getFullYear(), month: gSRNotificationDate.getMonth() + 1, day: gSRNotificationDate.getDate() },
                GSRNotificationEffectiveDate: { year: gSRNotificationEffectiveDate.getFullYear(), month: gSRNotificationEffectiveDate.getMonth() + 1, day: gSRNotificationEffectiveDate.getDate() },
                GSRNotificationTypeId: data.Response[0].GSRNotificationTypeId,
                PDF: data.Response[0].PDF
            });
            _this.frmGSRNotification.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    GSRNotificationAdminComponent.prototype.ClearGSRNotificationDate = function () {
        this.frmGSRNotification.get("GSRNotificationDate").setValue("");
        this.frmGSRNotification.updateValueAndValidity();
    };
    GSRNotificationAdminComponent.prototype.ClearGSRNotificationEffectiveDate = function () {
        this.frmGSRNotification.get("GSRNotificationEffectiveDate").setValue("");
        this.frmGSRNotification.updateValueAndValidity();
    };
    GSRNotificationAdminComponent.prototype.SaveGSRNotification = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.GSRNotificationDate = (formData.value.GSRNotificationDate != null) ? formData.value.GSRNotificationDate.year + "/" + formData.value.GSRNotificationDate.month + "/" + formData.value.GSRNotificationDate.day : null;
        formData.value.GSRNotificationEffectiveDate = (formData.value.GSRNotificationEffectiveDate != null) ? formData.value.GSRNotificationEffectiveDate.year + "/" + formData.value.GSRNotificationEffectiveDate.month + "/" + formData.value.GSRNotificationEffectiveDate.day : null;
        if (formData.value.GSRNotificationId) {
            this._gSRNotificationService.updateGSRNotification(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/gsrnotifications']).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE, { enableHtml: true });
            });
        }
        else {
            this._gSRNotificationService.addGSRNotification(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/gsrnotifications']).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    GSRNotificationAdminComponent.prototype.OnSubmitGSRNotification = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmGSRNotification.valid) {
            this.spinnerService.show();
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._gSRNotificationService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmGSRNotification.get('PDF').setValue(response.Response);
                        _this.frmGSRNotification.updateValueAndValidity();
                        formData.value.PDF = response.Response;
                        _this.files = null;
                        _this.SaveGSRNotification(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_GSR_NOTIFICATION_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.PDF) {
                    this.SaveGSRNotification(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    GSRNotificationAdminComponent.prototype.CancelGSRNotification = function () {
        this.router.navigate(['/admin/secure/gsrnotifications']);
    };
    GSRNotificationAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './gSRNotification.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, gSRNotification_service_1.GSRNotificationAdminService, rules_service_1.RulesAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], GSRNotificationAdminComponent);
    return GSRNotificationAdminComponent;
}());
exports.GSRNotificationAdminComponent = GSRNotificationAdminComponent;
//# sourceMappingURL=gSRNotification.component.js.map