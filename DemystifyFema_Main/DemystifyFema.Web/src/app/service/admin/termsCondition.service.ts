import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';
import { TermsCondition, GetTermsConditionRequest } from 'src/app/model/termsCondition';

@Injectable()
export class TermsConditionAdminService {

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    addTermsCondition(model: any): Observable<any> {
        let body = model;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/termsCondition/add", body, { headers: headers });
    }

    getTermsCondition(getTermConditionRequest: GetTermsConditionRequest): Observable<any> {
        let params: HttpParams = createHttpParams({
            ID: (getTermConditionRequest.ID != null) ? getTermConditionRequest.ID.toString() : null,
            SearchText: getTermConditionRequest.SearchText,
            PageNumber: (getTermConditionRequest.PageNumber != null) ? getTermConditionRequest.PageNumber.toString() : null,
            PageSize: (getTermConditionRequest.PageSize != null) ? getTermConditionRequest.PageSize.toString() : null,
            OrderBy: getTermConditionRequest.OrderBy,
            OrderByDirection: getTermConditionRequest.OrderByDirection
        });
        return this._httpClient.get(Global.API_SITE + "admin/api/getTermsCondition", { params: params });
    }

    getTermsCondition_Guest(): Observable<any> {
        return this._httpClient.get(Global.API_SITE + "guest/api/getTermsCondition_guest");
    }
}