import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';

@Injectable({
    providedIn:'root'
})
export class TraTracingService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public findSystem(countryId:number,customer:string,serial:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'traTracing/findSystem/'+countryId+'/'+customer+'/'+serial,{headers:headers});
    }
    public findFase(countryId:number,customer:string,system:string,serial:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'traTracing/findFase/'+countryId+'/'+customer+'/'+system+'/'+serial,{headers:headers});
    }
    public findDetail(countryId:number,system:string,customer:string,fase:string,serialId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'traTracing/findDetail/'+countryId+'/'+system+'/'+customer+'/'+fase+'/'+serialId,{headers:headers});
    }
    public findTimeline(countryId:number,system:string,customer:string,serial:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'traTracing/findTimeline/'+countryId+'/'+system+'/'+customer+'/'+serial,{headers:headers});
    }
}