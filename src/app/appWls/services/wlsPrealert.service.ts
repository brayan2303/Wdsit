import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";
import { WlsPrealertEntity } from "../entities/wlsPrealert.entity";

@Injectable({
    providedIn: 'root'
})
export class WlsPrealertService {
    private url: string;
    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(prealertEntity: WlsPrealertEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url + 'wlsPrealert/create', JSON.stringify(prealertEntity), { headers: headers });
    }
    public delete(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.delete<ResponseModel>(this.url + 'wlsPrealert/delete/' + id, { headers: headers });
    }
    public list(proyectId:number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'wlsPrealert/list/'+proyectId, { headers: headers });
    }
}