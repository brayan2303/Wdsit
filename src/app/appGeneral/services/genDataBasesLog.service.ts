import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ConnectionGeneralLogModel } from '../models/GenDataBases.model';


@Injectable({
    providedIn: 'root'
})
export class ConnectionGeneralLogService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(userId: number, observation: string, customer:string, url:string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new ConnectionGeneralLogModel();
        body.userId = userId;
        body.observation = observation;
        body.customer = customer;
        body.url = url;
        return this.http.post<ResponseModel>(this.url + 'ConnectionGeneralLogS/create', JSON.stringify(body), { headers: headers });
    }
}