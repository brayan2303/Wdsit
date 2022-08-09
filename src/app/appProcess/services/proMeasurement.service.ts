import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProMeasurementEntity } from '../entities/ProMeasurement.entity';

@Injectable({
    providedIn:'root'
})
export class ProMeasurementService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(proMeasurementEntity:ProMeasurementEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'proMeasurement/create',JSON.stringify(proMeasurementEntity),{headers:headers});
    }
    public update(proMeasurementEntity:ProMeasurementEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proMeasurement/update',JSON.stringify(proMeasurementEntity),{headers:headers});
    }
    public delete(measurementId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proMeasurement/delete/'+measurementId,{headers:headers});
    }
    public list(indicatorId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proMeasurement/list/'+indicatorId+'/'+personId,{headers:headers});
    }
    public listActive(indicatorId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proMeasurement/listActive/'+indicatorId+'/'+personId,{headers:headers});
    }
}