import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrEscalationEntity } from '../entities/pqrEscalation.entity';



@Injectable({
    providedIn:'root'
})
export class PqrEscalationService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(number: string, message:string, userId: number,):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body= new PqrEscalationEntity();
        body.number = number;
        body.message = message;
        body.userId = userId;
        return this.http.post<ResponseModel>(this.url+'PqrEscalation/create',JSON.stringify(body),{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'PqrEscalation/list',{headers:headers});
    }
    public findById(id:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrEscalation/findById/'+id,{headers:headers});
    }
    public sendEmail(id:string,number:string,remitenteId:number):Observable<ResponseModel>{
        var parametros = new HttpParams().set('id',id).set('number',number).set('remitenteId',remitenteId);
        var headers=new HttpHeaders().set('content-type','application/x-www-form-urlencoded');
        return this.http.post<ResponseModel>(this.url+'PqrEscalation/sendEmail',parametros,{headers:headers});
    }
    
}