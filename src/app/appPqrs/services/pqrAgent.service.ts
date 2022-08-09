import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";

@Injectable({
    providedIn:'root'
})
export class PqrAgentService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(personId:number, countryId:number, countryGeneralId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new GenPersonEntity
        body.id = personId;
        body.countryId = countryId;

        return this.http.post<ResponseModel>(this.url+'pqrAgent/create/'+countryGeneralId,JSON.stringify(body),{ headers: headers });
    }
    public delete(agentId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'pqrAgent/delete/'+agentId,{ headers: headers });
    }
    public list(countryId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'pqrAgent/list/'+countryId,{ headers: headers });
    }
}