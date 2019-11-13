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
var rBICompoundingOrder_1 = require("../../../model/rBICompoundingOrder");
var rBICompoundingOrder_service_1 = require("../../../service/admin/rBICompoundingOrder.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var RBICompoundingOrderAdminComponent = /** @class */ (function () {
    function RBICompoundingOrderAdminComponent(formBuilder, toastr, activatedRoute, router, _rBICompoundingOrderService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._rBICompoundingOrderService = _rBICompoundingOrderService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.rBICompoundingOrderId = 0;
        this.searchText = '';
        this.pdfServerPath = global_1.Global.RBI_COMPOUNDING_ORDER_PDF_FILEPATH;
        this.isSubmited = false;
        this.minDate = { year: 1970, month: 1, day: 1 };
    }
    RBICompoundingOrderAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmRBICompoundingOrder = this.formBuilder.group({
            RBICompoundingOrderId: [''],
            ApplicantName: ['', forms_1.Validators.required],
            OrderGist: ['', forms_1.Validators.required],
            Topic: ['', forms_1.Validators.required],
            FEMRegulationRuleNo: ['', forms_1.Validators.required],
            OrderDate: ['', forms_1.Validators.required],
            PenaltyAmount: ['', forms_1.Validators.required],
            Regional_CentralOfficeOfRBI: ['', forms_1.Validators.required],
            PDF: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            var rBICompoundingOrderId = _this._global.decryptValue(params['rBICompoundingOrderId']);
            if (rBICompoundingOrderId) {
                _this.addUpdateText = "Update";
                _this.rBICompoundingOrderId = parseInt(rBICompoundingOrderId);
                _this.EditRBICompoundingOrder(parseInt(rBICompoundingOrderId));
            }
            else {
                _this.addUpdateText = "Add";
            }
        });
    };
    RBICompoundingOrderAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/pdf") {
            this.frmRBICompoundingOrder.get('PDF').setValue(this.files[0].name);
            this.frmRBICompoundingOrder.updateValueAndValidity();
        }
        else {
            this.frmRBICompoundingOrder.get('PDF').setValue(null);
            this.frmRBICompoundingOrder.updateValueAndValidity();
            this.toastr.error("Please upload proper pdf file.", global_1.Global.TOASTR_ADMIN_RBI_COMPOUNDING_ORDER_TITLE, { closeButton: true });
        }
    };
    RBICompoundingOrderAdminComponent.prototype.EditRBICompoundingOrder = function (rBICompoundingOrderId) {
        var _this = this;
        this.spinnerService.show();
        var getRBICompoundingOrderRequest = new rBICompoundingOrder_1.GetRBICompoundingOrderRequest();
        getRBICompoundingOrderRequest.RBICompoundingOrderId = rBICompoundingOrderId;
        getRBICompoundingOrderRequest.IsActive = null;
        this._rBICompoundingOrderService.getRBICompoundingOrder(getRBICompoundingOrderRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.rBICompoundingOrderPDFName = data.Response[0].PDF;
            var orderDate = new Date(data.Response[0].OrderDate);
            _this.frmRBICompoundingOrder.setValue({
                RBICompoundingOrderId: rBICompoundingOrderId,
                ApplicantName: data.Response[0].ApplicantName,
                OrderGist: data.Response[0].OrderGist,
                Topic: data.Response[0].Topic,
                FEMRegulationRuleNo: data.Response[0].FEMRegulationRuleNo,
                OrderDate: { year: orderDate.getFullYear(), month: orderDate.getMonth() + 1, day: orderDate.getDate() },
                PenaltyAmount: data.Response[0].PenaltyAmount,
                Regional_CentralOfficeOfRBI: data.Response[0].Regional_CentralOfficeOfRBI,
                PDF: data.Response[0].PDF
            });
            _this.frmRBICompoundingOrder.updateValueAndValidity();
        }, function (error) { return _this.msg = error; });
    };
    RBICompoundingOrderAdminComponent.prototype.SaveRBICompoundingOrder = function (formData) {
        var _this = this;
        this.spinnerService.show();
        formData.value.OrderDate = (formData.value.OrderDate != null) ? formData.value.OrderDate.year + "/" + formData.value.OrderDate.month + "/" + formData.value.OrderDate.day : null;
        if (formData.value.RBICompoundingOrderId) {
            this._rBICompoundingOrderService.updateRBICompoundingOrder(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.router.navigate(['/admin/secure/rbicompoundingorders']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RBI_COMPOUNDING_ORDER_TITLE, { closeButton: true });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RBI_COMPOUNDING_ORDER_TITLE);
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBI_COMPOUNDING_ORDER_TITLE, { enableHtml: true });
            });
        }
        else {
            this._rBICompoundingOrderService.addRBICompoundingOrder(formData.value)
                .subscribe(function (data) {
                _this.spinnerService.hide();
                if (data.Status == global_1.Global.API_SUCCESS) {
                    _this.router.navigate(['/admin/secure/rbicompoundingorders']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RBI_COMPOUNDING_ORDER_TITLE, { closeButton: true });
                    });
                }
                else {
                    _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RBI_COMPOUNDING_ORDER_TITLE, { closeButton: true });
                }
            }, function (error) {
                _this.spinnerService.hide();
                _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBI_COMPOUNDING_ORDER_TITLE, { enableHtml: true, closeButton: true });
            });
        }
    };
    RBICompoundingOrderAdminComponent.prototype.ClearDate = function () {
        this.frmRBICompoundingOrder.get("OrderDate").setValue("");
        this.frmRBICompoundingOrder.updateValueAndValidity();
    };
    RBICompoundingOrderAdminComponent.prototype.OnSubmitRBICompoundingOrder = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmRBICompoundingOrder.valid) {
            this.spinnerService.show();
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._rBICompoundingOrderService.fileUpload(fileFormData)
                    .subscribe(function (response) {
                    if (response.Status == "Success") {
                        _this.frmRBICompoundingOrder.get('PDF').setValue(response.Response);
                        _this.frmRBICompoundingOrder.updateValueAndValidity();
                        formData.value.PDF = response.Response;
                        _this.files = null;
                        _this.SaveRBICompoundingOrder(formData);
                    }
                    else {
                        _this.spinnerService.hide();
                        _this.toastr.error(response.Description, global_1.Global.TOASTR_ADMIN_RBI_COMPOUNDING_ORDER_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBI_COMPOUNDING_ORDER_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                if (formData.value.PDF) {
                    this.SaveRBICompoundingOrder(formData);
                }
                else {
                    this.spinnerService.hide();
                }
            }
        }
    };
    RBICompoundingOrderAdminComponent.prototype.CancelRBICompoundingOrder = function () {
        this.router.navigate(['/admin/secure/rbicompoundingorders']);
    };
    RBICompoundingOrderAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './rBICompoundingOrder.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, rBICompoundingOrder_service_1.RBICompoundingOrderAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], RBICompoundingOrderAdminComponent);
    return RBICompoundingOrderAdminComponent;
}());
exports.RBICompoundingOrderAdminComponent = RBICompoundingOrderAdminComponent;
//# sourceMappingURL=rBICompoundingOrder.component.js.map