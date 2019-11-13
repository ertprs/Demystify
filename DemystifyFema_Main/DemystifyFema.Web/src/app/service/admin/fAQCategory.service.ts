import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { FAQCategory, GetFAQCategoryRequest } from '../../model/fAQCategory';

@Injectable()
export class FAQCategoryAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getFAQCategory(getFAQCategoryRequest: GetFAQCategoryRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('FAQCategoryId', (getFAQCategoryRequest.FAQCategoryId != null) ? getFAQCategoryRequest.FAQCategoryId.toString() : null);
        //search.set('SearchText', getFAQCategoryRequest.SearchText);
        //search.set('IsActive', (getFAQCategoryRequest.IsActive != null) ? getFAQCategoryRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getFAQCategoryRequest.PageNumber != null) ? getFAQCategoryRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getFAQCategoryRequest.PageSize != null) ? getFAQCategoryRequest.PageSize.toString() : null);
        //search.set('OrderBy', getFAQCategoryRequest.OrderBy);
        //search.set('OrderByDirection', getFAQCategoryRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/faqcategories", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            FAQCategoryId: (getFAQCategoryRequest.FAQCategoryId != null) ? getFAQCategoryRequest.FAQCategoryId.toString() : null,
            SearchText: getFAQCategoryRequest.SearchText,
            IsActive: (getFAQCategoryRequest.IsActive != null) ? getFAQCategoryRequest.IsActive.toString() : null,
            PageNumber: (getFAQCategoryRequest.PageNumber != null) ? getFAQCategoryRequest.PageNumber.toString() : null,
            PageSize: (getFAQCategoryRequest.PageSize != null) ? getFAQCategoryRequest.PageSize.toString() : null,
            OrderBy: getFAQCategoryRequest.OrderBy,
            OrderByDirection: getFAQCategoryRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/faqcategories", { params: params });
    }

    addFAQCategory(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/faqcategories/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/faqcategories/add", body, { headers: headers });
    }

    updateFAQCategory(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/faqcategories/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/faqcategories/update", body, { headers: headers });
    }

    deleteFAQCategory(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/faqcategories/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/faqcategories/delete", body, { headers: headers });
    }
}