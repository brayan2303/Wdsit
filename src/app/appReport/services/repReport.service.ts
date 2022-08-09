import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { from, Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { RepReportModel } from '../models/repReport.model';
import { RepReportPersonEntity } from '../entities/repReportPerson.entity';
import { RepReportEntity } from '../entities/repReport.entity';

@Injectable({
    providedIn:'root'
})
export class RepReportService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(repReportEntity:RepReportEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'repReport/create',JSON.stringify(repReportEntity),{ headers: headers });
    }
    public update(repReportEntity:RepReportEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'repReport/update',JSON.stringify(repReportEntity),{ headers: headers });
    }
    public delete(reportId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'repReport/delete/'+reportId,{ headers: headers });
    }
    public add(personId:number,reportId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new RepReportPersonEntity();
        body.reportId=reportId;
        body.personId=personId;

        return this.http.post<ResponseModel>(this.url+'repReport/add',JSON.stringify(body),{ headers: headers });
    }
    public remove(personId:number,reportId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'repReport/remove/'+personId+'/'+reportId,{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'repReport/list',{ headers: headers });
    }
    public findAll(reportId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'repReport/findAll/'+reportId,{ headers: headers });
    }
    public findById(reportId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'repReport/findById/'+reportId,{ headers: headers });
    }
    public findByPersonId(personId:number, customer:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'repReport/findByPersonId/'+personId+'/'+customer,{ headers: headers });
    }
    // plantId:number falta la planta
    public execute(type:string,reportId:number,storeProcedure:string,repReportModel:RepReportModel,countryId:number,customerId:number, plantId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=JSON.stringify(repReportModel);
   //plantId falta la planta
        return this.http.post<ResponseModel>(this.url+'repReport/execute/'+type+'/'+reportId+'/'+storeProcedure+'/'+countryId+'/'+customerId+'/'+plantId,body,{ headers: headers });
    }
    public executeByReportName(reportName:string,customer:string,meta:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'repReport/executeByReportName/'+reportName+'/'+customer+'/'+meta,{ headers: headers });
    }
    public wolkbox(url:string):Observable<any>{
        var headers = new HttpHeaders().set('content-Type', 'application/json;charset=utf-8');

        return this.http.get<ResponseModel>('http://130.211.195.253/ipdialbox/api_reports.php?token=7b69645f6469737472697d2d3230323130333239303731373037&report=zoom_calls&date_ini=20201220000000&date_end=20201223235959',{headers:headers});
    }
    public findByUserId(userId:number, countryId:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'GenPlant/findByUserId/'+userId+'/'+countryId,{ headers: headers });
    }
}