import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrMailEntity } from '../entities/pqrMail.entity';

@Injectable({
    providedIn:'root'
})
export class PqrMailService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(pqrMailEntity:PqrMailEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'pqrMail/create',JSON.stringify(pqrMailEntity),{ headers: headers });
    }
    public update(pqrMailEntity:PqrMailEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'pqrMail/update',JSON.stringify(pqrMailEntity),{ headers: headers });
    }
    public delete(maild:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'pqrMail/delete/'+maild,{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'pqrMail/list',{ headers: headers });
    }
    public send(id:number,variables:string[]):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'pqrMail/send/'+id,JSON.stringify(variables),{ headers: headers });
    }
}