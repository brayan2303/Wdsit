import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { FilSerialEntity } from '../entities/filSerial.entity';

@Injectable({
    providedIn:'root'
})
export class FilSerialService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(serial:string,countryId:number,customerId:number,userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new FilSerialEntity();
        body.serial=serial;
        body.countryId=countryId;
        body.customerId=customerId;
        body.userId=userId;

        return this.http.post<ResponseModel>(this.url+'filSerial/create',JSON.stringify(body),{ headers: headers });
    }
    public update(id:number,serial:string,customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new FilSerialEntity();
        body.id=id;
        body.serial=serial;
        body.customerId=customerId;

        return this.http.put<ResponseModel>(this.url+'filSerial/update',JSON.stringify(body),{ headers: headers });
    }
    public delete(serialId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'filSerial/delete/'+serialId,{ headers: headers });
    }
    public list(countryId:number,customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'filSerial/list/'+countryId+'/'+customerId,{ headers: headers });
    }
    public loadFile(serialId:string,customer:string,type:string,files:File[]):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url+'filSerial/loadFile/'+serialId+'/'+customer+'/'+type,formData);
    }
    public listFile(serialId:string,customer:string,type:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'filSerial/listFile/'+serialId+'/'+customer+'/'+type,{ headers: headers });
    }
    public deleteFile(serialId:string,customer:string,type:string,fileName:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'filSerial/deleteFile/'+serialId+'/'+customer+'/'+type+'/'+fileName,{ headers: headers });
    }
    public serialStatus(serial:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'filSerial/serialStatus/'+serial,{ headers: headers });
    }
    public deleteFileBySerial(customer:string,serialId:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'filSerial/deleteFileBySerial/'+customer+'/'+serialId,{ headers: headers });
    }
    public serialSearch(serial:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'filSerial/serialSearch/'+serial,{ headers: headers });
    }
}