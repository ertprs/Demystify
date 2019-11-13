import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { SubscriptionPackage, GetSubscriptionPackageRequest } from '../../model/subscriptionPackage';

@Injectable()
export class SubscriptionPackageAdminService {

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getSubscriptionPackage(getSubscriptionPackageRequest: GetSubscriptionPackageRequest): Observable<any> {
        let params: HttpParams = createHttpParams({
            PackageId: (getSubscriptionPackageRequest.PackageId != null) ? getSubscriptionPackageRequest.PackageId.toString() : null,
            SearchText: getSubscriptionPackageRequest.SearchText,
            IsActive: (getSubscriptionPackageRequest.IsActive != null) ? getSubscriptionPackageRequest.IsActive.toString() : null,
            PageNumber: (getSubscriptionPackageRequest.PageNumber != null) ? getSubscriptionPackageRequest.PageNumber.toString() : null,
            PageSize: (getSubscriptionPackageRequest.PageSize != null) ? getSubscriptionPackageRequest.PageSize.toString() : null,
            OrderBy: getSubscriptionPackageRequest.OrderBy,
            OrderByDirection: getSubscriptionPackageRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/subscriptionPackages", { params: params });
    }

    addSubscriptionPackage(model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/subscriptionPackages/add", body, { headers: headers });
    }

    updateSubscriptionPackage(model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/subscriptionPackages/update", body, { headers: headers });
    }

    deleteSubscriptionPackage(model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/subscriptionPackages/delete", body, { headers: headers });
    }

}