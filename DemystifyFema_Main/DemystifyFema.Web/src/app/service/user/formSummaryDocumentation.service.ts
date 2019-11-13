import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { FormSummaryDocumentationOfFEMASubModuleDetail, GetFormSummaryDocumentationOfFEMASubModuleDetailRequest } from '../../model/formSummaryDocumentationOfFEMASubModuleDetail';
import { FormSummaryDocumentation, GetFormSummaryDocumentationRequest } from '../../model/formSummaryDocumentation';
import { FormSummaryDocumentationDetail, GetFormSummaryDocumentationDetailRequest } from '../../model/formSummaryDocumentationDetail';

@Injectable()
export class FormSummaryDocumentationUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getFormSummaryDocumentationOfFEMASubModuleDetail(getFormSummaryDocumentationOfFEMASubModuleDetailRequest: GetFormSummaryDocumentationOfFEMASubModuleDetailRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('FEMASubModuleOfModuleId', (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.FEMASubModuleOfModuleId != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.FEMASubModuleOfModuleId.toString() : null);
        //search.set('SubMenuName', (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.SubMenuName != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.SubMenuName.toString() : null);
        //search.set('SearchText', getFormSummaryDocumentationOfFEMASubModuleDetailRequest.SearchText);
        //search.set('IsActive', (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.IsActive != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.PageNumber != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.PageSize != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFormSummaryDocumentationOfFEMASubModuleDetailRequest.OrderBy);
        //search.set('OrderByDirection', getFormSummaryDocumentationOfFEMASubModuleDetailRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/formsummarydocumentationoffemasubmoduledetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FEMASubModuleOfModuleId: (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.FEMASubModuleOfModuleId != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.FEMASubModuleOfModuleId.toString() : null,
            SubMenuName: (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.SubMenuName != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.SubMenuName.toString() : null,
            SearchText: getFormSummaryDocumentationOfFEMASubModuleDetailRequest.SearchText,
            IsActive: (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.IsActive != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.IsActive.toString() : null,
            PageNumber: (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.PageNumber != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.PageNumber.toString() : null,
            PageSize: (getFormSummaryDocumentationOfFEMASubModuleDetailRequest.PageSize != null) ? getFormSummaryDocumentationOfFEMASubModuleDetailRequest.PageSize.toString() : null,
            OrderBy: getFormSummaryDocumentationOfFEMASubModuleDetailRequest.OrderBy,
            OrderByDirection: getFormSummaryDocumentationOfFEMASubModuleDetailRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/formsummarydocumentationoffemasubmoduledetails", { params: params });
    }

    getFormSummaryDocumentation(getFormSummaryDocumentationRequest: GetFormSummaryDocumentationRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('FormSummaryDocumentationId', (getFormSummaryDocumentationRequest.FormSummaryDocumentationId != null) ? getFormSummaryDocumentationRequest.FormSummaryDocumentationId.toString() : null);
        //search.set('SubMenuName', getFormSummaryDocumentationRequest.SubMenuName);
        //search.set('SearchText', getFormSummaryDocumentationRequest.SearchText);
        //search.set('IsActive', (getFormSummaryDocumentationRequest.IsActive != null) ? getFormSummaryDocumentationRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFormSummaryDocumentationRequest.PageNumber != null) ? getFormSummaryDocumentationRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFormSummaryDocumentationRequest.PageSize != null) ? getFormSummaryDocumentationRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFormSummaryDocumentationRequest.OrderBy);
        //search.set('OrderByDirection', getFormSummaryDocumentationRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/formsummarydocumentations", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FormSummaryDocumentationId: (getFormSummaryDocumentationRequest.FormSummaryDocumentationId != null) ? getFormSummaryDocumentationRequest.FormSummaryDocumentationId.toString() : null,
            SubMenuName: getFormSummaryDocumentationRequest.SubMenuName,
            SearchText: getFormSummaryDocumentationRequest.SearchText,
            IsActive: (getFormSummaryDocumentationRequest.IsActive != null) ? getFormSummaryDocumentationRequest.IsActive.toString() : null,
            PageNumber: (getFormSummaryDocumentationRequest.PageNumber != null) ? getFormSummaryDocumentationRequest.PageNumber.toString() : null,
            PageSize: (getFormSummaryDocumentationRequest.PageSize != null) ? getFormSummaryDocumentationRequest.PageSize.toString() : null,
            OrderBy: getFormSummaryDocumentationRequest.OrderBy,
            OrderByDirection: getFormSummaryDocumentationRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/formsummarydocumentations", { params: params });
    }

    getFormSummaryDocumentationDetail(getFormSummaryDocumentationDetailRequest: GetFormSummaryDocumentationDetailRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('FormSummaryDocumentationDetailId', (getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationDetailId != null) ? getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationDetailId.toString() : null);
        //search.set('FormSummaryDocumentationId', (getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationId != null) ? getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationId.toString() : null);
        //search.set('SubMenuName', getFormSummaryDocumentationDetailRequest.SubMenuName);
        //search.set('SearchText', getFormSummaryDocumentationDetailRequest.SearchText);
        //search.set('IsActive', (getFormSummaryDocumentationDetailRequest.IsActive != null) ? getFormSummaryDocumentationDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFormSummaryDocumentationDetailRequest.PageNumber != null) ? getFormSummaryDocumentationDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFormSummaryDocumentationDetailRequest.PageSize != null) ? getFormSummaryDocumentationDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFormSummaryDocumentationDetailRequest.OrderBy);
        //search.set('OrderByDirection', getFormSummaryDocumentationDetailRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/formsummarydocumentationdetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FormSummaryDocumentationDetailId: (getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationDetailId != null) ? getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationDetailId.toString() : null,
            FormSummaryDocumentationId: (getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationId != null) ? getFormSummaryDocumentationDetailRequest.FormSummaryDocumentationId.toString() : null,
            SubMenuName: getFormSummaryDocumentationDetailRequest.SubMenuName,
            SearchText: getFormSummaryDocumentationDetailRequest.SearchText,
            IsActive: (getFormSummaryDocumentationDetailRequest.IsActive != null) ? getFormSummaryDocumentationDetailRequest.IsActive.toString() : null,
            PageNumber: (getFormSummaryDocumentationDetailRequest.PageNumber != null) ? getFormSummaryDocumentationDetailRequest.PageNumber.toString() : null,
            PageSize: (getFormSummaryDocumentationDetailRequest.PageSize != null) ? getFormSummaryDocumentationDetailRequest.PageSize.toString() : null,
            OrderBy: getFormSummaryDocumentationDetailRequest.OrderBy,
            OrderByDirection: getFormSummaryDocumentationDetailRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "user/api/formsummarydocumentationdetails", { params: params });
    }
}