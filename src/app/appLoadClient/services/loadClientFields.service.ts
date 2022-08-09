import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { LoadClientStarParameterizationEntity } from '../entities/loadClientStarParameterization.entity';
import { LoadClientFieldsEntity } from '../entities/loadClientFields.entity';


@Injectable({
    providedIn:'root'
})
export class LoadClientFieldsService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(name:string,codigo:string,parametrizationId:number, userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new LoadClientFieldsEntity();
        body.name = name;
        body.codigo = codigo;
        body.parametrizationId = parametrizationId;
        body.userId = userId;
        return this.http.post<ResponseModel>(this.url+'LoadClientFieldsS/create/'+userId,JSON.stringify(body),{headers:headers});
    }
    public update(id:number,name:string,codigo:string, active:boolean,userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new LoadClientFieldsEntity();
        body.id = id;
        body.name = name;
        body.codigo = codigo;
        body.active = active;
        body.userId = userId;
        return this.http.put<ResponseModel>(this.url+'LoadClientFieldsS/update/'+userId,JSON.stringify(body),{headers:headers});
    }
    
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'LoadClientFieldsS/delete/'+id,{headers:headers});
    }
    
    public list(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientFieldsS/list/'+id,{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'LoadClientFieldsS/findById/'+id,{headers:headers});
    }

    public listCustomer():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientFieldsS/listCustomer',{headers:headers});
    }
   
}