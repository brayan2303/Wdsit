import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { PqrCustomerEntity } from '../entities/pqrCustomer.entity';



@Injectable({
    providedIn:'root'
})
export class PqrCustomerService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(name: string, lastName:string, emails:string, description:string, identification:number, userId: number, ticket:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body= new PqrCustomerEntity();
       
        body.name = name;
        body.lastName = lastName;
        body.emails = emails;
        body.description = description;
        body.identification = identification;
        body.userId = userId;
        body.ticket = ticket;

        return this.http.post<ResponseModel>(this.url+'PqrCustomerS/create',JSON.stringify(body),{headers:headers});
    }
    public createTicket(userId:number):Observable<ResponseModel>{
        var headers=new HttpHeaders().set('content-type','application/json');
        return this.http.post<ResponseModel>(this.url+'PqrCustomerS/createTicket/'+userId,{headers:headers});
    }
   
    public update(ticket:string, pqrCustomerEntity:PqrCustomerEntity, countryId:number ):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'PqrCustomerS/update/'+ticket+'/'+countryId,JSON.stringify(pqrCustomerEntity),{headers:headers});
    }
    
    
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'PqrCustomerS/delete/'+id,{headers:headers});
    }
    
    public list(userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'PqrCustomerS/list/'+userId,{headers:headers});
    }
    public findById(id:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrCustomerS/findById/'+id,{headers:headers});
    }

    public loadFile(ticket:string, creationDate:String, files:File[]):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url+'PqrCustomerS/loadFile/'+ticket+'/'+creationDate,formData);
    }
    public listFile(name:string, creationDate:String):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'PqrCustomerS/listFile/'+name+'/'+creationDate,{ headers: headers });
    }
    public allDescription(ticketId:string, userId: number):Observable<ResponseModel>{
        var parametros= new HttpParams().set('ticketId',ticketId).set('userId',userId);
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.post<ResponseModel>(this.url+'PqrCustomerS/allDescription',parametros,{headers:headers});
    }
    public listAll(id:string, userId: number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'PqrCustomerS/listAll/'+id+'/'+userId,{headers:headers});
    }
    public sendEmail(id:string,destinatarioId:number):Observable<ResponseModel>{
        var parametros= new HttpParams().set('id',id).set('destinatarioId',destinatarioId);
        var headers=new HttpHeaders().set('content-type','application/x-www-form-urlencoded');
        return this.http.post<ResponseModel>(this.url+'PqrCustomerS/sendEmail',parametros,{headers:headers});
    }
    public emailLog(userId: string, destinatarioId: number, status:string, typeStatus:string):Observable<ResponseModel>{
        var parametros= new HttpParams().set('userId',userId).set('destinatarioId',destinatarioId).set('status',status).set('typeStatus',typeStatus);
        var headers=new HttpHeaders().set('content-type','application/x-www-form-urlencoded');
        return this.http.post<ResponseModel>(this.url+'PqrCustomerS/emailLog',parametros,{headers:headers});
    }
    
}