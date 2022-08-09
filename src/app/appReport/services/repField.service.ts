import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { RepFieldEntity } from '../entities/repField.entity';

@Injectable({
    providedIn:'root'
})
export class RepFieldService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(repFieldEntity:RepFieldEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'repField/create',JSON.stringify(repFieldEntity),{ headers: headers });
    }
    public update(repFieldEntity:RepFieldEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'repField/update',JSON.stringify(repFieldEntity),{ headers: headers });
    }
    public delete(fieldId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'repField/delete/'+fieldId,{ headers: headers });
    }
    public findByReportId(reportId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'repField/findByReportId/'+reportId,{ headers: headers });
    }
    public findByReportName(reportName:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'repField/findByReportName/'+reportName,{ headers: headers });
    }
    public list(reportId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'repField/list/'+reportId,{ headers: headers });
    }
}