import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvGeneralInitEntity } from '../entities/InvGeneralInit.entity';


@Injectable({
    providedIn:'root'
})
export class InvGeneralInitService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(InvGeneralInitEntity:InvGeneralInitEntity,userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'InvGeneralInitS/create/'+userId,JSON.stringify(InvGeneralInitEntity),{headers:headers});
    }  
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'InvGeneralInitS/delete/'+id,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/list',{headers:headers});
    }
    public listDeft():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/listDeft',{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/findById/'+id,{headers:headers});
    }
    public findByValidation(countingType:string,goodDeft:string,store:number,parameterizationId:string ):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/findByValidation/'+countingType+'/'+goodDeft+'/'+store+'/'+parameterizationId,{headers:headers});
    }
    public findByValidationDeft(countingType:string,goodDeft:string, parameterizationId:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/findByValidationDeft/'+countingType+'/'+goodDeft+'/'+parameterizationId,{headers:headers});
    }
    public update(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'InvGeneralInitS/update/'+id,JSON.stringify(id),{headers:headers});
    }
    public listWarehouse():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/listWarehouse',{headers:headers});
    }
    public listWarehouseDeft():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/listWarehouseDeft',{headers:headers});
    }
    public listLocation(warehouse:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/listLocation/'+warehouse,{headers:headers});
    }
    public listPartNumber( ):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/listPartNumber',{headers:headers});
    }
    public findByIdCondition(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/findByIdCondition/'+id,{headers:headers});
    }
    public findByIdQuantity(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/findByIdQuantity/'+id,{headers:headers});
    }
    public updateCounting(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'InvGeneralInitS/updateCounting/'+id,JSON.stringify(id),{headers:headers});
    }
    public updateCountingActive(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'InvGeneralInitS/updateCountingActive/'+id,JSON.stringify(id),{headers:headers});
    }
    public findByValidationSerial(serial:string, id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/findByValidationSerial/'+serial+'/'+id,{headers:headers});
    }
    public findByValidationPartNumber(serial:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/findByValidationPartNumber/'+serial,{headers:headers});
    }
    public listPartNumberSerial(partNumber:string,serial:string ):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/listPartNumberSerial/'+partNumber+'/'+serial,{headers:headers});
    }
    public listPerson():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/listPerson',{headers:headers});
    }
    public listInvHPonWTSPart():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/listInvHPonWTSPart',{headers:headers});
    }
    public listInvHPonWTSDiv():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/listInvHPonWTSDiv',{headers:headers});
    }
    public listCrossing():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/listCrossing',{headers:headers});
    }
    public listInvDash():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'InvGeneralInitS/listInvDash',{headers:headers});
    }
}