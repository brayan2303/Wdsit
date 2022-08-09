import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ComCommodityEntrySapB1Entity } from '../entities/ComCommodityEntrySapB1Entity';


@Injectable({
    providedIn:'root'
})
export class ComCommodityEntrySapB1Service{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    
    public locationList(customerId:number, countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntry/load/locationList/'+customerId+'/'+countryId,{headers:headers});
    }

    public findEntryId(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntry/load/findByEntryId/'+id,{headers:headers});
    }

    public addEntry(data:any):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'ComCommodityEntry/load/addEntryToSap',JSON.stringify(data),{headers:headers});
    }

    public create(envio:ComCommodityEntrySapB1Entity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'ComCommodityEntry/load/create',JSON.stringify(envio),{headers:headers});
    }

    public update(envio:any):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'ComCommodityEntry/load/update',JSON.stringify(envio),{headers:headers});
    }
}
