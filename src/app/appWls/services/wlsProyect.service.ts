import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";
import { WlsProyectEntity } from "../entities/wlsProyect.entity";

@Injectable({
    providedIn: 'root'
})
export class WlsProyectService {
    private url: string;
    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(proyectEntity: WlsProyectEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url + 'wlsProyect/create', JSON.stringify(proyectEntity), { headers: headers });
    }
    public update(proyectEntity: WlsProyectEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'wlsProyect/update', JSON.stringify(proyectEntity), { headers: headers });
    }
    public delete(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.delete<ResponseModel>(this.url + 'wlsProyect/delete/' + id, { headers: headers });
    }
    public list(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'wlsProyect/list', { headers: headers });
    }
    public listByCustomer(countryId:number,customerId:number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'wlsProyect/listByCustomer/'+countryId+'/'+customerId, { headers: headers });
    }
    public findById(id:number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'wlsProyect/findById/'+id, { headers: headers });
    }
}