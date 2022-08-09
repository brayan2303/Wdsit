import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ReceptionMasterEntity } from '../entities/receptionMaster.entity';



@Injectable({
    providedIn: 'root'
})
export class ReceptionMasterService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(ReceptionMasterE: ReceptionMasterEntity, userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url + 'ReceptionMasterS/create/' + userId, JSON.stringify(ReceptionMasterE), { headers: headers });
    }
    public update(ReceptionMasterE: ReceptionMasterEntity, userIdUpdate: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'ReceptionMasterS/update/' + userIdUpdate, JSON.stringify(ReceptionMasterE), { headers: headers });
    }

    public delete(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url + 'ReceptionMasterS/delete/' + id, { headers: headers });
    }

    public list(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'ReceptionMasterS/list', { headers: headers });
    }
    public findById(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'ReceptionMasterS/findById/' + id, { headers: headers });
    }
    public findByName(type: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'ReceptionMasterS/findByName/' + type, { headers: headers });
    }
}