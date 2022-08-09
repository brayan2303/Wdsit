import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ConnectioGeneralEntity } from '../entities/genDataBases.entity';


@Injectable({
    providedIn: 'root'
})
export class ConnectioGeneralService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(ConnectioGeneralE: ConnectioGeneralEntity, userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url + 'ConnectioGeneralS/create/' + userId, JSON.stringify(ConnectioGeneralE), { headers: headers });
    }
    public update(ConnectioGeneralE: ConnectioGeneralEntity, userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'ConnectioGeneralS/update/' + userId, JSON.stringify(ConnectioGeneralE), { headers: headers });
    }

    public delete(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url + 'ConnectioGeneralS/delete/' + id, { headers: headers });
    }

    public list(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'ConnectioGeneralS/list', { headers: headers });
    }
    public findById(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'ConnectioGeneralS/findById/' + id, { headers: headers });
    }

    public findByIdCustomer(customerId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'ConnectioGeneralS/findByIdCustomer/' + customerId, { headers: headers });
    }
    public findAll(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'ConnectioGeneralS/findAll', { headers: headers });
    }

    public listCountry(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'ConnectioGeneralS/listCountry', { headers: headers });
    }
}