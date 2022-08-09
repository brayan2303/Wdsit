import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ScpAuditSerialEntity } from '../../entities/scpAuditSerial.entity';



@Injectable({
    providedIn:'root'
})
export class ScpAuditSerialService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(palletId:number, serial:string, mac:string, sapCode:string, description:string, technical:string,repairDate:string,scrapMotif:string,state:string,stateMotif:string,userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new ScpAuditSerialEntity()
        body.palletId = palletId;
        body.serial = serial;
        body.mac = mac;
        body.sapCode = sapCode;
        body.description = description;
        body.technical = technical;
        body.repairDate = repairDate;
        body.scrapMotif = scrapMotif;
        body.state = state;
        body.stateMotif = stateMotif;
        body.userId = userId;
        return this.http.post<ResponseModel>(this.url+'ScpAuditSerialS/create',JSON.stringify(body),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'ScpAuditSerialS/delete/'+id,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScpAuditSerialS/list',{headers:headers});
    }
    
    public listAudit():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScpAuditSerialS/listAudit',{headers:headers});
    }
    public listMotif():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScpAuditSerialS/listMotif',{headers:headers});
    }
    public findById(levelRuleQuantityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScpAuditSerialS/findById/'+levelRuleQuantityId,{headers:headers});
    }
    public listSearch(serial:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScpAuditSerialS/listSearch/'+serial,{headers:headers});
    }
    public listLevel(levelId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScpAuditSerialS/listLevel/'+levelId,{headers:headers});
    }
    public listAuditSerial(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScpAuditSerialS/listAuditSerial/'+id,{headers:headers});
    }
    public loadFile(id:number,serial:string, files:File[]):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url+'ScpAuditSerialS/loadFile/'+id+'/'+serial,formData);
    }
    public updateClose(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'ScpAuditSerialS/updateClose/'+id,JSON.stringify(id),{headers:headers});
    }

}