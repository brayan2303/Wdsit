import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenCountryAbbreviationEntity } from '../entities/genCountryAbbreviation.entity';

@Injectable({
    providedIn:'root'
})
export class GenCountryAbbreviationService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(genCountryAbbreviationEntity:GenCountryAbbreviationEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'GenCountryAbbreviationS/create',JSON.stringify(genCountryAbbreviationEntity),{ headers: headers });
    }
    public update(genCountryAbbreviationEntity:GenCountryAbbreviationEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'GenCountryAbbreviationS/update',JSON.stringify(genCountryAbbreviationEntity),{ headers: headers });
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'GenCountryAbbreviationS/delete/'+id,{ headers: headers });
    }

    public findById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'GenCountryAbbreviationS/findById/'+id,{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'GenCountryAbbreviationS/list',{ headers: headers });
    }
}