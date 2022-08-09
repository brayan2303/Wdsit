import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvPalletEntity } from '../entities/invPallet.entity';
import { InvPalletModel } from "../models/invPallet.model";

@Injectable({
    providedIn:'root'
})
export class InvPalletService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(cycliId:number,pallet:string,sapCode:string,location:string,type:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new InvPalletEntity();
        body.cyclicId=cycliId;
        body.pallet=pallet;
        body.sapCode=sapCode;
        body.location=location;
        body.type=type;

        return this.http.post<ResponseModel>(this.url+'invPallet/create',JSON.stringify(body),{ headers: headers });
    }
    public delete(cyclicId:number,number:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'invPallet/delete/'+cyclicId+'/'+number,{ headers: headers });
    }
    public approveReject(cyclicPalletId:number,status:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'invPallet/approveReject/'+cyclicPalletId+'/'+status,{ headers: headers });
    }
    public find(cyclicId:number,number:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invPallet/find/'+cyclicId+'/'+number,{ headers: headers });
    }
    public findAll(cyclicId:number,system:string,typeSampling:string,type:string,customer:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invPallet/findAll/'+cyclicId+'/'+system+'/'+typeSampling+'/'+type+'/'+customer,{ headers: headers });
    }
    public findPending(cyclicId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invPallet/findPending/'+cyclicId,{ headers: headers });
    }
    public findSerials(cyclicId:number,system:string,type:string,number:string,customer:string,option:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invPallet/findSerials/'+cyclicId+'/'+system+'/'+type+'/'+number+'/'+customer+'/'+option,{ headers: headers });
    }
    public findCouting(palletId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invPallet/findCouting/'+palletId,{ headers: headers });
    }
    public list(cyclicId:number,system:string,type:string,customer:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invPallet/list/'+cyclicId+'/'+system+'/'+type+'/'+customer,{ headers: headers });
    }
    public listAll(cyclicId:number,system:string,customer:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invPallet/listAll/'+cyclicId+'/'+system+'/'+customer,{ headers: headers });
    }
    public print(customer:string,status:String,invPalletModel:InvPalletModel):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'invPallet/print/'+customer+'/'+status,JSON.stringify(invPalletModel),{ headers: headers });
    }
}