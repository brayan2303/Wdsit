import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscStrategicObjetiveEntity } from '../entities/bscStrategicObjetive.entity';

@Injectable({
    providedIn:'root'
})
export class BscStrategicObjetiveService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(bscStrategicObjetiveEntity:BscStrategicObjetiveEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'bscStrategicObjetive/create',JSON.stringify(bscStrategicObjetiveEntity),{headers:headers});
    }
    public update(bscStrategicObjetiveEntity:BscStrategicObjetiveEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscStrategicObjetive/update',JSON.stringify(bscStrategicObjetiveEntity),{headers:headers});
    }
    public delete(StrategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscStrategicObjetive/delete/'+StrategicObjetiveId,{headers:headers});
    }
    public list(perspectiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscStrategicObjetive/list/'+perspectiveId,{headers:headers});
    }
    public listActive(perspectiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscStrategicObjetive/listActive/'+perspectiveId,{headers:headers});
    }
    public percentage(perspectiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscStrategicObjetive/percentage/'+perspectiveId,{headers:headers});
    }
    public percentageMonth(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscStrategicObjetive/percentageMonth/'+strategicObjetiveId,{headers:headers});
    }
    public total(perspectiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscStrategicObjetive/total/'+perspectiveId,{headers:headers});
    }
}