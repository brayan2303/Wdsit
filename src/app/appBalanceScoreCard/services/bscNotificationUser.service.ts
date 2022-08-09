import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscNotificationUserEntity } from "../entities/bscNotificationUser.entity";

@Injectable({
    providedIn:'root'
})
export class BscNotificationUserService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(notificationId:number,userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new BscNotificationUserEntity();
        body.notificationId=notificationId;
        body.userId=userId;

        return this.http.post<ResponseModel>(this.url+'bscNotificationUser/create',JSON.stringify(body),{ headers: headers });
    }
    public delete(notificationId:number,userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscNotificationUser/delete/'+notificationId+'/'+userId,{ headers: headers });
    }
    public list(notificationName:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscNotificationUser/list/'+notificationName,{ headers: headers });
    }
    public findAll(notificationId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscNotificationUser/findAll/'+notificationId,{ headers: headers });
    }
}