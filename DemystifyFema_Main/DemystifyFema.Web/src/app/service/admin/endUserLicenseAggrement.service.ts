import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';
import { EULA, GetEULARequest } from 'src/app/model/endUserLicenseAggrement';

@Injectable()
export class EndUserLicenseAggrementAdminService {

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    addEULA(model: any): Observable<any> {
        let body = model;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/eula/add", body, { headers: headers });
    }

    getEULA(getEULARequest: GetEULARequest): Observable<any> {
        let params: HttpParams = createHttpParams({
            ID: (getEULARequest.ID != null) ? getEULARequest.ID.toString() : null,
            SearchText: getEULARequest.SearchText,
            PageNumber: (getEULARequest.PageNumber != null) ? getEULARequest.PageNumber.toString() : null,
            PageSize: (getEULARequest.PageSize != null) ? getEULARequest.PageSize.toString() : null,
            OrderBy: getEULARequest.OrderBy,
            OrderByDirection: getEULARequest.OrderByDirection
        });
        return this._httpClient.get(Global.API_SITE + "admin/api/geteula", { params: params });
    }

    getUser_EndUserLicenseAggrement(getEULARequest: GetEULARequest): Observable<any> {
        let params: HttpParams = createHttpParams({
            ID: (getEULARequest.ID != null) ? getEULARequest.ID.toString() : null,
            SearchText: getEULARequest.SearchText,
            PageNumber: (getEULARequest.PageNumber != null) ? getEULARequest.PageNumber.toString() : null,
            PageSize: (getEULARequest.PageSize != null) ? getEULARequest.PageSize.toString() : null,
            OrderBy: getEULARequest.OrderBy,
            OrderByDirection: getEULARequest.OrderByDirection
        });
        return this._httpClient.get(Global.API_SITE + "user/api/getEndUserLicenseAggrement", { params: params });
    }

    getEULA_Guest(): Observable<any> {
        return this._httpClient.get(Global.API_SITE + "guest/api/geteula_guest");
    }
}