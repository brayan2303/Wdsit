import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { DisDailyOperationEntity } from '../entities/disDailyOperation.entity';

@Injectable({
    providedIn:'root'
})
export class DisDailyOperationService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(day:number,disDailyOperationEntity:DisDailyOperationEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'disDailyOperation/create/'+day,JSON.stringify(disDailyOperationEntity),{headers:headers});
    }
    public update(id:number,goal:number,type:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'disDailyOperation/update/'+id+'/'+goal+'/'+type,{headers:headers});
    }
    public list(countryId:number,year:number,monthId:number,day:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'disDailyOperation/list/'+countryId+'/'+year+'/'+monthId+'/'+day,{headers:headers});
    }
}