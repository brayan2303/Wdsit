import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenCustomerEntity } from '../entities/genCustomer.entity';

@Injectable({
    providedIn:'root'
})
export class GenCustomerService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(genCustomerEntity:GenCustomerEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'genCustomer/create',JSON.stringify(genCustomerEntity),{ headers: headers });
    }
    public update(genCustomerEntity:GenCustomerEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'genCustomer/update',JSON.stringify(genCustomerEntity),{ headers: headers });
    }
    public delete(customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'genCustomer/delete/'+customerId,{ headers: headers });
    }
    public findAll():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genCustomer/findAll',{ headers: headers });
    }
    public findById(customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genCustomer/findById/'+customerId,{ headers: headers });
    }
    public findByIncomeActive():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genCustomer/findByIncomeActive',{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genCustomer/list',{ headers: headers });
    }
}