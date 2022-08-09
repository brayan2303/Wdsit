import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { SchClienteEntity } from '../entities/schCliente.entity';

@Injectable({
    providedIn:'root'
})
export class SchClienteService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(schClienteEntity:SchClienteEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'schCliente/create',JSON.stringify(schClienteEntity),{headers:headers});
    }
    public update(schClienteEntity:SchClienteEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'schCliente/update',JSON.stringify(schClienteEntity),{headers:headers});
    }
    public delete(clienteId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'schCliente/delete/'+clienteId,{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'schCliente/list',{headers:headers});
    }
}