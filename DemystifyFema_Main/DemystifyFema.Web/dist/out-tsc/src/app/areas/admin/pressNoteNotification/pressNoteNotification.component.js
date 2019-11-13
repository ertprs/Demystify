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
var pressNoteNotification_1 = require("../../../model/pressNoteNotification");
var notification_1 = require("../../../model/notification");
var pressNote_1 = require("../../../model/pressNote");
var pressNoteNotification_service_1 = require("../../../service/admin/pressNoteNotification.service");
var notification_service_1 = require("../../../service/admin/notification.service");
var pressNote_service_1 = require("../../../service/admin/pressNote.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var PressNoteNotificationAdminComponent = /** @class */ (function () {
    function PressNoteNotificationAdminComponent(formBuilder, toastr, activatedRoute, router, _pressNoteNotificationService, _notificationService, _pressNoteService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._pressNoteNotificationService = _pressNoteNotificationService;
        this._notificationService = _notificationService;
        this._pressNoteService = _pressNoteService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.notifications = [];
        this.pressNote = new pressNote_1.PressNote();
        this.pressNoteId = 0;
        this.pressNoteNotificationId = 0;
        this.isSubmited = false;
        this.pdfServerPath = global_1.Global.PRESSNOTE_PDF_FILEPATH;
    }
    PressNoteNotificationAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var pressNoteId = _this._global.decryptValue(params['pressNoteId']);
            var pressNoteNotificationId = _this._global.decryptValue(params['pressNoteNotificationId']);
            _this.pressNoteId = parseInt(pressNoteId);
            if (pressNoteId) {
                _this.GetPressNote(_this.pressNoteId);
                if (pressNoteNotificationId) {
                    _this.addUpdateText = "Update";
                    _this.pressNoteNotificationId = parseInt(pressNoteNotificationId);
                    _this.EditPressNoteNotification(parseInt(pressNoteNotificationId));
                }
                else {
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/pressnotes'], {
                        queryParams: {
                            indexPressNote1: params["indexPressNote1"], indexPressNote2: params["indexPressNote2"], sortingPressNoteField: params["sortingPressNoteField"], sortingPressNoteDirection: params["sortingPressNoteDirection"], sortingPressNoteNotificationField: params["sortingPressNoteNotificationField"], sortingPressNoteNotificationDirection: params["sortingPressNoteNotificationDirection"], sortingPressNoteAPDIRCircularField: params["sortingPressNoteAPDIRCircularField"], sortingPressNoteAPDIRCircularDirection: params["sortingPressNoteAPDIRCircularDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
        this.frmPressNoteNotification = this.formBuilder.group({
            PressNoteNotificationId: [''],
            PressNoteId: [this.pressNoteId],
            NotificationId: ['', forms_1.Validators.required]
        });
    };
    PressNoteNotificationAdminComponent.prototype.GetPressNote = function (pressNoteId) {
        var _this = this;
        this.spinnerService.show();
        var getPressNoteRequest = new pressNote_1.GetPressNoteRequest();
        getPressNoteRequest.PressNoteId = pressNoteId;
        getPressNoteRequest.IsActive = null;
        this._pressNoteService.getPressNote(getPressNoteRequest)
            .subscribe(function (data) {
            if (_this.pressNoteNotificationId == 0)
                _this.GetNotification(null);
            _this.pressNote = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    PressNoteNotificationAdminComponent.prototype.GetNotification = function (pressNoteNotificationData) {
        //this.spinnerService.show();
        var _this = this;
        var getNotificationRequest = new notification_1.GetNotificationRequest();
        this._notificationService.getNotification(getNotificationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.notifications = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.notifications.push({ NotificationId: null, NotificationNumber: "--Select--", CreatedDate: null, GSRDate: null, GSRNo: null, GSRPDF: null, IsActive: null, IsDeleted: null, ModifiedDate: null, NotificationDate: null, NotificationEffectiveDate: null, NotificationName: null, NotificationPDF: null, NotificationTypeId: null, NotificationTypeName: null, RegulationId: null });
                data.Response.forEach(function (item) {
                    _this.notifications.push({ NotificationId: item.NotificationId, NotificationNumber: item.NotificationNumber, CreatedDate: null, GSRDate: null, GSRNo: null, GSRPDF: null, IsActive: null, IsDeleted: null, ModifiedDate: null, NotificationDate: null, NotificationEffectiveDate: null, NotificationName: null, NotificationPDF: null, NotificationTypeId: null, NotificationTypeName: null, RegulationId: null });
                });
                _this.frmPressNoteNotification.get("NotificationId").setValue((pressNoteNotificationData != null) ? pressNoteNotificationData.NotificationId : pressNoteNotificationData);
                _this.frmPressNoteNotification.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_NOTIFICATION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_NOTIFICATION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    PressNoteNotificationAdminComponent.prototype.EditPressNoteNotification = function (pressNoteNotificationId) {
        var _this = this;
        this.spinnerService.show();
        var getPressNoteNotificationRequest = new pressNoteNotification_1.GetPressNoteNotificationRequest();
        getPressNoteNotificationRequest.PressNoteNotificationId = pressNoteNotificationId;
        getPressNoteNotificationRequest.IsActive = null;
        this._pressNoteNotificationService.getPressNoteNotification(getPressNoteNotificationRequest)
            .subscribe(function (data) {
            _this.GetNotification(data.Response[0]);
            _this.frmPressNoteNotification.setValue({
                PressNoteNotificationId: pressNoteNotificationId,
                PressNoteId: data.Response[0].PressNoteId,
                NotificationId: data.Response[0].NotificationId
            });
            _this.frmPressNoteNotification.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    PressNoteNotificationAdminComponent.prototype.SavePressNoteNotification = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.PressNoteNotificationId) {
            this._pressNoteNotificationService.updatePressNoteNotification(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/pressnotes'], {
                            queryParams: {
                                indexPressNote1: params["indexPressNote1"], indexPressNote2: params["indexPressNote2"], sortingPressNoteField: params["sortingPressNoteField"], sortingPressNoteDirection: params["sortingPressNoteDirection"], sortingPressNoteNotificationField: params["sortingPressNoteNotificationField"], sortingPressNoteNotificationDirection: params["sortingPressNoteNotificationDirection"], sortingPressNoteAPDIRCircularField: params["sortingPressNoteAPDIRCircularField"], sortingPressNoteAPDIRCircularDirection: params["sortingPressNoteAPDIRCircularDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_NOTIFICATION_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_NOTIFICATION_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_NOTIFICATION_TITLE, { enableHtml: true });
            });
        }
        else {
            this._pressNoteNotificationService.addPressNoteNotification(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/pressnotes'], {
                            queryParams: {
                                indexPressNote1: params["indexPressNote1"], indexPressNote2: params["indexPressNote2"], sortingPressNoteField: params["sortingPressNoteField"], sortingPressNoteDirection: params["sortingPressNoteDirection"], sortingPressNoteNotificationField: params["sortingPressNoteNotificationField"], sortingPressNoteNotificationDirection: params["sortingPressNoteNotificationDirection"], sortingPressNoteAPDIRCircularField: params["sortingPressNoteAPDIRCircularField"], sortingPressNoteAPDIRCircularDirection: params["sortingPressNoteAPDIRCircularDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_NOTIFICATION_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_NOTIFICATION_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_NOTIFICATION_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    PressNoteNotificationAdminComponent.prototype.OnSubmitPressNoteNotification = function (formData) {
        this.isSubmited = true;
        if (this.frmPressNoteNotification.valid) {
            this.SavePressNoteNotification(formData);
        }
    };
    PressNoteNotificationAdminComponent.prototype.CancelPressNoteNotification = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/pressnotes'], {
                queryParams: {
                    indexPressNote1: params["indexPressNote1"], indexPressNote2: params["indexPressNote2"], sortingPressNoteField: params["sortingPressNoteField"], sortingPressNoteDirection: params["sortingPressNoteDirection"], sortingPressNoteNotificationField: params["sortingPressNoteNotificationField"], sortingPressNoteNotificationDirection: params["sortingPressNoteNotificationDirection"], sortingPressNoteAPDIRCircularField: params["sortingPressNoteAPDIRCircularField"], sortingPressNoteAPDIRCircularDirection: params["sortingPressNoteAPDIRCircularDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    PressNoteNotificationAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './pressNoteNotification.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, pressNoteNotification_service_1.PressNoteNotificationAdminService, notification_service_1.NotificationAdminService, pressNote_service_1.PressNoteAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], PressNoteNotificationAdminComponent);
    return PressNoteNotificationAdminComponent;
}());
exports.PressNoteNotificationAdminComponent = PressNoteNotificationAdminComponent;
//# sourceMappingURL=pressNoteNotification.component.js.map