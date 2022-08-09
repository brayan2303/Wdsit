import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";
import { GenHolidaysEntity } from "../entities/genHolidays.entity";
import { GenPlantEntity } from "../entities/genPlant.entity";


@Injectable({
    providedIn:'root'
})
export class GenHolidaysService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(userId:number,holidays:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body= new GenHolidaysEntity();
        body.userId= userId;
        body.holidays = holidays
        return this.http.post<ResponseModel>(this.url+'GenHolidaysS/create',JSON.stringify(body),{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.get<ResponseModel>(this.url+'GenHolidaysS/list',{headers:headers});
    }
    public update(genHolidaysEntity:GenHolidaysEntity):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.put<ResponseModel>(this.url+'GenHolidaysS/update',JSON.stringify(genHolidaysEntity),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'GenHolidaysS/delete/'+id,{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'GenHolidaysS/findById/'+id,{headers:headers});
    }
}