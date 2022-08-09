import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ComCommodityEntryEntity } from '../entities/ComCommodityEntryEntity';


@Injectable({
    providedIn:'root'
})
export class ComCommodityEntryService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    
    public create(userId:number,countryId:number, customerId:number,comCommodityEntry:ComCommodityEntryEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'ComCommodityEntry/create/'+ userId +'/'+countryId+'/'+customerId,JSON.stringify(comCommodityEntry),{headers:headers});
    }

    public createPreAlert(customerId:number,userId:number,comCommodityEntry:ComCommodityEntryEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'ComCommodityEntry/createPreAlert/'+ customerId +'/' + userId,JSON.stringify(comCommodityEntry),{headers:headers});
    }

    public update(comCommodityEntryId:number,comCommodityEntry:ComCommodityEntryEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'ComCommodityEntry/update/'+comCommodityEntryId,JSON.stringify(comCommodityEntry),{headers:headers});
    }

    public updatePreAlert(comCommodityEntryId:number,comCommodityEntry:ComCommodityEntryEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'ComCommodityEntry/updatePreAlert/'+comCommodityEntryId,JSON.stringify(comCommodityEntry),{headers:headers});
    }

    public closeEntry(entryId:number, userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'ComCommodityEntry/closeEntry/'+entryId+'/'+userId,{headers:headers});
    }

    public approvedEntry(entryId:number, userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'ComCommodityEntry/approvedEntry/'+entryId+'/'+userId,{headers:headers});
    }
    
    public delete(entryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'ComCommodityEntry/delete/'+entryId,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntry/list',{headers:headers});
    }

    public sapList(sapId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntry/sapList/'+sapId,{headers:headers});
    }

    public listToSap(customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntry/listToSap/'+customerId,{headers:headers});
    }

    public listActiveEntry():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntry/listActiveEntry',{headers:headers});
    }

    public listApproved():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntry/listApproved',{headers:headers});
    }

    public listActive():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntry/listActive',{headers:headers});
    }   

    public listPreAlert():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntry/listPreAlert',{headers:headers});
    }

    public listByUserId(userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntry/listByUserId/'+userId,{headers:headers});
    }
    
    public originList(countryId:number, customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntry/originList/'+countryId+'/'+customerId,{headers:headers});
    }

    public locationList(customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntry/locationList/'+customerId,{headers:headers});
    }

    public originTypeList(countryId:number, customerId:number,origin:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntry/originTypeList/'+origin+'/'+countryId+'/'+customerId,{headers:headers});
    }

    public getPallet(codeEntry:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntry/generatePallet/'+codeEntry,{headers:headers});
    }

    public findByPallet(entrySapB1Id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ComCommodityEntry/findByPallet/'+entrySapB1Id,{headers:headers});
    }
    
}
