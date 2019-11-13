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
var contactUs_service_1 = require("../../../service/common/contactUs.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var spinner_service_1 = require("../../../service/common/spinner.service");
var ContactUsGuestComponent = /** @class */ (function () {
    function ContactUsGuestComponent(formBuilder, toastr, activatedRoute, router, _conatctUsService, vcr, spinnerService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this._conatctUsService = _conatctUsService;
        this.spinnerService = spinnerService;
        this._global = new global_1.Global();
        this.isSubmited = false;
    }
    ContactUsGuestComponent.prototype.ngOnInit = function () {
        this.frmContactUs = this.formBuilder.group({
            Name: ['', forms_1.Validators.required],
            Email: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email])],
            Mobile: ['', forms_1.Validators.required],
            Comment: ['', forms_1.Validators.required]
        });
    };
    ContactUsGuestComponent.prototype.SaveContactUs = function (formData) {
        var _this = this;
        this.spinnerService.show();
        this._conatctUsService.addContactUs(formData.value)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.isSubmited = false;
                _this.frmContactUs.reset();
                _this.toastr.success(data.Description, global_1.Global.TOASTR_CONTACT_US_TITLE, { closeButton: true });
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_CONTACT_US_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_CONTACT_US_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    ContactUsGuestComponent.prototype.OnSubmitContactUs = function (formData) {
        this.isSubmited = true;
        if (this.frmContactUs.valid) {
            this.SaveContactUs(formData);
        }
    };
    ContactUsGuestComponent = __decorate([
        core_1.Component({
            selector: 'app-public',
            templateUrl: './contactus.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.ActivatedRoute,
            router_1.Router,
            contactUs_service_1.ContactUsService,
            core_1.ViewContainerRef,
            spinner_service_1.SpinnerService])
    ], ContactUsGuestComponent);
    return ContactUsGuestComponent;
}());
exports.ContactUsGuestComponent = ContactUsGuestComponent;
//# sourceMappingURL=contactus.component.js.map