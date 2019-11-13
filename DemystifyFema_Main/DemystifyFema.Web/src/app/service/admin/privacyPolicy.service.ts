import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';
import { PrivacyPolicy, GetPrivacyPolicyRequest } from 'src/app/model/privacyPolicy';

@Injectable()
export class PrivacyPolicyAdminService {

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    addPrivacyPolicy(model: any): Observable<any> {
        let body = model;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/privacyPolicy/add", body, { headers: headers });
    }

    updatePrivacyPolicy(model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/privacyPolicy/update", body, { headers: headers });
    }

    getPrivacyPolicy(getPrivacyPolicyRequest: GetPrivacyPolicyRequest): Observable<any> {
        let params: HttpParams = createHttpParams({
            ID: (getPrivacyPolicyRequest.ID != null) ? getPrivacyPolicyRequest.ID.toString() : null,
            SearchText: getPrivacyPolicyRequest.SearchText,
            PageNumber: (getPrivacyPolicyRequest.PageNumber != null) ? getPrivacyPolicyRequest.PageNumber.toString() : null,
            PageSize: (getPrivacyPolicyRequest.PageSize != null) ? getPrivacyPolicyRequest.PageSize.toString() : null,
            OrderBy: getPrivacyPolicyRequest.OrderBy,
            OrderByDirection: getPrivacyPolicyRequest.OrderByDirection
        });
        return this._httpClient.get(Global.API_SITE + "admin/api/getPrivacyPolicy", { params: params });
    }

    getPrivacyPolicy_Guest(): Observable<any> {
        return this._httpClient.get(Global.API_SITE + "guest/api/getPrivacyPolicy_guest");
    }
}