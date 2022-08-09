import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { DisMonthDayEntity } from '../entities/disMonthDay.entity';

@Injectable({
    providedIn:'root'
})
export class DisMonthDayService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(monthId:number,day:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new DisMonthDayEntity();
        body.monthId=monthId;
        body.day=day;

        return this.http.post<ResponseModel>(this.url+'disMonthDay/create',JSON.stringify(body),{headers:headers});
    }
    public delete(monthId:number,day:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'disMonthDay/delete/'+monthId+'/'+day,{headers:headers});
    }
    public list(monthId:number,year:number,month:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'disMonthDay/list/'+monthId+'/'+year+'/'+month,{headers:headers});
    }
    public days(monthId:number,year:number,month:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'disMonthDay/days/'+monthId+'/'+year+'/'+month,{headers:headers});
    }
}