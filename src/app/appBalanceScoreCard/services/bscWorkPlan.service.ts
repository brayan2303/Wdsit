import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscWorkPlanEntity } from '../entities/bscWorkPlan.entity';

@Injectable({
    providedIn:'root'
})
export class BscWorkPlanService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(bscWorkPlanEntity:BscWorkPlanEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'bscWorkPlan/create',JSON.stringify(bscWorkPlanEntity),{headers:headers});
    }
    public update(bscWorkPlanEntity:BscWorkPlanEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscWorkPlan/update',JSON.stringify(bscWorkPlanEntity),{headers:headers});
    }
    public delete(workPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscWorkPlan/delete/'+workPlanId,{headers:headers});
    }
    public list(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscWorkPlan/list/'+strategicObjetiveId,{headers:headers});
    }
    public listActive(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscWorkPlan/listActive/'+strategicObjetiveId,{headers:headers});
    }
    public total(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscWorkPlan/total/'+strategicObjetiveId,{headers:headers});
    }
    public percentage(strategicObjetiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscWorkPlan/percentage/'+strategicObjetiveId,{headers:headers});
    }
    public percentageAdvances(workPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscWorkPlan/percentageAdvances/'+workPlanId,{headers:headers});
    }
}