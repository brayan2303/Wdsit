import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';

@Injectable({
    providedIn:'root'
})
export class PriUnreadableService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(countryId:number,customerId:number,creationUserId:number,quantity:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'priUnreadable/create/'+countryId+'/'+customerId+'/'+creationUserId+'/'+quantity,{headers:headers});
    }
    public list(countryId:number,customerId:number,creationUserId:number,quantity:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'priUnreadable/list/'+countryId+'/'+customerId+'/'+creationUserId+'/'+quantity,{headers:headers});
    }
}