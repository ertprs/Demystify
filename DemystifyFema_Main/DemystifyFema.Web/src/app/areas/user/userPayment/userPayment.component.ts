import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SpinnerService } from '../../../service/common/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { Global } from '../../../common/global';
import { Http } from '@angular/http';
import { SubscriptionUserService } from '../../../service/user/subscription.service';

@Component({
    selector: 'my-app',
    templateUrl: './userPayment.component.html'
})

export class UserPaymentComponent implements OnInit, AfterViewInit {

    MID: string;
    WEBSITE: string;
    INDUSTRY_TYPE_ID: string;
    CHANNEL_ID: string;
    ORDER_ID: string;
    CUST_ID: string;
    MOBILE_NO: string;
    EMAIL: string;
    CALLBACK_URL: string;
    MERCHANT_KEY: string;
    TXN_AMOUNT: string;
    CHECKSUMHASH: string;
    URLs: string;

    _global: Global = new Global();

    constructor(private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private spinnerService: SpinnerService,
        private toastr: ToastrService,
        private http: Http,
        private _subscriptionService: SubscriptionUserService,
        private router: Router) { }

    ngOnInit(): void {
        this.spinnerService.hide();

        this.activatedRoute.queryParams.subscribe(params => {
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
            this.MID = params["htmldata"];
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

        var myJSON = obj['MID'];//JSON.stringify(obj);
        
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
    }

    ngAfterViewInit() {
        var myForm = <HTMLFormElement>document.forms['f1'];
        myForm.submit();
    }

}