import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscIndicatorEntity } from '../entities/bscIndicator.entity';

@Injectable({
    providedIn:'root'
})
export class BscIndicatorService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(bscIndicatorEntity:BscIndicatorEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'bscIndicator/create',JSON.stringify(bscIndicatorEntity),{headers:headers});
    }
    public update(bscIndicatorEntity:BscIndicatorEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscIndicator/update',JSON.stringify(bscIndicatorEntity),{headers:headers});
    }
    public delete(indicatorId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscIndicator/delete/'+indicatorId,{headers:headers});
    }
    public list(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscIndicator/list/'+strategicObjetiveId,{headers:headers});
    }
    public listActive(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscIndicator/listActive/'+strategicObjetiveId,{headers:headers});
    }
    public percentage(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscIndicator/percentage/'+strategicObjetiveId,{headers:headers});
    }
    public percentageMonth(indicator:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscIndicator/percentageMonth/'+indicator,{headers:headers});
    }
    public total(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscIndicator/total/'+strategicObjetiveId,{headers:headers});
    }
}