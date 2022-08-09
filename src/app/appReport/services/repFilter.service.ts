import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { RepFilterEntity } from '../entities/repFilter.entity';

@Injectable({
    providedIn:'root'
})
export class RepFilterService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(repFilterEntity:RepFilterEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'repFilter/create',JSON.stringify(repFilterEntity),{ headers: headers });
    }
    public update(repFilterEntity:RepFilterEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'repFilter/update',JSON.stringify(repFilterEntity),{ headers: headers });
    }
    public delete(filterId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'repFilter/delete/'+filterId,{ headers: headers });
    }
    public findByReportId(reportId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'repFilter/findByReportId/'+reportId,{ headers: headers });
    }
    public list(reportId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'repFilter/list/'+reportId,{ headers: headers });
    }
    public findQuery(query:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'repFilter/findQuery/'+query,{ headers: headers });
    }
}