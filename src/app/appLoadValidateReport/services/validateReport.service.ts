import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";
import { Injectable } from '@angular/core';
import { ValidateReportEntity } from "../entities/validateReportEntity";
@Injectable({
    providedIn: 'root'
})

export class ValidateReportService {
    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }

    public create(idCountry: number, modelCode: string, modelDescription: string, dxTytpe: string, serialEquipo: string, address: string, region: string, city: string, department: string, userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new ValidateReportEntity();
        body.idCountry = idCountry;
        body.modelCode = modelCode;
        body.modelDescription = modelDescription;
        body.dxType = dxTytpe;
        body.serialEquipo = serialEquipo;
        body.address = address;
        body.region = region;
        body.city = city;
        body.department = department;
        body.userId = userId;
        return this.http.post<ResponseModel>(this.url + 'LoadValidateReport/create', JSON.stringify(body), { headers: headers });
    }
    public listColumns(countryId: number): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'LoadValidateReport/listColumns/' + countryId);
    }
    public ListCountry(userId: number): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'LoadValidateReport/ListCountry/' + userId);
    }
    public updateColumn(idCountry: number, modelCode: string, modelDescription: string, dxTytpe: string, serialEquipo: string, address: string, region: string, city: string, department: string, userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new ValidateReportEntity();
        body.idCountry = idCountry;
        body.modelCode = modelCode;
        body.modelDescription = modelDescription;
        body.dxType = dxTytpe;
        body.serialEquipo = serialEquipo;
        body.address = address;
        body.region = region;
        body.city = city;
        body.department = department;
        body.userId = userId;
        return this.http.put<ResponseModel>(this.url + 'LoadValidateReport/update/',JSON.stringify(body),{ headers: headers });
    }
}