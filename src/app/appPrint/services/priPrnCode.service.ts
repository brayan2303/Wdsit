import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PriPrnCodeEntity } from '../entities/priPrnCode.entity';

@Injectable({
    providedIn:'root'
})
export class PriPrnCodeService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(priPrnCodeEntity:PriPrnCodeEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'priPrnCode/create',JSON.stringify(priPrnCodeEntity),{headers:headers});
    }
    public update(priPrnCodeEntity:PriPrnCodeEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'priPrnCode/update',JSON.stringify(priPrnCodeEntity),{headers:headers});
    }
    public delete(prnCodeId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'priPrnCode/delete/'+prnCodeId,{headers:headers});
    }
    public findByLabelId(labelId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'priPrnCode/findByLabelId/'+labelId,{headers:headers});
    }
}