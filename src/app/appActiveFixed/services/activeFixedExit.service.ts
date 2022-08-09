import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ActiveFixedExitEntity } from '../entities/activeFixedExit.entity';



@Injectable({
    providedIn:'root'
})
export class ActiveFixedExitService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(userId:number,serial:string, name:string, identification:string, area:string, position:string, equipment: string, associatedSerial: string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body= new ActiveFixedExitEntity();
        body.userId= userId;
        body.serial = serial
        body.name = name;
        body.identification =identification;
        body.area = area;
        body.position = position;
        body.equipment = equipment;
        body.associatedSerial = associatedSerial;
        return this.http.post<ResponseModel>(this.url+'ActiveFixedExit/create',JSON.stringify(body),{headers:headers});
    }
    
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'ActiveFixedExit/delete/'+id,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ActiveFixedExit/list',{headers:headers});
    }

    public updateObservation(id:number, observation:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new ActiveFixedExitEntity()
        body.id = id;
        body.observation = observation;
        return this.http.put<ResponseModel>(this.url+'ActiveFixedExit/updateObservation',JSON.stringify(body),{headers:headers});
    }
}