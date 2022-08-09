import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class WlsPrealertSerialService {
    private url: string;
    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(customer:string,prealertId:number,file:File):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<ResponseModel>(this.url+'wlsPrealertSerial/create/'+customer+'/'+prealertId,formData);
    }
    public delete(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.delete<ResponseModel>(this.url + 'wlsPrealertSerial/delete/' + id, { headers: headers });
    }
    public list(prealertId:number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'wlsPrealertSerial/list/'+prealertId, { headers: headers });
    }
}