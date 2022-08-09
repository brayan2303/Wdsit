import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscMeasurementDetailEntity } from '../entities/bscMeasurementDetail.entity';

@Injectable({
    providedIn:'root'
})
export class BscMeasurementDetailService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(measurementId:number,monthId:number,goal:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new BscMeasurementDetailEntity();
        body.measurementId=measurementId;
        body.monthId=monthId;
        body.goal=goal;

        return this.http.post<ResponseModel>(this.url+'bscMeasurementDetail/create',JSON.stringify(body),{headers:headers});
    }
    public update(id:number,type:string,value:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscMeasurementDetail/update/'+id+'/'+type+'/'+value,{headers:headers});
    }
    public delete(measurementDetailId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscMeasurementDetail/delete/'+measurementDetailId,{headers:headers});
    }
    public openClose(measurementDetailId:number,status:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscMeasurementDetail/openClose/'+measurementDetailId+'/'+status,{headers:headers});
    }
    public list(measurementId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscMeasurementDetail/list/'+measurementId,{headers:headers});
    }
    public listClose(measurementId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscMeasurementDetail/listClose/'+measurementId,{headers:headers});
    }
    public loadFile(measurementId:number,measurementDetailId:number,files:File[]):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url+'bscMeasurementDetail/loadFile/'+measurementId+'/'+measurementDetailId,formData);
    }
    public listFile(measurementId:number,measurementDetailId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscMeasurementDetail/listFile/'+measurementId+'/'+measurementDetailId,{ headers: headers });
    }
    public deleteFile(measurementId:number,measurementDetailId:number,fileName:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscMeasurementDetail/deleteFile/'+measurementId+'/'+measurementDetailId+'/'+fileName,{ headers: headers });
    }
    public deleteFileMeasurement(measurementId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscMeasurementDetail/deleteFileMeasurement/'+measurementId,{ headers: headers });
    }
}