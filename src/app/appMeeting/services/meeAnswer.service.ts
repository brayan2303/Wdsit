import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";
import { MeeAnswerEntity } from "../entities/meeAnswer.entity";

@Injectable({
    providedIn:'root'
})
export class MeeAnswerService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(meeAnswer:MeeAnswerEntity[]):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.post<ResponseModel>(this.url+'meeAnswer/create',JSON.stringify(meeAnswer),{headers:headers});
    }
    public list(meetingId:number):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.get<ResponseModel>(this.url+'meeAnswer/list/'+meetingId,{headers:headers});
    }
    public listByUserId(meetingId:number,periodicity:string,answerDate:string,userId:number):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.get<ResponseModel>(this.url+'meeAnswer/listByUserId/'+meetingId+'/'+periodicity+'/'+answerDate+'/'+userId,{headers:headers});
    }
    public listWeek(meetingId:number,userId:number):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.get<ResponseModel>(this.url+'meeAnswer/listWeek/'+meetingId+'/'+userId,{headers:headers});
    }
    public update(meeAnswer:MeeAnswerEntity):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.put<ResponseModel>(this.url+'meeMeeting/update',JSON.stringify(meeAnswer),{headers:headers});
    }
}