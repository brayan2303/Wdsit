import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProMeasurementDetailVariableEntity } from '../entities/proMeasurementDetailVariable.entity';

@Injectable({
    providedIn:'root'
})
export class ProMeasurementDetailVariableService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(array:ProMeasurementDetailVariableEntity[]):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'proMeasurementDetailVariable/create',JSON.stringify(array),{headers:headers});
    }
    public update(array:ProMeasurementDetailVariableEntity[]):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proMeasurementDetailVariable/update',JSON.stringify(array),{headers:headers});
    }
    public list(measurementDetailId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proMeasurementDetailVariable/list/'+measurementDetailId,{headers:headers});
    }
}