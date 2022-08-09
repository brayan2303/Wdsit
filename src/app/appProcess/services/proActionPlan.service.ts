import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProActionPlanEntity } from '../entities/proActionPlan.entity';

@Injectable({
    providedIn:'root'
})
export class ProActionPlanService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(proActionPlanEntity:ProActionPlanEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'proActionPlan/create',JSON.stringify(proActionPlanEntity),{headers:headers});
    }
    public update(proActionPlanEntity:ProActionPlanEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proActionPlan/update',JSON.stringify(proActionPlanEntity),{headers:headers});
    }
    public openClose(actionPlanId:number,openClose:boolean):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proActionPlan/openClose/'+actionPlanId+'/'+openClose,{headers:headers});
    }
    public approveReject(actionPlanId:number,status:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proActionPlan/approveReject/'+actionPlanId+'/'+status,{headers:headers});
    }
    public delete(actionPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proActionPlan/delete/'+actionPlanId,{headers:headers});
    }
    public findById(actionPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proActionPlan/findById/'+actionPlanId,{headers:headers});
    }
    public list(analysisId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proActionPlan/list/'+analysisId,{headers:headers});
    }
}