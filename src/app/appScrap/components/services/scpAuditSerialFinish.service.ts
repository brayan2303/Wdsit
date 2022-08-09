import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})
export class ScpAuditSerialFinishService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScpAuditSerialFinishS/list',{headers:headers});
    }
    
    public listAudit():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScpAuditSerialFinishS/listAudit',{headers:headers});
    }
    public listMotif():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScpAuditSerialFinishS/listMotif',{headers:headers});
    }
    public findById(levelRuleQuantityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScpAuditSerialFinishS/findById/'+levelRuleQuantityId,{headers:headers});
    }
    public listLevel(levelId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScpAuditSerialFinishS/listLevel/'+levelId,{headers:headers});
    }
    public listAuditSerial(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScpAuditSerialFinishS/listAuditSerial/'+id,{headers:headers});
    }
    public listCount(levelId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScpAuditSerialFinishS/listCount/'+levelId,{headers:headers});
    }

    public generateReport(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScrapReportS/generateReport/'+id,{headers:headers});
    }
}