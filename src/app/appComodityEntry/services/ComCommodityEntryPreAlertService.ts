import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';


@Injectable({
    providedIn:'root'
})
export class ComCommodityEntryPreAlertService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public load(comCommodityEntryId:number,file:File):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<ResponseModel>(this.url+'ComCommodityEntryLoadArticles/validate/'+comCommodityEntryId,formData);
    }

    public charge(comCommodityEntryId:number, userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'ComCommodityEntryLoadArticles/charge/'+comCommodityEntryId+'/'+userId,{headers:headers});
    }

    public chargeLoad(comCommodityEntryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'ComCommodityEntryLoadArticles/chargeLoad/'+comCommodityEntryId,{headers:headers});
    }
    
    public listByEntryId(entryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntryLoadArticles/listByEntryId/'+entryId,{headers:headers});
    }

}
