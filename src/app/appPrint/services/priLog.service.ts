import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PriLogEntity } from '../entities/priLog.entity';

@Injectable({
    providedIn:'root'
})
export class PriLogService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(priLogEntityList:PriLogEntity[]):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'priLog/create',JSON.stringify(priLogEntityList),{headers:headers});
    }
    public printDay():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'priLog/printDay',{headers:headers});
    }
    public printLabel():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'priLog/printLabel',{headers:headers});
    }
}