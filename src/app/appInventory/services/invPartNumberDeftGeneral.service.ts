import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvPartNumberDeftGeneral } from '../entities/invPartNumberDeftGeneral.entity';


@Injectable({
    providedIn:'root'
})
export class InvPartNumberDeftGeneralService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(store:string, partNumber:string, serial: string,userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new InvPartNumberDeftGeneral()
        body.store=store;
        body.partNumber=partNumber;
        body.serial=serial;
        body.userId=userId;
        return this.http.post<ResponseModel>(this.url+'InvPartNumberDeftGeneralS/create/'+userId,JSON.stringify(body),{headers:headers});
    }  
    
    public list(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'InvPartNumberDeftGeneralS/list/'+id,{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'InvPartNumberDeftGeneralS/findById/'+id,{headers:headers});
    }

    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'InvPartNumberDeftGeneralS/delete/'+id,{headers:headers});
    }
}