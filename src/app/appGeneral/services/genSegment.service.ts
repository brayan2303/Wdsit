import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenSegmentEntity } from '../entities/genSegment.entity';

@Injectable({
    providedIn:'root'
})
export class GenSegmentService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(genSegmentEntity:GenSegmentEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'genSegment/create',JSON.stringify(genSegmentEntity),{ headers: headers });
    }
    public update(genSegmentEntity:GenSegmentEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'genSegment/update',JSON.stringify(genSegmentEntity),{ headers: headers });
    }
    public delete(segmentId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'genSegment/delete/'+segmentId,{ headers: headers });
    }
    public findByIncomeActive():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genSegment/findByIncomeActive',{ headers: headers });
    }
    public findById(segmentId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genSegment/findById/'+segmentId,{ headers: headers });
    }
    public findAll():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genSegment/findAll',{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genSegment/list',{ headers: headers });
    }
}