import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenPositionEntity } from '../entities/genPosition.entity';

@Injectable({
    providedIn:'root'
})
export class GenPositionService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(genPositionEntity:GenPositionEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'genPosition/create',JSON.stringify(genPositionEntity),{ headers: headers });
    }
    public update(genPositionEntity:GenPositionEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'genPosition/update',JSON.stringify(genPositionEntity),{ headers: headers });
    }
    public delete(positionId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'genPosition/delete/'+positionId,{ headers: headers });
    }
    public findAll():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genPosition/findAll',{ headers: headers });
    }
    public findById(positionId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genPosition/findById/'+positionId,{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genPosition/list',{ headers: headers });
    }
}