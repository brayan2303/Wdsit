import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvMasterCodSapEntity } from '../entities/invMasterCodSap.entity';


@Injectable({
    providedIn:'root'
})
export class InvMasterCodSapService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(InvMasterCodSapEntity:InvMasterCodSapEntity, userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'InvMasterCodSapS/create/'+userId,JSON.stringify(InvMasterCodSapEntity),{headers:headers});
    }
    public update(InvMasterCodSapEntity:InvMasterCodSapEntity, userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'InvMasterCodSapS/update/'+userId,JSON.stringify(InvMasterCodSapEntity),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'InvMasterCodSapS/delete/'+id,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'InvMasterCodSapS/list',{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'InvMasterCodSapS/findById/'+id);
    }
}
