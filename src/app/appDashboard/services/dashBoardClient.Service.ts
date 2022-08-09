import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'

})
export class DashBoardClienteService {
    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public findByCustomerId(customerId: number, countryId: number): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'DashBoardClient/FindByCustomerId/' + customerId + '/' + countryId);
    }

    public listFamily(plantId: number, customerId: number, familia: String, countryId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'DashBoardClient/listFamily/' + plantId + '/' + familia + '/' + customerId + '/' + countryId, { headers: headers });
    }
    public findByFamily(customer: string, familia: String, countryId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'DashBoardClient/findByFamily/' + familia + '/' + customer + '/' + countryId, { headers: headers });
    }
    public DashBoardClientReport(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url + 'DashBoardClient/DashBoardClientReport', { headers: headers });
    }
}