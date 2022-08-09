import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscAdvanceEntity } from '../entities/bscAdvance.entity';

@Injectable({
    providedIn:'root'
})
export class BscAdvanceService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(description:string,activityId:number,creationUserId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new BscAdvanceEntity();
        body.description=description;
        body.activityId=activityId;
        body.creationUserId=creationUserId;

        return this.http.post<ResponseModel>(this.url+'bscAdvance/create',JSON.stringify(body),{headers:headers});
    }
    public update(bscAdvanceEntity:BscAdvanceEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'bscAdvance/update',JSON.stringify(bscAdvanceEntity),{headers:headers});
    }
    public delete(advanceId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscAdvance/delete/'+advanceId,{headers:headers});
    }
    public list(advanceId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscAdvance/list/'+advanceId,{headers:headers});
    }
    public loadFile(activityId:number,advanceId:number,file:File):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<ResponseModel>(this.url+'bscAdvance/loadFile/'+activityId+'/'+advanceId,formData);
    }
    public listFile(activityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscAdvance/listFile/'+activityId,{ headers: headers });
    }
    public deleteFile(activityId:number,advanceId:number,fileName:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscAdvance/deleteFile/'+activityId+'/'+advanceId+'/'+fileName,{ headers: headers });
    }
    public deleteFileItem(activityId:number,advanceId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscAdvance/deleteFileItem/'+activityId+'/'+advanceId,{ headers: headers });
    }
    public deleteFileActivity(activityId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscAdvance/deleteFileActivity/'+activityId,{ headers: headers });
    }
}