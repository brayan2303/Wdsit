import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';


@Injectable({
    providedIn:'root'
})
export class ComCommodityIntegrationCantService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public list(pallet:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityIntegrationCantS/list/'+pallet,{headers:headers});
    }

    public sapCodeList(customerId:number, countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityIntegrationCantS/sapCodeList/'+customerId+ '/' +countryId,{headers:headers});
    }
    
}
