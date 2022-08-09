import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ResponseTokenModel } from 'src/app/shared/models/responseToken.model';
import { GenPersonEntity } from '../entities/genPerson.entity';
import { GenPersonUpdatePasswordModel } from "../models/GenPersonUpdatePassword.model";


@Injectable({
    providedIn: 'root'
})
export class GenPersonService {
    private url: string;
    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(genPersonModel: GenPersonEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url + 'genPerson/create', JSON.stringify(genPersonModel), { headers: headers });
    }
    public update(genPersonModel: GenPersonEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url + 'genPerson/update', JSON.stringify(genPersonModel), { headers: headers });
    }
    public updatePassword(id: number, passwordNew: string, passwordOld: string): Observable<ResponseModel> {
        var body = new GenPersonUpdatePasswordModel;
        body.passwordNew = btoa(passwordNew);
        body.passwordOld = btoa(passwordOld);
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url + 'genPerson/updatePassword/' + id, JSON.stringify(body), { headers: headers });
    }
    public delete(genPersonId: number, active: boolean): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.put<ResponseModel>(this.url + 'genPerson/delete/' + genPersonId + '/' + active, { headers: headers });
    }
    public authenticated(): boolean {
        if (localStorage.getItem('token') != null) {
            return true;
        }
        return false;
    }
    public login(userName: string, password: string, country: string): Observable<ResponseTokenModel> {
        var parametros = new HttpParams().set('userName', btoa(userName)).set('password', btoa(password)).set('country', btoa(country));
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.post<ResponseTokenModel>(this.url + 'genPerson/login', parametros, { headers: headers });
    }
    public logOut(): Observable<ResponseTokenModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.post<ResponseTokenModel>(this.url + 'genPerson/logOut', { headers: headers });
    }

    public findById(id: number): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'genPerson/findById/' + id);
    }
    public findByIdentification(identification: number): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'genPerson/findByIdentification/' + identification);
    }
    public findByPosition(position: string): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'genPerson/findByPosition/' + position);
    }
    public list(): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'genPerson/list');
    }
    public listDirector(): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'genPerson/listDirector');
    }
    public findImage(personId: number): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'genPerson/findImage/' + personId);
    }
    public loadImage(personId: number, image: File): Observable<ResponseModel> {
        const formData: FormData = new FormData();
        formData.append('image', image, image.name);
        return this.http.post<ResponseModel>(this.url + 'genPerson/loadImage/' + personId, formData);

    }

    public listCountry(countryId: number): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(this.url + 'genPerson/listCountry/' + countryId);
    }
}