import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ActiveFixedAssigSerialEntity } from '../entities/ActiveFixedAssigSerial.entity';



@Injectable({
    providedIn:'root'
})
export class ActiveFixedAssigSerialService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(activeFixedAssigSerialEntity:ActiveFixedAssigSerialEntity[]):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        
        return this.http.post<ResponseModel>(this.url+'ActiveFixedAssigSerial/create',JSON.stringify(activeFixedAssigSerialEntity),{headers:headers});
    }
    public update(activeFixedAssigSerialEntity:ActiveFixedAssigSerialEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'ActiveFixedAssigSerial/update',JSON.stringify(activeFixedAssigSerialEntity),{headers:headers});
    }
    
    public delete(assigmentId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'ActiveFixedAssigSerial/delete/'+assigmentId,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ActiveFixedAssigSerial/list',{headers:headers});
    }
}