import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrMasterEntity } from '../entities/pqrMaster.entity';

@Injectable({
    providedIn:'root'
})
export class PqrMasterService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(pqrMasterEntity:PqrMasterEntity, countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'pqrMaster/create/'+countryId,JSON.stringify(pqrMasterEntity),{ headers: headers });
    }
    public update(pqrMasterEntity:PqrMasterEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'pqrMaster/update',JSON.stringify(pqrMasterEntity),{ headers: headers });
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'pqrMaster/delete/'+id,{ headers: headers });
    }
    public findAll(masterType:string, countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'pqrMaster/findAll/'+masterType +'/'+countryId,{ headers: headers });
    }
    public findId(masterType:string,name:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'pqrMaster/findId/'+masterType+'/'+name,{ headers: headers });
    }
    public list(countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'pqrMaster/list/'+countryId,{ headers: headers });
    }
}
