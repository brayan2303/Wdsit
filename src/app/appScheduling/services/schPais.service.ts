import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { SchPaisEntity } from '../entities/schPais.entity';

@Injectable({
    providedIn:'root'
})
export class SchPaisService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(schPaisEntity:SchPaisEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'schPais/create',JSON.stringify(schPaisEntity),{headers:headers});
    }
    public update(schPaisEntity:SchPaisEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'schPais/update',JSON.stringify(schPaisEntity),{headers:headers});
    }
    public delete(paisId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'schPais/delete/'+paisId,{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'schPais/list',{headers:headers});
    }
}