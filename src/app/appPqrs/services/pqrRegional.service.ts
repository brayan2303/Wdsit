import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrRegionalEntity } from "../entities/pqrRegional.entity";

@Injectable({
    providedIn: 'root'
})
export class PqrRegionalService {
    private url: string;
    constructor(private http: HttpClient) {
        this.url = environment.api;
    }

    public create(pqrRegionalEntity:PqrRegionalEntity, countryId:number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url + 'pqrRegional/create/'+countryId, JSON.stringify(pqrRegionalEntity), { headers: headers });
    }
    public update(pqrRegionalEntity:PqrRegionalEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url + 'pqrRegional/update', JSON.stringify(pqrRegionalEntity), { headers: headers });
    }
    public findAll(cityId: number,countryId:number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url + 'pqrRegional/findAll/' + cityId + '/'+ countryId, { headers: headers });
    }
    public list(cityId: number,countryId:number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url + 'pqrRegional/list/'+cityId + '/'+ countryId, { headers: headers });
    }
}