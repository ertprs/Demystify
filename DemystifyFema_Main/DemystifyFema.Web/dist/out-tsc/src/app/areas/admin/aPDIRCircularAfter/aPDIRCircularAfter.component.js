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
var common_1 = require("@angular/common");
var aPDIRCircularAfter_1 = require("../../../model/aPDIRCircularAfter");
var aPDIRCircular_1 = require("../../../model/aPDIRCircular");
var aPDIRCircularAfter_service_1 = require("../../../service/admin/aPDIRCircularAfter.service");
var aPDIRCircular_service_1 = require("../../../service/admin/aPDIRCircular.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var APDIRCircularAfterAdminComponent = /** @class */ (function () {
    function APDIRCircularAfterAdminComponent(formBuilder, toastr, activatedRoute, router, _aPDIRCircularService, _aPDIRCircularAfterService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._aPDIRCircularService = _aPDIRCircularService;
        this._aPDIRCircularAfterService = _aPDIRCircularAfterService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.aPDIRCirculars = [];
        this.aPDIRCircular = new aPDIRCircular_1.APDIRCircular();
        this.aPDIRCircularParentId = 0;
        this.aPDIRCircularAfterId = 0;
        this.isSubmited = false;
        this.pdfServerPath = global_1.Global.APDIRCIRCULAR_PDF_FILEPATH;
    }
    APDIRCircularAfterAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var aPDIRCircularParentId = _this._global.decryptValue(params['aPDIRCircularParentId']);
            var aPDIRCircularAfterId = _this._global.decryptValue(params['aPDIRCircularAfterId']);
            _this.aPDIRCircularParentId = parseInt(aPDIRCircularParentId);
            if (aPDIRCircularParentId) {
                _this.GetAPDIRCircularParent(_this.aPDIRCircularParentId);
                if (aPDIRCircularAfterId) {
                    _this.addUpdateText = "Update";
                    _this.aPDIRCircularAfterId = parseInt(aPDIRCircularAfterId);
                    _this.EditAPDIRCircularAfter(parseInt(aPDIRCircularAfterId));
                }
                else {
                    _this.GetAPDIRCircular(null);
                    _this.addUpdateText = "Add";
                }
            }
            else {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/apdircirculars'], {
                        queryParams: {
                            indexAPDIRCircular1: params["indexAPDIRCircular1"], indexAPDIRCircular2: params["indexAPDIRCircular2"], sortingAPDIRCircularField: params["sortingAPDIRCircularField"], sortingAPDIRCircularDirection: params["sortingAPDIRCircularDirection"], sortingAPDIRCircularBeforeField: params["sortingAPDIRCircularBeforeField"], sortingAPDIRCircularBeforeDirection: params["sortingAPDIRCircularBeforeDirection"], sortingAPDIRCircularAfterField: params["sortingAPDIRCircularAfterField"], sortingAPDIRCircularAfterDirection: params["sortingAPDIRCircularAfterDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                        }
                    });
                });
            }
        });
        this.frmAPDIRCircularAfter = this.formBuilder.group({
            APDIRCircularAfterId: [''],
            APDIRCircularParentId: [this.aPDIRCircularParentId],
            APDIRCircularId: ['', forms_1.Validators.required]
        });
    };
    APDIRCircularAfterAdminComponent.prototype.GetAPDIRCircularParent = function (aPDIRCircularParentId) {
        var _this = this;
        this.spinnerService.show();
        var getAPDIRCircularRequest = new aPDIRCircular_1.GetAPDIRCircularRequest();
        getAPDIRCircularRequest.APDIRCircularId = aPDIRCircularParentId;
        getAPDIRCircularRequest.IsActive = null;
        this._aPDIRCircularService.getAPDIRCircular(getAPDIRCircularRequest)
            .subscribe(function (data) {
            //this.spinnerService.hide();
            _this.aPDIRCircular = data.Response[0];
        }, function (error) { return _this.msg = error; });
    };
    APDIRCircularAfterAdminComponent.prototype.GetAPDIRCircular = function (aPDIRCircularAfterData) {
        var _this = this;
        this.spinnerService.show();
        var getAPDIRCircularRequest = new aPDIRCircular_1.GetAPDIRCircularRequest();
        this._aPDIRCircularService.getAPDIRCircular(getAPDIRCircularRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.aPDIRCirculars = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.aPDIRCirculars.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    if (item.APDIRCircularId != _this.aPDIRCircularParentId)
                        _this.aPDIRCirculars.push({ Value: item.APDIRCircularId, Text: item.APDIRCircularNo + (item.APDIRCircularDate ? (' (' + (new common_1.DatePipe('en-US').transform(item.APDIRCircularDate, 'dd-MM-yyyy')) + ')') : '') });
                });
                _this.frmAPDIRCircularAfter.get("APDIRCircularId").setValue((aPDIRCircularAfterData != null) ? aPDIRCircularAfterData.APDIRCircularId : "");
                _this.frmAPDIRCircularAfter.updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_AFTER_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_AFTER_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    APDIRCircularAfterAdminComponent.prototype.EditAPDIRCircularAfter = function (aPDIRCircularAfterId) {
        var _this = this;
        this.spinnerService.show();
        var getAPDIRCircularAfterRequest = new aPDIRCircularAfter_1.GetAPDIRCircularAfterRequest();
        getAPDIRCircularAfterRequest.APDIRCircularAfterId = aPDIRCircularAfterId;
        getAPDIRCircularAfterRequest.IsActive = null;
        this._aPDIRCircularAfterService.getAPDIRCircularAfter(getAPDIRCircularAfterRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.GetAPDIRCircular(data.Response[0]);
            _this.frmAPDIRCircularAfter.setValue({
                APDIRCircularAfterId: aPDIRCircularAfterId,
                APDIRCircularParentId: data.Response[0].APDIRCircularParentId,
                APDIRCircularId: data.Response[0].APDIRCircularId
            });
            _this.frmAPDIRCircularAfter.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    APDIRCircularAfterAdminComponent.prototype.SaveAPDIRCircularAfter = function (formData) {
        var _this = this;
        this.spinnerService.show();
        if (formData.value.APDIRCircularAfterId) {
            this._aPDIRCircularAfterService.updateAPDIRCircularAfter(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/apdircirculars'], {
                            queryParams: {
                                indexAPDIRCircular1: params["indexAPDIRCircular1"], indexAPDIRCircular2: params["indexAPDIRCircular2"], sortingAPDIRCircularField: params["sortingAPDIRCircularField"], sortingAPDIRCircularDirection: params["sortingAPDIRCircularDirection"], sortingAPDIRCircularBeforeField: params["sortingAPDIRCircularBeforeField"], sortingAPDIRCircularBeforeDirection: params["sortingAPDIRCircularBeforeDirection"], sortingAPDIRCircularAfterField: params["sortingAPDIRCircularAfterField"], sortingAPDIRCircularAfterDirection: params["sortingAPDIRCircularAfterDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_AFTER_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_AFTER_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_AFTER_TITLE, { enableHtml: true });
            });
        }
        else {
            this._aPDIRCircularAfterService.addAPDIRCircularAfter(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.activatedRoute.queryParams.subscribe(function (params) {
                        _this.router.navigate(['/admin/secure/apdircirculars'], {
                            queryParams: {
                                indexAPDIRCircular1: params["indexAPDIRCircular1"], indexAPDIRCircular2: params["indexAPDIRCircular2"], sortingAPDIRCircularField: params["sortingAPDIRCircularField"], sortingAPDIRCircularDirection: params["sortingAPDIRCircularDirection"], sortingAPDIRCircularBeforeField: params["sortingAPDIRCircularBeforeField"], sortingAPDIRCircularBeforeDirection: params["sortingAPDIRCircularBeforeDirection"], sortingAPDIRCircularAfterField: params["sortingAPDIRCircularAfterField"], sortingAPDIRCircularAfterDirection: params["sortingAPDIRCircularAfterDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                            }
                        }).then(function () {
                            _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_AFTER_TITLE, { closeButton: true });
                        });
                    });
                }
                else {
                    _this.spinnerService.hide();
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_AFTER_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_APDIR_CIRCULAR_AFTER_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    APDIRCircularAfterAdminComponent.prototype.OnSubmitAPDIRCircularAfter = function (formData) {
        this.isSubmited = true;
        if (this.frmAPDIRCircularAfter.valid) {
            this.SaveAPDIRCircularAfter(formData);
        }
    };
    APDIRCircularAfterAdminComponent.prototype.CancelAPDIRCircularAfter = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.router.navigate(['/admin/secure/apdircirculars'], {
                queryParams: {
                    indexAPDIRCircular1: params["indexAPDIRCircular1"], indexAPDIRCircular2: params["indexAPDIRCircular2"], sortingAPDIRCircularField: params["sortingAPDIRCircularField"], sortingAPDIRCircularDirection: params["sortingAPDIRCircularDirection"], sortingAPDIRCircularBeforeField: params["sortingAPDIRCircularBeforeField"], sortingAPDIRCircularBeforeDirection: params["sortingAPDIRCircularBeforeDirection"], sortingAPDIRCircularAfterField: params["sortingAPDIRCircularAfterField"], sortingAPDIRCircularAfterDirection: params["sortingAPDIRCircularAfterDirection"], searchText: params["searchText"], pageNumber: params["pageNumber"], pageSize: params["pageSize"]
                }
            });
        });
    };
    APDIRCircularAfterAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './aPDIRCircularAfter.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, aPDIRCircular_service_1.APDIRCircularAdminService, aPDIRCircularAfter_service_1.APDIRCircularAfterAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], APDIRCircularAfterAdminComponent);
    return APDIRCircularAfterAdminComponent;
}());
exports.APDIRCircularAfterAdminComponent = APDIRCircularAfterAdminComponent;
//# sourceMappingURL=aPDIRCircularAfter.component.js.map