import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvCoutingAssistantEntity } from '../entities/invCoutingAssistant.entity';

@Injectable({
    providedIn:'root'
})
export class InvCoutingAssistantService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(coutingId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new InvCoutingAssistantEntity();
        body.coutingId=coutingId;
        body.personId=personId;

        return this.http.post<ResponseModel>(this.url+'invCoutingAssistant/create',JSON.stringify(body),{ headers: headers });
    }
    public delete(cyclicId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'invCoutingAssistant/delete/'+cyclicId+'/'+personId,{ headers: headers });
    }
    public findAll(cyclicId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCoutingAssistant/findAll/'+cyclicId,{ headers: headers });
    }
}