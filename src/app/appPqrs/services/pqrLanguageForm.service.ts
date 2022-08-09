import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrLenguageFormClientEntity } from '../entities/pqrLenguageFormClient.entity';


@Injectable({
    providedIn:'root'
})
export class PqrLanguageFormService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(PqrLenguageFormClientE:PqrLenguageFormClientEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'PqrLenguageFormClientS/create',JSON.stringify(PqrLenguageFormClientE),{headers:headers});
    }
    public update(PqrLenguageFormClientE:PqrLenguageFormClientEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'PqrLenguageFormClientS/update',JSON.stringify(PqrLenguageFormClientE),{headers:headers});
    }
    
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'PqrLenguageFormClientS/delete/'+id,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'PqrLenguageFormClientS/list',{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrLenguageFormClientS/findById/'+id,{headers:headers});
    }

    public findAll(countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'PqrLenguageFormClientS/findAll/'+countryId,{headers:headers});
    }
    public labelFindAll(userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrLenguageFormClientS/labelFindAll/'+userId,{headers:headers});
    }
    
}