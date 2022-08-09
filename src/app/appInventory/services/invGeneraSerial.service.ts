import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvGeneraSerialEntity } from '../entities/invGeneraSerial.entity';


@Injectable({
    providedIn:'root'
})
export class InvGeneraSerialService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(serial:string, typeId:number, userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new InvGeneraSerialEntity()
        body.serial=serial;
        body.typeId=typeId;
        body.userId=userId;
        return this.http.post<ResponseModel>(this.url+'InvGeneraSerialS/create/'+userId,JSON.stringify(body),{headers:headers});
    }  
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'InvGeneraSerialS/delete/'+id,{headers:headers});
    }
    
    public list(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'InvGeneraSerialS/list/'+id,{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'InvGeneraSerialS/findById/'+id,{headers:headers});
    }
   
}