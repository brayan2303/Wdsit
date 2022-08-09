import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrMessageEntity } from '../entities/pqrMessage.entity';




@Injectable({
    providedIn:'root'
})
export class PqrMessageService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(number: string,userId:number, customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body= new PqrMessageEntity();
        body.userId= userId;
        body.customerId = customerId;
        body.number = number;
        
        return this.http.post<ResponseModel>(this.url+'PqrMessage/create',JSON.stringify(body),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'PqrMessage/delete/'+id,{headers:headers});
    }
    
    public list(userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'PqrMessage/list/'+userId,{headers:headers});
    }
    public loadFile(number:string, creationDate:String, files:File[]):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url+'PqrMessage/loadFile/'+number+'/'+creationDate,formData);
    }
    public listFile(number:string, creationDate:String):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'PqrMessage/listFile/'+number+'/'+creationDate,{ headers: headers });
    }
    public updateMessage(number:string,):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'PqrMessage/updateMessage/'+number,JSON.stringify,{headers:headers});
    }
    public sendEmail(id:string, number:string,destinatarioId:number):Observable<ResponseModel>{
        var parametros= new HttpParams().set('id',id).set('number',number).set('destinatarioId',destinatarioId);
        var headers=new HttpHeaders().set('content-type','application/x-www-form-urlencoded');
        return this.http.post<ResponseModel>(this.url+'PqrMessage/sendEmail',parametros,{headers:headers});
    }
    
}