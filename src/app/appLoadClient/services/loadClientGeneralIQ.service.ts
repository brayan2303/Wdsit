import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';


@Injectable({
    providedIn:'root'
})
export class LoadClientRuleGeneralService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public createHughes():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientRuleGeneralS/createHughes',{headers:headers});
    }
    public createRedExterna():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientRuleGeneralS/createRedExterna',{headers:headers});
    }
    public createPlataformaMovil():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientRuleGeneralS/createPlataformaMovil',{headers:headers});
    }
    public createEtb():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientRuleGeneralS/createEtb  ',{headers:headers});
    }
    public createDirectv():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientRuleGeneralS/createDirectv  ',{headers:headers});
    }
    public createClaro():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientRuleGeneralS/createClaro  ',{headers:headers});
    }
    public createTigo():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientRuleGeneralS/createTigo  ',{headers:headers});
    }
    public sendEmail(destinatarioId:number):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.post<ResponseModel>(this.url+'LoadClientRuleGeneralS/sendEmail/'+destinatarioId,{headers:headers});
    }
    public listRedExterna():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientRuleGeneralS/listRedExterna  ',{headers:headers});
    }
    public listPlataformaMovil():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientRuleGeneralS/listPlataformaMovil  ',{headers:headers});
    }
    public delete(customer: string): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.delete<ResponseModel>(this.url + 'LoadClientRuleGeneralS/delete/' + customer, { headers: headers });
    }
    public listGeneral():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientRuleGeneralS/listGeneral  ',{headers:headers});
    }
}