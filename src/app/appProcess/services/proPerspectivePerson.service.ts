import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProPerspectivePersonEntity } from '../entities/proPerspectivePerson.entity';

@Injectable({
    providedIn:'root'
})
export class ProPerspectivePersonService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(perspectiveId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new ProPerspectivePersonEntity();
        body.perspectiveId=perspectiveId;
        body.personId=personId;

        return this.http.post<ResponseModel>(this.url+'proPerspectivePerson/create',JSON.stringify(body),{ headers: headers });
    }
    public delete(perspectiveId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'proPerspectivePerson/delete/'+perspectiveId+'/'+personId,{ headers: headers });
    }
    public list(perspectiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'proPerspectivePerson/list/'+perspectiveId,{ headers: headers });
    }
    public listActive(year:number,personId:number,countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'proPerspectivePerson/listActive/'+year+'/'+personId+'/'+countryId,{ headers: headers });
    }
}