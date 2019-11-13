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
var package_1 = require("../../../model/package");
var subscriptionPackage_1 = require("../../../model/subscriptionPackage");
var subscription_1 = require("../../../model/subscription");
var subscription_service_1 = require("../../../service/user/subscription.service");
var package_service_1 = require("../../../service/user/package.service");
var http_1 = require("@angular/http");
var SubscriptionUserComponent = /** @class */ (function () {
    function SubscriptionUserComponent(formBuilder, spinnerService, toastr, router, _subscriptionService, _http, _packageService) {
        this.formBuilder = formBuilder;
        this.spinnerService = spinnerService;
        this.toastr = toastr;
        this.router = router;
        this._subscriptionService = _subscriptionService;
        this._http = _http;
        this._packageService = _packageService;
        this.packages = [];
        this.isSubmited = false;
        this.moduleTab = 'features';
        this.isSubscriptionRequested = false;
        this.isSubscribedUser = false;
        this.isVisible = false;
        this._global = new global_1.Global();
        this.paytm = {
            "MID": "gNgGqX79582965764461",
            "WEBSITE": 'DEFAULT',
            "INDUSTRY_TYPE_ID": "Retail",
            "CHANNEL_ID": "WEB",
            "ORDER_ID": 'ord' + Math.floor(Math.random() * (100000000 - 1) + 1),
            "CUST_ID": "24",
            "MOBILE_NO": "8108404389",
            "EMAIL": "test12@gmail.com",
            "TXN_AMOUNT": "5000",
            "CALLBACK_URL": "http://localhost:4200/home",
        };
        this.t_amount = 0;
    }
    SubscriptionUserComponent.prototype.ngOnInit = function () {
        this.frmSubscription = this.formBuilder.group({
            PackageId: ['', forms_1.Validators.required],
            PackageName: ['', ''],
            PackageAmount: ['', ''],
            PackageDetail: ['', ''],
            MID: ['', ''],
            WEBSITE: ['', ''],
            INDUSTRY_TYPE_ID: ['', ''],
            CHANNEL_ID: ['', ''],
            ORDER_ID: ['', ''],
            CUST_ID: ['', ''],
            MOBILE_NO: ['', ''],
            EMAIL: ['', ''],
            CALLBACK_URL: ['', ''],
            MERCHANT_KEY: ['', '']
        });
        this.CheckIsSubscribed();
        this.isVisible = false;
        this.getPaytmPaymentDetails();
    };
    SubscriptionUserComponent.prototype.CheckIsSubscribed = function () {
        var _this = this;
        this.isSubscribedUser = false;
        this.isSubscriptionRequested = false;
        var getSubscriptionRequest = new subscription_1.GetSubscriptionRequest();
        getSubscriptionRequest.UserId = parseInt(this._global.getCookie(global_1.Global.USER_ID));
        this._subscriptionService.getSubscription(getSubscriptionRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Response.length > 0 && data.Response[0].IsExpired == false && data.Response[0].IsActive == true) {
                if (data.Response[0].StartDate)
                    _this.isSubscribedUser = true;
                else
                    _this.isSubscriptionRequested = true;
            }
            else {
                _this.GetPackage();
            }
        }, function (error) { return _this.msg = error; });
    };
    SubscriptionUserComponent.prototype.GetPackage = function () {
        var _this = this;
        this.spinnerService.show();
        var getPackageRequest = new package_1.GetPackageRequest();
        this._packageService.getPackage(getPackageRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            _this.packages = [];
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.packages.push({ Value: "", Text: "--Select--" });
                data.Response.forEach(function (item) {
                    _this.packages.push({ Value: item.PackageId, Text: item.PackageName });
                });
                _this.frmSubscription.get("PackageId").setValue(_this.packages[0].Value);
                _this.frmSubscription.get("PackageId").updateValueAndValidity();
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_SUBSCRIPTION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_SUBSCRIPTION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SubscriptionUserComponent.prototype.SaveSubscription = function (formData) {
        /********************* Store in database **********************/
        var _this = this;
        this.spinnerService.show();
        this._subscriptionService.addSubscription(formData.value)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.isSubmited = false;
                _this.frmSubscription.reset();
                _this.CheckIsSubscribed();
                _this.toastr.success(data.Description, global_1.Global.TOASTR_SUBSCRIPTION_TITLE, { closeButton: true });
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_SUBSCRIPTION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_SUBSCRIPTION_TITLE, { enableHtml: true, closeButton: true });
        });
        /******************* Paytm Payment Process *******************/
        //this.spinnerService.show();
        //this._subscriptionService.paytmPaymentProcess(formData.value)
        //    .subscribe(data => {
        //        if (data != null) {
        //            //this.router.navigate(['/user/secure/userPayment'], { queryParams: { MID: data.Response.MID, WEBSITE: data.Response.WEBSITE, INDUSTRY_TYPE_ID: data.Response.INDUSTRY_TYPE_ID, CHANNEL_ID: data.Response.CHANNEL_ID, ORDER_ID: data.Response.ORDER_ID, CUST_ID: data.Response.CUST_ID, MOBILE_NO: data.Response.MOBILE_NO, EMAIL: data.Response.EMAIL, TXN_AMOUNT: data.Response.TXN_AMOUNT, CALLBACK_URL: data.Response.CALLBACK_URL, CHECKSUMHASH: data.Response.CHECKSUMHASH } });
        //            this.router.navigate(['/user/secure/userPayment'], { queryParams: { htmldata: data.Response } });
        //        }
        //    },
        //        error => {
        //            this.spinnerService.hide();
        //            this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_SUBSCRIPTION_TITLE, { enableHtml: true, closeButton: true });
        //        });
    };
    SubscriptionUserComponent.prototype.OnSubmitSupportTicket = function (formData) {
        this.isSubmited = true;
        if (this.frmSubscription.valid) {
            this.SaveSubscription(formData);
        }
    };
    SubscriptionUserComponent.prototype.OnClickModuleTab = function (moduleTab) {
        this.moduleTab = moduleTab;
    };
    SubscriptionUserComponent.prototype.searchWithCode = function (event) {
        this.SelectedPackageId = event.target.value;
        if (this.SelectedPackageId != null && this.SelectedPackageId > 0)
            this.getSubscriptionPackageInformation(this.SelectedPackageId);
        else
            this.isVisible = false;
    };
    SubscriptionUserComponent.prototype.getSubscriptionPackageInformation = function (SelectedPackageId) {
        var _this = this;
        this.spinnerService.show();
        var getPackageRequest = new subscriptionPackage_1.GetSubscriptionPackageRequest();
        getPackageRequest.PackageId = SelectedPackageId;
        this._subscriptionService.getSubscriptionPackageInfo(getPackageRequest)
            .subscribe(function (data) {
            _this.spinnerService.hide();
            if (data.Status == global_1.Global.API_SUCCESS) {
                _this.isVisible = true;
                // For Display Values //
                _this.PackageName = data.Response[0].PackageName;
                _this.PackageAmount = data.Response[0].PackageAmount;
                _this.PackageDetail = data.Response[0].PackageDetail;
                // Store In Hidden Fields Values //
                _this.frmSubscription.get("PackageName").setValue(data.Response[0].PackageName);
                _this.frmSubscription.get("PackageAmount").setValue(data.Response[0].PackageAmount);
                _this.frmSubscription.get("PackageDetail").setValue(data.Response[0].PackageDetail);
            }
            else {
                _this.toastr.error(data.Description, global_1.Global.TOASTR_SUBSCRIPTION_TITLE, { closeButton: true });
            }
        }, function (error) {
            _this.spinnerService.hide();
            _this.isVisible = false;
            _this.toastr.error(global_1.Global.ERROR_MESSAGE, global_1.Global.TOASTR_SUBSCRIPTION_TITLE, { enableHtml: true, closeButton: true });
        });
    };
    SubscriptionUserComponent.prototype.getPaytmPaymentDetails = function () {
        this.frmSubscription.get("MID").setValue("gNgGqX79582965764461");
        this.frmSubscription.get("WEBSITE").setValue("WEBSTAGING");
        this.frmSubscription.get("CHANNEL_ID").setValue('WEB');
        this.frmSubscription.get("INDUSTRY_TYPE_ID").setValue("Retail");
        this.frmSubscription.get("MERCHANT_KEY").setValue("XkLE%!5Y1ihx0pbt");
        this.frmSubscription.get("ORDER_ID").setValue("ORDER_001");
        this.frmSubscription.get("CUST_ID").setValue("CUST_002");
        this.frmSubscription.get("MOBILE_NO").setValue("6354802250");
        this.frmSubscription.get("EMAIL").setValue("jayeshp4gvm@gmail.com");
        this.frmSubscription.get("CALLBACK_URL").setValue("http://localhost:4200/user/secure/PaytmCallback");
    };
    SubscriptionUserComponent.prototype.gotopaytm = function (formData) {
        var _this = this;
        this.paytm.TXN_AMOUNT = formData.controls.PackageId.value;
        console.log(this.t_amount);
        debugger;
        this._subscriptionService.gotopaytm(this.paytm).subscribe(function (data) {
            if (data) {
                data = JSON.parse(data);
                debugger;
                _this.paytm['CHECKSUMHASH'] = data.Response;
                _this.createPaytmForm();
            }
        });
    };
    SubscriptionUserComponent.prototype.createPaytmForm = function () {
        debugger;
        var my_form = document.createElement('form');
        my_form.name = 'paytm_form';
        my_form.method = 'post';
        my_form.action = 'https://securegw-stage.paytm.in/order/process';
        //my_form.action ='https://securegw.paytm.in/order/process';
        var myParams = Object.keys(this.paytm);
        for (var i = 0; i < myParams.length; i++) {
            var key = myParams[i];
            var my_tb = document.createElement('input');
            my_tb.type = 'hidden';
            my_tb.name = key;
            var val = this.paytm[key];
            my_tb.value = val;
            my_form.appendChild(my_tb);
        }
        ;
        document.body.appendChild(my_form);
        my_form.submit();
    };
    SubscriptionUserComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './subscription.component.html',
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            spinner_service_1.SpinnerService,
            ngx_toastr_1.ToastrService,
            router_1.Router,
            subscription_service_1.SubscriptionUserService,
            http_1.Http,
            package_service_1.PackageUserService])
    ], SubscriptionUserComponent);
    return SubscriptionUserComponent;
}());
exports.SubscriptionUserComponent = SubscriptionUserComponent;
//# sourceMappingURL=subscription.component.js.map