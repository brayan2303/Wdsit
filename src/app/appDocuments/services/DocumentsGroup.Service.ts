import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { DocumentsGroupEntity } from '../entities/DocumentsGroupEntity';

@Injectable({
    providedIn: 'root'
})
export class DocumentsGroupService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(DocumentsGroupEntity:DocumentsGroupEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'DocumentsGroup/create', JSON.stringify(DocumentsGroupEntity),{headers:headers});
    }

    public update(DocumentsGroupEntity:DocumentsGroupEntity): Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'DocumentsGroup/update', JSON.stringify(DocumentsGroupEntity),{headers:headers});  
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'DocumentsGroup/delete/' +id,{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'DocumentsGroup/list/',{headers:headers});
    }

    public findById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'DocumentsGroup/findById/'+id);
    }
}




   