import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";
import { MeeMeetingEntity } from "../entities/meeMeeting.entity";

@Injectable({
    providedIn:'root'
})
export class MeeMeetingService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(meeting:MeeMeetingEntity):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.post<ResponseModel>(this.url+'meeMeeting/create',JSON.stringify(meeting),{headers:headers});
    }
    public update(meeting:MeeMeetingEntity):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.put<ResponseModel>(this.url+'meeMeeting/update',JSON.stringify(meeting),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.delete<ResponseModel>(this.url+'meeMeeting/delete/'+id,{headers:headers});
    }
    public list(startDate:string,endDate:string, groupId:number):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.get<ResponseModel>(this.url+'meeMeeting/list/'+startDate+'/'+endDate+'/'+groupId,{headers:headers});
    }
    public listGroup(groupId:number, userId:number):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.get<ResponseModel>(this.url+'meeMeeting/listGroup/'+groupId+'/'+userId,{headers:headers});
    }
    public listByUser(userId:number):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.get<ResponseModel>(this.url+'meeMeeting/listByUser/'+userId,{headers:headers});
    }
}