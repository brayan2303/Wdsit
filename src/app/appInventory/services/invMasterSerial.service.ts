import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvMasterInitEntity } from '../entities/invMasterInit.entity';
import { InvMasterSerialEntity } from '../entities/invMasterSerial.entity';


@Injectable({
    providedIn: 'root'
})
export class InvMasterSerialService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(serial:string, mac:string, userId: number,status:string, palletId:number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new InvMasterSerialEntity();
        body.serial = serial;
        body.mac = mac;
        body.status = status;
        body.palletId = palletId;
        return this.http.post<ResponseModel>(this.url + 'InvMasterSerialS/create/' + userId, JSON.stringify(body), { headers: headers });
    }

    public delete(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url + 'InvMasterSerialS/delete/' + id, { headers: headers });
    }

    public list(palletId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterSerialS/list/' + palletId, { headers: headers });
    }

    public validationRR(serial: string, codigoSap: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterSerialS/validationRR/' + serial + '/' + codigoSap, { headers: headers });
    }

    public validationRRSerial(serial: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterSerialS/validationRRSerial/' + serial, { headers: headers });
    }

    public validationMissing(serial: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterSerialS/validationMissing/' + serial, { headers: headers });
    }

    public validationSpare(serial: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterSerialS/validationSpare/' + serial, { headers: headers });
    }

    public validationSerial(serial: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterSerialS/validationSerial/' + serial, { headers: headers });
    }
    public update(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'InvMasterSerialS/update/' + id, JSON.stringify(InvMasterInitEntity), { headers: headers });
    }

    public missingCount(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterSerialS/missingCount', { headers: headers });
    }
    public missingCountFound(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterSerialS/missingCountFound', { headers: headers });
    }
    public spareCount(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterSerialS/spareCount', { headers: headers });
    }
    public spareCountFound(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterSerialS/spareCountFound', { headers: headers });
    }

}