import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Tipos } from '../models/tipo';
import {environment} from '../../../environments/environment';
import { JsonPipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class UtilService {
    public url: string;
    constructor(
        private _http: HttpClient
    ) {
        this.url = environment.URLAPII;
    }
    deleteTables(): Observable<any> {
        return this._http.delete(this.url + 'WDIntegrationSAP/utilidad/deleteTables/');
    }
    deleteGarantia(customerId): Observable<any> {
        return this._http.delete(this.url + 'WDIntegrationSAP/garantia/delete/' + customerId);
    }
    deleteIQ09(customerId): Observable<any> {
        return this._http.delete(this.url + 'WDIntegrationSAP/iq09/delete/' + customerId);
    }
    deleteInventory(customerId): Observable<any> {
        return this._http.delete(this.url + 'WDIntegrationSAP/inventario/delete/' + customerId);
    }
    getInterpretdata(): Observable<any> {
        return this._http.get(this.url + 'WDIntegrationSAP/interpreteDato/list/');
    }
    getfiledsTables(table) {
      const json = this._http.get(this.url + 'WDIntegrationSAP/utilidad/findByTable/' + table);
      return json;  
    }
    getConfigurationFile(customerId, file): Observable<any> {
        const json = this._http.get(this.url + 'WDIntegrationSAP/configuracionArchivo/findByClienteIdNombreArchivo/' + customerId + '/' + file);
        return json;  
      }
}