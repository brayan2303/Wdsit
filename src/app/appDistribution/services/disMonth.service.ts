import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { DisMonthEntity } from '../entities/disMonth.entity';

@Injectable({
    providedIn:'root'
})
export class DisMonthService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(year:number,month:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new DisMonthEntity();
        body.year=year;
        body.month=month;

        return this.http.post<ResponseModel>(this.url+'disMonth/create',JSON.stringify(body),{headers:headers});
    }
    public update(id:number,year:number,month:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new DisMonthEntity();
        body.id=id;
        body.year=year;
        body.month=month;

        return this.http.put<ResponseModel>(this.url+'disMonth/update',JSON.stringify(body),{headers:headers});
    }
    public delete(monthId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'disMonth/delete/'+monthId,{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'disMonth/list',{headers:headers});
    }
    public listAll(year:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'disMonth/listAll/'+year,{headers:headers});
    }
}