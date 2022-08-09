import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";
import { WlsServerEntity } from "../entities/wlsServer.entity";

@Injectable({
    providedIn:'root'
})
export class WlsServerService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(wlsServer:WlsServerEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'wlsServer/create',JSON.stringify(wlsServer),{headers:headers});
    }
    public update(wlsServer:WlsServerEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'wlsServer/update',JSON.stringify(wlsServer),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'wlsServer/delete/'+id,{headers:headers});
    }
    public dataBaseCreate(dataBaseName:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'wlsServer/dataBaseCreate',JSON.stringify(dataBaseName),{headers:headers});
    }
    public find(countryId:number,customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'wlsServer/find/'+countryId+'/'+customerId,{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'wlsServer/list',{headers:headers});
    }
    public dataBase(ip:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'wlsServer/dataBase/'+ip,{headers:headers});
    }
    public table(ip:string,dataBase:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'wlsServer/table/'+ip+'/'+dataBase,{headers:headers});
    }
    public column(dataBaseName:string,tableName:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'wlsServer/column/'+dataBaseName+'/'+tableName,{headers:headers});
    }
    public testConnection(ip:string,dataBase:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'wlsServer/testConnection/'+ip+'/'+dataBase,{headers:headers});
    }
}