import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvCyclicAuditorEntity } from '../entities/invCyclicAuditor.entity';

@Injectable({
    providedIn:'root'
})
export class InvCyclicAuditorService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(cyclicId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new InvCyclicAuditorEntity();
        body.cyclicId=cyclicId;
        body.personId=personId;

        return this.http.post<ResponseModel>(this.url+'invCyclicAuditor/create',JSON.stringify(body),{ headers: headers });
    }
    public delete(cyclicId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'invCyclicAuditor/delete/'+cyclicId+'/'+personId,{ headers: headers });
    }
    public findAll(cyclicId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCyclicAuditor/findAll/'+cyclicId,{ headers: headers });
    }
}