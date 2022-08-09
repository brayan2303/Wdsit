import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';

@Injectable({
    providedIn:'root'
})
export class GenApplicationPersonProfileService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(applicationId:number,personId:number,profileId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'genApplicationPersonProfile/create/'+applicationId+'/'+personId+'/'+profileId,{ headers: headers });
    }
    public update(applicationId:number,personId:number,profileId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'genApplicationPersonProfile/update/'+applicationId+'/'+personId+'/'+profileId,{ headers: headers });
    }
    public delete(applicationPersonProfileId:number,applicationId:number,personId:number,profileId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'genApplicationPersonProfile/delete/'+applicationPersonProfileId+'/'+applicationId+'/'+personId+'/'+profileId,{ headers: headers });
    }
    public list(applicationId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'genApplicationPersonProfile/list/'+applicationId+'/'+personId,{ headers: headers });
    }
    public listProfile(personId:number,applicationName:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'genApplicationPersonProfile/listProfile/'+personId+'/'+applicationName,{ headers: headers });
    }
}