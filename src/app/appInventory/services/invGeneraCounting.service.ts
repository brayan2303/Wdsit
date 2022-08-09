import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvGeneralParametriEntity } from '../entities/invGeneralParametri.entity';
import { InvGeneralInitEntity } from '../entities/InvGeneralInit.entity';
import { InvGeneraCountingEntity } from '../entities/invGeneraCounting.entity';


@Injectable({
    providedIn:'root'
})
export class InvGeneraCountingService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(counting:number, typeId:number, userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new InvGeneraCountingEntity()
        body.counting=counting;
        body.typeId=typeId;
        body.userId=userId;
        return this.http.post<ResponseModel>(this.url+'InvGeneraCountingS/create/'+userId,JSON.stringify(body),{headers:headers});
    }  
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'InvGeneraCountingS/delete/'+id,{headers:headers});
    }
    
    public list(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'InvGeneraCountingS/list/'+id,{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'InvGeneraCountingS/findById/'+id,{headers:headers});
    }
    public findByIdSum(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'InvGeneraCountingS/findByIdSum/'+id,{headers:headers});
    }
   
}