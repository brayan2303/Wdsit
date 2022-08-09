import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { MasMailEntity } from "../entities/masMail.entity";

@Injectable({
    providedIn:'root'
})
export class MasMailService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(masMail:MasMailEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'masMail/create',JSON.stringify(masMail),{headers:headers});
    }
    public update(masMail:MasMailEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'masMail/update',JSON.stringify(masMail),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'masMail/delete/'+id,{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'masMail/list',{ headers: headers });
    }
    public findById(mailId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'masMail/findById/'+mailId,{ headers: headers });
    }
    public send(id:number,sendingUserId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'masMail/send/'+id+'/'+sendingUserId,{headers:headers});
    }
}