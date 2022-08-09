import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ComCommodityEntryArticlesPreviousEntity } from '../entities/ComCommodityEntryArticlesPreviousEntity';


@Injectable({
    providedIn:'root'
})
export class ComCommodityEntryArticlePreviousService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    
    public create(comCommodityEntryArticlesPrevious:ComCommodityEntryArticlesPreviousEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'ComCommodityEntryArticlesPrevious/create',JSON.stringify(comCommodityEntryArticlesPrevious),{headers:headers});
    }
    
    
    public delete(articleId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'ComCommodityEntryArticlesPrevious/delete/'+articleId,{headers:headers});
    }
    
    public listByEntryId(entryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntryArticlesPrevious/listByEntryId/'+entryId,{headers:headers});
    }
}
