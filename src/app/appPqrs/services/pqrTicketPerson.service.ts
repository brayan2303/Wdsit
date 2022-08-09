import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrTicketPersonEntity } from '../entities/pqrTicketPerson.entity';



@Injectable({
    providedIn:'root'
})
export class PqrTicketPersonService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
  
    public create(userId:number,pqrTicketId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new PqrTicketPersonEntity;
        body.userId=userId;
        body.pqrTicketId=pqrTicketId;
        
        return this.http.post<ResponseModel>(this.url+'PqrTicketPersonS/create',JSON.stringify(body),{headers:headers});
    }

    public delete(userId:number,pqrTicketId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'PqrTicketPersonS/delete/'+userId+'/'+pqrTicketId,{ headers: headers });
    }

    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'PqrTicketPersonS/list',{headers:headers});
    }
    public findAll(userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrTicketPersonS/findAll/'+userId,{headers:headers});
    }
    public listUserId(userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrTicketPersonS/listUserId/'+userId,{headers:headers});
    }
   
}