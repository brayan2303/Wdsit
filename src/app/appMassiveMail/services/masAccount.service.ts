import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { MasAccountEntity } from "../entities/masAccount.entity";

@Injectable({
    providedIn:'root'
})
export class MasAccountService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(masAccount:MasAccountEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'masAccount/create',JSON.stringify(masAccount),{headers:headers});
    }
    public update(masAccount:MasAccountEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'masAccount/update',JSON.stringify(masAccount),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'masAccount/delete/'+id,{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'masAccount/list',{ headers: headers });
    }
    public listActive():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'masAccount/listActive',{ headers: headers });
    }
}