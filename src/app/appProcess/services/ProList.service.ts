import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProListEntity } from '../entities/proList.entity';

@Injectable({
    providedIn:'root'
})
export class ProListService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(proListEntity:ProListEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'proList/create',JSON.stringify(proListEntity),{headers:headers});
    }
    public update(proListEntity:ProListEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proList/update',JSON.stringify(proListEntity),{headers:headers});
    }
    public delete(listId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proList/delete/'+listId,{headers:headers});
    }
    public findByListType(listType:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proList/findByListType/'+listType,{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proList/list',{headers:headers});
    }
}