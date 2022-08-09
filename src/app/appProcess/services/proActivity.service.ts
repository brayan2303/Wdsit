import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProActivityEntity } from '../entities/proActivity.entity';

@Injectable({
    providedIn:'root'
})
export class ProActivityService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(proActivityEntity:ProActivityEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'proActivity/create',JSON.stringify(proActivityEntity),{headers:headers});
    }
    public update(proActivityEntity:ProActivityEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proActivity/update',JSON.stringify(proActivityEntity),{headers:headers});
    }
    public delete(activityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proActivity/delete/'+activityId,{headers:headers});
    }
    public openClose(activityId:number,status:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proActivity/openClose/'+activityId+'/'+status,{headers:headers});
    }
    public list(workPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proActivity/list/'+workPlanId,{headers:headers});
    }
}