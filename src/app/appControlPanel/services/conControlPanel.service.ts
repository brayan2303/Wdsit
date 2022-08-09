import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ConControlPanelEntity } from '../entities/conControlPanel.entity';
import { ConControlPanelPersonEntity } from '../entities/conControlPanelPerson.entity';

@Injectable({
    providedIn:'root'
})
export class ConControlPanelService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(conControlPanelEntity:ConControlPanelEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'conControlPanel/create',JSON.stringify(conControlPanelEntity),{ headers: headers });
    }
    public update(conControlPanelEntity:ConControlPanelEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'conControlPanel/update',JSON.stringify(conControlPanelEntity),{ headers: headers });
    }
    public delete(controlPanelId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'conControlPanel/delete/'+controlPanelId,{ headers: headers });
    }
    public add(personId:number,powerBiId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new ConControlPanelPersonEntity();
        body.controlPanelId=powerBiId;
        body.personId=personId;

        return this.http.post<ResponseModel>(this.url+'conControlPanel/add',JSON.stringify(body),{ headers: headers });
    }
    public remove(personId:number,controlPanelId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'conControlPanel/remove/'+personId+'/'+controlPanelId,{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'conControlPanel/list',{ headers: headers });
    }
    public findAll(controlPanelId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'conControlPanel/findAll/'+controlPanelId,{ headers: headers });
    }
    public findById(controlPanelId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'conControlPanel/findById/'+controlPanelId,{ headers: headers });
    }
    public findByPersonId(personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'conControlPanel/findByPersonId/'+personId,{ headers: headers });
    }
}