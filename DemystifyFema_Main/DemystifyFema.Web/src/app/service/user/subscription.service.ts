import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { GetSubscriptionRequest } from '../../model/subscription';
import { GetSubscriptionPackageRequest } from '../../model/subscriptionPackage';

@Injectable()
export class SubscriptionUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getSubscription(getSubscriptionRequest: GetSubscriptionRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('UserId', (getSubscriptionRequest.UserId != null) ? getSubscriptionRequest.UserId.toString() : null);
        //search.set('SubscriptionId', (getSubscriptionRequest.SubscriptionId != null) ? getSubscriptionRequest.SubscriptionId.toString() : null);
        //search.set('SearchText', getSubscriptionRequest.SearchText);
        //search.set('IsActive', (getSubscriptionRequest.IsActive != null) ? getSubscriptionRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getSubscriptionRequest.PageNumber != null) ? getSubscriptionRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getSubscriptionRequest.PageSize != null) ? getSubscriptionRequest.PageSize.toString() : null);
        //search.set('OrderBy', getSubscriptionRequest.OrderBy);
        //search.set('OrderByDirection', getSubscriptionRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/subscriptions", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            UserId: (getSubscriptionRequest.UserId != null) ? getSubscriptionRequest.UserId.toString() : null,
            SubscriptionId: (getSubscriptionRequest.SubscriptionId != null) ? getSubscriptionRequest.SubscriptionId.toString() : null,
            SearchText: getSubscriptionRequest.SearchText,
            IsActive: (getSubscriptionRequest.IsActive != null) ? getSubscriptionRequest.IsActive.toString() : null,
            PageNumber: (getSubscriptionRequest.PageNumber != null) ? getSubscriptionRequest.PageNumber.toString() : null,
            PageSize: (getSubscriptionRequest.PageSize != null) ? getSubscriptionRequest.PageSize.toString() : null,
            OrderBy: getSubscriptionRequest.OrderBy,
            OrderByDirection: getSubscriptionRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/subscriptions", { params: params });
    }

    addSubscription(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getUserToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "user/api/subscriptions/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "user/api/subscriptions/add", body, { headers: headers });
    }

    userLegalAgreement(model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "user/api/userlegalagreement", body, { headers: headers });
    }

    getSubscriptionPackageInfo(getPackageRequest: GetSubscriptionPackageRequest): Observable<any> {
        let params: HttpParams = createHttpParams({
            PackageId: (getPackageRequest.PackageId != null) ? getPackageRequest.PackageId.toString() : null
        });

        return this._httpClient.get(Global.API_SITE + "user/api/SubscriptionpackagesInfo", { params: params });
    }

    paytmPaymentProcess(model: any): Observable<any> {

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "user/api/subscriptions/paytmPayment", body, { headers: headers });
    }

    paytm(model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(body, { headers: headers});
    }
    gotopaytm(req): Observable<any> {
        if (req) {
            let data = this._httpClient.post("http://127.0.0.1:3000/", req, { responseType: 'text' });
            return data;
        }
    }
    getPaytmOrderStatus(req): Observable<any> {
        if (req) {
            let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            let data = this._httpClient.post("http://localhost:51159/common/api/paytmorderstatus", req, { headers: headers});
            return data;
        }
    }
}