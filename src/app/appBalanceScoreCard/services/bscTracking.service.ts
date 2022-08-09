import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscTrackingEntity } from '../entities/bscTracking.entity';

@Injectable({
    providedIn:'root'
})
export class BscTrackingService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(bscTrackingEntity:BscTrackingEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'bscTracking/create',JSON.stringify(bscTrackingEntity),{headers:headers});
    }
    public update(bscTrackingEntity:BscTrackingEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscTracking/update',JSON.stringify(bscTrackingEntity),{headers:headers});
    }
    public approveReject(trackingId:number,status:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscTracking/approveReject/'+trackingId+'/'+status,{headers:headers});
    }
    public delete(trackingId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscTracking/delete/'+trackingId,{headers:headers});
    }
    public list(actionPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscTracking/list/'+actionPlanId,{headers:headers});
    }
}