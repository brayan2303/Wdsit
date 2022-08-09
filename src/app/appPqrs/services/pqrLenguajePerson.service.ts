import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrLenguagePersonEntity } from '../entities/pqrLenguagePerson.entity';



@Injectable({
    providedIn:'root'
})
export class PqrPersonLanguageService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(userId:number,languageId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new PqrLenguagePersonEntity;
        body.userId=userId;
        body.languageId=languageId;
        
        return this.http.post<ResponseModel>(this.url+'PqrLenguagePersonS/create',JSON.stringify(body),{headers:headers});
    }

    public delete(userId:number,languageId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'PqrLenguagePersonS/delete/'+userId+'/'+languageId,{ headers: headers });
    }

    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'PqrLenguagePersonS/list',{headers:headers});
    }
    public findAll(userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrLenguagePersonS/findAll/'+userId,{headers:headers});
    }
}