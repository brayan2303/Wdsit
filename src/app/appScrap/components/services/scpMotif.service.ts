import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ScpMotifEntity } from '../../entities/scpMotif.entity';


@Injectable({
    providedIn:'root'
})
export class ScpMotifService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(userId:number, ScpMotif:ScpMotifEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'scpAuditMotif/create/'+userId,JSON.stringify(ScpMotif),{headers:headers});
    }
    public update(auditMotifId:number, ScpMotif:ScpMotifEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'scpAuditMotif/update/'+auditMotifId,JSON.stringify(ScpMotif),{headers:headers});
    }
    public delete(auditMotifId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'scpAuditMotif/delete/'+auditMotifId,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'scpAuditMotif/list',{headers:headers});
    }
    public findById(auditMotifId:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'scpAuditMotif/findById/'+auditMotifId);
    }
    
}
