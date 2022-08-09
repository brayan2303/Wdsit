import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FileService } from '../../services/file.service';
import { GenCustomerService } from '../../../appGeneral/services/genCustomer.service';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { UtilService } from '../../services/util.service';
import { saveAs } from 'file-saver';
import { MatSort } from '@angular/material/sort';
import { forkJoin } from 'rxjs';


@Component({
    selector: 'app-load-files',
    templateUrl: './loadFiles.component.html',
    styleUrls: ['./loadFiles.component.css']
})

export class LoadFilesComponent implements OnInit {
    public loading: boolean;
    public fileToUpload: File = null;
    public customer: Number;
    public columns: Array<any>;
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public listCustomers: GenCustomerEntity[];
    public displayedColumns: String[];
    unibytes: Uint8Array = null;
    buttonDownLoad: boolean;
    constructor(
        private _fileService: FileService,
        private _customerService: GenCustomerService,
        private _alertService: AlertService,
        private dialog: MatDialog,
        private _tableService: UtilService,
    ) {
        this.columns = [
            { header: 'ID Cliente', field: 'clienteId' },
            { header: 'Codigo Sap', field: 'codigoSap' },
            { header: 'Serial', field: 'serial' },
            { header: 'Almacen', field: 'almacen' },
            { header: 'Lote', field: 'lote' },
            { header: 'Estado', field: 'estado' },
            { header: 'Usuario', field: 'usuarioCreacion' },
            { header: 'Fecha Crea', field: 'fechaCreacion' }
        ];
        this.displayedColumns = this.columns.map(column => column.field);
        this.customer = 0;
        this.dataSource = new MatTableDataSource([]);
        this.buttonDownLoad = false;
    }
    ngOnInit() {
        this.getCustomers();
        this.getIQ09(0);
    }
    getCustomers() {
        this._customerService.findAll().subscribe(
            response => {
                if (response.message === 'OK') {
                    this.listCustomers = response.object;
                } else {
                    this._alertService.open(response.message, 'error');
                }
            },
            error => {
                this._alertService.open(error.message, 'error');
            }
        );
    }
    loadfileIq(files: FileList) {
        this.loading = true;
        this.fileToUpload = files.item(0);
        this._fileService.loadFileIQ09(this.fileToUpload, this.customer).subscribe(
            response => {
                this.loading = false;
                console.log(response.object);
                if (response.statusCode === '200 OK') {
                    this._alertService.open(response.statusCode, 'success');
                    location.reload();
                } else {
                    this._alertService.open('La estructura del Archivo es incorrecta', 'error');
                }
            },
            error => {
                this._alertService.open(error.statusCode, 'error');
                console.log(<any>error);
            }
        );
    }
    getIQ09(clienteId) {
        this.loading = true;
        forkJoin(
            this._fileService.getIQ09(clienteId),
            this._fileService.getInventory(clienteId),
            this._fileService.getInventory(clienteId)
        ).subscribe(
            response => {
                this.dataSource = new MatTableDataSource<any>(response[0].object);
                this.table.renderRows();
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                const iventory:[] = response[1].object;
                const warranty:[] = response[2].object;
                if(iventory.length > 0 && warranty.length > 0) {
                    this.buttonDownLoad = true;
                }
                this.loading = false;
            },
            error => {
                this.loading = false;
                console.log(<any>error.message);
            }
        );
        this._fileService.getIQ09(clienteId).subscribe(
           
        );
    }
    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    deleteIq09() {
        this.loading = true;
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿ Desea eliminar los registros?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this._tableService.deleteIQ09(this.customer).subscribe(
                    response => {
                        this.loading = false;
                        alert('Registros borrados Correctamente');
                        this.getIQ09(0);
                        location.reload();
                    },
                    error => {
                        this.loading = false;
                        console.log(<any>error);
                    }
                );

            }
        }, err => {
            this._alertService.open(err.message, 'error');
        });
    }
    downloadIq09() {
        this.loading = true;
        console.log('DownLoad');
        this._fileService.downloadFileIQ09().subscribe(
            response => {
                this.loading = false;
                const fileResult =  response.object;
                alert('Descargando....');
                this.unibytes = new Uint8Array(this._base64ToArrayBuffer(fileResult));
                this.download();
            }
        );
    }
    _base64ToArrayBuffer(base64) {
        const _binary_string = atob(base64);
        const len = _binary_string.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = _binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
    download() {
        const b = new Blob([this.unibytes], { type: 'application/csv' });
        saveAs(b, 'IQ09.csv');      
    }
}