import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { MeeGroupPersonEntity } from '../entities/meeGroupPerson.entity';




@Injectable({
    providedIn:'root'
})
export class MeeGroupPersonService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.apiIq09;
    }
    public create(personId:number,customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new MeeGroupPersonEntity;
        body.personId=personId;
        body.groupId=customerId;
        
        return this.http.post<ResponseModel>(this.url+'MeeGroupPerson/create',JSON.stringify(body),{headers:headers});
    }

    public delete(personId:number,groupId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'MeeGroupPerson/delete/'+personId+'/'+groupId,{ headers: headers });
    }

    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'MeeGroupPerson/list',{headers:headers});
    }
    public findAll(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'MeeGroupPerson/findAll/'+id,{headers:headers});
    }
}