import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscActionPlanEntity } from '../entities/bscActionPlan.entity';

@Injectable({
    providedIn:'root'
})
export class BscActionPlanService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(bscActionPlanEntity:BscActionPlanEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'bscActionPlan/create',JSON.stringify(bscActionPlanEntity),{headers:headers});
    }
    public update(bscActionPlanEntity:BscActionPlanEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscActionPlan/update',JSON.stringify(bscActionPlanEntity),{headers:headers});
    }
    public openClose(actionPlanId:number,openClose:boolean):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscActionPlan/openClose/'+actionPlanId+'/'+openClose,{headers:headers});
    }
    public approveReject(actionPlanId:number,status:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscActionPlan/approveReject/'+actionPlanId+'/'+status,{headers:headers});
    }
    public delete(actionPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscActionPlan/delete/'+actionPlanId,{headers:headers});
    }
    public findById(actionPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscActionPlan/findById/'+actionPlanId,{headers:headers});
    }
    public list(analysisId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscActionPlan/list/'+analysisId,{headers:headers});
    }
}