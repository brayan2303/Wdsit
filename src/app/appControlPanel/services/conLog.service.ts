import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ConLogEntity } from '../entities/conLog.entity';

@Injectable({
    providedIn:'root'
})
export class ConLogService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(controlPanelId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var conLogEntity=new ConLogEntity();
        conLogEntity.controlPanelId=controlPanelId;
        conLogEntity.personId=personId;

        return this.http.post<ResponseModel>(this.url+'conLog/create',JSON.stringify(conLogEntity),{ headers: headers });
    }
    public viewDay():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'conLog/viewDay',{headers:headers});
    }
    public viewControlPanel():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'conLog/viewControlPanel',{headers:headers});
    }
}