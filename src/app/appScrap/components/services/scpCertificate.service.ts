import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ScpTextAudiEntity } from '../../entities/scpTextAudi.entity';


@Injectable({
    providedIn:'root'
})
export class ScpCertificateService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(userIdCration: number, name:string,description:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new ScpTextAudiEntity()
        body.userIdCreation=userIdCration;
        body.name=name;
        body.description=description;
        return this.http.post<ResponseModel>(this.url+'ScpCertificateS/create',JSON.stringify(body),{headers:headers});
    }
    public update(id:number,userIdUpdate: number, name:string,description:string,active:boolean):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new ScpTextAudiEntity()
        body.id=id,
        body.userIdUpdate=userIdUpdate;
        body.name=name;
        body.description=description;
        body.active=active
        return this.http.put<ResponseModel>(this.url+'ScpCertificateS/update',JSON.stringify(body),{headers:headers});
    }

    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'ScpCertificateS/delete/'+id,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ScpCertificateS/list',{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'ScpCertificateS/findById/'+id);
    }  
}
