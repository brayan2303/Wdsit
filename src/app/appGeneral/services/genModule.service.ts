import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenProfileModuleEntity } from '../entities/genProfileModule.entity';
import { GenModuleEntity } from '../entities/genModule.entity';

@Injectable({
    providedIn:'root'
})
export class GenModuleService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    
    public create(genModuleEntity:GenModuleEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'genModule/create',JSON.stringify(genModuleEntity),{ headers: headers });
    }
    public update(genModuleEntity:GenModuleEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'genModule/update',JSON.stringify(genModuleEntity),{ headers: headers });
    }
    public delete(moduleId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'genModule/delete/'+moduleId,{ headers: headers });
    }
    public add(profileId:number,moduleId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new GenProfileModuleEntity();
        body.profileId=profileId;
        body.moduleId=moduleId;

        return this.http.post<ResponseModel>(this.url+'genModule/add',JSON.stringify(body),{ headers: headers });
    }
    public remove(profileId:number,moduleId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'genModule/remove/'+profileId+'/'+moduleId,{ headers: headers });
    }
    public findAll(sectionId:number,profileId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'genModule/findAll/'+sectionId+'/'+profileId,{headers:headers});
    }
    public findById(moduleId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'genModule/findById/'+moduleId,{headers:headers});
    }
    public findByProfileId(profileId:number,applicationName:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'genModule/findByProfileId/'+profileId+'/'+applicationName,{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'genModule/list',{headers:headers});
    }
}