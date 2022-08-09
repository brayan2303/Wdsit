import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ComCommodityEntryEntity } from '../entities/ComCommodityEntryEntity';
import { ComCommodityEntryArticlesEntity } from '../entities/ComCommodityEntryArticlesEntity';


@Injectable({
    providedIn:'root'
})
export class ComCommodityEntryArticleService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    
    public create(numberEntry:string,commodityEntryId:number,userId:number,comCommodityEntryArticles:ComCommodityEntryArticlesEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'ComCommodityEntryArticle/create/'+ numberEntry + '/' + commodityEntryId+'/'+userId,JSON.stringify(comCommodityEntryArticles),{headers:headers});
    }
    public update(articleId:number,comCommodityEntryArticles:ComCommodityEntryEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'ComCommodityEntryArticle/update/'+articleId,JSON.stringify(comCommodityEntryArticles),{headers:headers});
    }
    
    public delete(articleId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'ComCommodityEntryArticle/delete/'+articleId,{headers:headers});
    }
    
    public listByCommodityId(commodityEntryId:number, numberEntry:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntryArticle/listByCommodity/'+commodityEntryId+'/'+numberEntry,{headers:headers});
    }

    public codeEntryPreAlert():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntryArticle/codeEntryPreAlert',{headers:headers});
    }

    public codeEntryManual(entryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntryArticle/codeEntryManual/'+entryId,{headers:headers});
    }

    public listSapCode(comCommodityEntryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntryArticle/listSapCode/'+comCommodityEntryId,{headers:headers});
    }

    public getPallet(codeEntry:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntryArticle/generatePallet/'+codeEntry,{headers:headers});
    }
    
}
