import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProTrackingEntity } from '../entities/proTracking.entity';

@Injectable({
    providedIn:'root'
})
export class ProTrackingService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(proTrackingEntity:ProTrackingEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'proTracking/create',JSON.stringify(proTrackingEntity),{headers:headers});
    }
    public update(proTrackingEntity:ProTrackingEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proTracking/update',JSON.stringify(proTrackingEntity),{headers:headers});
    }
    public approveReject(trackingId:number,status:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proTracking/approveReject/'+trackingId+'/'+status,{headers:headers});
    }
    public delete(trackingId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proTracking/delete/'+trackingId,{headers:headers});
    }
    public list(actionPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proTracking/list/'+actionPlanId,{headers:headers});
    }
}