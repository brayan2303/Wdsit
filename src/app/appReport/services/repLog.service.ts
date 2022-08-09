import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { RepLogEntity } from '../entities/repLog.entity';

@Injectable({
    providedIn:'root'
})
export class RepLogService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(reportId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var repLogEntity=new RepLogEntity();
        repLogEntity.reportId=reportId;
        repLogEntity.personId=personId;

        return this.http.post<ResponseModel>(this.url+'repLog/create',JSON.stringify(repLogEntity),{ headers: headers });
    }
    public downloadDay():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'repLog/downloadDay',{headers:headers});
    }
    public downloadReport():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'repLog/downloadReport',{headers:headers});
    }
}