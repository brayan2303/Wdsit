import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";
import { ScpCrossingWmsEntity } from "../../entities/scpCrossingWms.entity";



@Injectable({
    providedIn:'root'
})
export class ScpCrossingWmsService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(serial:string, pallet:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new ScpCrossingWmsEntity()
        body.pallet=pallet;
        body.serial=serial;
     
        return this.http.post<ResponseModel>(this.url+'ScpCrossingWmsS/create',JSON.stringify(body),{headers:headers});
    }
    public listCrossing(auditPreviousId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'ScpCrossingWmsS/listCrossing/'+auditPreviousId,{headers:headers});
    }
    public listCrossingCount(auditPreviousId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'ScpCrossingWmsS/listCrossingCount/'+auditPreviousId,{headers:headers});
    }

}