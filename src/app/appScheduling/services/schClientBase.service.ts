import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { SchClienteEntity } from '../entities/schCliente.entity';

@Injectable({
    providedIn:'root'
})
export class SchClientBaseService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(customerId:number,file:File):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'SchClientBase/create/'+customerId,formData);
    }

    public createHistory(customerId:number,userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'SchClientBase/createHistory/'+customerId+'/'+userId,{headers:headers});
    }

    public list(customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'SchClientBase/list/'+customerId,{headers:headers});
    }

    public delete(customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'SchClientBase/delete/'+customerId,{headers:headers});
    }
}