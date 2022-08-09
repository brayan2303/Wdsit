import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenProfileEntity } from '../entities/genProfile.entity';

@Injectable({
    providedIn:'root'
})
export class GenProfileService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(name:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'genProfile/create',name,{ headers: headers });
    }
    public update(genProfileModel:GenProfileEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'genProfile/update',JSON.stringify(genProfileModel),{ headers: headers });
    }
    public delete(profileId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'genProfile/delete/'+profileId,{ headers: headers });
    }
    public findAll():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genProfile/findAll',{ headers: headers });
    }
    public findById(profileId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genProfile/findById/'+profileId,{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genProfile/list',{ headers: headers });
    }
}