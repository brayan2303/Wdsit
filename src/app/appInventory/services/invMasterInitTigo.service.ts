import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvMasterInitEntity } from '../entities/invMasterInit.entity';


@Injectable({
    providedIn: 'root'
})
export class InvMasterInitTigoService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(InvMasterInitEntity: InvMasterInitEntity, userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url + 'InvMasterInitTigoS/create/' + userId, JSON.stringify(InvMasterInitEntity), { headers: headers });
    }
    public update(InvMasterInitEntity: InvMasterInitEntity, userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'InvMasterInitTigoS/update/' + userId, JSON.stringify(InvMasterInitEntity), { headers: headers });
    }

    public delete(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url + 'InvMasterInitTigoS/delete/' + id, { headers: headers });
    }

    public list(userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitTigoS/list/' + userId, { headers: headers });
    }
    public findById(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitTigoS/findById/' + id, { headers: headers });
    }
    public listMasterType(type: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitTigoS/listMasterType/' + type, { headers: headers });
    }
    public pallet(userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitTigoS/pallet/' + userId, { headers: headers });
    }

    public validationPallet(palletId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitTigoS/validationPallet/' + palletId, { headers: headers });
    }


    public listByAudit(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitTigoS/listByAudit', { headers: headers });
    }

    public changeState(palletId: number, state: string, userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url + 'InvMasterInitTigoS/changeState/' + palletId + '/' + state + '/' + userId, { headers: headers });
    }

    public generatePallet(palletId: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitTigoS/generatePallet/' + palletId, { headers: headers });
    }

    public findQuantity(palletId: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitTigoS/findQuantity/' + palletId, { headers: headers });
    }

    public serialCount(status: string, palletId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitTigoS/serialCount/' + status + '/' + palletId, { headers: headers });
    }

    public updateLocation(id: number, location: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new InvMasterInitEntity();
        body.id = id;
        body.location = location;
        return this.http.put<ResponseModel>(this.url + 'InvMasterInitTigoS/updateLocation', JSON.stringify(body), { headers: headers });
    }

    public personAll(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitTigoS/personAll', { headers: headers });
    }

    public updatePerson(id: number, userIdUpdate: number, userAuthorization: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new InvMasterInitEntity();
        body.id = id;
        body.userIdUpdate = userIdUpdate;
        body.userAuthorization = userAuthorization;
        return this.http.put<ResponseModel>(this.url + 'InvMasterInitTigoS/updatePerson', JSON.stringify(body), { headers: headers });
    }

    public listAll(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitTigoS/listAll', { headers: headers });
    }

    public validationCodSap(codSap: string, serial: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitTigoS/validationCodSap/' + codSap + '/' + serial, { headers: headers });
    }


}

