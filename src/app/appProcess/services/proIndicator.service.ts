import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProIndicatorEntity } from '../entities/ProIndicator.entity';

@Injectable({
    providedIn:'root'
})
export class ProIndicatorService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(proIndicatorEntity:ProIndicatorEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'proIndicator/create',JSON.stringify(proIndicatorEntity),{headers:headers});
    }
    public update(proIndicatorEntity:ProIndicatorEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proIndicator/update',JSON.stringify(proIndicatorEntity),{headers:headers});
    }
    public delete(indicatorId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proIndicator/delete/'+indicatorId,{headers:headers});
    }
    public list(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proIndicator/list/'+strategicObjetiveId,{headers:headers});
    }
    public listActive(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proIndicator/listActive/'+strategicObjetiveId,{headers:headers});
    }
    public percentage(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proIndicator/percentage/'+strategicObjetiveId,{headers:headers});
    }
    public percentageMonth(indicator:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proIndicator/percentageMonth/'+indicator,{headers:headers});
    }
    public total(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proIndicator/total/'+strategicObjetiveId,{headers:headers});
    }
}