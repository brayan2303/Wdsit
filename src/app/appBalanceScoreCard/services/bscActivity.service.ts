import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscActivityEntity } from '../entities/bscActivity.entity';

@Injectable({
    providedIn:'root'
})
export class BscActivityService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(bscActivityEntity:BscActivityEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'bscActivity/create',JSON.stringify(bscActivityEntity),{headers:headers});
    }
    public update(bscActivityEntity:BscActivityEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscActivity/update',JSON.stringify(bscActivityEntity),{headers:headers});
    }
    public delete(activityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscActivity/delete/'+activityId,{headers:headers});
    }
    public openClose(activityId:number,status:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscActivity/openClose/'+activityId+'/'+status,{headers:headers});
    }
    public list(workPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscActivity/list/'+workPlanId,{headers:headers});
    }
}