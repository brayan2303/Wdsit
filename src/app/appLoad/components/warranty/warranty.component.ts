import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FileService } from '../../services/file.service';
import { GenCustomerService } from '../../../appGeneral/services/genCustomer.service';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LoadPrinciplaComponent } from '../principal/loadPrincipal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { UtilService } from '../../services/util.service';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-warranty',
    templateUrl: './warranty.component.html',
    styleUrls: ['./warranty.component.css']
})

export class WarrantyComponent implements OnInit {
    public loading: boolean;
    public fileToUpload: File = null;
    public customer: Number;
    public columns: Array<any>;
    public displayedColumns: String[];
    public interData: boolean;
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public listCustomers: GenCustomerEntity[];
    @ViewChild('principal') principal: LoadPrinciplaComponent;
    constructor(
        private _fileService: FileService,
        private _customerService: GenCustomerService,
        private _alertService: AlertService,
        private dialog: MatDialog,
        private _tableService: UtilService,
    ) {
        this.columns = [
            { field: 'clienteId', header: 'ID Cliente' },
            { field: 'ciudad', header: 'Ciudad' },
            { field: 'serial', header: 'Serial' },
            { field: 'modelo', header: 'Modelo' },
            { field: 'estado', header: 'Estado' },
            { field: 'contrato', header: 'Contrato' },
            { field: 'proveedor', header: 'Proveedor' },
            { field: 'nombreCfg', header: 'Nombre CFG' },
            { field: 'fechaFinGarantia', header: 'Fecha garant' }
        ];
        this.displayedColumns = this.columns.map(column => column.field);
        this.customer = 0;
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit() {
        this.getCustomers();
        this.getwarranties(0);
    }
    getCustomers() {
        this.loading = true;
        this._customerService.findAll().subscribe(
            response => {
                if (response.message === 'OK') {
                    this.loading = false;
                    this.listCustomers = response.object;
                } else {
                    this._alertService.open(response.message, 'error');
                }
            },
            error => {
                this.loading = false;
                this._alertService.open(error.message, 'error');
            }
        );
    }
    loadfileWarranty(files: FileList) {
        this.loading = true;
        this.fileToUpload = files.item(0);
        this._fileService.loadFileWarranty(this.fileToUpload, this.customer).subscribe(
            response => {
                this.loading = false;
                if (response.statusCode === '200 OK') {
                    this._alertService.open(response.statusCode, 'success');
                    this.getwarranties(0);
                    location.reload();
                } else {
                    this._alertService.open('La estructura del Archivo es incorrecta', 'error');
                }
            },
            error => {
                this._alertService.open(error.message, 'error');
                console.log(<any>error);
            }
        );
    }
    getwarranties(clienteId) {
        this.loading = true;
        this._fileService.getWarranties(clienteId).subscribe(
            response => {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(response.object);
                this.table.renderRows();
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error => {
                this.loading = false;
                console.log(<any>error.message);
            }
        );
    }
    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    deleteWarranty() {
        this.loading = true;
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿ Desea eliminar los registros?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this._tableService.deleteGarantia(this.customer).subscribe(
                    response => {
                        this.loading = false;
                        alert('Registros borrados Correctamente');
                        this.getwarranties(0);
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
}