import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { RBIDataDetail, GetRBIDataDetailRequest } from '../../model/rBIDataDetail';

@Injectable()
export class RBIDataDetailAdminService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getRBIDataDetail(getRBIDataDetailRequest: GetRBIDataDetailRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let search = new URLSearchParams();
        //search.set('RBIDataDetailId', (getRBIDataDetailRequest.RBIDataDetailId != null) ? getRBIDataDetailRequest.RBIDataDetailId.toString() : null);
        //search.set('RBIDataId', (getRBIDataDetailRequest.RBIDataId != null) ? getRBIDataDetailRequest.RBIDataId.toString() : null);
        //search.set('Year', (getRBIDataDetailRequest.Year != null) ? getRBIDataDetailRequest.Year.toString() : null);
        //search.set('Month', (getRBIDataDetailRequest.Month != null) ? getRBIDataDetailRequest.Month.toString() : null);
        //search.set('SearchText', getRBIDataDetailRequest.SearchText);
        //search.set('IsActive', (getRBIDataDetailRequest.IsActive != null) ? getRBIDataDetailRequest.IsActive.toString() : null);
        //search.set('PageNumber', (getRBIDataDetailRequest.PageNumber != null) ? getRBIDataDetailRequest.PageNumber.toString() : null);
        //search.set('PageSize', (getRBIDataDetailRequest.PageSize != null) ? getRBIDataDetailRequest.PageSize.toString() : null);
        //search.set('OrderBy', getRBIDataDetailRequest.OrderBy);
        //search.set('OrderByDirection', getRBIDataDetailRequest.OrderByDirection);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "admin/api/rbidatadetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            RBIDataDetailId: (getRBIDataDetailRequest.RBIDataDetailId != null) ? getRBIDataDetailRequest.RBIDataDetailId.toString() : null,
            RBIDataId: (getRBIDataDetailRequest.RBIDataId != null) ? getRBIDataDetailRequest.RBIDataId.toString() : null,
            Year: (getRBIDataDetailRequest.Year != null) ? getRBIDataDetailRequest.Year.toString() : null,
            Month: (getRBIDataDetailRequest.Month != null) ? getRBIDataDetailRequest.Month.toString() : null,
            SearchText: getRBIDataDetailRequest.SearchText,
            IsActive: (getRBIDataDetailRequest.IsActive != null) ? getRBIDataDetailRequest.IsActive.toString() : null,
            PageNumber: (getRBIDataDetailRequest.PageNumber != null) ? getRBIDataDetailRequest.PageNumber.toString() : null,
            PageSize: (getRBIDataDetailRequest.PageSize != null) ? getRBIDataDetailRequest.PageSize.toString() : null,
            OrderBy: getRBIDataDetailRequest.OrderBy,
            OrderByDirection: getRBIDataDetailRequest.OrderByDirection
        });

        return this._httpClient.get(Global.API_SITE + "admin/api/rbidatadetails",{ params: params });
    }

    addRBIDataDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rbidatadetails/add", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rbidatadetails/add",body, { headers: headers });
    }

    updateRBIDataDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rbidatadetails/update", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rbidatadetails/update",body, { headers: headers });
    }

    deleteRBIDataDetail(model: any): Observable<any> {
        //let body = JSON.stringify(model);
        //let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this._global.getToken() });
        //let options = new RequestOptions({ headers: headers });
        //return this._http.post(Global.API_SITE + "admin/api/rbidatadetails/delete", body, options)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post(Global.API_SITE + "admin/api/rbidatadetails/delete",body, { headers: headers });
    }

    getRBIDataDetailYear(): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.get(Global.API_SITE + "admin/api/rbidatadetailyears", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.get(Global.API_SITE + "admin/api/rbidatadetailyears");
    }

    getRBIDataDetailMonth(): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getToken() });

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.get(Global.API_SITE + "admin/api/rbidatadetailmonths", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.get(Global.API_SITE + "admin/api/rbidatadetailmonths");
    }

    excelFileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/rbidatadetails/uploadexcelfiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/rbidatadetails/uploadexcelfiles", formData);
    }

    pdfFileUpload(formData: any): Observable<any> {
        //let headers = new Headers();
        //headers.append('Authorization', this._global.getToken());

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;

        //return this._http.post(Global.API_SITE + "admin/api/rbidatadetails/uploadpdffiles", formData, requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        return this._httpClient.post(Global.API_SITE + "admin/api/rbidatadetails/uploadpdffiles", formData);
    }
}