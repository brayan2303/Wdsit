import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenLogEntity } from '../entities/genLog.entity';

@Injectable({
    providedIn:'root'
})
export class GenLogService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new GenLogEntity();
        body.personId=personId;

        return this.http.post<ResponseModel>(this.url+'genLog/create',JSON.stringify(body),{headers:headers});
    }
    public loginDay():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'genLog/loginDay',{headers:headers});
    }
    public loginPerson():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'genLog/loginPerson',{headers:headers});
    }
}