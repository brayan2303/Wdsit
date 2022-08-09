import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';

@Injectable({
    providedIn:'root'
})
export class IncIncomeControlService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(json):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'incIncomeControl/create',json,{ headers: headers });
    }
    public findLast(personId:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'incIncomeControl/findLast/'+personId);
    }
    public update(personId:number):Observable<ResponseModel>{
        var params=new HttpParams().set('personId',personId.toString());
        return this.http.put<ResponseModel>(this.url+'incIncomeControl/update',params);
    }
}