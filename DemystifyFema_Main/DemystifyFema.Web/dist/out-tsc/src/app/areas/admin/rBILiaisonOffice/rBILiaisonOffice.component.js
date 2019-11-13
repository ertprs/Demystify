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
var rBILiaisonOffice_service_1 = require("../../../service/admin/rBILiaisonOffice.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var RBILiaisonOfficeAdminComponent = /** @class */ (function () {
    function RBILiaisonOfficeAdminComponent(formBuilder, toastr, activatedRoute, router, _rBILiaisonOfficeService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._rBILiaisonOfficeService = _rBILiaisonOfficeService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.isSubmited = false;
    }
    RBILiaisonOfficeAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.frmRBILiaisonOffice = this.formBuilder.group({
            Excel: ['', forms_1.Validators.required]
        });
        this.activatedRoute.params.subscribe(function (params) {
            _this.addUpdateText = "Add";
        });
    };
    RBILiaisonOfficeAdminComponent.prototype.fileChange = function (event) {
        this.files = event.target.files;
        if (this.files[0].type == "application/vnd.ms-excel" || this.files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            this.frmRBILiaisonOffice.get('Excel').setValue(this.files[0].name);
            this.frmRBILiaisonOffice.updateValueAndValidity();
        }
        else {
            this.frmRBILiaisonOffice.get('Excel').setValue(null);
            this.frmRBILiaisonOffice.updateValueAndValidity();
            this.toastr.error("Please upload proper excel file.", global_1.Global.TOASTR_ADMIN_RBI_LIAISON_OFFICE_TITLE, { closeButton: true });
        }
    };
    RBILiaisonOfficeAdminComponent.prototype.OnSubmitRBILiaisonOffice = function (formData) {
        var _this = this;
        this.isSubmited = true;
        if (this.frmRBILiaisonOffice.valid) {
            this.spinnerService.show();
            if (this.files != null && this.files.length > 0) {
                var fileFormData = new FormData();
                for (var i = 0; i < this.files.length; i++) {
                    fileFormData.append(this.files[i].name, this.files[i]);
                }
                this._rBILiaisonOfficeService.addRBILiaisonOfficeFromExcel(fileFormData)
                    .subscribe(function (data) {
                    _this.spinnerService.hide();
                    if (data.Status == "Success") {
                        _this.addRBILiaisonOfficeFromFileResponse = data.Response;
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_RBI_LIAISON_OFFICE_TITLE, { closeButton: true });
                    }
                    else {
                        _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_RBI_LIAISON_OFFICE_TITLE, { enableHtml: true, closeButton: true });
                    }
                }, function (error) {
                    _this.spinnerService.hide();
                    _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_RBI_LIAISON_OFFICE_TITLE, { enableHtml: true, closeButton: true });
                });
            }
            else {
                this.spinnerService.hide();
                this.toastr.error("Please upload excel file.", global_1.Global.TOASTR_ADMIN_RBI_LIAISON_OFFICE_TITLE, { closeButton: true });
            }
        }
    };
    RBILiaisonOfficeAdminComponent.prototype.CancelRBILiaisonOffice = function () {
        this.router.navigate(['/admin/secure/rbiliaisonoffices']);
    };
    RBILiaisonOfficeAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './rBILiaisonOffice.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, ngx_toastr_1.ToastrService, router_1.ActivatedRoute, router_1.Router, rBILiaisonOffice_service_1.RBILiaisonOfficeAdminService, core_1.ViewContainerRef, spinner_service_1.SpinnerService])
    ], RBILiaisonOfficeAdminComponent);
    return RBILiaisonOfficeAdminComponent;
}());
exports.RBILiaisonOfficeAdminComponent = RBILiaisonOfficeAdminComponent;
//# sourceMappingURL=rBILiaisonOffice.component.js.map