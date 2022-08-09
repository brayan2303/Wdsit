import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/shared/models/response.model";
import { environment } from "src/environments/environment";
import { LoadClientLogModel } from "../models/LoadClientLog.model";

@Injectable({
    providedIn: 'root'
})
export class LoadClientParameterizationService {
    private url: string;
    constructor(private http: HttpClient) {
        this.url=environment.api;
     //   this.url=environment.api;
    }
    public loadFile(customerId:number,personId:number, creationDate:string,files:File[]):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url+'LoadClientParameterizationS/loadFile/'+customerId+'/'+personId+'/'+creationDate,formData);
    }

    public loadFileLog(customerId:number,personId:number, creationDate:string,files:File[]):Observable<ResponseModel>{
        const formData: FormData = new FormData();
        for(let i=0;i<files.length;i++){
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url+'LoadClientParameterizationS/loadFileLog/'+customerId+'/'+personId+'/'+creationDate,formData);
    }

    public createClaro(id:number, customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/createClaro/'+id+'/'+customerId,{headers:headers});
    }
    public createTigo(id:number, customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/createTigo/'+id+'/'+customerId,{headers:headers});
    }
    public createEtb(id:number, customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/createEtb/'+id+'/'+customerId,{headers:headers});
    }
    public createDirectv(id:number, customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/createDirectv/'+id+'/'+customerId,{headers:headers});
    }
    public createHughes(id:number, customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/createHughes/'+id+'/'+customerId,{headers:headers});
    }
    public createPlataformaMovil(id:number, customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/createPlataformaMovil/'+id+'/'+customerId,{headers:headers});
    }
    public createRedExterna(id:number, customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/createRedExterna/'+id+'/'+customerId,{headers:headers});
    }
    public loadClaro(customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/loadClaro/'+customerId,{headers:headers});
    }
    public loadTigo(customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/loadTigo/'+customerId,{headers:headers});
    }
    public loadEtb(customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/loadEtb/'+customerId,{headers:headers});
    }
    public loadDirectv(customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/loadDirectv/'+customerId,{headers:headers});
    }
    public loadHughes(customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/loadHughes/'+customerId,{headers:headers});
    }
    public loadPlataformaMovil(customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/loadPlataformaMovil/'+customerId,{headers:headers});
    }
    public loadRedExterna(customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/loadRedExterna/'+customerId,{headers:headers});
    }
    public load(customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/load/'+customerId,{headers:headers});
    }
    public create(id:number, customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/create/'+id+'/'+customerId,{headers:headers});
    }
    public findByClaro():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/findByClaro',{headers:headers});
    }
    public findByTigo():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/findByTigo',{headers:headers});
    }
    public findByEtb():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/findByEtb',{headers:headers});
    }
    public findByDirectv():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/findByDirectv',{headers:headers});
    }
    public findByHughes():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/findByHughes',{headers:headers});
    }
    public findByPlatafomaMovil():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/findByPlatafomaMovil',{headers:headers});
    }
    public findByRedExterna():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/findByRedExterna',{headers:headers});
    }
    public claroCount():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/claroCount',{headers:headers});
    }
    public tigoCount():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/tigoCount',{headers:headers});
    }
    public etbCount():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/etbCount',{headers:headers});
    }
    public directvCount():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/directvCount',{headers:headers});
    }
    public plataformaMovilCount():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/plataformaMovilCount',{headers:headers});
    }
    public redExternaCount():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/redExternaCount',{headers:headers});
    }
    public hughesCount():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/hughesCount',{headers:headers});
    }
    public deleteClaro(customer: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.delete<ResponseModel>(this.url + 'LoadClientParameterizationS/deleteClaro/' + customer, { headers: headers });
    }
    public deleteTigo(customer: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.delete<ResponseModel>(this.url + 'LoadClientParameterizationS/deleteTigo/' + customer, { headers: headers });
    }
    public deleteEtb(customer: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.delete<ResponseModel>(this.url + 'LoadClientParameterizationS/deleteEtb/' + customer, { headers: headers });
    }
    public deleteDirectv(customer: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.delete<ResponseModel>(this.url + 'LoadClientParameterizationS/deleteDirectv/' + customer, { headers: headers });
    }
    public deletePlataformaMovil(customer: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.delete<ResponseModel>(this.url + 'LoadClientParameterizationS/deletePlataformaMovil/' + customer, { headers: headers });
    }
    public deleteRedExterna(customer: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.delete<ResponseModel>(this.url + 'LoadClientParameterizationS/deleteRedExterna/' + customer, { headers: headers });
    }
    public deleteHughes(customer: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.delete<ResponseModel>(this.url + 'LoadClientParameterizationS/deleteHughes/' + customer, { headers: headers });
    }
    public claroList():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/claroList',{headers:headers});
    }
    public tigoList():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/tigoList',{headers:headers});
    }

    public etbList():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/etbList',{headers:headers});
    }

    public directvList():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/directvList',{headers:headers});
    }

    public plataformaMovilList():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/plataformaMovilList',{headers:headers});
    }

    public redExternaList():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/redExternaList',{headers:headers});
    }

    public hughesList():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'LoadClientParameterizationS/hughesList',{headers:headers});
    }
    public deleteFiles(customerId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.delete<ResponseModel>(this.url+'LoadClientParameterizationS/deleteFiles/'+customerId,{ headers: headers });
    }

    public createLogIq(userId:number, status:string):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'LoadClientParameterizationS/createLogIq/'+userId +'/'+status,{headers:headers});
    }
    public createLogDoc(userId:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'LoadClientParameterizationS/createLogDoc/'+userId,{headers:headers});
    }
}