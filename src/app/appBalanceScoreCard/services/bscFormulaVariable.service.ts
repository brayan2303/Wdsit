import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { BscFormulaVariableEntity } from '../entities/bscFormulaVariable.entity';

@Injectable({
    providedIn:'root'
})
export class BscFormulaVariableService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(BscFormulaVariableEntity:BscFormulaVariableEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'bscFormulaVariable/create',JSON.stringify(BscFormulaVariableEntity),{headers:headers});
    }
    public delete(formulaVariableId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'bscFormulaVariable/delete/'+formulaVariableId,{headers:headers});
    }
    public list(formulaId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscFormulaVariable/list/'+formulaId,{headers:headers});
    }
    public listMeasurementId(measurementId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'bscFormulaVariable/listMeasurementId/'+measurementId,{headers:headers});
    }
}