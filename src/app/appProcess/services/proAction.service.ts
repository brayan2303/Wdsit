import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProActionEntity } from '../entities/proAction.entity';

@Injectable({
    providedIn:'root'
})
export class ProActionService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(proActionEntity:ProActionEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'proAction/create',JSON.stringify(proActionEntity),{headers:headers});
    }
    public update(proActionEntity:ProActionEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proAction/update',JSON.stringify(proActionEntity),{headers:headers});
    }
    public openClose(actionId:number,openClose:boolean):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proAction/openClose/'+actionId+'/'+openClose,{headers:headers});
    }
    public delete(actionId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proAction/delete/'+actionId,{headers:headers});
    }
    public findById(actionId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proAction/findById/'+actionId,{headers:headers});
    }
    public findOpen(actionPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proAction/findOpen/'+actionPlanId,{headers:headers});
    }
    public list(actionPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proAction/list/'+actionPlanId,{headers:headers});
    }
}