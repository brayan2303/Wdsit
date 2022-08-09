import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { GenPlantPersonEntity } from '../entities/genPlantPerson.entity';




@Injectable({
    providedIn:'root'
})
export class GenPlantPersonService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.apiIq09;
    }
    public create(personId:number,plantId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body=new GenPlantPersonEntity;
        body.personId=personId;
        body.plantId=plantId;
        
        return this.http.post<ResponseModel>(this.url+'GenPlantPerson/create',JSON.stringify(body),{headers:headers});
    }

    public delete(personId:number,plantId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url+'GenPlantPerson/delete/'+personId+'/'+plantId,{ headers: headers });
    }

    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'GenPlantPerson/list',{headers:headers});
    }
    public findAll(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'GenPlantPerson/findAll/'+id,{headers:headers});
    }
}