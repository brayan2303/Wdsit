import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvCyclicEntity } from '../entities/invCyclic.entity';

@Injectable({
    providedIn:'root'
})
export class InvCyclicService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(invCyclicEntity:InvCyclicEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'invCyclic/create',JSON.stringify(invCyclicEntity),{ headers: headers });
    }
    public update(invCyclicEntity:InvCyclicEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'invCyclic/update',JSON.stringify(invCyclicEntity),{ headers: headers });
    }
    public delete(cyclicId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'invCyclic/delete/'+cyclicId,{ headers: headers });
    }
    public approveReject(cyclicId:number,status:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'invCyclic/approveReject/'+cyclicId+'/'+status,{ headers: headers });
    }
    public findById(cyclicId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCyclic/findById/'+cyclicId,{ headers: headers });
    }
    public findLocation(cyclicId:number,system:string,typeSampling:string,type:string,customer:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCyclic/findLocation/'+cyclicId+'/'+system+'/'+typeSampling+'/'+type+'/'+customer,{ headers: headers });
    }
    public list(customerId:number,personId:number,type:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCyclic/list/'+customerId+'/'+personId+'/'+type,{ headers: headers });
    }
    public listByCustomerId(customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCyclic/listByCustomerId/'+customerId,{ headers: headers });
    }
    public totalPallets(cyclicId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCyclic/totalPallets/'+cyclicId,{ headers: headers });
    }
    public totalSerials(cyclicId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCyclic/totalSerials/'+cyclicId,{ headers: headers });
    }
    public totalAccesories(cyclicId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCyclic/totalAccesories/'+cyclicId,{ headers: headers });
    }
    public samplingPallets(cyclicId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCyclic/samplingPallets/'+cyclicId,{ headers: headers });
    }
    public samplingSerials(cyclicId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCyclic/samplingSerials/'+cyclicId,{ headers: headers });
    }
    public samplingAccesories(cyclicId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCyclic/samplingAccesories/'+cyclicId,{ headers: headers });
    }
    public audited(cyclicId:number,type:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCyclic/audited/'+cyclicId+'/'+type,{ headers: headers });
    }
    public layout(system:string,customer:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCyclic/layout/'+system+'/'+customer,{ headers: headers });
    }
    public locationCouting(cyclicId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCyclic/locationCouting/'+cyclicId,{ headers: headers });
    }
    public sapCodeSerial(cyclicId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCyclic/sapCodeSerial/'+cyclicId,{ headers: headers });
    }
}