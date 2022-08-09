import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ProFormulaVariableEntity } from '../entities/ProFormulaVariable.entity';

@Injectable({
    providedIn:'root'
})
export class ProFormulaVariableService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(proFormulaVariableEntity:ProFormulaVariableEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'proFormulaVariable/create',JSON.stringify(proFormulaVariableEntity),{headers:headers});
    }
    public delete(formulaVariableId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'proFormulaVariable/delete/'+formulaVariableId,{headers:headers});
    }
    public list(formulaId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proFormulaVariable/list/'+formulaId,{headers:headers});
    }
    public listMeasurementId(measurementId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'proFormulaVariable/listMeasurementId/'+measurementId,{headers:headers});
    }
}