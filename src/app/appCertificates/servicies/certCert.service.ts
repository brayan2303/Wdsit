import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { CertEntity } from '../entities/certEntity.entity';


@Injectable({
    providedIn:'root'
})
export class CertCertService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(certEntity:CertEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'certCert/create',JSON.stringify(certEntity),{headers:headers});
    }
    public update(certEntity:CertEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'certCert/update',JSON.stringify(certEntity),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'certCert/delete/'+id,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'certCert/list',{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'certCert/findById/'+id);
    }
    public findAll(personId:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'certCert/findAll/'+personId);
    }
    public findAllByPersonId(personId:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'certCert/findAllByPersonId/'+personId);
    }
    public listFile(yearId:number, certId:number,periodicityId:number, monthId:number, userId:number ):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'certCert/listFile/'+yearId + '/' +certId + '/' + periodicityId + '/' + monthId + '/' + userId);
    }
    
}
