import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';

@Injectable({
    providedIn:'root'
})
export class DisHeadCountService{
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(year:number,month:number,file: File):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        return this.http.post<ResponseModel>(this.url+'disHeadCount/create/'+year+'/'+month,formData);
    }
    public delete(year:number,month:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'disHeadCount/delete/'+year+'/'+month,{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'disHeadCount/list',{headers:headers});
    }
    public findByYearMonth(year:number,month:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'disHeadCount/findByYearMonth/'+year+'/'+month,{headers:headers});
    }
}