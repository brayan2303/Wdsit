import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ScpAuditEntity } from '../../entities/scpAudit.entity';


@Injectable({
    providedIn:'root'
})
export class ScpAuditService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(userId:number, ScpAudit:ScpAuditEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'scpAudit/create/'+userId,JSON.stringify(ScpAudit),{headers:headers});
    }
    public update(auditId:number, ScpAudit:ScpAuditEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'scpAudit/update/'+auditId,JSON.stringify(ScpAudit),{headers:headers});
    }
    public delete(auditId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'scpAudit/delete/'+auditId,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'scpAudit/list',{headers:headers});
    }
    public listForPallet():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'scpAudit/listForPallet',{headers:headers});
    }
    public listForCrossing():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'scpAudit/listForCrossing',{headers:headers});
    }
    public findById(auditId:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'scpAudit/findById/'+auditId);
    }
    public close(auditId:number,quantity:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'scpAudit/close/'+auditId+'/'+quantity,{headers:headers});
    }
    public searchByPalletNumber(pallet:string, cliente:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'scpAudit/search/pallet/'+pallet+'/'+cliente,{headers:headers});
    }
    public updateClose(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'scpAudit/updateClose/'+id,JSON.stringify(id),{headers:headers});
    }
    public updateAuditApproved(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'scpAudit/updateAuditApproved/'+id,JSON.stringify(id),{headers:headers});
    }
    public updateAuditRejected(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'scpAudit/updateAuditRejected/'+id,JSON.stringify(id),{headers:headers});
    }
}
