import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenCenterCostEntity } from '../entities/genCenterCost.entity';

@Injectable({
    providedIn:'root'
})
export class GenCenterCostService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(genCenterCostEntity:GenCenterCostEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'genCenterCost/create',JSON.stringify(genCenterCostEntity),{ headers: headers });
    }
    public update(genCenterCostEntity:GenCenterCostEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'genCenterCost/update',JSON.stringify(genCenterCostEntity),{ headers: headers });
    }
    public delete(genCenterCostId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'genCenterCost/delete/'+genCenterCostId,{ headers: headers });
    }
    public findAll():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genCenterCost/findAll',{ headers: headers });
    }
    public findBySegmentId(segmentId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genCenterCost/findBySegmentId/'+segmentId,{ headers: headers });
    }
    public findById(centerCostId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genCenterCost/findById/'+centerCostId,{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genCenterCost/list',{ headers: headers });
    }
}