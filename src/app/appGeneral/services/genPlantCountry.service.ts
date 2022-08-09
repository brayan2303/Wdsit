import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenPlantCountryEntity } from '../entities/genPlantCountry.entity';

@Injectable({
    providedIn:'root'
})
export class GenPlantCountryService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(plantId:number, countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new GenPlantCountryEntity();
        body.countryId=countryId;
        body.plantId=plantId;
        return this.http.post<ResponseModel>(this.url+'GenPlantCountryS/create',JSON.stringify(body),{ headers: headers });
    }
    public delete(plantId:number,countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'GenPlantCountryS/delete/'+countryId+'/'+plantId,{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'GenPlantCountryS/list' ,{ headers: headers });
    }
    public findAll(plantId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'GenPlantCountryS/findAll/'+plantId,{ headers: headers });
    }
}