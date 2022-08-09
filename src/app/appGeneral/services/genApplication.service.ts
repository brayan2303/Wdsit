import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenApplicationPersonEntity } from '../entities/genApplicationPerson.entity';
import { GenApplicationEntity } from '../entities/genApplication.entity';

@Injectable({
    providedIn:'root'
})
export class GenApplicationService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(genApplicationEntity:GenApplicationEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'genApplication/create',JSON.stringify(genApplicationEntity),{ headers: headers });
    }
    public update(genApplicationEntity:GenApplicationEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'genApplication/update',JSON.stringify(genApplicationEntity),{ headers: headers });
    }
    public delete(applicationId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'genApplication/delete/'+applicationId,{ headers: headers });
    }
    public add(personId:number,applicationId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new GenApplicationPersonEntity();
        body.applicationId=applicationId;
        body.personId=personId;

        return this.http.post<ResponseModel>(this.url+'genApplication/add',JSON.stringify(body),{ headers: headers });
    }
    public remove(personId:number,applicationId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'genApplication/remove/'+personId+'/'+applicationId,{ headers: headers });
    }
    public findAll(personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genApplication/findAll/'+personId,{ headers: headers });
    }
    public findByPersonId(personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genApplication/findByPersonId/'+personId,{ headers: headers });
    }
    public findById(applicationId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genApplication/findById/'+applicationId,{ headers: headers });
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genApplication/list',{ headers: headers });
    }
    public listAll():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'genApplication/listAll',{ headers: headers });
    }
}