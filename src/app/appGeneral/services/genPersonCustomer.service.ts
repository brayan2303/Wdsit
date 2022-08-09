import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenPersonCustomerEntity } from '../entities/genPersonCustomer.entity';

@Injectable({
    providedIn:'root'
})
export class GenPersonCustomerService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(personId:number,customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new GenPersonCustomerEntity();
        body.personId=personId;
        body.customerId=customerId;

        return this.http.post<ResponseModel>(this.url+'genPersonCustomer/create',JSON.stringify(body),{ headers: headers });
    }
    public delete(personId:number,customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'genPersonCustomer/delete/'+personId+'/'+customerId,{ headers: headers });
    }
    public list(personId:number,countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'genPersonCustomer/list/'+personId+'/'+countryId,{ headers: headers });
    }
    public listCustomer(personId:number,countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'genPersonCustomer/listCustomer/'+personId+'/'+countryId,{ headers: headers });
    }
}