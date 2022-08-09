import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenCityEntity } from '../entities/genCity.entity';

@Injectable({
    providedIn:'root'
})
export class GenCityService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(genCityEntity:GenCityEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'genCity/create',JSON.stringify(genCityEntity),{ headers: headers });
    }
    public update(genCityEntity:GenCityEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'genCity/update',JSON.stringify(genCityEntity),{ headers: headers });
    }
    public delete(cityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'genCity/delete/'+cityId,{ headers: headers });
    }
    public listActive(departmentId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genCity/listActive/'+departmentId,{ headers: headers });
    }
    public findById(cityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genCity/findById/'+cityId,{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genCity/list',{ headers: headers });
    }
    public listByCountry(countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genCity/findByCountryId/'+countryId,{ headers: headers });
    }
}