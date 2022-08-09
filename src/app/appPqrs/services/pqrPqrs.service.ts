import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrPqrsEntity } from '../entities/pqrPqrs.entity';

@Injectable({
    providedIn:'root'
})
export class PqrPqrsService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(pqrPqrsEntity:PqrPqrsEntity, countryGeneralId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'pqrPqrs/create/'+countryGeneralId,JSON.stringify(pqrPqrsEntity),{ headers: headers });
    }
    public update(pqrPqrsEntity:PqrPqrsEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'pqrPqrs/update',JSON.stringify(pqrPqrsEntity),{ headers: headers });
    }
    public eventUpdate(pqrPqrsEntity:PqrPqrsEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'pqrPqrs/eventUpdate',JSON.stringify(pqrPqrsEntity),{ headers: headers });
    }
    public delete(pqrsId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'pqrPqrs/delete/'+pqrsId,{ headers: headers });
    }
    public manage(pqrsId:string,assignedPersonId:number,statusId:number,type:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'pqrPqrs/manage/'+pqrsId+'/'+assignedPersonId+'/'+statusId+'/'+type,{ headers: headers });
    }
    public finish(pqrsId:number,managementStatusId:number,responseDateCustomerPqrs:string,finalContactMethodId:number,statusId:number,observations:string, procedureId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'pqrPqrs/finish/'+pqrsId+'/'+managementStatusId+'/'+responseDateCustomerPqrs+'/'+finalContactMethodId+'/'+statusId+'/'+observations+'/'+procedureId,{ headers: headers });
    }
    public find(identificationNumber:string,ticket:string,number:string,serialImei:string,countryId:number):Observable<ResponseModel>{
        var parametros= new HttpParams().set('identificationNumber',identificationNumber).set('ticket',ticket).set('ticket',ticket).set('numero',number).set('serialImei',serialImei);
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.post<ResponseModel>(this.url+'pqrPqrs/find/'+countryId,parametros,{ headers: headers });
    }
    public findCustomer(userId:number, identificationNumber:string,ticket:string,number:string,serialImei:string,name:string):Observable<ResponseModel>{
        var parametros= new HttpParams().set('userId',userId).set('identificationNumber',identificationNumber).set('ticket',ticket).set('numero',number).set('serialImei',serialImei).set('name',name);
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.post<ResponseModel>(this.url+'pqrPqrs/findCustomer',parametros,{ headers: headers });
    }
    public findById(pqrsId:number):Observable<ResponseModel>{
        var parametros= new HttpParams().set('pqrsId',pqrsId);
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.post<ResponseModel>(this.url+'pqrPqrs/findById',parametros,{ headers: headers });
    }
    public findByNumber(number:string):Observable<ResponseModel>{
        var parametros= new HttpParams().set('number',number);
        var headers = new HttpHeaders().set('content-Type','application/x-www-form-urlencoded');
        return this.http.post<ResponseModel>(this.url+'pqrPqrs/findByNumber',parametros,{ headers: headers });
    }
    public list(personId:number,status:string,initialDate:string,finalDate:string, number:string, countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'pqrPqrs/list/'+personId+'/'+status+'/'+initialDate+'/'+finalDate+'/'+number+'/'+countryId,{ headers: headers });
    }
    public listPerson(personId:number,status:string,initialDate:string,finalDate:string, number:string, countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'pqrPqrs/listPerson/'+personId+'/'+status+'/'+initialDate+'/'+finalDate+'/'+number+'/'+countryId,{ headers: headers });
    }
    public tat(countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'pqrPqrs/tat/'+countryId,{ headers: headers });
    }
    public tatAcido(countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'pqrPqrs/tatAcido/'+countryId,{ headers: headers });
    }
    public totalMonth(initialDate:string,finalDate:string,countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'pqrPqrs/totalMonth/'+initialDate+'/'+finalDate+'/'+countryId,{ headers: headers });
    }
    public totalAgent(initialDate:string,finalDate:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'pqrPqrs/totalAgent/'+initialDate+'/'+finalDate,{ headers: headers });
    }
    public loadFile(pqrsNumber:string,type:string,files:File[]):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url+'pqrPqrs/loadFile/'+pqrsNumber+'/'+type,formData);
    }
    public deleteFile(pqrsNumber:string,type:string,fileName:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'pqrPqrs/deleteFile/'+pqrsNumber+'/'+type+'/'+fileName,{ headers: headers });
    }
    public deleteFileByPqrs(pqrsNumber:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'pqrPqrs/deleteFileByPqrs/'+pqrsNumber,{ headers: headers });
    }
    public listFile(pqrsNumber:string,type:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'pqrPqrs/listFile/'+pqrsNumber+'/'+type,{ headers: headers });
    }

    public updateCustomerEscalation(number:string,):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'pqrPqrs/updateCustomerEscalation/'+number,JSON.stringify,{headers:headers});
    }
    
    public updateCustomerEscalationFinish(number:string,):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'pqrPqrs/updateCustomerEscalationFinish/'+number,JSON.stringify,{headers:headers});
    }
    public sendEmail(id:string,number:string,destinatarioId:number):Observable<ResponseModel>{
        var parametros= new HttpParams().set('id',id).set('number',number).set('destinatarioId',destinatarioId);
        var headers=new HttpHeaders().set('content-type','application/x-www-form-urlencoded');
        return this.http.post<ResponseModel>(this.url+'pqrPqrs/sendEmail',parametros,{headers:headers});
    }
    public escalationAgent(number:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'pqrPqrs/escalationAgent/'+number,{ headers: headers });
    }
    
    public listReport(userId: number,initialDate:string,finalDate:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'pqrPqrs/listReport/'+userId+'/'+initialDate+'/'+finalDate,{headers: headers});
    }

    public searchTypeTicket(number: string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'pqrPqrs/searchTypeTicket/'+number,{headers: headers});
    }
}