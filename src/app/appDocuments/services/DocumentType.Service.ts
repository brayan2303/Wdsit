import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { DocumentTypeEntity } from '../entities/DocumentTypeEntity';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DocumentsTypeService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(createUserId: number, groupDocument:string, description:string, idGroup:number, idCode:number):Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new DocumentTypeEntity();
        body.createUserId=createUserId;
        body.groupDocument=groupDocument;
        body.description=description;
        body.idGroup=idGroup;
        body.idCode=idCode;

        return this.http.post<ResponseModel>(this.url+'DocumentType/create', JSON.stringify(body),{headers:headers});
    }

   public update(updateUserId: number, documentTypeE:DocumentTypeEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'DocumentType/update/'+updateUserId, JSON.stringify(documentTypeE),{headers:headers});  
    }

    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'DocumentType/delete/' +id,{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'DocumentType/list/',{headers:headers});
    }

    public listByLevelAccess(userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'DocumentType/listByLevelAccess/'+userId,{headers:headers});
    }

    public findById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'DocumentType/findById/'+id);
    }
    public listType():Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type','application/json');
        return this.http.get<ResponseModel>(this.url+'DocumentsGroup/list/',{headers:headers});
    }
    
    public listLevel():Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type','application/json');
        return this.http.get<ResponseModel>(this.url+'DocumentLevelAccess/list/',{headers:headers});
    }
}
