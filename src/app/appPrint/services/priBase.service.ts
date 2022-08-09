import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';

@Injectable({
    providedIn:'root'
})
export class PriBaseService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(customer:string,file: File):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        return this.http.post<ResponseModel>(this.url+'priBase/create/'+customer,formData);
    }
    public delete(customer:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'priBase/delete/'+customer,{ headers: headers });
    }
    public findSerial(serial:string,customer:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'priBase/findSerial/'+serial+'/'+customer,{ headers: headers });
    }
    public list(customer:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'priBase/list/'+customer,{ headers: headers });
    }
}