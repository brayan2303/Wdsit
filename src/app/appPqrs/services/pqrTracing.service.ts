import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrTracingEntity } from "../entities/pqrTracing.entity";

@Injectable({
    providedIn:'root'
})
export class PqrTracingService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(pqrNumber:string,pqrTicket:string,pqrTypeId:number,type:string,eventStatusId:number,observations:string,userId:number):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        var body=new PqrTracingEntity();
        body.pqrNumber=pqrNumber;
        body.pqrTicket=pqrTicket;
        body.pqrTypeId=pqrTypeId;
        body.type=type;
        body.eventStatusId=eventStatusId;
        body.observations=observations;
        body.userId=userId;

        return this.http.post<ResponseModel>(this.url+'pqrTracing/create',JSON.stringify(body),{headers:headers});
    }
    public list(number:String):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'pqrTracing/list/'+number,{ headers: headers });
    }
}