import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProStrategicObjetiveEntity } from '../entities/proStrategicObjetive.entity';

@Injectable({
    providedIn:'root'
})
export class ProStrategicObjetiveService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(proStrategicObjetiveEntity:ProStrategicObjetiveEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'proStrategicObjetive/create',JSON.stringify(proStrategicObjetiveEntity),{headers:headers});
    }
    public update(proStrategicObjetiveEntity:ProStrategicObjetiveEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proStrategicObjetive/update',JSON.stringify(proStrategicObjetiveEntity),{headers:headers});
    }
    public delete(StrategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proStrategicObjetive/delete/'+StrategicObjetiveId,{headers:headers});
    }
    public list(perspectiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proStrategicObjetive/list/'+perspectiveId,{headers:headers});
    }
    public listActive(perspectiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proStrategicObjetive/listActive/'+perspectiveId,{headers:headers});
    }
    public percentage(perspectiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proStrategicObjetive/percentage/'+perspectiveId,{headers:headers});
    }
    public percentageMonth(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proStrategicObjetive/percentageMonth/'+strategicObjetiveId,{headers:headers});
    }
    public total(perspectiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proStrategicObjetive/total/'+perspectiveId,{headers:headers});
    }
}