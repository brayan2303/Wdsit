import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RepWolkboxLoadService {
    private url: string;
    constructor(private http: HttpClient) {
        this.url=environment.api;
     //   this.url=environment.api;
    }
    public create(loadId:number,file:File):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<ResponseModel>(this.url+'RepWolkboxLoadS/create/'+loadId,formData);
    }
    public list(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'RepWolkboxLoadS/list', { headers: headers });
    }
    public listCustomer(loadId:number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'RepWolkboxLoadS/listCustomer/'+loadId, { headers: headers });
    }
}