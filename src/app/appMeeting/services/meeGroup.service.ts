import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";
import { MeeGroupEntity } from "../entities/meeGroup.entity";

@Injectable({
    providedIn:'root'
})
export class MeeGroupService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(meeGroup:MeeGroupEntity):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.post<ResponseModel>(this.url+'MeeGroup/create',JSON.stringify(meeGroup),{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.get<ResponseModel>(this.url+'MeeGroup/list',{headers:headers});
    }
    public update(meeGroup:MeeGroupEntity):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.put<ResponseModel>(this.url+'MeeGroup/update',JSON.stringify(meeGroup),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'MeeGroup/delete/'+id,{headers:headers});
    }
    public findById(groupId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'MeeGroup/findById/'+groupId,{headers:headers});
    }
}