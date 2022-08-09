import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as internal from "events";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class LoadReportValidateService {
    private url: string;
    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public loadFile(idCountry: number, userId: number, typeFile: string, files: File[]): Observable<ResponseModel> {
        const formData: FormData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url + 'ReportValidateLoad/loadFile/' +idCountry +'/'+ userId +'/'+typeFile, formData);
    }
    public listFile(userId: number,idCountry: number, typeFile: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'ReportValidateLoad/validateFile/' + userId + '/' + idCountry + '/' + typeFile, { headers: headers });
    }
    public LoadValidateReportLog(idCountry:number,userId: number):Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url + 'ReportValidateLoad/LoadValidateReportLog/' + idCountry +'/'+ userId,{ headers: headers });
    }
    public ReportValidateFindCountry(idCountry: number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'ReportValidateLoad/ReportValidateFindCountry/'+idCountry);
        
    }
    public ReportValidateLoadArchive(userId: number):Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'ReportValidateLoad/ReportValidateLoadArchive/' + userId,{headers:headers});
    }
    public ReportValidateLoadDownload(userId: number,codeLoad: string, ):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'ReportValidateLoad/ReportValidateLoadDownload/'+userId+'/'+codeLoad);
    }
    public ReportValidateLoadDelete(userId:number): Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'ReportValidateLoad/ReportValidateLoadDeleteArchive/' +userId,{headers:headers});
    }
    public ReportValidateNameArchive(userId: number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'ReportValidateLoad/ReportValidateNameArchive/' +userId,{headers:headers});
    }
}