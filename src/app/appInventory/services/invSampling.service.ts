import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvSamplingEntity } from '../entities/invSampling.entity';

@Injectable({
    providedIn:'root'
})
export class InvSamplingService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(cycliId:number,value:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new InvSamplingEntity();
        body.cyclicId=cycliId;
        body.value=value;

        return this.http.post<ResponseModel>(this.url+'invSampling/create',JSON.stringify(body),{ headers: headers });
    }
    public delete(cyclicId:number,value:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'invSampling/delete/'+cyclicId+'/'+value,{ headers: headers });
    }
    public findAll(cyclicId:number,system:string,typeSampling:string,type:string,customer:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invSampling/findAll/'+cyclicId+'/'+system+'/'+typeSampling+'/'+type+'/'+customer,{ headers: headers });
    }
}