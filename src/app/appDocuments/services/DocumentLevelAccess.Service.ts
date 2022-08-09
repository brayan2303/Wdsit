import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";
import { DocumentLevelAccessEntity } from "../entities/DocumentLevelAccessEntity";

@Injectable({
    providedIn: 'root'
})
export class DocumentLevelAccessService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(DocumentLevelAccessEntity: DocumentLevelAccessEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'DocumentLevelAccess/create', JSON.stringify(DocumentLevelAccessEntity),{headers:headers});
    }

    public update(DocumentLevelAccessEntity: DocumentLevelAccessEntity): Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'DocumentLevelAccess/update', JSON.stringify(DocumentLevelAccessEntity),{headers:headers});  
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'DocumentLevelAccess/delete/' +id,{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'DocumentLevelAccess/list',{headers:headers});
    }

    public findById(id: number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'DocumentLevelAccess/findById/'+id);
    }
    public listLevel():Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type','application/json');
        return this.http.get<ResponseModel>(this.url+'DocumentLevelAccess/list/',{headers:headers});
    }
}