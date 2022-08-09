import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrMessageSendEntity } from '../entities/pqrMessageSend.entity';


@Injectable({
    providedIn: 'root'
})
export class PqrMessageSendService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(PqrMessageSendEntity: PqrMessageSendEntity, countryId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url + 'PqrMessageSendS/create/' + countryId, JSON.stringify(PqrMessageSendEntity), { headers: headers });
    }
    public update(PqrMessageSendEntity: PqrMessageSendEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'PqrMessageSendS/update', JSON.stringify(PqrMessageSendEntity), { headers: headers });
    }

    public delete(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url + 'PqrMessageSendS/delete/' + id, { headers: headers });
    }

    public list(countryId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'PqrMessageSendS/list/' + countryId, { headers: headers });
    }
    public findById(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'PqrMessageSendS/findById/' + id, { headers: headers });
    }
}