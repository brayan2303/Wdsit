import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';

@Injectable({
    providedIn:'root'
})
export class BscMonthService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public list(measurementId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscMonth/list/'+measurementId,{headers:headers});
    }
    public listMeasurement(measurementId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscMonth/listMeasurement/'+measurementId,{headers:headers});
    }
}