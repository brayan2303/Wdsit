import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrUserProjectEntity } from '../entities/pqrUserProject.entity';




@Injectable({
    providedIn:'root'
})
export class PqrUserProjectService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(userId:number,projectId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new PqrUserProjectEntity;
        body.userId=userId;
        body.projectId=projectId;
        
        return this.http.post<ResponseModel>(this.url+'PqrUserProjec/create',JSON.stringify(body),{headers:headers});
    }

    public delete(userId:number,projectId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'PqrUserProjec/delete/'+userId+'/'+projectId,{ headers: headers });
    }

    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'PqrUserProjec/list',{headers:headers});
    }
    public findAll(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrUserProjec/findAll/'+id,{headers:headers});
    }
}