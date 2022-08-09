import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';


@Injectable({
    providedIn:'root'
})
export class ScpResultService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    
    public resultCrossing(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'ScpResultS/resultCrossing/'+id);
    }
    public resultSerial(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'ScpResultS/resultSerial/'+id);
    }
    public resultLevel(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'ScpResultS/resultLevel/'+id);
    }
  
}
