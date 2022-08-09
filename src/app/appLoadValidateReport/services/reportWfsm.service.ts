import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ReportValidateLoadWfsmService {
    private url: string;
    constructor(private http: HttpClient) {
        this.url = environment.api;
    }

    public wfsm(dateMax: string, dateMin: string, country: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'ReportValidateLoadWfsmS/wfsm/' + dateMax + '/' + dateMin + '/' + country, { headers: headers });
    }
}