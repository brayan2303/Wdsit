import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';


@Injectable({
    providedIn: 'root'
})
export class ConnectionPasswordService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }

    public password(pass: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'ConnectionPasswordS/password/' + pass, { headers: headers });
    }
}
