import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { CovFormEntity } from '../entities/covForm.entity';

@Injectable({
    providedIn:'root'
})
export class CovFormService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(covFormEntity:CovFormEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'CovForm/create',JSON.stringify(covFormEntity),{headers:headers});
    }
    public update(covFormEntity:CovFormEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'CovForm/update',JSON.stringify(covFormEntity),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'CovForm/delete/'+id,{headers:headers});
    }
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'CovForm/list',{headers:headers});
    }
    public findById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'CovForm/findById/'+id,{headers:headers});
    }
    public listActive():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'CovForm/listActive',{ headers: headers });
    }
    public loadFile(identification:number, type:string, creationDate:String, files:File[]):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url+'CovForm/loadFile/'+identification+'/'+type+'/'+creationDate,formData);
    }
    public listFile(identification:string,type:string, creationDate:String):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'CovForm/listFile/'+identification+'/'+type+'/'+creationDate,{ headers: headers });
    }
}
