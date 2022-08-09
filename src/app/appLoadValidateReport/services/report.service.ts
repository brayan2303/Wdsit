import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ReportValidateLoadCountryService {
    private url: string;
    constructor(private http: HttpClient) {
        this.url = environment.api;
    }

    public listCountry(country: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'ReportValidateLoadCountryS/listCountry/'+ country, { headers: headers });
    }
    public listCountryRetry(country: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'ReportValidateLoadCountryS/listCountryRetry/'+ country, { headers: headers });
    
    }
    public wfsm(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'ReportValidateLoadWfsmS/wfsm', { headers: headers });
    
    }
    public createLogOne(country: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url + 'ReportValidateLoadCountryS/createLogOne/' + country, { headers: headers });
    }
    public createLogTwo(country: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url + 'ReportValidateLoadCountryS/createLogTwo/' + country, { headers: headers });
    }
}