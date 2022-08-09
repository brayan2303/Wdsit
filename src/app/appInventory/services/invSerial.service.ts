import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvSerialEntity } from '../entities/invSerial.entity';

@Injectable({
    providedIn:'root'
})
export class InvSerialService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(coutingType:string,invSerialEntity:InvSerialEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'invSerial/create/'+coutingType,JSON.stringify(invSerialEntity),{ headers: headers });
    }
    public createAll(coutingType:string,coutingId:number,creationUserId:number,array:InvSerialEntity[]):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'invSerial/createAll/'+coutingType+'/'+coutingId+'/'+creationUserId,JSON.stringify(array),{ headers: headers });
    }
    public delete(coutingType:string,serialId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'invSerial/delete/'+coutingType+'/'+serialId,{ headers: headers });
    }
    public list(coutingId:number,coutingType:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invSerial/list/'+coutingId+'/'+coutingType,{ headers: headers });
    }
    public findSap(serial:string,customer:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invSerial/findSap/'+serial+'/'+customer,{ headers: headers });
    }
    public findWms(serial:string,customer:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invSerial/findWms/'+serial+'/'+customer,{ headers: headers });
    }
    public find(coutingId:number,coutingType:string,serial:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invSerial/find/'+coutingId+'/'+coutingType+'/'+serial,{ headers: headers });
    }
}