import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';

@Injectable({
    providedIn:'root'
})
export class InvMasterSerialDashService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public invStatus():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'InvMasterSerialDashS/invStatus',{headers:headers});
    }

    public listStatus(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterSerialDashS/listStatus', { headers: headers });
    }

    public listPerson(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterSerialDashS/listPerson', { headers: headers });
    }


}