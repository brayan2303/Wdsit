import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ComCommodityEntryArticlesLogEntity } from '../entities/ComCommodityEntryArticlesLogEntity';


@Injectable({
    providedIn:'root'
})
export class ComCommodityEntryArticlesLogService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    
    public create(articlesLog:ComCommodityEntryArticlesLogEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'ComCommodityEntryArticlesLog/create',JSON.stringify(articlesLog),{headers:headers});
    }
}
