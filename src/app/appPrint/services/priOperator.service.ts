import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PriVariableEntity } from '../entities/priVariable.entity';
import { PriOperatorEntity } from '../entities/priOperator.entity';




@Injectable({
    providedIn:'root'
})
export class PriOperatorService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(priOperatorEntity:PriOperatorEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        
        return this.http.post<ResponseModel>(this.url+'PriOperatorS/create',JSON.stringify(priOperatorEntity),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'PriOperatorS/delete/'+id,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'PriOperatorS/list',{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'PriOperatorS/findById/'+id);
    }
    
}