import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { LoadClientFieldsParametrizationEntity } from '../entities/loadClientFieldsParametrization.entity';


@Injectable({
    providedIn:'root'
})
export class LoadClientFieldsParametrizationService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(parametrizationOne:string, functionOne:string,resultOne:string,resultTwo: string, fieldParametrizationId:number,fieldId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new LoadClientFieldsParametrizationEntity();
        body.parametrizationOne = parametrizationOne;
        body.functionOne = functionOne;
        body.resultOne = resultOne;
        body.resultTwo = resultTwo;
        body.fieldParametrizationId = fieldParametrizationId;
        body.fieldId = fieldId;
        return this.http.post<ResponseModel>(this.url+'LoadClientFieldsParametrizationS/create',JSON.stringify(body),{headers:headers});
    }
    public list(fieldId: number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientFieldsParametrizationS/list/'+fieldId,{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'LoadClientFieldsParametrizationS/delete/'+id,{headers:headers});
    }
}