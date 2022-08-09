import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { YearEntity } from '../entities/yearEntity.entity';
import { MonthEntity } from '../entities/monthEntity.entity';


@Injectable({
    providedIn:'root'
})
export class CertMonthService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(monthEntity:MonthEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'certMonth/create',JSON.stringify(monthEntity),{headers:headers});
    }
    public update(monthEntity:MonthEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'certMonth/update',JSON.stringify(monthEntity),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'certMonth/delete/'+id,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'certMonth/list',{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'certMonth/findById/'+id);
    }
    public findAll(periodicityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'certMonth/findAll/'+periodicityId,{headers:headers});
    }
    public findAllByPeriodicityId(periodicityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'certMonth/findAllByPeriodicityId/'+periodicityId,{headers:headers});
    }
    
}
