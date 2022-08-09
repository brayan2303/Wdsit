import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProVariableEntity } from '../entities/proVariable.entity';

@Injectable({
    providedIn:'root'
})
export class ProVariableService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(ProVariableEntity:ProVariableEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'proVariable/create',JSON.stringify(ProVariableEntity),{headers:headers});
    }
    public update(ProVariableEntity:ProVariableEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proVariable/update',JSON.stringify(ProVariableEntity),{headers:headers});
    }
    public delete(variableId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proVariable/delete/'+variableId,{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proVariable/list',{headers:headers});
    }
    public listActive():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proVariable/listActive',{headers:headers});
    }
}