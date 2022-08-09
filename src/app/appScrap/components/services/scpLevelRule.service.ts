import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ScpAuditStateTypeEntity } from '../../entities/scpAuditStateType.entity';
import { ScpAuditLevelRuleEntity } from '../../entities/scpAuditLevelRule.entity';


@Injectable({
    providedIn:'root'
})
export class ScpLevelRuleService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(userId:number, ScpAuditLevelRule:ScpAuditLevelRuleEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'ScpAuditLevelRule/create/'+userId,JSON.stringify(ScpAuditLevelRule),{headers:headers});
    }
    public update(levelRuleId:number, ScpAuditLevelRule:ScpAuditLevelRuleEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'ScpAuditLevelRule/update/'+levelRuleId,JSON.stringify(ScpAuditLevelRule),{headers:headers});
    }
    public delete(levelRuleId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'ScpAuditLevelRule/delete/'+levelRuleId,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScpAuditLevelRule/list',{headers:headers});
    }
    public findById(levelRuleId:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'ScpAuditLevelRule/findById/'+levelRuleId);
    }
    
}
