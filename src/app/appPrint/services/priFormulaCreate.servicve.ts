import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PriFormulaEntity } from '../entities/priFormula.enity';
import { PriFormulaCreateEntity } from '../entities/priFormulaCreate.entity';




@Injectable({
    providedIn:'root'
})
export class PriFormulaCreateService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(priFormulaCreateEntity:PriFormulaCreateEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        
        return this.http.post<ResponseModel>(this.url+'PriFormulaCreateS/create',JSON.stringify(priFormulaCreateEntity),{headers:headers});
    }
    
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'PriFormulaCreateS/delete/'+id,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'PriFormulaCreateS/list',{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'PriFormulaCreateS/findById/'+id);
    }
    public findAllId(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'PriFormulaCreateS/findAllId/'+id);
    }
    
}
