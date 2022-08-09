import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrMailPersonEntity } from '../entities/pqrMailPerson.entity';

@Injectable({
    providedIn:'root'
})
export class PqrMailPersonService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(mailId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new PqrMailPersonEntity();
        body.mailId=mailId;
        body.personId=personId;

        return this.http.post<ResponseModel>(this.url+'pqrMailPerson/create',JSON.stringify(body),{ headers: headers });
    }
    public delete(mailId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'pqrMailPerson/delete/'+mailId+'/'+personId,{ headers: headers });
    }
    public findAll(mailId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'pqrMailPerson/findAll/'+mailId,{ headers: headers });
    }
}