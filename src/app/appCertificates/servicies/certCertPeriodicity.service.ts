import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { CertPeriodicityEntity } from '../entities/certPeriodicityEntity.entity';



@Injectable({
    providedIn:'root'
})
export class CertCertPeriodicityService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(certificateId:number,periodicityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new CertPeriodicityEntity;
        body.certificateId=certificateId;
        body.periodicityId=periodicityId;
        
        return this.http.post<ResponseModel>(this.url+'certCertPeriodicity/create',JSON.stringify(body),{headers:headers});
    }

    public delete(certificateId:number,periodicityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        
        return this.http.delete<ResponseModel>(this.url+'certCertPeriodicity/delete/'+certificateId+'/'+periodicityId,{ headers: headers });
    }

    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'certCertPeriodicity/list',{headers:headers});
    }
}