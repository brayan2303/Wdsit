import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrFilesEntity } from '../entities/pqrFiles.entity';




@Injectable({
    providedIn: 'root'
})
export class PqrFilesService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(pqrFilesEnity: PqrFilesEntity, countryId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url + 'PqrFilesS/create/' + countryId, JSON.stringify(pqrFilesEnity), { headers: headers });
    }
    public update(pqrFilesEnity: PqrFilesEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'PqrFilesS/update', JSON.stringify(pqrFilesEnity), { headers: headers });
    }

    public delete(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url + 'PqrFilesS/delete/' + id, { headers: headers });
    }

    public list(countryId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'PqrFilesS/list/' + countryId, { headers: headers });
    }
    public findById(id: number): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'PqrFilesS/findById/' + id);
    }
    public findAll(name: string, countryId: number): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'PqrFilesS/findAll/' + name + '/' + countryId);
    }
    public findAllCustomer(name: string, countryId: number): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'PqrFilesS/findAllCustomer/' + name + '/' + countryId);
    }
    public loadFile(name: string, files: File[]): Observable<ResponseModel> {
        const formData: FormData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url + 'PqrFilesS/loadFile/' + name, formData);
    }

    public listFile(name: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url + 'PqrFilesS/listFile/' + name, { headers: headers });
    }

}
