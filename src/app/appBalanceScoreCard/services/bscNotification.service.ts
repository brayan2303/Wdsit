import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscNotificationEntity } from "../entities/bscNotification.entity";
import { BscNotificationUserEntity } from "../entities/bscNotificationUser.entity";
import { BscNotificationModel } from "../models/bscNotificacion.mode";

@Injectable({
    providedIn:'root'
})
export class BscNotificationService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(bscNotificationEntity:BscNotificationEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'bscNotification/create',JSON.stringify(bscNotificationEntity),{ headers: headers });
    }
    public update(bscNotificationEntity:BscNotificationEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscNotification/update',JSON.stringify(bscNotificationEntity),{ headers: headers });
    }
    public delete(notificationId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscNotification/delete/'+notificationId,{ headers: headers });
    }
    public findByName(name:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscNotification/findByName/'+name,{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscNotification/list',{ headers: headers });
    }
    public listMail(notificationName:string,perspectiveId:number,measurementId:number,actionPlanId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscNotification/listMail/'+notificationName+'/'+perspectiveId+'/'+measurementId+'/'+actionPlanId,{ headers: headers });
    }
    public send(name:string,mails:BscNotificationUserEntity[],variables:string[]):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new BscNotificationModel();
        body.mails=mails;
        body.variables=variables;

        return this.http.post<ResponseModel>(this.url+'bscNotification/send/'+name,JSON.stringify(body),{ headers: headers });
    }
}