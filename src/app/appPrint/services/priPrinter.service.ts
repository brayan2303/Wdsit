import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PriPrinterEntity } from "../entities/priPrinter.entity";

@Injectable({
    providedIn:'root'
})
export class PriPrinterService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(printerEntity:PriPrinterEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'priPrinter/create',JSON.stringify(printerEntity),{headers:headers});
    }
    public update(printerEntity:PriPrinterEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'priPrinter/update',JSON.stringify(printerEntity),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'priPrinter/delete/'+id,{headers:headers});
    }
    public findById(id:number):Observable<any>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'priPrinter/findById/'+id,{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'priPrinter/list',{headers:headers});
    }
    public listActive(customerId:number,location:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'priPrinter/listActive/'+customerId+'/'+location,{headers:headers});
    }
}