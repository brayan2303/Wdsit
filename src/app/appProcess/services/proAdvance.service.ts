import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProAdvanceEntity } from "../entities/proAdvance.entity";

@Injectable({
    providedIn:'root'
})
export class ProAdvanceService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(description:string,activityId:number,creationUserId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new ProAdvanceEntity();
        body.description=description;
        body.activityId=activityId;
        body.creationUserId=creationUserId;

        return this.http.post<ResponseModel>(this.url+'proAdvance/create',JSON.stringify(body),{headers:headers});
    }
    public update(proAdvanceEntity:ProAdvanceEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'proAdvance/update',JSON.stringify(proAdvanceEntity),{headers:headers});
    }
    public delete(advanceId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proAdvance/delete/'+advanceId,{headers:headers});
    }
    public list(advanceId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proAdvance/list/'+advanceId,{headers:headers});
    }
    public loadFile(activityId:number,advanceId:number,file:File):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<ResponseModel>(this.url+'proAdvance/loadFile/'+activityId+'/'+advanceId,formData);
    }
    public listFile(activityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proAdvance/listFile/'+activityId,{ headers: headers });
    }
    public deleteFile(activityId:number,advanceId:number,fileName:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proAdvance/deleteFile/'+activityId+'/'+advanceId+'/'+fileName,{ headers: headers });
    }
    public deleteFileItem(activityId:number,advanceId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proAdvance/deleteFileItem/'+activityId+'/'+advanceId,{ headers: headers });
    }
    public deleteFileActivity(activityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proAdvance/deleteFileActivity/'+activityId,{ headers: headers });
    }
}