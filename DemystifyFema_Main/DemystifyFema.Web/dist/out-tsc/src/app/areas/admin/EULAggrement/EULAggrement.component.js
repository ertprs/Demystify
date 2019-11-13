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
var endUserLicenseAggrement_service_1 = require("../../../service/admin/endUserLicenseAggrement.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var EULAggrementAdminComponent = /** @class */ (function () {
    function EULAggrementAdminComponent(formBuilder, toastr, activatedRoute, router, _EULAService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._EULAService = _EULAService;
        this.spinnerService = spinnerService;
    }
    EULAggrementAdminComponent.prototype.ngOnInit = function () {
        this.frmEULA = this.formBuilder.group({
            EULAContent: this.formBuilder.array([this.CreateCKEditor(0, null, "Add")])
        });
        this.GetEULA();
    };
    EULAggrementAdminComponent.prototype.CreateCKEditor = function (id, content, status) {
        return this.formBuilder.group({
            Id: id,
            Content: content,
            Status: "EULA"
        });
    };
    EULAggrementAdminComponent.prototype.AddCKEditor = function (id, content, status) {
        //this.PrivacyPolicyContent = this.frmPrivacyPolicy.get('PrivacyPolicyContent') as FormArray;
        //this.PrivacyPolicyContent.push(this.CreateCKEditor(id, content, status));
    };
    EULAggrementAdminComponent.prototype.RemoveCKEditor = function (index) {
        this.EULAContent.removeAt(index);
    };
    EULAggrementAdminComponent.prototype.OnSubmitIndexAmendment = function (formData) {
        if (this.frmEULA.valid) {
            var data = formData.value["EULAContent"];
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                data[i]["Content"];
                var model = {
                    ID: data[i]["Id"],
                    EULA: data[i]["Content"]
                };
            }
            this.SaveEULA(model);
        }
    };
    EULAggrementAdminComponent.prototype.SaveEULA = function (model) {
        var _this = this;
        this._EULAService.addEULA(model)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.activatedRoute.queryParams.subscribe(function (params) {
                    _this.router.navigate(['/admin/secure/EULAggrement']).then(function () {
                        _this.toastr.success(data.Description, global_1.Global.TOASTR_ADMIN_ENDUSERLICENSEAGGREMENT_TITLE, { closeButton: true });
                    });
                });
            }
            else {
                _this.spinnerService.hide();
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_ENDUSERLICENSEAGGREMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_ENDUSERLICENSEAGGREMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    EULAggrementAdminComponent.prototype.GetEULA = function () {
        var _this = this;
        this._EULAService.getEULA()
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                if (data.Response.length > 0) {
                    _this.frmEULA = _this.formBuilder.group({
                        EULAContent: _this.formBuilder.array([_this.CreateCKEditor(0, data.Response[0].EULA, "Edit")])
                    });
                }
            }
            else {
                _this.spinnerService.hide();
                _this.toastr.error(data.Description, global_1.Global.TOASTR_ADMIN_ENDUSERLICENSEAGGREMENT_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_ADMIN_ENDUSERLICENSEAGGREMENT_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    EULAggrementAdminComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './EULAggrement.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            endUserLicenseAggrement_service_1.EndUserLicenseAggrementAdminService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService])
    ], EULAggrementAdminComponent);
    return EULAggrementAdminComponent;
}());
exports.EULAggrementAdminComponent = EULAggrementAdminComponent;
//# sourceMappingURL=EULAggrement.component.js.map