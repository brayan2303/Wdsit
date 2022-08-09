import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrTicketPersonEntity } from '../entities/pqrTicketPerson.entity';
import { PqrPersonMasterEntity } from '../entities/pqrPersonMaster.entity';



@Injectable({
    providedIn:'root'
})
export class PqrPersonMasterService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(userId:number,pqrTicketId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new PqrPersonMasterEntity;
        body.userId=userId;
        body.typePqrId=pqrTicketId;
        
        return this.http.post<ResponseModel>(this.url+'PqrPersonMasterS/create',JSON.stringify(body),{headers:headers});
    }

    public delete(userId:number,pqrTicketId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'PqrPersonMasterS/delete/'+userId+'/'+pqrTicketId,{ headers: headers });
    }

    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'PqrPersonMasterS/list',{headers:headers});
    }
    public findAll(userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrPersonMasterS/findAll/'+userId,{headers:headers});
    }
    public categoryUserId(userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrPersonMasterS/categoryUserId/'+userId,{headers:headers});
    }
    
}