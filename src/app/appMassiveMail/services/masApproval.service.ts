import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { MasApprovalEntity } from "../entities/masApproval.entity";

@Injectable({
    providedIn:'root'
})
export class MasApprovalService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(masApproval:MasApprovalEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'masApproval/create',JSON.stringify(masApproval),{headers:headers});
    }
    public update(masApproval:MasApprovalEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'masApproval/update',JSON.stringify(masApproval),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.delete<ResponseModel>(this.url+'masApproval/delete/'+id,{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'masApproval/list',{headers:headers});
    }
    public listActive():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'masApproval/listActive',{headers:headers});
    }
    public find(mailId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'masApproval/find/'+mailId,{headers:headers});
    }
}