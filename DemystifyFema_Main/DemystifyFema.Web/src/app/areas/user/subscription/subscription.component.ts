import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from '../../../service/common/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { Global } from '../../../common/global';
import { DropDown } from '../../../common/dropDown';
import { GetPackageRequest, Package } from '../../../model/package';
import { GetSubscriptionPackageRequest } from '../../../model/subscriptionPackage';

import { GetSubscriptionRequest } from '../../../model/subscription';
import { SubscriptionUserService } from '../../../service/user/subscription.service';
import { PackageUserService } from '../../../service/user/package.service';
import { Window } from 'selenium-webdriver';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserProfile, GetUserProfileRequest } from '../../../model/userProfile';
import { UserProfileUserService } from '../../../service/user/userProfile.service';

@Component({
    selector: 'my-app',
    templateUrl: './subscription.component.html',
})

export class SubscriptionUserComponent implements OnInit {

    packages: DropDown[] = [];

    frmSubscription: FormGroup;

    isSubmited: boolean = false;
    moduleTab: string = 'features';
    msg: string;
    isSubscriptionRequested: boolean = false;
    isSubscribedUser: boolean = false;
    SelectedPackageId: number;
    PackageName: string;
    PackageAmount: number;
    PackageDetail: string;
    isVisible: boolean = false;
    amount: string;
    txnStatus: string;
    userSelectedPackageId: number;
    subscriptionrequest = new SubscriptionRequest();
    _global: Global = new Global();

    ngOnInit(): void {
        this.frmSubscription = this.formBuilder.group({
            PackageId: ['', Validators.required],
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
    }

    constructor(private formBuilder: FormBuilder,
        private spinnerService: SpinnerService,
        private toastr: ToastrService,
        private router: Router,
        private _subscriptionService: SubscriptionUserService,
        private _http: Http,
        private  newroute: ActivatedRoute,
        private _packageService: PackageUserService,
        private _userProfileService: UserProfileUserService)
        {
            const orderid = this.newroute.queryParams['_value'].orderid ? this.newroute.queryParams['_value'].orderid : '';
        const txnStatus = this.newroute.queryParams['_value'].txnStatus ? this.newroute.queryParams['_value'].txnStatus : '';
        if (orderid && txnStatus === "TXN_SUCCESS") {
                this.SaveSubscription(orderid);
            } else if (txnStatus === 'TXN_FAILURE') {
                this.toastr.error('Paytm Transaction Failed', Global.TOASTR_SUBSCRIPTION_TITLE, { closeButton: true });
            }
        }

    CheckIsSubscribed() {
        this.isSubscribedUser = false;
        this.isSubscriptionRequested = false;

        let getSubscriptionRequest = new GetSubscriptionRequest();
        getSubscriptionRequest.UserId = parseInt(this._global.getCookie(Global.USER_ID));

        this._subscriptionService.getSubscription(getSubscriptionRequest)
            .subscribe(data => {
                this.spinnerService.hide();

                if (data.Response.length > 0 && data.Response[0].IsExpired == false && data.Response[0].IsActive == true) {
                    if (data.Response[0].StartDate)
                        this.isSubscribedUser = true;
                    else
                        this.isSubscriptionRequested = true;
                } else {
                    this.GetPackage();
                }
            }, error => this.msg = <any>error);
    }

    GetPackage() {
        this.spinnerService.show();

        let getPackageRequest = new GetPackageRequest();

        this._packageService.getPackage(getPackageRequest)
            .subscribe(data => {
                this.spinnerService.hide();
                this.packages = [];

                if (data.Status == Global.API_SUCCESS) {
                    this.packages.push({ Value: "", Text: "--Select--" });
                    data.Response.forEach(item => {
                        this.packages.push({ Value: item.PackageId, Text: item.PackageName });
                    });

                    this.frmSubscription.get("PackageId").setValue(this.packages[0].Value);
                    this.frmSubscription.get("PackageId").updateValueAndValidity();
                }
                else {
                    this.toastr.error(data.Description, Global.TOASTR_SUBSCRIPTION_TITLE, { closeButton: true });
                }
            },
                error => {
                    this.spinnerService.hide();
                    this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_SUBSCRIPTION_TITLE, { enableHtml: true, closeButton: true });
                });
    }

    SaveSubscription(orderId) {
        this.spinnerService.show();
        this.paytmOrderStatus.ORDERID = orderId;
        this._subscriptionService.getPaytmOrderStatus(this.paytmOrderStatus).subscribe(orderdata => {
            if (orderdata.Status == Global.API_SUCCESS) {
                
                orderdata.Response = orderdata.Response;
                let getPackageRequest = new GetPackageRequest();

                this._packageService.getPackage(getPackageRequest)
                    .subscribe(data => {
                        if (data.Status == Global.API_SUCCESS) {
                            this.userSelectedPackageId =
                                data.Response.find(x => x.Amount === Math.round(orderdata.Response.TXNAMOUNT)).PackageId;
                
                            orderdata.Response['PACKAGEID'] = this.userSelectedPackageId;
                            this.AddSubscriptionInDB(orderdata.Response);
                        }
                    });
      
            }
        },
            error => {
                this.spinnerService.hide();
                this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_SUBSCRIPTION_TITLE, { enableHtml: true, closeButton: true });
            });
    }

