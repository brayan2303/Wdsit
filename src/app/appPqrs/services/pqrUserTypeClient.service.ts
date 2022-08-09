import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrUserTypeClientEntity } from '../entities/pqrUserTypeClient.Entity';




@Injectable({
    providedIn:'root'
})
export class PqrUserTypeClientService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(userId:number,typeClientId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new PqrUserTypeClientEntity;
        body.userId=userId;
        body.typeClientId=typeClientId;
        
        return this.http.post<ResponseModel>(this.url+'PqrUserTypeClient/create',JSON.stringify(body),{headers:headers});
    }

    public delete(userId:number,typeClientId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'PqrUserTypeClient/delete/'+userId+'/'+typeClientId,{ headers: headers });
    }

    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'PqrUserTypeClient/list',{headers:headers});
    }
    public findAll(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrUserTypeClient/findAll/'+id,{headers:headers});
    }
}