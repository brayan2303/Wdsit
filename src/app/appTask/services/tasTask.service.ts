import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { TasTaskEntity } from '../entities/tasTask.entity';

@Injectable({
    providedIn:'root'
})
export class TasTaskService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(tasTaskEntity:TasTaskEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'tasTask/create',JSON.stringify(tasTaskEntity),{headers:headers});
    }
    public update(tasTaskEntity:TasTaskEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'tasTask/update',JSON.stringify(tasTaskEntity),{headers:headers});
    }
    public delete(taskId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'tasTask/delete/'+taskId,{headers:headers});
    }
    public close(taskId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'tasTask/close/'+taskId,{headers:headers});
    }
    public findById(taskId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'tasTask/findById/'+taskId,{headers:headers});
    }
    public list(assignedPersonId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'tasTask/list/'+assignedPersonId,{headers:headers});
    }

    public listAll():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        
        return this.http.get<ResponseModel>(this.url+'tasTask/listAll',{headers:headers});
    }
}