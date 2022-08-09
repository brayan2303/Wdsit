import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn:'root'
})
export class ScpCrossingWdsitService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(serial:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'ScpCrossingWdsitS/create',JSON.stringify(serial),{headers:headers});
    }

}