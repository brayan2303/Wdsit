import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";
import { RepFlagLogEntity } from "../entities/repFlagLog.entity";
import { RepReportCountryEntity } from "../entities/repReportCountry.entity";

@Injectable({
    providedIn: 'root'

})
export class RepReportCountryService {
    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }

    public create(countryId: number, reportId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new RepReportCountryEntity;
        body.countryId = countryId;
        body.reportId = reportId;
        return this.http.post<ResponseModel>(this.url + 'RepReportCountryS/create', JSON.stringify(body), { headers: headers });
    }
    public delete(userId: number, groupId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url + 'RepReportCountryS/delete/' + userId + '/' + groupId, { headers: headers });
    }

    public list(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'RepReportCountryS/list', { headers: headers });
    }

    public findAll(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'RepReportCountryS/findAll/' + id, { headers: headers });
    }
    public update(userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new RepFlagLogEntity;
        body.userId = userId;

        return this.http.put<ResponseModel>(this.url + 'RepReportCountryS/update', JSON.stringify(body), { headers: headers });
    }
    public listActive(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'RepReportCountryS/listActive', { headers: headers });
    }

}