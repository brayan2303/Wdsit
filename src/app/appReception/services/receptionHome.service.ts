import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ReceptionHomeEntity } from '../entities/receptionHome.entity';



@Injectable({
    providedIn: 'root'
})
export class ReceptionHomeService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(typeDocument:string,identification:string,name:string,lastName:string,phone:string,email:string,entity:string,eps:string,arl:string,visit:string,license:string,typeVisit:string,team:string, brand:string,serial:string, image:string,userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new ReceptionHomeEntity();
        body.typeDocument = typeDocument;
        body.identification = identification;
        body.name = name;
        body.lastName = lastName;
        body.phone = phone;
        body.email = email;
        body.entity = entity;
        body.eps = eps;
        body.arl = arl;
        body.visit = visit;
        body.license = license;
        body.typeVisit = typeVisit;
        body.team = team;
        body.brand = brand;
        body.serial = serial;
        body.image = image;
        return this.http.post<ResponseModel>(this.url + 'ReceptionHomeS/create/' + userId, JSON.stringify(body), { headers: headers });
    }

    public createExit(typeDocument:string,identification:string,name:string,lastName:string,phone:string,email:string,entity:string,eps:string,arl:string,visit:string,license:string,typeVisit:string,team:string, brand:string,serial:string, image:string,userId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new ReceptionHomeEntity();
        body.typeDocument = typeDocument;
        body.identification = identification;
        body.name = name;
        body.lastName = lastName;
        body.phone = phone;
        body.email = email;
        body.entity = entity;
        body.eps = eps;
        body.arl = arl;
        body.visit = visit;
        body.license = license;
        body.typeVisit = typeVisit;
        body.team = team;
        body.brand = brand;
        body.serial = serial;
        body.image = image;
        return this.http.post<ResponseModel>(this.url + 'ReceptionHomeS/createExit/' + userId, JSON.stringify(body), { headers: headers });
    }
    public update(ReceptionHomeE: ReceptionHomeEntity, userIdUpdate: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'ReceptionHomeS/update/' + userIdUpdate, JSON.stringify(ReceptionHomeE), { headers: headers });
    }

    public delete(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url + 'ReceptionHomeS/delete/' + id, { headers: headers });
    }

    public list(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'ReceptionHomeS/list', { headers: headers });
    }
    public findById(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'ReceptionHomeS/findById/' + id, { headers: headers });
    }

    public findType(typeId: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'ReceptionHomeS/findType/' + typeId, { headers: headers });
    }


    public findByIdentification(identification: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'ReceptionHomeS/findByIdentification/' + identification, { headers: headers });
    }

    public findByIdentificationPerson(identification: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'ReceptionHomeS/findByIdentificationPerson/' + identification, { headers: headers });
    }


    public findByIdentificationTicket(identification: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url + 'ReceptionHomeS/findByIdentificationTicket/' + identification, { headers: headers });
    }

    public loadFile(identification: number, files: File[]): Observable<ResponseModel> {
        const formData: FormData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url + 'ReceptionHomeS/loadFile/' + identification, formData);
    }

}
