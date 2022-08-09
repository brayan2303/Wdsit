import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { RepMailEntity } from '../entities/repMail.entity';

@Injectable({
    providedIn:'root'
})
export class RepMailService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(repMailEntity:RepMailEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'repMail/create',JSON.stringify(repMailEntity),{ headers: headers });
    }
    public update(repMailEntity:RepMailEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'repMail/update',JSON.stringify(repMailEntity),{ headers: headers });
    }
    public delete(mailId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'repMail/delete/'+mailId,{ headers: headers });
    }
    public findById(mailId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'repMail/findById/'+mailId,{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'repMail/list',{ headers: headers });
    }
}