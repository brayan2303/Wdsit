import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrPqrsEntity } from '../entities/pqrPqrs.entity';

@Injectable({
    providedIn:'root'
})
export class PqrPqrsClientService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(pqrPqrsEntity:PqrPqrsEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'PqrPqrsClientS/create',JSON.stringify(pqrPqrsEntity),{ headers: headers });
    }
    public update(pqrPqrsEntity:PqrPqrsEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'PqrPqrsClientS/update',JSON.stringify(pqrPqrsEntity),{ headers: headers });
    }
    public eventUpdate(pqrPqrsEntity:PqrPqrsEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'PqrPqrsClientS/eventUpdate',JSON.stringify(pqrPqrsEntity),{ headers: headers });
    }
    public delete(pqrsId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'PqrPqrsClientS/delete/'+pqrsId,{ headers: headers });
    }
    public manage(pqrsId:number,assignedPersonId:number,statusId:number,type:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'PqrPqrsClientS/manage/'+pqrsId+'/'+assignedPersonId+'/'+statusId+'/'+type,{ headers: headers });
    }
    public finish(pqrsId:number,managementStatusId:number,responseDateCustomerPqrs:string,finalContactMethodId:number,statusId:number,observations:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'PqrPqrsClientS/finish/'+pqrsId+'/'+managementStatusId+'/'+responseDateCustomerPqrs+'/'+finalContactMethodId+'/'+statusId+'/'+observations,{ headers: headers });
    }
    public find(identificationNumber:string,ticket:string,number:string,serialImei:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'PqrPqrsClientS/find/'+identificationNumber+'/'+ticket+'/'+number+'/'+serialImei,{ headers: headers });
    }
    public findById(pqrsId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'PqrPqrsClientS/findById/'+pqrsId,{ headers: headers });
    }
    public findByNumber(number:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'PqrPqrsClientS/findByNumber/'+number,{ headers: headers });
    }
    public list(personId:number,status:string,initialDate:string,finalDate:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'PqrPqrsClientS/list/'+personId+'/'+status+'/'+initialDate+'/'+finalDate,{ headers: headers });
    }
    public tat():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'PqrPqrsClientS/tat',{ headers: headers });
    }
    public tatAcido():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'PqrPqrsClientS/tatAcido',{ headers: headers });
    }
    public totalMonth(initialDate:string,finalDate:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'PqrPqrsClientS/totalMonth/'+initialDate+'/'+finalDate,{ headers: headers });
    }
    public totalAgent(initialDate:string,finalDate:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'PqrPqrsClientS/totalAgent/'+initialDate+'/'+finalDate,{ headers: headers });
    }
    public loadFile(pqrsNumber:string,type:string,files:File[]):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url+'PqrPqrsClientS/loadFile/'+pqrsNumber+'/'+type,formData);
    }
    public deleteFile(pqrsNumber:string,type:string,fileName:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'PqrPqrsClientS/deleteFile/'+pqrsNumber+'/'+type+'/'+fileName,{ headers: headers });
    }
    public deleteFileByPqrs(pqrsNumber:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'PqrPqrsClientS/deleteFileByPqrs/'+pqrsNumber,{ headers: headers });
    }
    public listFile(pqrsNumber:string,type:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'PqrPqrsClientS/listFile/'+pqrsNumber+'/'+type,{ headers: headers });
    }
}