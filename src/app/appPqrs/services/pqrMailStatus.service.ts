import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrMailStatusEntity } from '../entities/pqrMailStatus.entity';

@Injectable({
    providedIn:'root'
})
export class PqrMailStatusService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(mailId:number,statusId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new PqrMailStatusEntity();
        body.mailId=mailId;
        body.statusId=statusId;

        return this.http.post<ResponseModel>(this.url+'pqrMailStatus/create',JSON.stringify(body),{ headers: headers });
    }
    public delete(mailId:number,statusId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'pqrMailStatus/delete/'+mailId+'/'+statusId,{ headers: headers });
    }
    public findAll(mailId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'pqrMailStatus/findAll/'+mailId,{ headers: headers });
    }
}