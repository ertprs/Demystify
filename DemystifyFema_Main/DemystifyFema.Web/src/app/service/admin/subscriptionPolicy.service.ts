import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';
import { SubscriptionPolicy, GetSubscriptionPolicyRequest } from 'src/app/model/subscriptionPolicy';

@Injectable()
export class SubscriptionPolicyAdminService {

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    addSubscriptionPolicy(model: any): Observable<any> {
        let body = model;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/subscriptionPolicy/add", body, { headers: headers });
    }

    getSubscriptionPolicy(getsubPolicyRequest: GetSubscriptionPolicyRequest): Observable<any> {
        let params: HttpParams = createHttpParams({
            ID: (getsubPolicyRequest.ID != null) ? getsubPolicyRequest.ID.toString() : null,
            SearchText: getsubPolicyRequest.SearchText,
            PageNumber: (getsubPolicyRequest.PageNumber != null) ? getsubPolicyRequest.PageNumber.toString() : null,
            PageSize: (getsubPolicyRequest.PageSize != null) ? getsubPolicyRequest.PageSize.toString() : null,
            OrderBy: getsubPolicyRequest.OrderBy,
            OrderByDirection: getsubPolicyRequest.OrderByDirection
        });
        return this._httpClient.get(Global.API_SITE + "admin/api/getSubscriptionPolicy", { params: params });
    }

    getSubscriptionPolicy_Guest(): Observable<any> {
        return this._httpClient.get(Global.API_SITE + "guest/api/getSubscriptionPolicy_guest");
    }
}