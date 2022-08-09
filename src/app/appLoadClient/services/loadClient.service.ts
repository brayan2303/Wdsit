import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LoadClientService {
    private url: string;
    private urls: string;
    constructor(private http: HttpClient) {
       this.url = environment.apiIq09;
       this.urls=environment.api;
    }
    public create(customer:string,customerId:number,loadId:number,file:File):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<ResponseModel>(this.url+'LoadClientPrealert/create/'+customer+'/'+customerId+'/'+loadId,formData);
    }
    public delete(customer: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.delete<ResponseModel>(this.url + 'LoadClientPrealert/delete/' + customer, { headers: headers });
    }
    public list(loadId:number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'LoadClientPrealert/list/'+loadId, { headers: headers });
    }
    public loadFile(files:File[]):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url+'LoadClientPrealert/loadFile',formData);
    }
    public listAll(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.urls + 'LoadClientPrealert/listAll', { headers: headers });
    }
}