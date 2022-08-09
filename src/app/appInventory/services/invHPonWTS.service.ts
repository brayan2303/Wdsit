import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { SafeMethodCall } from "@angular/compiler";

@Injectable({
    providedIn:'root'
})
export class InvHPonWTSService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public InvHPonWTSLocation():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'InvHPonWTSS/InvHPonWTSLocation',{headers:headers});
    }
    public InvHPonWTSWarehouse():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'InvHPonWTSS/InvHPonWTSWarehouse',{headers:headers});
    }
}