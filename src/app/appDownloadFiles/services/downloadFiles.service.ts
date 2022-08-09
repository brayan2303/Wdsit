import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';

@Injectable({
    providedIn:'root'
})
export class DownloadFilesService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    
    public listFileClaro():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'DownloadFiles/listFileClaro/',{ headers: headers });
    }
    public listFileClaroSmart():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'DownloadFiles/listFileClaroSmart/',{ headers: headers });
    }
    public listFileClaroFont():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'DownloadFiles/listFileClaroFont/',{ headers: headers });
    }
    public listFileDirectv():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'DownloadFiles/listFileDirectv/',{ headers: headers });
    }
    public listFileDirectvSmart():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'DownloadFiles/listFileDirectvSmart/',{ headers: headers });
    }

    public listFileEtb():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'DownloadFiles/listFileEtb/',{ headers: headers });
    }
    public listFileTigo():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'DownloadFiles/listFileTigo/',{ headers: headers });
    }
    public listFileHughes():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'DownloadFiles/listFileHughes/',{ headers: headers });
    }
    public listFileTigoMedellin():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'DownloadFiles/listFileTigoMedellin/',{ headers: headers });
    }
    public listFileRedExterna():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'DownloadFiles/listFileRedExterna/',{ headers: headers });
    }
    public listPlatafoma():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'DownloadFiles/listPlataforma/',{ headers: headers });
    }
    public findCustomerByPersonIdList(personId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'DownloadFiles/findCustomerByPersonIdList/'+personId,{headers:headers});
    }
}
