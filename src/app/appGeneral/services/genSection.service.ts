import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenProfileSectionEntity } from '../entities/genProfileSection.entity';
import { GenSectionEntity } from '../entities/genSection.entity';

@Injectable({
    providedIn:'root'
})
export class GenSectionService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(genSectionEntity:GenSectionEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'genSection/create',JSON.stringify(genSectionEntity),{ headers: headers });
    }
    public update(genSectionEntity:GenSectionEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'genSection/update',JSON.stringify(genSectionEntity),{ headers: headers });
    }
    public delete(sectionId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'genSection/delete/'+sectionId,{ headers: headers });
    }
    public add(profileId:number,sectionId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new GenProfileSectionEntity();
        body.profileId=profileId;
        body.sectionId=sectionId;

        return this.http.post<ResponseModel>(this.url+'genSection/add',JSON.stringify(body),{ headers: headers });
    }
    public remove(profileId:number,sectionId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'genSection/remove/'+profileId+'/'+sectionId,{ headers: headers });
    }
    public findAll(applicationName:string,profileId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'genSection/findAll/'+applicationName+'/'+profileId,{headers:headers});
    }
    public findById(sectionId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'genSection/findById/'+sectionId,{headers:headers});
    }
    public findByProfileId(profileId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'genSection/findByProfileId/'+profileId,{headers:headers});
    }
    public list(applicationName:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'genSection/list/'+applicationName,{headers:headers});
    }
    public listAll():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'genSection/listAll',{headers:headers});
    }
}