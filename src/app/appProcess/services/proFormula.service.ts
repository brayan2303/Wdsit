import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProFormulaEntity } from '../entities/ProFormula.entity';

@Injectable({
    providedIn:'root'
})
export class ProFormulaService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(proFormulaEntity:ProFormulaEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'proFormula/create',JSON.stringify(proFormulaEntity),{headers:headers});
    }
    public update(proFormulaEntity:ProFormulaEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proFormula/update',JSON.stringify(proFormulaEntity),{headers:headers});
    }
    public delete(formulaId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proFormula/delete/'+formulaId,{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proFormula/list',{headers:headers});
    }
    public listActive():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proFormula/listActive',{headers:headers});
    }
}