import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvMasterInitEntity } from '../entities/invMasterInit.entity';


@Injectable({
    providedIn: 'root'
})
export class InvMasterInitService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(InvMasterInitEntity: InvMasterInitEntity, userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url + 'InvMasterInitS/create/' + userId, JSON.stringify(InvMasterInitEntity), { headers: headers });
    }
    public update(InvMasterInitEntity: InvMasterInitEntity, userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'InvMasterInitS/update/' + userId, JSON.stringify(InvMasterInitEntity), { headers: headers });
    }

    public delete(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url + 'InvMasterInitS/delete/' + id, { headers: headers });
    }

    public list(userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitS/list/' + userId, { headers: headers });
    }
    public findById(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitS/findById/' + id, { headers: headers });
    }
    public listMasterType(type: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitS/listMasterType/' + type, { headers: headers });
    }
    public pallet(userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitS/pallet/' + userId, { headers: headers });
    }

    public validationPallet(palletId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitS/validationPallet/' + palletId, { headers: headers });
    }


    public listByAudit(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitS/listByAudit', { headers: headers });
    }

    public changeState(palletId: number, state: string, userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url + 'InvMasterInitS/changeState/' + palletId + '/' + state + '/' + userId, { headers: headers });
    }

    public generatePallet(palletId: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitS/generatePallet/' + palletId, { headers: headers });
    }

    public findQuantity(palletId: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitS/findQuantity/' + palletId, { headers: headers });
    }

    public serialCount(status: string, palletId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitS/serialCount/' + status + '/' + palletId, { headers: headers });
    }

    public updateLocation(id:number, location:string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new InvMasterInitEntity();
        body.id =id;
        body.location = location;
        return this.http.put<ResponseModel>(this.url + 'InvMasterInitS/updateLocation', JSON.stringify(body), { headers: headers });
    }

    public personAll(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitS/personAll', { headers: headers });
    }

    public updatePerson(id:number, userIdUpdate:number,userAuthorization:number ): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new InvMasterInitEntity();
        body.id =id;
        body.userIdUpdate = userIdUpdate;
        body.userAuthorization = userAuthorization;
        return this.http.put<ResponseModel>(this.url + 'InvMasterInitS/updatePerson', JSON.stringify(body), { headers: headers });
    }

    public listAll(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'InvMasterInitS/listAll', { headers: headers });
    }

}

