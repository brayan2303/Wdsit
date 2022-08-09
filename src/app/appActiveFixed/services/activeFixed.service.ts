import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ActiveFixedEntity } from '../entities/activeFixed.entity';




@Injectable({
    providedIn:'root'
})
export class ActiveFixedService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(activeFixedEntity:ActiveFixedEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'ActiveFixed/create',JSON.stringify(activeFixedEntity),{headers:headers});
    }
    public update(activeFixedEntity:ActiveFixedEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'ActiveFixed/update',JSON.stringify(activeFixedEntity),{headers:headers});
    }
    public updateAll(activeFixedEntity:ActiveFixedEntity[]):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'ActiveFixed/updateAll',JSON.stringify(activeFixedEntity),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'ActiveFixed/delete/'+id,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ActiveFixed/list',{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'ActiveFixed/findById/'+id);
    }
    public findAll(featuresId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'ActiveFixed/findAll/'+featuresId,{headers:headers});
    }
    public viewFeatures(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'ActiveFixed/viewFeatures/'+id,{headers:headers});
    }
   
    
}
