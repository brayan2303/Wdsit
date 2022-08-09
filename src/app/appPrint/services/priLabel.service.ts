import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PriLabelModel } from '../models/priLabel.model';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvCardService } from 'src/app/appInventory/services/invCard.service';
import { InvCardEntity } from 'src/app/appInventory/entities/invCard.entity';

@Injectable({
    providedIn: 'root'
})
export class PriLabelService {
    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(priLabelModel: PriLabelModel): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url + 'priLabel/create', JSON.stringify(priLabelModel), { headers: headers });
    }
    public update(priLabelModel: PriLabelModel): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url + 'priLabel/update', JSON.stringify(priLabelModel), { headers: headers });
    }
    public delete(labelId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url + 'priLabel/delete/' + labelId, { headers: headers });
    }
    public findByCustomerId(customerId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url + 'priLabel/findByCustomerId/' + customerId, { headers: headers });
    }
    public findById(id: number): Observable<any> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url + 'priLabel/findById/' + id, { headers: headers });
    }
    public print(printerId: number, labelId: number, priLabelModel: PriLabelModel): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = JSON.stringify(priLabelModel);

        return this.http.post<ResponseModel>(this.url + 'priLabel/print/' + printerId + '/' + labelId, body, { headers: headers });
    }
    public printCard(printerId: number, labelName: string, array: InvCardEntity[]): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url + 'priLabel/printCard/' + printerId + '/' + labelName, JSON.stringify(array), { headers: headers });
    }
    public findPallet(countryId: number, customerId: number, pallet: string, caja: string): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'priLabel/findPallet/' + countryId + '/' + customerId + '/' + pallet + '/' + caja);
    }
    public findPalletUnreadable(pallet: string): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'priLabel/findPalletUnreadable/' + pallet);
    }
    public findSerial(serial: string, countryId: number, customerId: number): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'priLabel/findSerial/' + serial + '/' + countryId + '/' + customerId);
    }
    public list(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url + 'priLabel/list', { headers: headers });
    }
    public searchPrint(userId: number, pallet: string, box: string): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'priLabel/printHistory/' + userId + '/' + pallet + '/' + box);
    }
    public createHistory(userId: number, pallet: string, box: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url + 'priLabel/createHistory/' + userId + '/' + pallet + '/' + box, { headers: headers });
    }
    public createPermissionUser(userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url + 'priLabel/userPermission/create/' + userId, { headers: headers });
    }
    public searchPermissionUserList(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url + 'priLabel/userPermission/list', { headers: headers });
    }
    public deletePermission(userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url + 'priLabel/userPermission/delete/' + userId, { headers: headers });
    }

    public validationSerial(serial:string, userId:number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url + 'priLabel/validationSerial/'+serial+'/'+userId, { headers: headers });
    }

    public listValidation(serial:string, userId:number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.get<ResponseModel>(this.url + 'priLabel/listValidation/'+serial+'/'+userId, { headers: headers });
    }

    public deleteSeries(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url + 'priLabel/deleteSeries', { headers: headers });
    }
}