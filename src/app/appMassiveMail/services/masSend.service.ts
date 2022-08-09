import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { MasSendEntity } from "../entities/masSend.entity";

@Injectable({
    providedIn:'root'
})
export class MasSendService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(masSend:MasSendEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'masSend/create',JSON.stringify(masSend),{headers:headers});
    }
    public approval(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'masSend/approval/'+id,{headers:headers});
    }
    public approveReject(id:number,message:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'masSend/approveReject/'+id+'/'+message,{headers:headers});
    }
    public find(mailId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'masSend/find/'+mailId,{headers:headers});
    }
    public list(mailId:number,approvalUserId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'masSend/list/'+mailId+'/'+approvalUserId,{headers:headers});
    }
}