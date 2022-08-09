import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ActiveFixedProfeaturEntity } from '../entities/ActiveFixedProfeatur.entity';



@Injectable({
    providedIn:'root'
})
export class ActiveFixedProfeaturService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(productId:number,featuresId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new ActiveFixedProfeaturEntity;
        body.productId=productId;
        body.featuresId=featuresId;
        
        return this.http.post<ResponseModel>(this.url+'ActiveFixedProfeatur/create',JSON.stringify(body),{headers:headers});
    }

    public delete(productId:number,featuresId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'ActiveFixedProfeatur/delete/'+featuresId+'/'+productId,{ headers: headers });
    }

    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ActiveFixedProfeatur/list',{headers:headers});
    }
}