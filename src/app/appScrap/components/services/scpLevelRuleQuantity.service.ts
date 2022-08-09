import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ScpAuditLevelRuleQuantityEntity } from '../../entities/scpAuditLevelRuleQuantity.entity';


@Injectable({
    providedIn:'root'
})
export class ScpLevelRuleQuantityService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(userId:number, ScpAuditLevelRuleQuantity:ScpAuditLevelRuleQuantityEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'ScpAuditLevelRuleQuantity/create/'+userId,JSON.stringify(ScpAuditLevelRuleQuantity),{headers:headers});
    }
    public update(levelRuleId:number, ScpAuditLevelRuleQuantity:ScpAuditLevelRuleQuantityEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'ScpAuditLevelRuleQuantity/update/'+levelRuleId,JSON.stringify(ScpAuditLevelRuleQuantity),{headers:headers});
    }
    public delete(levelRuleQuantityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.delete<ResponseModel>(this.url+'ScpAuditLevelRuleQuantity/delete/'+levelRuleQuantityId,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScpAuditLevelRuleQuantity/list',{headers:headers});
    }
    public findById(levelRuleQuantityId:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'ScpAuditLevelRuleQuantity/findById/'+levelRuleQuantityId);
    }
    
}
