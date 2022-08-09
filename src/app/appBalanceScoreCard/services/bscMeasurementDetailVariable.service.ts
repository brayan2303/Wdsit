import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscMeasurementDetailVariableEntity } from '../entities/bscMeasurementDetailVariable.entity';

@Injectable({
    providedIn:'root'
})
export class BscMeasurementDetailVariableService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(array:BscMeasurementDetailVariableEntity[]):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'bscMeasurementDetailVariable/create',JSON.stringify(array),{headers:headers});
    }
    public update(array:BscMeasurementDetailVariableEntity[]):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscMeasurementDetailVariable/update',JSON.stringify(array),{headers:headers});
    }
    public list(measurementDetailId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscMeasurementDetailVariable/list/'+measurementDetailId,{headers:headers});
    }
}