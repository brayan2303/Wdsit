import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { CertPeriodicityEntity } from '../entities/certPeriodicityEntity.entity';
import { CertPeriodicityMonthEntity } from '../entities/certPeriodicityMonthEntity.entity';



@Injectable({
    providedIn:'root'
})
export class CertPeriodicityMonthService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(periodicityId:number,monthId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new CertPeriodicityMonthEntity;
        body.periodicityId=periodicityId;
        body.monthId=monthId;
        
        return this.http.post<ResponseModel>(this.url+'certPeriodicityMonth/create',JSON.stringify(body),{headers:headers});
    }

    public delete(periodicityId:number,monthId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        
        return this.http.delete<ResponseModel>(this.url+'certPeriodicityMonth/delete/'+periodicityId+'/'+monthId,{ headers: headers });
    }

    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'certPeriodicityMonth/list',{headers:headers});
    }
}