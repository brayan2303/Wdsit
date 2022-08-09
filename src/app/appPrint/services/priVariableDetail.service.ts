import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PriVariableDetailEntity } from "../entities/priVariableDetail.entity";

@Injectable({
    providedIn:'root'
})
export class PriVariableDetailService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(array:PriVariableDetailEntity[]):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'PriVariableDetailS/create',JSON.stringify(array),{headers:headers});
    }
    public update(array:PriVariableDetailEntity[]):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'PriVariableDetailS/update',JSON.stringify(array),{headers:headers});
    }
    public list(measurementDetailId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'PriVariableDetailS/list/'+measurementDetailId,{headers:headers});
    }
}