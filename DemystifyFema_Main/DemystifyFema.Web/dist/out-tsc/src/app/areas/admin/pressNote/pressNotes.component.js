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
var pressNote_1 = require("../../../model/pressNote");
var pressNoteNotification_1 = require("../../../model/pressNoteNotification");
var pressNoteAPDIRCircular_1 = require("../../../model/pressNoteAPDIRCircular");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var pressNote_service_1 = require("../../../service/admin/pressNote.service");
var pressNoteNotification_service_1 = require("../../../service/admin/pressNoteNotification.service");
var pressNoteAPDIRCircular_service_1 = require("../../../service/admin/pressNoteAPDIRCircular.service");
var PressNotesAdminComponent = /** @class */ (function () {
    function PressNotesAdminComponent(formBuilder, activatedRoute, _pressNoteService, _pressNoteNotificationService, _pressNoteAPDIRCircularService, toastr, vcr, spinnerService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this._pressNoteService = _pressNoteService;
        this._pressNoteNotificationService = _pressNoteNotificationService;
        this._pressNoteAPDIRCircularService = _pressNoteAPDIRCircularService;
        this.toastr = toastr;
        this.vcr = vcr;
        this.spinnerService = spinnerService;
        this.router = router;
        this._global = new global_1.Global();
        this.pressNotePDFServerPath = global_1.Global.PRESSNOTE_PDF_FILEPATH;
        this.notificationPDFServerPath = global_1.Global.NOTIFICATION_PDF_FILEPATH;
        this.gSRPDFServerPath = global_1.Global.GSR_PDF_FILEPATH;
        this.aPDIRCircularPDFServerPath = global_1.Global.APDIRCIRCULAR_PDF_FILEPATH;
        this.itemDetailPressNotes1 = { index: -1 };
        this.itemDetailPressNotes2 = { index: -1 };
        this.indexPressNote1 = -1;
        this.indexPressNote2 = -1;
    }
    PressNotesAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSizes = global_1.Global.PAGE_SIZES;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.indexPressNote1 = (params["indexPressNote1"]) ? parseInt(params["indexPressNote1"]) : -1;
            _this.indexPressNote2 = (params["indexPressNote2"]) ? parseInt(params["indexPressNote2"]) : -1;
            _this.sortingPressNoteField = (params["sortingPressNoteField"]) ? params["sortingPressNoteField"] : "PressNoteDate";
            _this.sortingPressNoteDirection = (params["sortingPressNoteDirection"]) ? params["sortingPressNoteDirection"] : "D";
            _this.sortingPressNoteNotificationField = params["sortingPressNoteNotificationField"];
            _this.sortingPressNoteNotificationDirection = params["sortingPressNoteNotificationDirection"];
            _this.sortingPressNoteAPDIRCircularField = params["sortingPressNoteAPDIRCircularField"];
            _this.sortingPressNoteAPDIRCircularDirection = params["sortingPressNoteAPDIRCircularDirection"];
            _this.searchText = (params["searchText"]) ? params["searchText"] : null;
            _this.currentPage = (params["pageNumber"]) ? parseInt(params["pageNumber"]) : 1;
            _this.pageSize = (params["pageSize"]) ? parseInt(params["pageSize"]) : _this.pageSizes[0];
            _this.drpPageSize = _this.pageSize;
        });
        this.frmPressNote = this.formBuilder.group({
            SearchText: [this.searchText]
        });
        this.GetPressNote(this.searchText, this.currentPage, this.pageSizes[0]);
    };
    PressNotesAdminComponent.prototype.GetPressNote = function (searchText, pageNumber, pageSize) {
        var _this = this;
        this.spinnerService.show();
        var getPressNoteRequest = new pressNote_1.GetPressNoteRequest();
        getPressNoteRequest.SearchText = searchText;
        getPressNoteRequest.IsActive = null;
        getPressNoteRequest.OrderBy = this.sortingPressNoteField;
        getPressNoteRequest.OrderByDirection = this.sortingPressNoteDirection;
        getPressNoteRequest.PageNumber = (pageNumber != null) ? pageNumber : this.currentPage;
        getPressNoteRequest.PageSize = (pageSize != null) ? pageSize : this.pageSizes[0];
        this._pressNoteService.getPressNote(getPressNoteRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.pressNotes = data.Response;
                if (_this.indexPressNote1 != -1 && _this.pressNotes.length > 0) {
                    _this.itemDetailPressNotes1.index = _this.indexPressNote1;
                    _this.GetPressNoteNotification(_this.itemDetailPressNotes1.index, _this.pressNotes[_this.itemDetailPressNotes1.index].PressNoteId, true);
                }
                if (_this.indexPressNote2 != -1 && _this.pressNotes.length > 0) {
                    _this.itemDetailPressNotes2.index = _this.indexPressNote2;
                    _this.GetPressNoteAPDIRCircular(_this.itemDetailPressNotes2.index, _this.pressNotes[_this.itemDetailPressNotes2.index].PressNoteId, true);
                }
                _this.pageSize = getPressNoteRequest.PageSize;
                _this.totalRecords = (data.Response.length != 0) ? data.Response[0].TotalRecord : 0;
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    PressNotesAdminComponent.prototype.SearchPressNote = function (formData) {
        this.indexPressNote1 = -1;
        this.indexPressNote2 = -1;
        this.itemDetailPressNotes1.index = this.indexPressNote1;
        this.itemDetailPressNotes2.index = this.indexPressNote2;
        this.currentPage = 1;
        this.searchText = formData.value.SearchText;
        this.ReloadPage(false);
        this.GetPressNote(this.searchText, this.currentPage, this.pageSize);
    };
    PressNotesAdminComponent.prototype.OnPageChange = function (pageNumber) {
        this.currentPage = pageNumber;
        this.ReloadPage(true);
        this.GetPressNote(this.searchText, pageNumber, this.pageSize);
    };
    PressNotesAdminComponent.prototype.OnPageSizeChange = function () {
        this.currentPage = 1;
        this.pageSize = this.drpPageSize;
        this.ReloadPage(false);
        this.GetPressNote(this.searchText, null, this.pageSize);
    };
    PressNotesAdminComponent.prototype.EditPressNote = function (pressNoteId) {
        this.router.navigate(['/admin/secure/pressnote/' + this._global.encryptValue(pressNoteId)], {
            queryParams: {
                indexPressNote1: this.indexPressNote1, indexPressNote2: this.indexPressNote2, sortingPressNoteField: this.sortingPressNoteField, sortingPressNoteDirection: this.sortingPressNoteDirection, sortingPressNoteNotificationField: this.sortingPressNoteNotificationField, sortingPressNoteNotificationDirection: this.sortingPressNoteNotificationDirection, sortingPressNoteAPDIRCircularField: this.sortingPressNoteAPDIRCircularField, sortingPressNoteAPDIRCircularDirection: this.sortingPressNoteAPDIRCircularDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    PressNotesAdminComponent.prototype.AddPressNoteNotification = function (pressNoteId, index) {
        this.router.navigate(['/admin/secure/pressnotenotification/' + this._global.encryptValue(pressNoteId)], {
            queryParams: {
                indexPressNote1: this.indexPressNote1, indexPressNote2: this.indexPressNote2, sortingPressNoteField: this.sortingPressNoteField, sortingPressNoteDirection: this.sortingPressNoteDirection, sortingPressNoteNotificationField: this.sortingPressNoteNotificationField, sortingPressNoteNotificationDirection: this.sortingPressNoteNotificationDirection, sortingPressNoteAPDIRCircularField: this.sortingPressNoteAPDIRCircularField, sortingPressNoteAPDIRCircularDirection: this.sortingPressNoteAPDIRCircularDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    PressNotesAdminComponent.prototype.EditPressNoteNotification = function (pressNoteNotificationId, pressNoteId) {
        this.router.navigate(['/admin/secure/pressnotenotification/' + this._global.encryptValue(pressNoteId) + "/" + this._global.encryptValue(pressNoteNotificationId)], {
            queryParams: {
                indexPressNote1: this.indexPressNote1, indexPressNote2: this.indexPressNote2, sortingPressNoteField: this.sortingPressNoteField, sortingPressNoteDirection: this.sortingPressNoteDirection, sortingPressNoteNotificationField: this.sortingPressNoteNotificationField, sortingPressNoteNotificationDirection: this.sortingPressNoteNotificationDirection, sortingPressNoteAPDIRCircularField: this.sortingPressNoteAPDIRCircularField, sortingPressNoteAPDIRCircularDirection: this.sortingPressNoteAPDIRCircularDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    PressNotesAdminComponent.prototype.AddPressNoteAPDIRCircular = function (pressNoteId, index) {
        this.router.navigate(['/admin/secure/pressnoteapdircircular/' + this._global.encryptValue(pressNoteId)], {
            queryParams: {
                indexPressNote1: this.indexPressNote1, indexPressNote2: this.indexPressNote2, sortingPressNoteField: this.sortingPressNoteField, sortingPressNoteDirection: this.sortingPressNoteDirection, sortingPressNoteNotificationField: this.sortingPressNoteNotificationField, sortingPressNoteNotificationDirection: this.sortingPressNoteNotificationDirection, sortingPressNoteAPDIRCircularField: this.sortingPressNoteAPDIRCircularField, sortingPressNoteAPDIRCircularDirection: this.sortingPressNoteAPDIRCircularDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    PressNotesAdminComponent.prototype.EditPressNoteAPDIRCircular = function (pressNoteAPDIRCircularId, pressNoteId) {
        this.router.navigate(['/admin/secure/pressnoteapdircircular/' + this._global.encryptValue(pressNoteId) + "/" + this._global.encryptValue(pressNoteAPDIRCircularId)], {
            queryParams: {
                indexPressNote1: this.indexPressNote1, indexPressNote2: this.indexPressNote2, sortingPressNoteField: this.sortingPressNoteField, sortingPressNoteDirection: this.sortingPressNoteDirection, sortingPressNoteNotificationField: this.sortingPressNoteNotificationField, sortingPressNoteNotificationDirection: this.sortingPressNoteNotificationDirection, sortingPressNoteAPDIRCircularField: this.sortingPressNoteAPDIRCircularField, sortingPressNoteAPDIRCircularDirection: this.sortingPressNoteAPDIRCircularDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    PressNotesAdminComponent.prototype.ReloadPage = function (isPageChange) {
        if (isPageChange == true) {
            this.indexPressNote1 = -1;
            this.indexPressNote2 = -1;
            this.itemDetailPressNotes1.index = this.indexPressNote1;
            this.itemDetailPressNotes2.index = this.indexPressNote2;
        }
        this.router.navigate(['/admin/secure/pressnotes'], {
            queryParams: {
                indexPressNote1: this.indexPressNote1, indexPressNote2: this.indexPressNote2, sortingPressNoteField: this.sortingPressNoteField, sortingPressNoteDirection: this.sortingPressNoteDirection, sortingPressNoteNotificationField: this.sortingPressNoteNotificationField, sortingPressNoteNotificationDirection: this.sortingPressNoteNotificationDirection, sortingPressNoteAPDIRCircularField: this.sortingPressNoteAPDIRCircularField, sortingPressNoteAPDIRCircularDirection: this.sortingPressNoteAPDIRCircularDirection, searchText: this.searchText, pageNumber: this.currentPage, pageSize: this.pageSize
            }
        });
    };
    PressNotesAdminComponent.prototype.DeletePressNote = function (pressNoteId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deletePressNote = {
                "PressNoteId": pressNoteId
            };
            this._pressNoteService.deletePressNote(deletePressNote)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
                    _this.GetPressNote();
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    PressNotesAdminComponent.prototype.DeletePressNoteNotification = function (pressNoteId, pressNoteNotificationId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deletePressNoteNotification = {
                "PressNoteNotificationId": pressNoteNotificationId
            };
            this._pressNoteNotificationService.deletePressNoteNotification(deletePressNoteNotification)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
                    _this.GetPressNoteNotification(_this.itemDetailPressNotes1.index, pressNoteId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    PressNotesAdminComponent.prototype.DeletePressNoteAPDIRCircular = function (pressNoteId, pressNoteAPDIRCircularId) {
        var _this = this;
        var confirmBox = confirm("Are you sure, You want to delete?");
        if (confirmBox) {
            this.spinnerService.show();
            var deletePressNoteAPDIRCircular = {
                "PressNoteAPDIRCircularId": pressNoteAPDIRCircularId
            };
            this._pressNoteAPDIRCircularService.deletePressNoteAPDIRCircular(deletePressNoteAPDIRCircular)
                .subscribe(function (data) {
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
                    _this.GetPressNoteAPDIRCircular(_this.itemDetailPressNotes2.index, pressNoteId, true);
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    PressNotesAdminComponent.prototype.UpDownPressNote1Arrow = function (index) {
        if (index === this.itemDetailPressNotes1.index) {
            this.itemDetailPressNotes1.index = null;
        }
        else {
            this.itemDetailPressNotes1.index = index;
        }
    };
    PressNotesAdminComponent.prototype.UpDownPressNote2Arrow = function (index) {
        if (index === this.itemDetailPressNotes2.index) {
            this.itemDetailPressNotes2.index = null;
        }
        else {
            this.itemDetailPressNotes2.index = index;
        }
    };
    PressNotesAdminComponent.prototype.GetPressNoteNotification = function (index, pressNoteId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getPressNoteNotificationRequest = new pressNoteNotification_1.GetPressNoteNotificationRequest();
        getPressNoteNotificationRequest.PressNoteId = pressNoteId;
        getPressNoteNotificationRequest.IsActive = null;
        getPressNoteNotificationRequest.OrderBy = this.sortingPressNoteNotificationField;
        getPressNoteNotificationRequest.OrderByDirection = this.sortingPressNoteNotificationDirection;
        getPressNoteNotificationRequest.PageNumber = 1;
        getPressNoteNotificationRequest.PageSize = 100000;
        this._pressNoteNotificationService.getPressNoteNotification(getPressNoteNotificationRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.pressNoteNotifications = data.Response;
                if (isDeleted != true) {
                    _this.UpDownPressNote1Arrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    PressNotesAdminComponent.prototype.GetPressNoteAPDIRCircular = function (index, pressNoteId, isDeleted) {
        var _this = this;
        this.spinnerService.show();
        var getPressNoteAPDIRCircularRequest = new pressNoteAPDIRCircular_1.GetPressNoteAPDIRCircularRequest();
        getPressNoteAPDIRCircularRequest.PressNoteId = pressNoteId;
        getPressNoteAPDIRCircularRequest.IsActive = null;
        getPressNoteAPDIRCircularRequest.OrderBy = this.sortingPressNoteAPDIRCircularField;
        getPressNoteAPDIRCircularRequest.OrderByDirection = this.sortingPressNoteAPDIRCircularDirection;
        getPressNoteAPDIRCircularRequest.PageNumber = 1;
        getPressNoteAPDIRCircularRequest.PageSize = 100000;
        this._pressNoteAPDIRCircularService.getPressNoteAPDIRCircular(getPressNoteAPDIRCircularRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.pressNoteAPDIRCirculars = data.Response;
                if (isDeleted != true) {
                    _this.UpDownPressNote2Arrow(index);
                }
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    PressNotesAdminComponent.prototype.ShowPressNoteNotification = function (index, pressNoteId) {
        this.indexPressNote1 = -1;
        if (this.itemDetailPressNotes1.index !== index) {
            if (pressNoteId) {
                this.indexPressNote1 = index;
                this.GetPressNoteNotification(index, pressNoteId, false);
            }
        }
        else {
            this.UpDownPressNote1Arrow(index);
        }
        this.ReloadPage(false);
    };
    PressNotesAdminComponent.prototype.ShowPressNoteAPDIRCircular = function (index, pressNoteId) {
        this.indexPressNote2 = -1;
        if (this.itemDetailPressNotes2.index !== index) {
            if (pressNoteId) {
                this.indexPressNote2 = index;
                this.GetPressNoteAPDIRCircular(index, pressNoteId, false);
            }
        }
        else {
            this.UpDownPressNote2Arrow(index);
        }
        this.ReloadPage(false);
    };
    PressNotesAdminComponent.prototype.OnPressNoteSort = function (fieldName) {
        this.sortingPressNoteDirection = (this.sortingPressNoteField == fieldName) ? (this.sortingPressNoteDirection == "A") ? "D" : "A" : "A";
        this.sortingPressNoteField = fieldName;
        this.ReloadPage(true);
        this.GetPressNote(this.searchText, this.currentPage, this.pageSize);
    };
    PressNotesAdminComponent.prototype.OnPressNoteNotificationSort = function (pressNoteId, fieldName) {
        this.sortingPressNoteNotificationDirection = (this.sortingPressNoteNotificationField == fieldName) ? (this.sortingPressNoteNotificationDirection == "A") ? "D" : "A" : "A";
        this.sortingPressNoteNotificationField = fieldName;
        this.ReloadPage(false);
        this.GetPressNoteNotification(this.itemDetailPressNotes1.index, pressNoteId, true);
    };
    PressNotesAdminComponent.prototype.OnPressNoteAPDIRCircularSort = function (pressNoteId, fieldName) {
        this.sortingPressNoteAPDIRCircularDirection = (this.sortingPressNoteAPDIRCircularField == fieldName) ? (this.sortingPressNoteAPDIRCircularDirection == "A") ? "D" : "A" : "A";
        this.sortingPressNoteAPDIRCircularField = fieldName;
        this.ReloadPage(false);
        this.GetPressNoteAPDIRCircular(this.itemDetailPressNotes2.index, pressNoteId, true);
    };
    PressNotesAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './pressNotes.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, pressNote_service_1.PressNoteAdminService, pressNoteNotification_service_1.PressNoteNotificationAdminService, pressNoteAPDIRCircular_service_1.PressNoteAPDIRCircularAdminService, ngx_toastr_1.ToastrService, core_1.ViewContainerRef, spinner_service_1.SpinnerService, router_1.Router])
    ], PressNotesAdminComponent);
    return PressNotesAdminComponent;
}());
exports.PressNotesAdminComponent = PressNotesAdminComponent;
//# sourceMappingURL=pressNotes.component.js.map