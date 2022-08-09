import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvValidationSerialEntity } from '../entities/invValidation.entity';


@Injectable({
    providedIn: 'root'
})
export class InvValidationSerialService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(typeId: number, typeCounting: string, serial: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new InvValidationSerialEntity()
        body.typeId=typeId;
        body.typeCounting=typeCounting;
        body.serial=serial;
        return this.http.post<ResponseModel>(this.url + 'InvValidationSerialService/create', JSON.stringify(body), { headers: headers });
    }
    public findByValidation(typeId: number, typeCounting: string, serial: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'InvValidationSerialService/findByValidation/' + typeId + '/' + typeCounting + '/' +serial, { headers: headers });
    }
    public delete(typeId:number, typeCounting:string ,serial:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'InvValidationSerialService/delete/'+typeId+'/'+typeCounting+'/'+serial,{ headers: headers });
    }
}