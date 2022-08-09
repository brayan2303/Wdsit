import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrFormLawEntity } from '../entities/PqrFormLaw.entity';


@Injectable({
    providedIn:'root'
})
export class PqrFormTableService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(PqrFormLawEntity:PqrFormLawEntity, countrId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'PqrFormTableS/create/'+countrId,JSON.stringify(PqrFormLawEntity),{headers:headers});
    }
    public update(PqrFormLawEntity:PqrFormLawEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'PqrFormTableS/update',JSON.stringify(PqrFormLawEntity),{headers:headers});
    }
    
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'PqrFormTableS/delete/'+id,{headers:headers});
    }
    
    public list(countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'PqrFormTableS/list/'+countryId,{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrFormTableS/findById/'+id,{headers:headers});
    }
    public findByUserId(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrFormTableS/findByUserId/'+id,{headers:headers});
    }
   
   
}