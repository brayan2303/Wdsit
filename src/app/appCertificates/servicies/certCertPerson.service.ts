import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { CertPeriodicityEntity } from '../entities/certPeriodicityEntity.entity';
import { CertPersonEntity } from '../entities/certPersonEntity.entity';



@Injectable({
    providedIn:'root'
})
export class CertCertPersonService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(personId:number,certificateId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new CertPersonEntity;
        body.certificateId=certificateId;
        body.personId=personId;
        
        return this.http.post<ResponseModel>(this.url+'certCertPerson/create',JSON.stringify(body),{headers:headers});
    }

    public delete(personId:number,certificateId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        
        return this.http.delete<ResponseModel>(this.url+'certCertPerson/delete/'+certificateId+'/'+personId,{ headers: headers });
    }

    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'certCertPerson/list',{headers:headers});
    }
}