    AddSubscriptionInDB(orderStatusData) {
        /********************* Store in database **********************/

        this.subscriptionrequest.PackageId = orderStatusData.PACKAGEID;

        this._subscriptionService.addSubscription(this.subscriptionrequest)
            .subscribe(data => {
                    this.spinnerService.hide();

                    if (data.Status == Global.API_SUCCESS) {
                        this.isSubmited = false;
                        this.frmSubscription.reset();
                        this.CheckIsSubscribed();

                        this.toastr.success(data.Description, Global.TOASTR_SUBSCRIPTION_TITLE, { closeButton: true });
                    } else {
                        this.toastr.error(data.Description, Global.TOASTR_SUBSCRIPTION_TITLE, { closeButton: true });
                    }
                },
                error => {
                    this.spinnerService.hide();
                    this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_SUBSCRIPTION_TITLE, { enableHtml: true, closeButton: true });
                });
    }

    OnSubmitSupportTicket(formData: any) {
        this.isSubmited = true;
        if (this.frmSubscription.valid) {
            this.subscriptionsave(formData);
        }
    }
    
    OnClickModuleTab(moduleTab) {
        this.moduleTab = moduleTab;
    }

    searchWithCode(event: any): void {

        this.SelectedPackageId = event.target.value;

        if (this.SelectedPackageId != null && this.SelectedPackageId > 0)
            this.getSubscriptionPackageInformation(this.SelectedPackageId)
        else
            this.isVisible = false;
    }

    getSubscriptionPackageInformation(SelectedPackageId) {
        this.spinnerService.show();

        let getPackageRequest = new GetSubscriptionPackageRequest();

        getPackageRequest.PackageId = SelectedPackageId;

        this._subscriptionService.getSubscriptionPackageInfo(getPackageRequest)
            .subscribe(data => {
                this.spinnerService.hide();
                if (data.Status == Global.API_SUCCESS) {
                    this.isVisible = true;

                    // For Display Values //
                    this.PackageName = data.Response[0].PackageName;
                    this.PackageAmount = data.Response[0].PackageAmount;
                    this.PackageDetail = data.Response[0].PackageDetail;

                    // Store In Hidden Fields Values //
                    this.frmSubscription.get("PackageName").setValue(data.Response[0].PackageName);
                    this.frmSubscription.get("PackageAmount").setValue(data.Response[0].PackageAmount);
                    this.frmSubscription.get("PackageDetail").setValue(data.Response[0].PackageDetail);

                }
                else {
                    this.toastr.error(data.Description, Global.TOASTR_SUBSCRIPTION_TITLE, { closeButton: true });
                }
            },
                error => {
                    this.spinnerService.hide();
                    this.isVisible = false;
                    this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_SUBSCRIPTION_TITLE, { enableHtml: true, closeButton: true });
                });
    }

    getPaytmPaymentDetails() {
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
    }
    paytm = {
        "MID":Global.MID,
        "WEBSITE": Global.WEBSITE,
        "INDUSTRY_TYPE_ID" :Global.INDUSTRY_TYPE_ID,
        "CHANNEL_ID" : Global.CHANNEL_ID,
        //"ORDER_ID" : 'ORD' + Math.floor(Math.random() * (100000000-1)+1),
        "CALLBACK_URL": Global.CALLBACK_URL,
    };
    paytmOrderStatus = {
        "ORDERID": ""
    };
    subscriptionsave(formData: any) {
        this.spinnerService.show();
        this.userSelectedPackageId = formData.controls.PackageId.value;

        /********** Get User Profile Details *****************/
        let getUserProfileRequest = new GetUserProfileRequest();

        this._userProfileService.getUserProfile(getUserProfileRequest)
            .subscribe(data => {
                if (data.Status == Global.API_SUCCESS) {
                    this.paytm['ORDER_ID'] = 'ORD' + data.Response[0].UserId.toString()+ '_' + Math.floor(Math.random() * (100000 - 1) + 1);
                    this.paytm['CUST_ID'] = data.Response[0].UserId.toString();
                    this.paytm['MOBILE_NO'] = data.Response[0].Mobile;
                    this.paytm['EMAIL'] = data.Response[0].UserName;
                    this.paytm['TXN_AMOUNT'] = formData.controls.PackageAmount.value.toString();
                        this.gotopaytm();
                    } else {
                        this.toastr.error(data.Description, Global.TOASTR_ADMIN_USER_PROFILE_TITLE, { closeButton: true });
                    }
                },
                error => {
                    this.spinnerService.hide();
                    this.toastr.error(Global.ERROR_MESSAGE, Global.TOASTR_ADMIN_USER_PROFILE_TITLE, { enableHtml: true, closeButton: true });
                });
    }

    gotopaytm() {
        /******************* Paytm Payment Process *******************/
        this._subscriptionService.gotopaytm(this.paytm).subscribe(data => {
            if (data) {
                data = JSON.parse(data);
                this.paytm['CHECKSUMHASH'] = data.checksum;
                this.createPaytmForm();
            }
        });
    }

    createPaytmForm() {
        const my_form: any = document.createElement('form');
         my_form.name = 'paytm_form';
         my_form.method = 'post';
        my_form.action = Global.PaytmOrderProcess_URL;
         const myParams = Object.keys(this.paytm);
         for (let i = 0; i < myParams.length; i++) {
           const key = myParams[i];
           let my_tb: any = document.createElement('input');
           my_tb.type = 'hidden';
           my_tb.name = key;
           const val = this.paytm[key];
           my_tb.value = val;
           my_form.appendChild(my_tb);
         };
        document.body.appendChild(my_form);
        this.spinnerService.hide();
         my_form.submit();
     }
}

export class SubscriptionRequest {
    PackageId: number;
    UserId?: number;
}