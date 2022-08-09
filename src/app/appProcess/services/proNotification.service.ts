import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProNotificationEntity } from "../entities/proNotification.entity";
import { ProNotificationUserEntity } from "../entities/proNotificationUser.entity";
import { ProNotificationModel } from "../models/proNotificacion.mode";

@Injectable({
    providedIn:'root'
})
export class ProNotificationService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(proNotificationEntity:ProNotificationEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'proNotification/create',JSON.stringify(proNotificationEntity),{ headers: headers });
    }
    public update(proNotificationEntity:ProNotificationEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proNotification/update',JSON.stringify(proNotificationEntity),{ headers: headers });
    }
    public delete(notificationId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proNotification/delete/'+notificationId,{ headers: headers });
    }
    public findByName(name:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proNotification/findByName/'+name,{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proNotification/list',{ headers: headers });
    }
    public listMail(notificationName:string,perspectiveId:number,measurementId:number,actionPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proNotification/listMail/'+notificationName+'/'+perspectiveId+'/'+measurementId+'/'+actionPlanId,{ headers: headers });
    }
    public send(name:string,mails:ProNotificationUserEntity[],variables:string[]):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new ProNotificationModel();
        body.mails=mails;
        body.variables=variables;

        return this.http.post<ResponseModel>(this.url+'proNotification/send/'+name,JSON.stringify(body),{ headers: headers });
    }
}