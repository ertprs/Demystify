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
var global_1 = require("../../../common/global");
var ngx_toastr_1 = require("ngx-toastr");
var spinner_service_1 = require("../../../service/common/spinner.service");
var core_2 = require("@ng-idle/core");
var ngx_modal_dialog_1 = require("ngx-modal-dialog");
var PaytmPaymentComponent = /** @class */ (function () {
    function PaytmPaymentComponent(formBuilder, toastr, router, idle, vcr, activatedRoute, spinnerService, modalDialogService) {
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.router = router;
        this.idle = idle;
        this.vcr = vcr;
        this.activatedRoute = activatedRoute;
        this.spinnerService = spinnerService;
        this.modalDialogService = modalDialogService;
        this._global = new global_1.Global();
    }
    PaytmPaymentComponent.prototype.ngOnInit = function () {
        var _this = this;
        debugger;
        document.addEventListener('contextmenu', function (event) { return event.preventDefault(); });
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.MID = "kVZEAA36001323848834"; //params["MID"];
            _this.ORDER_ID = "1"; //params["ORDER_ID"];
            _this.INVOICE_NO = "SV000001"; //params["INVOICE_NO"];
            _this.PACKAGE_ID = 4; // params["PACKAGE_ID"];
            _this.TXN_AMOUNT = 1; // params["TXN_AMOUNT"];
            _this.USER_ID = 1; //params["USER_ID"];
            _this.MOBILE_NO = "6354802250"; //params["MOBILE_NO"];
            _this.EMAIL = "Jayesd@gmail.com"; //params["EMAIL"];
            _this.INDUSTRY_TYPE_ID = "RETAIL"; // params["INDUSTRY_TYPE_ID"];
            _this.CHANNEL_ID = "WEB"; // params["CHANNEL_ID"];
            _this.WEBSITE = "WEBSTAGING"; // params["WEBSITE"];
            _this.CALLBACK_URL = "https://http://localhost:4200/paytmPayment.html"; // params["CALLBACK_URL"];
            _this.CHECKSUMHASH = params["CHECKSUMHASH"];
        });
    };
    PaytmPaymentComponent = __decorate([
        core_1.Component({
            selector: 'app-public',
            templateUrl: './user.component.html',
            styleUrls: [
                '../../../../assets/css/bootstrap-user.min.css',
                '../../../../assets/css/style-user.css',
                '../../../../assets/css/responsive-user.css',
                '../../../../assets/css/font-awesome-user.min.css',
                '../../../../assets/css/fm.scrollator.jquery.css',
                '../../../../assets/css/sidemenu.css'
            ],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ngx_toastr_1.ToastrService,
            router_1.Router,
            core_2.Idle,
            core_1.ViewContainerRef,
            router_1.ActivatedRoute,
            spinner_service_1.SpinnerService,
            ngx_modal_dialog_1.ModalDialogService])
    ], PaytmPaymentComponent);
    return PaytmPaymentComponent;
}());
exports.PaytmPaymentComponent = PaytmPaymentComponent;
//# sourceMappingURL=paytmPayment.component.js.map