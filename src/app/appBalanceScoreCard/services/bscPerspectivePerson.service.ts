import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscPerspectivePersonEntity } from '../entities/bscPerspectivePerson.entity';

@Injectable({
    providedIn:'root'
})
export class BscPerspectivePersonService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(perspectiveId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new BscPerspectivePersonEntity();
        body.perspectiveId=perspectiveId;
        body.personId=personId;

        return this.http.post<ResponseModel>(this.url+'bscPerspectivePerson/create',JSON.stringify(body),{ headers: headers });
    }
    public delete(perspectiveId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'bscPerspectivePerson/delete/'+perspectiveId+'/'+personId,{ headers: headers });
    }
    public list(perspectiveId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'bscPerspectivePerson/list/'+perspectiveId,{ headers: headers });
    }
    public listActive(year:number,personId:number,countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url+'bscPerspectivePerson/listActive/'+year+'/'+personId+'/'+countryId,{ headers: headers });
    }
}