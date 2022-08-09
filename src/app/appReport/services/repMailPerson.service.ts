import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { RepMailPersonEntity } from '../entities/repMailPerson.entity';

@Injectable({
    providedIn:'root'
})
export class RepMailPersonService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(mailId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new RepMailPersonEntity();
        body.mailId=mailId;
        body.personId=personId;

        return this.http.post<ResponseModel>(this.url+'repMailPerson/create',JSON.stringify(body),{ headers: headers });
    }
    public delete(mailId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'repMailPerson/delete/'+mailId+'/'+personId,{ headers: headers });
    }
    public findAll(mailId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'repMailPerson/findAll/'+mailId,{ headers: headers });
    }
}