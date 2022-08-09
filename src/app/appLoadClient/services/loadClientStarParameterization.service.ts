import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { LoadClientStarParameterizationEntity } from '../entities/loadClientStarParameterization.entity';


@Injectable({
    providedIn:'root'
})
export class LoadClientStarParameterizationService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(LoadClientStarParameterizationE:LoadClientStarParameterizationEntity,userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'LoadClientStarParameterizationS/create/'+userId,JSON.stringify(LoadClientStarParameterizationE),{headers:headers});
    }
    public update(LoadClientStarParameterizationE:LoadClientStarParameterizationEntity, userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'LoadClientStarParameterizationS/update/'+userId,JSON.stringify(LoadClientStarParameterizationE),{headers:headers});
    }
    
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'LoadClientStarParameterizationS/delete/'+id,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientStarParameterizationS/list',{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'LoadClientStarParameterizationS/findById/'+id,{headers:headers});
    }

    public listCustomer():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientStarParameterizationS/listCustomer',{headers:headers});
    }
   
}