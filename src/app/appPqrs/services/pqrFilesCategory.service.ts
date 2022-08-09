import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrFilesEntity } from '../entities/pqrFiles.entity';
import { PqrFilesCategoryEntity } from '../entities/pqrFilesCategory.entity';




@Injectable({
    providedIn: 'root'
})
export class PqrFilesCategoryService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(pqrFilesEnity: PqrFilesCategoryEntity, countryId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url + 'PqrFilesCategoryS/create/' + countryId, JSON.stringify(pqrFilesEnity), { headers: headers });
    }
    public update(pqrFilesEnity: PqrFilesCategoryEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'PqrFilesCategoryS/update', JSON.stringify(pqrFilesEnity), { headers: headers });
    }

    public delete(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url + 'PqrFilesCategoryS/delete/' + id, { headers: headers });
    }

    public list(typeClient: string, countryId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'PqrFilesCategoryS/list/' + typeClient + '/' + countryId, { headers: headers });
    }

    public listAll(countryId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'PqrFilesCategoryS/listAll/' + countryId, { headers: headers });
        
    }
    public findById(id: number): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'PqrFilesCategoryS/findById/' + id);
    }
}
