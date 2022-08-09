import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})
export class MeeTopicService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public list(periodicity:string):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.get<ResponseModel>(this.url+'meeTopic/list/'+periodicity,{headers:headers});
    }
}