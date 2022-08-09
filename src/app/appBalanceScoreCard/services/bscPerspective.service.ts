import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscPerspectiveEntity } from '../entities/bscPerspective.entity';

@Injectable({
    providedIn:'root'
})
export class BscPerspectiveService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(bscPerspectiveEntity:BscPerspectiveEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'bscPerspective/create',JSON.stringify(bscPerspectiveEntity),{headers:headers});
    }
    public update(bscPerspectiveEntity:BscPerspectiveEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscPerspective/update',JSON.stringify(bscPerspectiveEntity),{headers:headers});
    }
    public delete(perspectiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscPerspective/delete/'+perspectiveId,{headers:headers});
    }
    public list(year:number,countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscPerspective/list/'+year+'/'+countryId,{headers:headers});
    }
    public listActive(year:number,personId:number,countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscPerspective/listActive/'+year+'/'+personId+'/'+countryId,{headers:headers});
    }
    public total(year:number,countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscPerspective/total/'+year+'/'+countryId,{headers:headers});
    }
    public percentage(year:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscPerspective/percentage/'+year,{headers:headers});
    }
    public percentageMonth(perspectiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscPerspective/percentageMonth/'+perspectiveId,{headers:headers});
    }
}