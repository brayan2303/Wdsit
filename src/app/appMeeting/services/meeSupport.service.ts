import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";
import { MeeSupportEntity } from "../entities/meeSupport.entity";

@Injectable({
    providedIn:'root'
})
export class MeeSupportService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(meeSupport:MeeSupportEntity):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.post<ResponseModel>(this.url+'meeSupport/create',JSON.stringify(meeSupport),{headers:headers});
    }
    public update(meeSupport:MeeSupportEntity):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.put<ResponseModel>(this.url+'meeSupport/update',JSON.stringify(meeSupport),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.delete<ResponseModel>(this.url+'meeSupport/delete/'+id,{headers:headers});
    }
    public findById(supportId:number):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.get<ResponseModel>(this.url+'meeSupport/findById/'+supportId,{headers:headers});
    }
    public list(meetingId:number):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.get<ResponseModel>(this.url+'meeSupport/list/'+meetingId,{headers:headers});
    }
    public listByUserId(responsibleUserId:number,startDate:string,endDate:string,states:string):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.get<ResponseModel>(this.url+'meeSupport/listByUserId/'+responsibleUserId+'/'+startDate+'/'+endDate+'/'+states,{headers:headers});
    }
    public listByCreationUserId(meetingId:number,creationUserId:number):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.get<ResponseModel>(this.url+'meeSupport/listByCreationUserId/'+meetingId+'/'+creationUserId,{headers:headers});
    }
    public loadFile(meetingId:number,supportId:number,file:File):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<ResponseModel>(this.url+'meeSupport/loadFile/'+meetingId+'/'+supportId,formData);
    }
    public listFiles(meetingId:number,supportId:number):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.get<ResponseModel>(this.url+'meeSupport/listFiles/'+meetingId+'/'+supportId,{headers:headers});
    }
    public deleteFile(meetingId:number,supportId:number,fileName:string):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.delete<ResponseModel>(this.url+'meeSupport/deleteFile/'+meetingId+'/'+supportId+'/'+fileName,{headers:headers});
    }
    public sendEmail(supportId:number,remitenteId:number,destinatarioId:number):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.post<ResponseModel>(this.url+'meeSupport/sendEmail/'+supportId+'/'+remitenteId+'/'+destinatarioId,{headers:headers});
    }
    public listStatus(states:string):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.get<ResponseModel>(this.url+'meeSupport/listStatus/'+states,{headers:headers});
    }
    public sendEmailStatus(supportId:number,remitenteId:number,destinatarioId:number, status:string):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.post<ResponseModel>(this.url+'meeSupport/sendEmailStatus/'+supportId+'/'+remitenteId+'/'+destinatarioId+'/'+status,{headers:headers});
    }
    public findByStatus(status:string):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.get<ResponseModel>(this.url+'meeSupport/findByStatus/'+status,{headers:headers});
    }
}