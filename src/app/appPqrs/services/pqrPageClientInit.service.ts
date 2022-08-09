import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrPageClientInitEntity } from '../entities/pqrPageClientInit.entity';


@Injectable({
    providedIn:'root'
})
export class PqrPageClientInitService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(PqrPageClientInitEntity:PqrPageClientInitEntity, countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'PqrPageClientInitS/create/'+countryId,JSON.stringify(PqrPageClientInitEntity),{headers:headers});
    }
    public update(PqrPageClientInitEntity:PqrPageClientInitEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'PqrPageClientInitS/update',JSON.stringify(PqrPageClientInitEntity),{headers:headers});
    }
    
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'PqrPageClientInitS/delete/'+id,{headers:headers});
    }
    
    public list(countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'PqrPageClientInitS/list/'+countryId,{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrPageClientInitS/findById/'+id,{headers:headers});
    }
    public findByUserId(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrPageClientInitS/findByUserId/'+id,{headers:headers});
    }
   
   
}