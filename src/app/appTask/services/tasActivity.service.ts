import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { TasActivityEntity } from '../entities/tasActivity.entity';

@Injectable({
    providedIn:'root'
})
export class TasActivityService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(tasActivityEntity:TasActivityEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'tasActivity/create',JSON.stringify(tasActivityEntity),{headers:headers});
    }
    public update(tasActivityEntity:TasActivityEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'tasActivity/update',JSON.stringify(tasActivityEntity),{headers:headers});
    }
    public delete(activityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'tasActivity/delete/'+activityId,{headers:headers});
    }
    public close(activityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'tasActivity/close/'+activityId,{headers:headers});
    }
    public findClose(taskId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'tasActivity/findClose/'+taskId,{headers:headers});
    }
    public findById(activityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'tasActivity/findById/'+activityId,{headers:headers});
    }
    public list(activityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'tasActivity/list/'+activityId,{headers:headers});
    }
    public loadFile(taskId:string,activityId:string,files:File[]):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url+'tasActivity/loadFile/'+taskId+'/'+activityId,formData);
    }
    public listFile(taskId:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'tasActivity/listFile/'+taskId);
    }
    public deleteFile(taskId:string,activityId:string,fileName:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'tasActivity/deleteFile/'+taskId+'/'+activityId+'/'+fileName,{headers:headers});
    }
    public deleteFileByActivityId(taskId:string,activityId:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'tasActivity/deleteFileByActivityId/'+taskId+'/'+activityId,{headers:headers});
    }
    public deleteFileByTaskId(taskId:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'tasActivity/deleteFileByTaskId/'+taskId,{headers:headers});
    }
}