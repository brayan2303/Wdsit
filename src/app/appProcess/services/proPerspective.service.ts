import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProPerspectiveEntity } from '../entities/proPerspective.entity';

@Injectable({
    providedIn:'root'
})
export class ProPerspectiveService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(proPerspectiveEntity:ProPerspectiveEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'proPerspective/create',JSON.stringify(proPerspectiveEntity),{headers:headers});
    }
    public update(proPerspectiveEntity:ProPerspectiveEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proPerspective/update',JSON.stringify(proPerspectiveEntity),{headers:headers});
    }
    public delete(perspectiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proPerspective/delete/'+perspectiveId,{headers:headers});
    }
    public list(year:number,countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proPerspective/list/'+year+'/'+countryId,{headers:headers});
    }
    public listActive(year:number,personId:number,countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proPerspective/listActive/'+year+'/'+personId+'/'+countryId,{headers:headers});
    }
    public total(year:number,countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proPerspective/total/'+year+'/'+countryId,{headers:headers});
    }
    public percentage(year:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proPerspective/percentage/'+year,{headers:headers});
    }
    public percentageMonth(perspectiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proPerspective/percentageMonth/'+perspectiveId,{headers:headers});
    }
}