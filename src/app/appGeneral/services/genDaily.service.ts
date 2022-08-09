import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenDailyEntity } from '../entities/genDaily.entity';

@Injectable({
    providedIn:'root'
})
export class GenDailyService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(genDailyEntity:GenDailyEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'genDaily/create',JSON.stringify(genDailyEntity),{ headers: headers });
    }
    public income(customer:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'genDaily/income/'+customer,{ headers: headers });
    }
}