import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Tipos } from '../models/tipo';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn:'root'
})

export class FileService {
    public url: string;
    public urlJ: string;
    constructor(
        private _http: HttpClient
    ) {
        this.url = environment.URLAPI;
        this.urlJ = environment.URLAPII;
    }
    loadFile(fileToUpload: File, cliente, origen): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this._http.post(this.url + 'WDIntegrationSAP/converter/' + cliente + '/' + origen, formData);
          
    }
    loadFileWarranty(fileToUpload: File, cliente): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this._http.post(this.url + 'warranties/' + cliente + '/uploadfilewa', formData);      
    }
    loadFileIQ09(fileToUpload: File, cliente): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload);
        return this._http.post(this.url + 'iq09s/' + cliente + '/uploadfileiq',formData);      
    }
    downloadFileIQ09(): Observable<any> {
        console.log('entrando al servicio');
        return this._http.get(this.urlJ + 'WDIntegrationSAP/iq09/downLoad/');      
    }
    loadFileInventory(fileToUpload: File, cliente): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this._http.post(this.url + 'inventories/' + cliente + '/uploadfilein', formData);      
    }
    getWarranties(clienteId): Observable<any> {
        return this._http.get(this.urlJ + 'WDIntegrationSAP/garantia/list/' + clienteId);
    }
    getIQ09(clienteId): Observable<any> {
        return this._http.get(this.urlJ + 'WDIntegrationSAP/iq09/list/' + clienteId);
    }
    getInventory(clienteId): Observable<any> {
        return this._http.get(this.url + 'inventories/' + clienteId +  '/list');
    }
    download(folder: string, order: string): Observable<any> {
        return this._http.get(this.url + 's3/download/' + folder + '/' + order);
    }
}