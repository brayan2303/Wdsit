import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { LoadPersonCustomerEntity } from '../entities/loadPeronCustomer.entity';



@Injectable({
    providedIn:'root'
})
export class LoadPersonCustomerService{
    
    private url:string;

    constructor(private http:HttpClient){
    this.url=environment.api;
        //this.url=environment.apiIq09;
    }
    public create(personId:number,customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new LoadPersonCustomerEntity;
        body.personId=personId;
        body.customerId=customerId;
        
        return this.http.post<ResponseModel>(this.url+'LoadPersonCustomer/create',JSON.stringify(body),{headers:headers});
    }

    public delete(personId:number,customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'LoadPersonCustomer/delete/'+personId+'/'+customerId,{ headers: headers });
    }

    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadPersonCustomer/list',{headers:headers});
    }
    public findAll(personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'LoadPersonCustomer/findAll/'+personId,{headers:headers});
    }

    public findCustomerByPersonId(personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'LoadPersonCustomer/findCustomerByPersonId/'+personId,{headers:headers});
    }
    public findCustomerByPersonIdList(personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'LoadPersonCustomer/findCustomerByPersonIdList/'+personId,{headers:headers});
    }
}