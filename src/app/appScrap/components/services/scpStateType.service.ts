import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ScpAuditStateTypeEntity } from '../../entities/scpAuditStateType.entity';


@Injectable({
    providedIn:'root'
})
export class ScpStateTypeService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(userId:number, ScpAuditStateType:ScpAuditStateTypeEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'scpAuditStateType/create/'+userId,JSON.stringify(ScpAuditStateType),{headers:headers});
    }
    public update(auditStateTypeId:number, ScpAuditStateType:ScpAuditStateTypeEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'scpAuditStateType/update/'+auditStateTypeId,JSON.stringify(ScpAuditStateType),{headers:headers});
    }
    public delete(stateTypeid:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'scpAuditStateType/delete/'+stateTypeid,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'scpAuditStateType/list',{headers:headers});
    }
    public findById(stateTypeid:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'scpAuditStateType/findById/'+stateTypeid);
    }
    
}
