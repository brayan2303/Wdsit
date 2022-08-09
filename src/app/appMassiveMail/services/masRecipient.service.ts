import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';

@Injectable({
    providedIn:'root'
})
export class MasRecipientService{
    private url:string;
    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public create(mailId:number,creationUserId:number,file:File):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<ResponseModel>(this.url+'masRecipient/create/'+mailId+'/'+creationUserId,formData);
    }
    public delete(mailId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'masRecipient/delete/'+mailId,{ headers: headers });
    }
    public list(mailId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'masRecipient/list/'+mailId,{ headers: headers });
    }
}