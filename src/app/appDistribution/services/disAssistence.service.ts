import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { DisAssistenceEntity } from '../entities/disAssistence.entity';

@Injectable({
    providedIn:'root'
})
export class DisAssistenceService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(monthId:number,headCountId:number,day:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new DisAssistenceEntity();
        body.headCountId=headCountId;
        body.monthId=monthId;
        body.day=day;

        return this.http.post<ResponseModel>(this.url+'disAssistence/create',JSON.stringify(body),{headers:headers});
    }
    public delete(monthId:number,headCountId:number,day:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'disAssistence/delete/'+monthId+'/'+headCountId+'/'+day,{headers:headers});
    }
    public list(monthId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'disAssistence/list/'+monthId,{headers:headers});
    }
}