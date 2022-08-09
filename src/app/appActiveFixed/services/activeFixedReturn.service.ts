import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ActiveFixedReturnEntity } from '../entities/activeFixedReturn.entity';



@Injectable({
    providedIn:'root'
})
export class ActiveFixedReturnService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(activeFixedReturnEntity:ActiveFixedReturnEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        
        return this.http.post<ResponseModel>(this.url+'ActiveFixedReturn/create',JSON.stringify(activeFixedReturnEntity),{headers:headers});
    }
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'ActiveFixedReturn/delete/'+id,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ActiveFixedReturn/list',{headers:headers});
    }
    public loadFile(identification:number, creationDate:String, files:File[]):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url+'ActiveFixedReturn/loadFile/'+identification+'/'+creationDate,formData);
    }
    public listFile(identification:string, creationDate:String):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'ActiveFixedReturn/listFile/'+identification+'/'+creationDate,{ headers: headers });
    }
    public updateSerial(serial:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'ActiveFixedReturn/updateSerial/'+serial,{headers:headers});
    }
}
