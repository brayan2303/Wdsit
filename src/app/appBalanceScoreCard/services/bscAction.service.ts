import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscActionEntity } from '../entities/bscAction.entity';

@Injectable({
    providedIn:'root'
})
export class BscActionService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(bscActionEntity:BscActionEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'bscAction/create',JSON.stringify(bscActionEntity),{headers:headers});
    }
    public update(bscActionEntity:BscActionEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscAction/update',JSON.stringify(bscActionEntity),{headers:headers});
    }
    public openClose(actionId:number,openClose:boolean):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscAction/openClose/'+actionId+'/'+openClose,{headers:headers});
    }
    public delete(actionId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscAction/delete/'+actionId,{headers:headers});
    }
    public findById(actionId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscAction/findById/'+actionId,{headers:headers});
    }
    public findOpen(actionPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscAction/findOpen/'+actionPlanId,{headers:headers});
    }
    public list(actionPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscAction/list/'+actionPlanId,{headers:headers});
    }
}