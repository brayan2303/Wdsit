import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvCardEntity } from '../entities/invCard.entity';

@Injectable({
    providedIn:'root'
})
export class InvCardService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(total:number,invCardEntity:InvCardEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'invCard/create/'+total,JSON.stringify(invCardEntity),{ headers: headers });
    }
    public delete(cardId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'invCard/delete/'+cardId,{ headers: headers });
    }
    public list(cyclicId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCard/list/'+cyclicId,{ headers: headers });
    }
    public findAvailable(cyclicId:number,quantity:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCard/findAvailable/'+cyclicId+'/'+quantity,{ headers: headers });
    }
    public sign(cardId:number,signed:string,file:string):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.http.post<ResponseModel>(this.url+'invCard/sign/'+cardId+'/'+signed,formData);
    }
}