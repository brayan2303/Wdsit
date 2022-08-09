import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { CovFormEntity } from '../entities/covForm.entity';

@Injectable({
    providedIn: 'root'
})
export class covFormService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }
    public create(covFormEntity: CovFormEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.post<ResponseModel>(this.url + 'CovForm/create', JSON.stringify(covFormEntity), { headers: headers });
    }
    public update(covFormEntity: CovFormEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url + 'CovForm/update', JSON.stringify(covFormEntity), { headers: headers });
    }
    public activeInactive(id: number, status: boolean): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.put<ResponseModel>(this.url + 'CovForm/activeInactive/' + id + '/' + status, { headers: headers });
    }
    public delete(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete<ResponseModel>(this.url + 'CovForm/delete/' + id, { headers: headers });
    }

    public list(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url + 'CovForm/list', { headers: headers });
    }
    public findById(id: number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url + 'CovForm/findById/' + id, { headers: headers });
    }
    public listActive(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url + 'CovForm/listActive', { headers: headers });
    }

    public loadFile(identification: number, type: string, creationDate: String, files: File[]): Observable<ResponseModel> {
        const formData: FormData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i], files[i].name);
        }
        return this.http.post<ResponseModel>(this.url + 'CovForm/loadFile/' + identification + '/' + type + '/' + creationDate, formData);
    }

    public listFile(identification: string, type: string, creationDate: String): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url + 'CovForm/listFile/' + identification + '/' + type + '/' + creationDate, { headers: headers });
    }

    public updateinitialization(id: number, covFormEntity: CovFormEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'CovForm/updateinitialization/' + id, JSON.stringify(covFormEntity), { headers: headers });
    }
    public updateAnnexed(id: number, covFormEntity: CovFormEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'CovForm/updateAnnexed/' + id, JSON.stringify(covFormEntity), { headers: headers });
    }
    public updateProof(id: number, covFormEntity: CovFormEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'CovForm/updateProof/' + id, JSON.stringify(covFormEntity), { headers: headers });
    }
    public updateProofSecond(id: number, covFormEntity: CovFormEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'CovForm/updateProofSecond/' + id, JSON.stringify(covFormEntity), { headers: headers });

    }
    public updateProofThird(id: number, covFormEntity: CovFormEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'CovForm/updateProofThird/' + id, JSON.stringify(covFormEntity), { headers: headers });
    }
    public updateFollowUp(id: number, covFormEntity: CovFormEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'CovForm/updateFollowUp/' + id, JSON.stringify(covFormEntity), { headers: headers });
    }
    public updateWorking(id: number, covFormEntity: CovFormEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'CovForm/updateWorking/' + id, JSON.stringify(covFormEntity), { headers: headers });
    }
    public updateObservation(id: number, covFormEntity: CovFormEntity): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url + 'CovForm/updateObservation/' + id, JSON.stringify(covFormEntity), { headers: headers });
    }
    public initializatioFindById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'CovForm/initializatioFindById/'+id);
    }
    public annexedFindById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'CovForm/annexedFindById/'+id);
    }
    public proofFindById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'CovForm/proofFindById/'+id);
    }
    public proofSecondFindById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'CovForm/proofSecondFindById/'+id);
    }
    public proofThirdFindById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'CovForm/proofThirdFindById/'+id);
    }
    public proofFollowUpFindById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'CovForm/proofFollowUpFindById/'+id);
    }
    public workingFindById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'CovForm/workingFindById/'+id);
    }
    public observationFindById(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'CovForm/observationFindById/'+id);
    }
    public annexedFindByIdArray(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'CovForm/annexedFindByIdArray/'+id);
    }
    public proofFindByIdArray(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'CovForm/proofFindByIdArray/'+id);
    }
    public proofSecondFindByIdArray(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'CovForm/proofSecondFindByIdArray/'+id);
    }
    public proofThirdFindByIdArray(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'CovForm/proofThirdFindByIdArray/'+id);
    }
    public proofFollowUpFindByIdArray(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'CovForm/proofFollowUpFindByIdArray/'+id);
    }
    public workingFindByIdArray(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'CovForm/workingFindByIdArray/'+id);
    }
    public observationFindByIdArray(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'CovForm/observationFindByIdArray/'+id);
    }
    public initializatioFindByIdArray(id:number):Observable<ResponseModel>{
        return this.http.get<ResponseModel>(this.url+'CovForm/initializatioFindByIdArray/'+id);
    }
    public listCustomer(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url + 'CovForm/listCustomer', { headers: headers });
    }
    public listSegment(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url + 'CovForm/listSegment', { headers: headers });
    }
    public listCostCenter(): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url + 'CovForm/listCostCenter', { headers: headers });
    }
    
    public listAll(id:number): Observable<ResponseModel> {
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url + 'CovForm/listAll/'+id, { headers: headers });
    }
}
