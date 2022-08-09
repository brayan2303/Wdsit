import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrLanguageEntity } from '../entities/pqrLanguage.entity';
import { PqrFormLawEntity } from '../entities/PqrFormLaw.entity';
import { PqrFomModalEntity } from '../entities/pqrFomModal.entity';


@Injectable({
    providedIn:'root'
})
export class PqrFomModalService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(PqrFomModalEntity:PqrFomModalEntity, countrId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'PqrFomModalS/create/'+countrId,JSON.stringify(PqrFomModalEntity),{headers:headers});
    }
    public update(PqrFomModalEntity:PqrFomModalEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'PqrFomModalS/update',JSON.stringify(PqrFomModalEntity),{headers:headers});
    }
    
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'PqrFomModalS/delete/'+id,{headers:headers});
    }
    
    public list(countrId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'PqrFomModalS/list/'+countrId,{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrFomModalS/findById/'+id,{headers:headers});
    }
    public findByUserId(id:number, countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrFomModalS/findByUserId/'+id+'/'+countryId,{headers:headers});
    }
   
}