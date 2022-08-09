import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";
import { DocumentLoadAssigEntity } from "../entities/DocumentLoadAssigEntity";

@Injectable({
    providedIn: 'root'

})
export class DocumentLoadAssigService{
    private url: string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(userId:number, groupId: number ):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body= new DocumentLoadAssigEntity;
        body.userId = userId;
        body.groupId = groupId;
        return this.http.post<ResponseModel>(this.url+'DocumentLoadAssig/create',JSON.stringify(body),{headers:headers});
    }
    public delete(userId:number, groupId:number):Observable<ResponseModel>{
        var headers =  new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'DocumentLoadAssig/delete/'+userId+'/'+groupId,{headers:headers});
    }

    public list():Observable<ResponseModel>{
        var headers= new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'DocumentLoadAssig/list',{headers:headers});
    }

    public findAll(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'DocumentLoadAssig/findAll/'+id,{headers:headers});
    }
}