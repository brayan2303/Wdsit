import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenCountryCustomerEntity } from '../entities/genCountryCustomer.entity';

@Injectable({
    providedIn:'root'
})
export class GenCountryCustomerService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(countryId:number,customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new GenCountryCustomerEntity();
        body.countryId=countryId;
        body.customerId=customerId;

        return this.http.post<ResponseModel>(this.url+'genCountryCustomer/create',JSON.stringify(body),{ headers: headers });
    }
    public delete(countryId:number,customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'genCountryCustomer/delete/'+countryId+'/'+customerId,{ headers: headers });
    }
    public list(countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genCountryCustomer/list/'+countryId,{ headers: headers });
    }
    public listCustomer(countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genCountryCustomer/listCustomer/'+countryId,{ headers: headers });
    }
}