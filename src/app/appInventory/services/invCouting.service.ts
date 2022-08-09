import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { InvCoutingEntity } from '../entities/invCouting.entity';

@Injectable({
    providedIn:'root'
})
export class InvCoutingService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(cardId:number,palletId:number,sampling:number,type:string,creationUserId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new InvCoutingEntity();
        body.palletId=palletId;
        body.sampling=sampling;
        body.type=type;
        body.creationUserId=creationUserId;

        return this.http.post<ResponseModel>(this.url+'invCouting/create/'+cardId,JSON.stringify(body),{ headers: headers });
    }
    public update(cyclicCoutingId:number,sampling:number,status:string,type:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new InvCoutingEntity();
        body.id=cyclicCoutingId;
        body.sampling=sampling;
        body.status=status;
        body.type=type;

        return this.http.put<ResponseModel>(this.url+'invCouting/update',JSON.stringify(body),{ headers: headers });
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'invCouting/delete/'+id,{ headers: headers });
    }
    public addQuantity(coutingId:number,quantity:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'invCouting/addQuantity/'+coutingId+'/'+quantity,{ headers: headers });
    }
    public deleteQuantity(coutingId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'invCouting/deleteQuantity/'+coutingId,{ headers: headers });
    }
    public startEnd(cyclicCoutingId:number,status:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'invCouting/startEnd/'+cyclicCoutingId+'/'+status,{ headers: headers });
    }
    public openClose(cyclicCoutingId:number,status:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'invCouting/openClose/'+cyclicCoutingId+'/'+status,{ headers: headers });
    }
    public findQuantity(coutingId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCouting/findQuantity/'+coutingId,{ headers: headers });
    }
    public validatePallet(cyclicId:number,pallet:string,creationUserId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCouting/validatePallet/'+cyclicId+'/'+pallet+'/'+creationUserId,{ headers: headers });
    }
    public findAll(customer:string,palletId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCouting/findAll/'+customer+'/'+palletId,{ headers: headers });
    }
    public findPending(cyclicPalletId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCouting/findPending/'+cyclicPalletId,{ headers: headers });
    }
    public list(customerId:number,personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCouting/list/'+customerId+'/'+personId,{ headers: headers });
    }
    public findByPalletId(palletId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCouting/findByPalletId/'+palletId,{ headers: headers });
    }
    public total(coutingId:number,number:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCouting/total/'+coutingId+'/'+number,{ headers: headers });
    }
    public income(cyclicId:number,pallet:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCouting/income/'+cyclicId+'/'+pallet,{ headers: headers });
    }
    public remaining(coutingId:number,number:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCouting/remaining/'+coutingId+'/'+number,{ headers: headers });
    }
    public sapCode(cyclicId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'invCouting/sapCode/'+cyclicId,{ headers: headers });
    }
    public print(customer:string,invCoutingEntity:InvCoutingEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url+'invCouting/print/'+customer,JSON.stringify(invCoutingEntity),{ headers: headers });
    }
}