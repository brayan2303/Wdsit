import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ComCommodityEntryEntity } from '../entities/ComCommodityEntryEntity';
import { ComCustomerEntity } from '../entities/ComCustomerEntity';


@Injectable({
    providedIn:'root'
})
export class ComCustomertService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    
    public create(userId:number,comCustomer:ComCustomerEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'comCustomer/create/'+ userId,JSON.stringify(comCustomer),{headers:headers});
    }

    public update(comCustomerId:number,comCustomer:ComCustomerEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'comCustomer/update/'+comCustomerId,JSON.stringify(comCustomer),{headers:headers});
    }

    public delete(comCustomerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'comCustomer/delete/'+comCustomerId,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'comCustomer/list',{headers:headers});
    }

}
