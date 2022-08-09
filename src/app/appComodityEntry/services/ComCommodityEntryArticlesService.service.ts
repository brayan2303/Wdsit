import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ComCommodityEntryArticlesPreviousEntity } from '../entities/ComCommodityEntryArticlesPreviousEntity';
import { ComCommodityEntryArticlesEntity } from '../entities/ComCommodityEntryArticlesEntity';


@Injectable({
    providedIn:'root'
})
export class ComCommodityEntryArticlesService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    
    public listByEntryId(entryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntryArticles/listByEntryId/'+entryId,{headers:headers});
    }

    public listByEntryNumber(entryNumber:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntryArticles/listByEntryNumber/'+entryNumber,{headers:headers});
    }

    public update(entryArticles:ComCommodityEntryArticlesEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'ComCommodityEntryArticles/update', JSON.stringify(entryArticles) ,{headers:headers});
    }
}
