import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenCountryEntity } from '../entities/genCountry.entity';

@Injectable({
    providedIn:'root'
})
export class GenCountryService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(genCountryEntity:GenCountryEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'genCountry/create',JSON.stringify(genCountryEntity),{ headers: headers });
    }
    public update(genCountryEntity:GenCountryEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'genCountry/update',JSON.stringify(genCountryEntity),{ headers: headers });
    }
    public delete(countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'genCountry/delete/'+countryId,{ headers: headers });
    }
    public findById(countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'genCountry/findById/'+countryId,{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'genCountry/list',{ headers: headers });
    }
    public listActive():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'genCountry/listActive',{ headers: headers });
    }
}