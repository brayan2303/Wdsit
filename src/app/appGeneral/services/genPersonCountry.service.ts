import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenPersonCountryEntity } from '../entities/genPersonCountry.entity';

@Injectable({
    providedIn:'root'
})
export class GenPersonCountryService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(personId:number,countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new GenPersonCountryEntity();
        body.personId=personId;
        body.countryId=countryId;

        return this.http.post<ResponseModel>(this.url+'genPersonCountry/create',JSON.stringify(body),{ headers: headers });
    }
    public delete(personId:number,countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'genPersonCountry/delete/'+personId+'/'+countryId,{ headers: headers });
    }
    public list(personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'genPersonCountry/list/'+personId,{ headers: headers });
    }
    public listCountry(personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'genPersonCountry/listCountry/'+personId,{ headers: headers });
    }
}