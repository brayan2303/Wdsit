import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ScpAuditPreviousEntity } from '../../entities/scpAuditPrevious.entity';
import { ScpAuditPreviousSerialModel } from '../../models/ScpAuditPreviousSerial.model';


@Injectable({
    providedIn:'root'
})
export class ScpAuditPreviousSerialService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(userId:number, ScpAuditPrevious:ScpAuditPreviousSerialModel):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'scpAuditPreviousSerial/create/'+userId,JSON.stringify(ScpAuditPrevious),{headers:headers});
    }
    public createAll(userId:number, auditPreviousId:number, ScpAuditPrevious:ScpAuditPreviousSerialModel[]):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'scpAuditPreviousSerial/createAll/'+userId+'/'+auditPreviousId,JSON.stringify(ScpAuditPrevious),{headers:headers});
    }

    public delete(auditPreviousId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'scpAuditPreviousSerial/delete/'+auditPreviousId,{headers:headers});
    }
    
    public list(auditPreviousId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'scpAuditPreviousSerial/list/'+auditPreviousId,{headers:headers});
    }

    public findBySerial(serial:string,cliente:string):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'scpAuditPreviousSerial/findBySerial/'+serial+'/'+cliente);
    }
    
}
