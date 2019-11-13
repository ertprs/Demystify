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
var spinner_service_1 = require("../../../service/common/spinner.service");
var ngx_toastr_1 = require("ngx-toastr");
var global_1 = require("../../../common/global");
var http_1 = require("@angular/http");
var subscription_service_1 = require("../../../service/user/subscription.service");
var UserPaymentComponent = /** @class */ (function () {
    function UserPaymentComponent(formBuilder, activatedRoute, spinnerService, toastr, http, _subscriptionService, router) {
        this.formBuilder = formBuilder;
        this.activatedRoute = activatedRoute;
        this.spinnerService = spinnerService;
        this.toastr = toastr;
        this.http = http;
        this._subscriptionService = _subscriptionService;
        this.router = router;
        this._global = new global_1.Global();
    }
    UserPaymentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinnerService.hide();
        this.activatedRoute.queryParams.subscribe(function (params) {
            //this.MID = params["MID"];
            //this.WEBSITE = params["WEBSITE"];
            //this.INDUSTRY_TYPE_ID = params["INDUSTRY_TYPE_ID"];
            //this.CHANNEL_ID = params["CHANNEL_ID"];
            //this.ORDER_ID = params["ORDER_ID"];
            //this.CUST_ID = params["CUST_ID"];
            //this.MOBILE_NO = params["MOBILE_NO"];
            //this.EMAIL = params["EMAIL"];
            //this.CALLBACK_URL = params["CALLBACK_URL"];
            //this.TXN_AMOUNT = params["TXN_AMOUNT"];
            //this.CHECKSUMHASH = params["CHECKSUMHASH"];
            _this.MID = params["htmldata"];
        });
        //var MID = (<HTMLInputElement>document.getElementById('MID'));
        //MID.value = this.MID;
        //var WEBSITE = (<HTMLInputElement>document.getElementById('WEBSITE'));
        //WEBSITE.value = this.WEBSITE;
        //var INDUSTRY_TYPE_ID = (<HTMLInputElement>document.getElementById('INDUSTRY_TYPE_ID'));
        //INDUSTRY_TYPE_ID.value = this.INDUSTRY_TYPE_ID;
        //var CHANNEL_ID = (<HTMLInputElement>document.getElementById('CHANNEL_ID'));
        //CHANNEL_ID.value = this.CHANNEL_ID;
        //var ORDER_ID = (<HTMLInputElement>document.getElementById('ORDER_ID'));
        //ORDER_ID.value = this.ORDER_ID;
        //var CUST_ID = (<HTMLInputElement>document.getElementById('CUST_ID'));
        //CUST_ID.value = this.CUST_ID;
        //var MOBILE_NO = (<HTMLInputElement>document.getElementById('MOBILE_NO'));
        //MOBILE_NO.value = this.MOBILE_NO;
        //var EMAIL = (<HTMLInputElement>document.getElementById('EMAIL'));
        //EMAIL.value = this.EMAIL;
        //var CALLBACK_URL = (<HTMLInputElement>document.getElementById('CALLBACK_URL'));
        //CALLBACK_URL.value = this.CALLBACK_URL;
        //var TXN_AMOUNT = (<HTMLInputElement>document.getElementById('TXN_AMOUNT'));
        //TXN_AMOUNT.value = this.TXN_AMOUNT;
        //var CHECKSUMHASH = (<HTMLInputElement>document.getElementById('CHECKSUMHASH'));
        //CHECKSUMHASH.value = this.CHECKSUMHASH;
        var obj = {};
        //obj['MID'] = this.MID;
        //obj['WEBSITE'] = this.WEBSITE;
        //obj['INDUSTRY_TYPE_ID'] = this.INDUSTRY_TYPE_ID;
        //obj['CHANNEL_ID'] = this.CHANNEL_ID;
        //obj['ORDER_ID'] = this.ORDER_ID;
        //obj['CUST_ID'] = this.CUST_ID;
        //obj['MOBILE_NO'] = this.MOBILE_NO;
        //obj['EMAIL'] = this.EMAIL;
        //obj['CALLBACK_URL'] = this.CALLBACK_URL;
        //obj['TXN_AMOUNT'] = this.TXN_AMOUNT;
        //obj['CHECKSUMHASH'] = this.CHECKSUMHASH;
        obj['MID'] = this.MID;
        var myJSON = obj['MID']; //JSON.stringify(obj);
        document.getElementById("paytm_html").innerHTML = myJSON;
        //this._subscriptionService.paytm(myJSON)
        //    .subscribe(data => {
        //        alert("hi");
        //        document.getElementById("paytm_html").innerHTML = data;
        //    },
        //    error => {
        //        alert("error");
        //            this.spinnerService.hide();
        //            this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_SUBSCRIPTION_TITLE, { enableHtml: true, closeButton: true });
        //        });
        //setInterval(() => {
        //    var myForm = <HTMLFormElement>document.forms['paytm'];
        //        myForm.submit();
        //}, 3000);
    };
    UserPaymentComponent.prototype.ngAfterViewInit = function () {
        var myForm = document.forms['f1'];
        myForm.submit();
    };
    UserPaymentComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './userPayment.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            spinner_service_1.SpinnerService,
            ngx_toastr_1.ToastrService,
            http_1.Http,
            subscription_service_1.SubscriptionUserService,
            router_1.Router])
    ], UserPaymentComponent);
    return UserPaymentComponent;
}());
exports.UserPaymentComponent = UserPaymentComponent;
//# sourceMappingURL=userPayment.component.js.map