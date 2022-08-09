import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProWorkPlanEntity } from '../entities/proWorkPlan.entity';

@Injectable({
    providedIn:'root'
})
export class ProWorkPlanService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(ProWorkPlanEntity:ProWorkPlanEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'proWorkPlan/create',JSON.stringify(ProWorkPlanEntity),{headers:headers});
    }
    public update(ProWorkPlanEntity:ProWorkPlanEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proWorkPlan/update',JSON.stringify(ProWorkPlanEntity),{headers:headers});
    }
    public delete(workPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proWorkPlan/delete/'+workPlanId,{headers:headers});
    }
    public list(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proWorkPlan/list/'+strategicObjetiveId,{headers:headers});
    }
    public listActive(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proWorkPlan/listActive/'+strategicObjetiveId,{headers:headers});
    }
    public total(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proWorkPlan/total/'+strategicObjetiveId,{headers:headers});
    }
    public percentage(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proWorkPlan/percentage/'+strategicObjetiveId,{headers:headers});
    }
    public percentageAdvances(workPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proWorkPlan/percentageAdvances/'+workPlanId,{headers:headers});
    }
}