import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { RepFlagLogEntity } from '../entities/repFlagLog.entity';



@Injectable({
    providedIn: 'root'
})
export class RepFlagLogService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
        //this.url=environment.apiIq09;
    }
    public create(reportId: number, userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new RepFlagLogEntity;
        body.reportId = reportId;
        body.userId = userId;

        return this.http.post<ResponseModel>(this.url + 'RepFlagLogS/create', JSON.stringify(body), { headers: headers });
    }
    public update(reportId: number, userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new RepFlagLogEntity;
        body.reportId = reportId;
        body.userId = userId;

        return this.http.put<ResponseModel>(this.url + 'RepFlagLogS/update', JSON.stringify(body), { headers: headers });
    }

    public listValidation(reportId: number, userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'RepFlagLogS/listValidation/' + reportId + '/' + userId, { headers: headers });
    }

    public listValidationTime(reportId: number, userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'RepFlagLogS/listValidationTime/' + reportId + '/' + userId, { headers: headers });
    }
}