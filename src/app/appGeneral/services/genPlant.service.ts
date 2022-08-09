import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";
import { GenPlantEntity } from "../entities/genPlant.entity";


@Injectable({
    providedIn:'root'
})
export class GenPlantService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(genPlant:GenPlantEntity):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.post<ResponseModel>(this.url+'GenPlant/create',JSON.stringify(genPlant),{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.get<ResponseModel>(this.url+'GenPlant/list',{headers:headers});
    }
    public update(genPlant:GenPlantEntity):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.put<ResponseModel>(this.url+'GenPlant/update',JSON.stringify(genPlant),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'GenPlant/delete/'+id,{headers:headers});
    }
    public findById(groupId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'GenPlant/findById/'+groupId,{headers:headers});
    }
}