import { Injectable } from '@angular/core';
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
//import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Global } from '../../common/global';
import { createHttpParams } from '../../common/http-params';

import { PenaltyDetail, GetPenaltyDetailRequest } from '../../model/penaltyDetail';

@Injectable()
export class PenaltyDetailUserService {

    //constructor(private _http: Http) { }

    constructor(private _httpClient: HttpClient) { }

    _global: Global = new Global();

    getPenaltyDetail(getPenaltyDetailRequest: GetPenaltyDetailRequest): Observable<any> {
        //let headers = new Headers({ 'Authorization': this._global.getUserToken() });

        //let search = new URLSearchParams();
        //search.set('CalculatorID', (getPenaltyDetailRequest.CalculatorID != null) ? getPenaltyDetailRequest.CalculatorID.toString() : null);
        //search.set('CalculatorSubTopicID', (getPenaltyDetailRequest.CalculatorSubTopicID != null) ? getPenaltyDetailRequest.CalculatorSubTopicID.toString() : null);

        //let requestOptions = new RequestOptions();
        //requestOptions.headers = headers;
        //requestOptions.search = search;

        //return this._http.get(Global.API_SITE + "user/api/penaltydetails", requestOptions)
        //    .pipe(map((response: Response) => <any>response.json()), catchError(e => throwError(e)));

        let params: HttpParams = createHttpParams({
            CalculatorID: (getPenaltyDetailRequest.CalculatorID != null) ? getPenaltyDetailRequest.CalculatorID.toString() : null,
            CalculatorSubTopicID: (getPenaltyDetailRequest.CalculatorSubTopicID != null) ? getPenaltyDetailRequest.CalculatorSubTopicID.toString() : null
        });

        return this._httpClient.get(Global.API_SITE + "user/api/penaltydetails", { params: params });
    }

}