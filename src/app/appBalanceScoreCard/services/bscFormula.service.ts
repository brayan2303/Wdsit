import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscFormulaEntity } from '../entities/bscFormula.entity';

@Injectable({
    providedIn:'root'
})
export class BscFormulaService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(bscFormulaEntity:BscFormulaEntity):Observable<ResponseModel>{
        console.log(bscFormulaEntity);
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'bscFormula/create',JSON.stringify(bscFormulaEntity),{headers:headers});
    }
    public update(bscFormulaEntity:BscFormulaEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscFormula/update',JSON.stringify(bscFormulaEntity),{headers:headers});
    }
    public delete(formulaId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscFormula/delete/'+formulaId,{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscFormula/list',{headers:headers});
    }
    public listActive():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscFormula/listActive',{headers:headers});
    }
}