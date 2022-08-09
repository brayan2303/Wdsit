import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { LoadClientStarParameterizationEntity } from '../entities/loadClientStarParameterization.entity';
import { LoadClientPrefixEntity } from '../entities/loadClientPrefix.entity';


@Injectable({
    providedIn:'root'
})
export class LoadClientPrefixService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(prefix:string,parametrizationId:number, userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new LoadClientPrefixEntity();
        body.prefix = prefix;
        body.parametrizationId = parametrizationId;
        body.userId = userId;
        return this.http.post<ResponseModel>(this.url+'LoadClientPrefixS/create/'+userId,JSON.stringify(body),{headers:headers});
    }
    public update(id:number,prefix:string, active:boolean,userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new LoadClientPrefixEntity();
        body.id = id;
        body.prefix = prefix;
        body.active = active;
        body.userId = userId;
        return this.http.put<ResponseModel>(this.url+'LoadClientPrefixS/update/'+userId,JSON.stringify(body),{headers:headers});
    }
    
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'LoadClientPrefixS/delete/'+id,{headers:headers});
    }
    
    public list(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientPrefixS/list/'+id,{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'LoadClientPrefixS/findById/'+id,{headers:headers});
    }

}