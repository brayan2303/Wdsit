import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { DaiGoalEntity } from "../entities/daiGoal.entity";

@Injectable({
    providedIn: 'root'
})
export class DaiGoalService {
    private url: string;
    constructor(private http: HttpClient) {
        this.url = environment.api;
    }

    public create(daiGoalEntity: DaiGoalEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url + 'daiGoal/create', JSON.stringify(daiGoalEntity), { headers: headers });
    }
    public update(daiGoalEntity: DaiGoalEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url + 'daiGoal/update', JSON.stringify(daiGoalEntity), { headers: headers });
    }
    public delete(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url + 'daiGoal/delete/' + id, { headers: headers });
    }
    public list(year: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url + 'daiGoal/list/' + year, { headers: headers });
    }
    public dailyOperation(country: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url + 'daiGoal/dailyOperation/' + country, { headers: headers });
    }
    public entry(country: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url + 'daiGoal/entry/' + country, { headers: headers });
    }
    public dispatch(country: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url + 'daiGoal/dispatch/' + country, { headers: headers });
    }
    public repair(country: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url + 'daiGoal/repair/' + country, { headers: headers });
    }

    public codigoFamiliaList(customer: string, countryId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url + 'disDailyOperation/codigoFamiliaList/' + customer + '/' + countryId, { headers: headers });
    }
}