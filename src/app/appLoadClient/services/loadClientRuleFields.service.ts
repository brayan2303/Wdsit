import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { LoadClientRuleFields } from '../entities/loadClientRuleFields.entity';


@Injectable({
    providedIn:'root'
})
export class LoadClientRuleFieldsService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(field:string,ruleId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new LoadClientRuleFields();
        body.field = field;
        body.ruleId = ruleId;
        return this.http.post<ResponseModel>(this.url+'LoadClientRuleFieldsS/create',JSON.stringify(body),{headers:headers});
    }
    public update(id:number,field:string, active:boolean):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new LoadClientRuleFields();
        body.id = id;
        body.field = field;
        body.active = active;
        return this.http.put<ResponseModel>(this.url+'LoadClientRuleFieldsS/update',JSON.stringify(body),{headers:headers});
    }
    
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'LoadClientRuleFieldsS/delete/'+id,{headers:headers});
    }
    
    public list(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientRuleFieldsS/list/'+id,{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'LoadClientRuleFieldsS/findById/'+id,{headers:headers});
    }
}