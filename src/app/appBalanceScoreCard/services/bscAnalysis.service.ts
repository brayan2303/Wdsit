import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscAnalysisEntity } from '../entities/bscAnalysis.entity';

@Injectable({
    providedIn:'root'
})
export class BscAnalysisService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(measurementDetailId:number,analysis:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new BscAnalysisEntity();
        body.measurementDetailId=measurementDetailId;
        body.analysis=analysis;

        return this.http.post<ResponseModel>(this.url+'bscAnalysis/create',JSON.stringify(body),{headers:headers});
    }
    public update(analysisId:number,analysis:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new BscAnalysisEntity();
        body.id=analysisId;
        body.analysis=analysis;

        return this.http.put<ResponseModel>(this.url+'bscAnalysis/update',JSON.stringify(body),{headers:headers});
    }
    public delete(analysisId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscAnalysis/delete/'+analysisId,{headers:headers});
    }
    public list(measurementDetailId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscAnalysis/list/'+measurementDetailId,{headers:headers});
    }
    public listMonth(measurementId:number,monthId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscAnalysis/listMonth/'+measurementId+'/'+monthId,{headers:headers});
    }
    public findById(analysisId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscAnalysis/findById/'+analysisId,{headers:headers});
    }
}