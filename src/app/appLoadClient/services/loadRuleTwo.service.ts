import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { LoadRuleTwoEntity } from '../entities/loadRuleTwo.entity';


@Injectable({
    providedIn:'root'
})
export class LoadRuleTwoService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(name:string,ruleId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new LoadRuleTwoEntity();
        body.name = name;
        body.ruleId = ruleId;
        return this.http.post<ResponseModel>(this.url+'LoadRuleTwoS/create',JSON.stringify(body),{headers:headers});
    }
    public update(id:number,name:string, active:boolean):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new LoadRuleTwoEntity();
        body.id = id;
        body.name = name;
        body.active = active;
        return this.http.put<ResponseModel>(this.url+'LoadRuleTwoS/update',JSON.stringify(body),{headers:headers});
    }
    
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'LoadRuleTwoS/delete/'+id,{headers:headers});
    }
    
    public list(ruleId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadRuleTwoS/list/'+ruleId,{headers:headers});
    }
    public listName(ruleId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadRuleTwoS/listName/'+ruleId,{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'LoadRuleTwoS/findById/'+id,{headers:headers});
    }
   
}