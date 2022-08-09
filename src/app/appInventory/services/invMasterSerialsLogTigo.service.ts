import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvMasterSerialsLogEntity } from '../entities/invMasterSerialsLog.entity';


@Injectable({
    providedIn: 'root'
})
export class InvMasterSerialsLogService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(userId: number,pallet:string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new InvMasterSerialsLogEntity();
        body.userId = userId;
        body.pallet = pallet;
        return this.http.post<ResponseModel>(this.url + 'InvMasterSerialsLogS/create' , JSON.stringify(body), { headers: headers });
    }
}