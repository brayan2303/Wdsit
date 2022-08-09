import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";
import { LoadClientPersonHistoryEntity } from "../entities/loadClientPersonHistory.entity";

@Injectable({
    providedIn: 'root'
})
export class LoadClientPersonHistoryService {
    private url: string;
    constructor(private http: HttpClient) {
       this.url=environment.apiIq09;
    //this.url=environment.api;
    } 
    public create(userId:number,customerId:number,):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new LoadClientPersonHistoryEntity
        body.userId = userId;
        body.customerId = customerId;
        return this.http.post<ResponseModel>(this.url+'LoadClientPersonHistory/create',JSON.stringify(body),{headers:headers});
    }
    public list(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'LoadClientPersonHistory/list/', { headers: headers });
    }
}