import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ScpAuditPreviousEntity } from '../../entities/scpAuditPrevious.entity';


@Injectable({
    providedIn:'root'
})
export class ScpAuditPreviousService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(userId:number, ScpAuditPrevious:ScpAuditPreviousEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'scpAuditPrevious/create/'+userId,JSON.stringify(ScpAuditPrevious),{headers:headers});
    }
    public update(auditPreviousId:number, ScpAuditPrevious:ScpAuditPreviousEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'scpAuditPrevious/update/'+auditPreviousId,JSON.stringify(ScpAuditPrevious),{headers:headers});
    }
    public delete(auditPreviousId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'scpAuditPrevious/delete/'+auditPreviousId,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'scpAuditPrevious/list',{headers:headers});
    }
    public listForSerials():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'scpAuditPrevious/listForSerials',{headers:headers});
    }
    public listAudit():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'scpAuditPrevious/listAudit',{headers:headers});
    }
    public findById(auditPreviousId:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'scpAuditPrevious/findById/'+auditPreviousId);
    }
    public close(auditPreviousId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'scpAuditPrevious/close/'+auditPreviousId,{headers:headers});
    }
    
}
