import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscMeasurementEntity } from '../entities/bscMeasurement.entity';

@Injectable({
    providedIn:'root'
})
export class BscMeasurementService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(bscMeasurementEntity:BscMeasurementEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'bscMeasurement/create',JSON.stringify(bscMeasurementEntity),{headers:headers});
    }
    public update(bscMeasurementEntity:BscMeasurementEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscMeasurement/update',JSON.stringify(bscMeasurementEntity),{headers:headers});
    }
    public delete(measurementId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscMeasurement/delete/'+measurementId,{headers:headers});
    }
    public list(indicatorId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscMeasurement/list/'+indicatorId+'/'+personId,{headers:headers});
    }
    public listActive(indicatorId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscMeasurement/listActive/'+indicatorId+'/'+personId,{headers:headers});
    }
}