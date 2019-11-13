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
var pressNoteAPDIRCircular_1 = require("../../../model/pressNoteAPDIRCircular");
var aPDIRCircular_1 = require("../../../model/aPDIRCircular");
var pressNote_1 = require("../../../model/pressNote");
var pressNoteAPDIRCircular_service_1 = require("../../../service/admin/pressNoteAPDIRCircular.service");
var aPDIRCircular_service_1 = require("../../../service/admin/aPDIRCircular.service");
var pressNote_service_1 = require("../../../service/admin/pressNote.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var PressNoteAPDIRCircularAdminComponent = /** @class */ (function () {
    function PressNoteAPDIRCircularAdminComponent(formBuilder, toastr, activatedRoute, router, _pressNoteAPDIRCircularService, _apdircircularService, _pressNoteService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._pressNoteAPDIRCircularService = _pressNoteAPDIRCircularService;
        this._apdircircularService = _apdircircularService;
        this._pressNoteService = _pressNoteService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.aPDIRCirculars = [];
        this.pressNote = new pressNote_1.PressNote();
        this.pressNoteId = 0;
        this.pressNoteAPDIRCircularId = 0;
        this.isSubmited = false;
        this.pdfServerPath = global_1.Global.PRESSNOTE_PDF_FILEPATH;
    }
    PressNoteAPDIRCircularAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var pressNoteId = _this._global.decryptValue(params['pressNoteId']);
            var pressNoteAPDIRCircularId = _this._global.decryptValue(params['pressNoteAPDIRCircularId']);
            _this.pressNoteId = parseInt(pressNoteId);
            if (pressNoteId) {
                _this.GetPressNote(_this.pressNoteId);
                if (pressNoteAPDIRCircularId) {
                    _this.addUpdateText = "Update";
                    _this.pressNoteAPDIRCircularId = parseInt(pressNoteAPDIRCircularId);
                    _this.EditPressNoteAPDIRCircular(parseInt(pressNoteAPDIRCircularId));
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
        this.frmPressNoteAPDIRCircular = this.formBuilder.group({
            PressNoteAPDIRCircularId: [''],
            PressNoteId: [this.pressNoteId],
            APDIRCircularId: ['', forms_1.Validators.required]
        });
    };
    PressNoteAPDIRCircularAdminComponent.prototype.GetPressNote = function (pressNoteId) {
        var _this = this;
        this.spinnerService.show();
        var getPressNoteRequest = new pressNote_1.GetPressNoteRequest();
        getPressNoteRequest.PressNoteId = pressNoteId;
        getPressNoteRequest.IsActive = null;
        this._pressNoteService.getPressNote(getPressNoteRequest)
            .subscribe(function (data) {
            if (_this.pressNoteAPDIRCircularId == 0)
                _this.GetAPDIRCircular(null);
            _this.pressNote = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    PressNoteAPDIRCircularAdminComponent.prototype.GetAPDIRCircular = function (pressNoteAPDIRCircularData) {
        //this.spinnerService.show();
        var _this = this;
        var getAPDIRCircularRequest = new aPDIRCircular_1.GetAPDIRCircularRequest();
        this._apdircircularService.getAPDIRCircular(getAPDIRCircularRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.aPDIRCirculars = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.aPDIRCirculars.push({ APDIRCircularId: null, APDIRCircularNo: "--Select--", CreatedDate: null, Year: null, IsActive: null, IsDeleted: null, ModifiedDate: null, APDIRCircularDate: null, APDIRCircularEffectiveDate: null, APDIRCircularName: null, APDIRCircularPDF: null, APDIRCircularYearName: null, MasterDirectionName: null });
                data.Response.forEach(function (item) {
                    _this.aPDIRCirculars.push({ APDIRCircularId: item.APDIRCircularId, APDIRCircularNo: item.APDIRCircularNo, CreatedDate: null, Year: null, IsActive: null, IsDeleted: null, ModifiedDate: null, APDIRCircularDate: item.APDIRCircularDate, APDIRCircularEffectiveDate: null, APDIRCircularName: null, APDIRCircularPDF: null, APDIRCircularYearName: null, MasterDirectionName: null });
                });
                _this.frmPressNoteAPDIRCircular.get("APDIRCircularId").setValue((pressNoteAPDIRCircularData != null) ? pressNoteAPDIRCircularData.APDIRCircularId : pressNoteAPDIRCircularData);
                _this.frmPressNoteAPDIRCircular.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_APDIR_CIRCULAR_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    PressNoteAPDIRCircularAdminComponent.prototype.EditPressNoteAPDIRCircular = function (pressNoteAPDIRCircularId) {
        var _this = this;
        this.spinnerService.show();
        var getPressNoteAPDIRCircularRequest = new pressNoteAPDIRCircular_1.GetPressNoteAPDIRCircularRequest();
        getPressNoteAPDIRCircularRequest.PressNoteAPDIRCircularId = pressNoteAPDIRCircularId;
        getPressNoteAPDIRCircularRequest.IsActive = null;
        this._pressNoteAPDIRCircularService.getPressNoteAPDIRCircular(getPressNoteAPDIRCircularRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.GetAPDIRCircular(data.Response[0]);
            _this.frmPressNoteAPDIRCircular.setValue({
                PressNoteAPDIRCircularId: pressNoteAPDIRCircularId,
                PressNoteId: data.Response[0].PressNoteId,
                APDIRCircularId: data.Response[0].APDIRCircularId
            });
            _this.frmPressNoteAPDIRCircular.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    PressNoteAPDIRCircularAdminComponent.prototype.SavePressNoteAPDIRCircular = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.PressNoteAPDIRCircularId) {
            this._pressNoteAPDIRCircularService.updatePressNoteAPDIRCircular(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/pressnotes'], {
                            queryParams: {
                                indexPressNote1: params["indexPressNote1"], indexPressNote2: params["indexPressNote2"], sortingPressNoteField: params["sortingPressNoteField"], sortingPressNoteDirection: params["sortingPressNoteDirection"], sortingPressNoteNotificationField: params["sortingPressNoteNotificationField"], sortingPressNoteNotificationDirection: params["sortingPressNoteNotificationDirection"], sortingPressNoteAPDIRCircularField: params["sortingPressNoteAPDIRCircularField"], sortingPressNoteAPDIRCircularDirection: params["sortingPressNoteAPDIRCircularDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_APDIR_CIRCULAR_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_APDIR_CIRCULAR_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_APDIR_CIRCULAR_TITLE, { enableHtml: true });
            });
        }
        else {
            this._pressNoteAPDIRCircularService.addPressNoteAPDIRCircular(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/pressnotes'], {
                            queryParams: {
                                indexPressNote1: params["indexPressNote1"], indexPressNote2: params["indexPressNote2"], sortingPressNoteField: params["sortingPressNoteField"], sortingPressNoteDirection: params["sortingPressNoteDirection"], sortingPressNoteNotificationField: params["sortingPressNoteNotificationField"], sortingPressNoteNotificationDirection: params["sortingPressNoteNotificationDirection"], sortingPressNoteAPDIRCircularField: params["sortingPressNoteAPDIRCircularField"], sortingPressNoteAPDIRCircularDirection: params["sortingPressNoteAPDIRCircularDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_APDIR_CIRCULAR_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_PRESSNOTE_APDIR_CIRCULAR_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_PRESSNOTE_APDIR_CIRCULAR_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    PressNoteAPDIRCircularAdminComponent.prototype.OnSubmitPressNoteAPDIRCircular = function (formData) {
        this.isSubmited = true;
        if (this.frmPressNoteAPDIRCircular.valid) {
            this.SavePressNoteAPDIRCircular(formData);
        }
    };
    PressNoteAPDIRCircularAdminComponent.prototype.CancelPressNoteAPDIRCircular = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/pressnotes'], {
                queryParams: {
                    indexPressNote1: params["indexPressNote1"], indexPressNote2: params["indexPressNote2"], sortingPressNoteField: params["sortingPressNoteField"], sortingPressNoteDirection: params["sortingPressNoteDirection"], sortingPressNoteNotificationField: params["sortingPressNoteNotificationField"], sortingPressNoteNotificationDirection: params["sortingPressNoteNotificationDirection"], sortingPressNoteAPDIRCircularField: params["sortingPressNoteAPDIRCircularField"], sortingPressNoteAPDIRCircularDirection: params["sortingPressNoteAPDIRCircularDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    PressNoteAPDIRCircularAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './pressNoteAPDIRCircular.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, pressNoteAPDIRCircular_service_1.PressNoteAPDIRCircularAdminService, aPDIRCircular_service_1.APDIRCircularAdminService, pressNote_service_1.PressNoteAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], PressNoteAPDIRCircularAdminComponent);
    return PressNoteAPDIRCircularAdminComponent;
}());
exports.PressNoteAPDIRCircularAdminComponent = PressNoteAPDIRCircularAdminComponent;
//# sourceMappingURL=pressNoteAPDIRCircular.component.js.map