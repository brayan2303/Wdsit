import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProAnalysisEntity } from '../entities/ProAnalysis.entity';

@Injectable({
    providedIn:'root'
})
export class ProAnalysisService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(measurementDetailId:number,analysis:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new ProAnalysisEntity();
        body.measurementDetailId=measurementDetailId;
        body.analysis=analysis;

        return this.http.post<ResponseModel>(this.url+'proAnalysis/create',JSON.stringify(body),{headers:headers});
    }
    public update(analysisId:number,analysis:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new ProAnalysisEntity();
        body.id=analysisId;
        body.analysis=analysis;

        return this.http.put<ResponseModel>(this.url+'proAnalysis/update',JSON.stringify(body),{headers:headers});
    }
    public delete(analysisId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proAnalysis/delete/'+analysisId,{headers:headers});
    }
    public list(measurementDetailId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proAnalysis/list/'+measurementDetailId,{headers:headers});
    }
    public listMonth(measurementId:number,monthId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proAnalysis/listMonth/'+measurementId+'/'+monthId,{headers:headers});
    }
    public findById(analysisId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proAnalysis/findById/'+analysisId,{headers:headers});
    }
}