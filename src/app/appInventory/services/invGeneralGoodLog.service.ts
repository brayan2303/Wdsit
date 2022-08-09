import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvGeneralGoodLogEntity } from "../entities/InvGeneralGoodLog.entity";

@Injectable({
    providedIn:'root'
})
export class InvGeneralGoodLogService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(userId:number, partNumber:string, location:string, warehouse:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new InvGeneralGoodLogEntity()
        body.userId=userId;
        body.partNumber=partNumber;
        body.location=location;
        body.warehouse=warehouse;
        return this.http.post<ResponseModel>(this.url+'InvGeneralGoodLogS/create',JSON.stringify(body),{ headers: headers });
    }
}