import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ActiveFixedProductEntity } from '../entities/ActiveFixedProduct.entity';



@Injectable({
    providedIn:'root'
})
export class ActiveFixedProductService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(activeFixedProductEntity:ActiveFixedProductEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        
        return this.http.post<ResponseModel>(this.url+'ActiveFixedProduct/create',JSON.stringify(activeFixedProductEntity),{headers:headers});
    }
    public update(activeFixedProductEntity:ActiveFixedProductEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'ActiveFixedProduct/update',JSON.stringify(activeFixedProductEntity),{headers:headers});
    }
    
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'ActiveFixedProduct/delete/'+id,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ActiveFixedProduct/list',{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'ActiveFixedProduct/findById/'+id);
    }
    
}
