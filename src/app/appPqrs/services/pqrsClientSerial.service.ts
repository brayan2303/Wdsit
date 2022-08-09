import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrsClientSerialEntity } from '../entities/pqrsClientSerial.entity';



@Injectable({
    providedIn:'root'
})
export class PqrsClientSerialService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(userId:number, type:string,serial:string, phoneMovil: string ,identification:string, imei:string,description:string, customerId:number, categoryId:number, countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body= new PqrsClientSerialEntity();
        body.userId= userId;
        body.type = type;
        body.serial = serial;
        body.phoneMovil = phoneMovil;
        body.identification = identification;
        body.imei = imei;
        body.description = description;
        body.customerId =customerId;
        body.categoryId = categoryId;
        return this.http.post<ResponseModel>(this.url+'PqrsClientSerialS/create/'+countryId,JSON.stringify(body),{headers:headers});
    }
    
    public update(pqrsClientSerialEntity:PqrsClientSerialEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'PqrsClientSerialS/update',JSON.stringify(pqrsClientSerialEntity),{headers:headers});
    }
    
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'PqrsClientSerialS/delete/'+id,{headers:headers});
    }
    
    public list(ticket:string, creationPersonId:number):Observable<ResponseModel>{
        var parametros= new HttpParams().set('ticket',ticket).set('creationPersonId',creationPersonId);
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.post<ResponseModel>(this.url+'PqrsClientSerialS/list',parametros,{headers:headers});
    }

    public findById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'PqrsClientSerialS/findById/'+id);
    }
    public loadFile(pqrsNumber:string,type:string,files:File[]):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url+'PqrsClientSerialS/loadFile/'+pqrsNumber+'/'+type,formData);
    }
    public listFile(pqrsNumber:string,type:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'pqrPqrs/listFile/'+pqrsNumber+'/'+type,{ headers: headers });
    }
    
}
