import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ActiveFixedAssigmentEntity } from '../entities/activeFixedAssigment.entity';



@Injectable({
    providedIn:'root'
})
export class ActiveFixedAssigmentService{
    
    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }
    public create(activeFixedAssigmentEntity:ActiveFixedAssigmentEntity):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        
        return this.http.post<ResponseModel>(this.url+'ActiveFixedAssigment/create',JSON.stringify(activeFixedAssigmentEntity),{headers:headers});
    }
    public update(activeFixedAssigmentEntity:ActiveFixedAssigmentEntity, updateUser:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'ActiveFixedAssigment/update/'+updateUser,JSON.stringify(activeFixedAssigmentEntity),{headers:headers});
    }
    
    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'ActiveFixedAssigment/delete/'+id,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ActiveFixedAssigment/list',{headers:headers});
    }
    public findById(identification:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'ActiveFixedAssigment/findById/'+identification,{headers:headers});
    }
    public loadFile(identification:number, creationDate:String, files:File[]):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url+'ActiveFixedAssigment/loadFile/'+identification+'/'+creationDate,formData);
    }
    public listFeatur(productId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'ActiveFixedAssigment/listFeatur/'+productId,{headers:headers});
    }
    public assigFeaturAll(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.get<ResponseModel>(this.url+'ActiveFixedAssigment/assigFeaturAll/'+id,{headers:headers});
    }
    public listFile(identification:string, creationDate:String):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'ActiveFixedAssigment/listFile/'+identification+'/'+creationDate,{ headers: headers });
    }
    public listPerson():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ActiveFixedAssigment/listPerson',{headers:headers});
    }
    public listAnswer(personRes:String):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ActiveFixedAssigment/listAnswer/'+personRes,{headers:headers});
    }
    public listAnswerAll():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ActiveFixedAssigment/listAnswerAll',{headers:headers});
    }
    public aprovedRejected(id:number,status:boolean):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'ActiveFixedAssigment/aprovedRejected/'+id+'/'+status,{headers:headers});
    }
    public updateAnswer(id:number, answer: string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'ActiveFixedAssigment/updateAnswer/'+id +'/'+answer,{headers:headers});
    }
    public updateDate(id:number, exitDate:Date,entryDate:Date):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        var body = new ActiveFixedAssigmentEntity();
        body.id = id;
        body.exitDate = exitDate;
        body.entryDate = entryDate;
        return this.http.put<ResponseModel>(this.url+'ActiveFixedAssigment/updateDate',JSON.stringify(body),{headers:headers});
    }
    public entryExit(serial:string,status:boolean):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url+'ActiveFixedAssigment/entryExit/'+serial+'/'+status,{headers:headers});
    }
    public listExitVerif():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'ActiveFixedAssigment/listAnswer/',{headers:headers});
    }
    public findByIdentification(serial:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'ActiveFixedAssigment/findByIdentification/'+serial,{headers:headers});
    }
    public dateById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'ActiveFixedAssigment/dateById/'+id,{headers:headers});
    }
}