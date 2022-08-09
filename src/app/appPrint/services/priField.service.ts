import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PriFieldEntity } from '../entities/priField.entity';

@Injectable({
    providedIn:'root'
})
export class PriFieldService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(priFieldEntity:PriFieldEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'priField/create',JSON.stringify(priFieldEntity),{headers:headers});
    }
    public update(priFieldEntity:PriFieldEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'priField/update',JSON.stringify(priFieldEntity),{headers:headers});
    }
    public delete(fieldId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'priField/delete/'+fieldId,{headers:headers});
    }
    public findByLabelId(labelId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'priField/findByLabelId/'+labelId,{headers:headers});
    }
    public findByLabelIdOrder(labelId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'priField/findByLabelIdOrder/'+labelId,{headers:headers});
    }
    public list(labelId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'priField/list/'+labelId,{headers:headers});
    }
    public listAutomatic(labelId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'priField/listAutomatic/'+labelId,{headers:headers});
    }
    public listAutomaticSmall(labelId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'priField/listAutomaticSmall/'+labelId,{headers:headers});
    }
}