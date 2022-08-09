import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ScpAuditEntity } from '../../entities/scpAudit.entity';
import { ScpAuditPalletEntity } from '../../entities/scpAuditPallet.entity';


@Injectable({
    providedIn:'root'
})
export class ScpAuditPalletService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(userId:number, ScpAudit:ScpAuditPalletEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'scpAuditPallet/create/'+userId,JSON.stringify(ScpAudit),{headers:headers});
    }

    public createAll(userId:number, auditId:number, ScpAuditPallet:ScpAuditPalletEntity[]):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'scpAuditPallet/createAll/'+userId+'/'+auditId,JSON.stringify(ScpAuditPallet),{headers:headers});
    }
    public delete(auditId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'scpAuditPallet/delete/'+auditId,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'scpAuditPallet/list',{headers:headers});
    }
    public findById(auditId:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'scpAuditPallet/findById/'+auditId);
    }
    public findByAuditId(auditId:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'scpAuditPallet/findByAuditId/'+auditId);
    }
    public searchByPalletNumber(pallet:string, cliente:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'scpAuditPallet/search/pallet/'+pallet+'/'+cliente,{headers:headers});
    }
    public searchSerialsByPalletNumber(pallet:string,customer:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'scpAuditPallet/search/pallet/wms/'+pallet+'/'+customer,{headers:headers});
    }
    
}
