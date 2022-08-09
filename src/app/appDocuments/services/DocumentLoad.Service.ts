import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";
import { DocumentLoadDownload } from "../entities/DocumentLoadDownloadEntity";
import { DocumentLoadEntity } from "../entities/DocumentLoadEntity";
import { documentFileModel } from "../models/documentFile.model";

@Injectable({
    providedIn: 'root'
})
export class DocumentLoadService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(userPropertyId : number ,creationUserId: number, DocumentLevelE: DocumentLoadEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'DocumentLoad/create/'+userPropertyId+'/'+creationUserId, JSON.stringify(DocumentLevelE),{headers:headers});
    }
    
    public update(userId: number, DocumentLevelE: DocumentLoadEntity): Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'DocumentLoad/update/'+userId,JSON.stringify(DocumentLevelE),{headers:headers});  
    }
    
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'DocumentLoad/delete/' +id,{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'DocumentLoad/list',{headers:headers});
    }

    public findVersion(identification: number, documentId:number): Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'DocumentLoad/findVersion/'+identification+'/'+documentId, {headers:headers});  
    }

    public findById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'DocumentLoad/findById/'+id);
    }
    public listType():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'DocumentType/list',{headers:headers});
    }

    public loadFile(documentId: number, files:File[]):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url+'DocumentLoad/loadFile/'+documentId,formData);
    }

    public listFile(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'DocumentLoad/listFile/'+id);
    }

    public findByIdentification(userPropertyIdentification: number, documentId: number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'DocumentLoad/findByIdentification/'+userPropertyIdentification+'/'+documentId,{headers:headers});        
    }

    public searchDocument(documentLoadId: number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'DocumentLoad/listDocs/'+documentLoadId,{headers:headers});        
    }

    public searchDocs(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'DocumentLoad/searchDocs/'+id);
    }

    public registerDownload(userId:number, documentLoadId:number): Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new DocumentLoadDownload;
        body.userId = userId;
        body.documentLoadId = documentLoadId;
        return this.http.post<ResponseModel>(this.url+'DocumentLoad/registerDownload',JSON.stringify(body),{headers:headers});  
    }
}