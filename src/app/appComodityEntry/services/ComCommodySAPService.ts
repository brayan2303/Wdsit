import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';


@Injectable({
    providedIn:'root'
})
export class ComCommodySAPService{
    
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.apiAPIS;
    }
    public create(numberEntry:any):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        
        return this.http.post<ResponseModel>(this.url,JSON.stringify(numberEntry),{headers:headers});
    }


}
