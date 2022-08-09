import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LoadClienPersontService {
    private url: string;
    constructor(private http: HttpClient) {
        this.url=environment.apiIq09;
     //   this.url=environment.api;
    }
    public create(customer:string,customerId:number,loadId:number,file:File):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<ResponseModel>(this.url+'LoadClientPerson/create/'+customer+'/'+customerId+'/'+loadId,formData);
    }
    public delete(customer: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.delete<ResponseModel>(this.url + 'LoadClientPerson/delete/' + customer, { headers: headers });
    }
    public list(loadId:number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'LoadClientPerson/list/'+loadId, { headers: headers });
    }
    public listCustomer(loadId:number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'LoadClientPerson/listCustomer/'+loadId, { headers: headers });
    }
}