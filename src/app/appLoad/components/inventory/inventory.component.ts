import { Component, OnInit, ViewChild } from '@angular/core';
import { FileService } from '../../services/file.service';
import { GenCustomerService } from 'src/app/appGeneral/services/genCustomer.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { UtilService } from '../../services/util.service';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit {
    public loading: boolean;
    public fileToUpload: File = null;
    public customer: Number;
    public columns: Array<any>;
    public displayedColumns: String[];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    public listCustomers: GenCustomerEntity[];
    constructor(
        private _fileService: FileService,
        private _customerService: GenCustomerService,
        private _alertService: AlertService,
        private dialog: MatDialog,
        private _tableService: UtilService,
    ) {
        this.columns = [
            { field: 'customerId', header: 'ID Cliente' },
            { field: 'type', header: 'Tipo' },
            { field: 'supplier', header: 'Proveedor' },
            { field: 'model', header: 'Modelo' },
            { field: 'serie', header: 'Serial' },
            { field: 'mac', header: 'Mac' },
            { field: 'version', header: 'Versión' },
            { field: 'state', header: 'Estado' },
            { field: 'date', header: 'Fecha' }
        ];
        this.displayedColumns = this.columns.map(column => column.field);
        this.customer = 0;
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit() {
        this.getCustomers();
        this.customer = JSON.parse(localStorage.getItem('Customer'));
        console.log(this.customer);
        if(this.customer != null) {
            this.getInventory(Number(this.customer)); 
        }
        //this.getInventory(0);
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
    changeCustomer() {
        localStorage.setItem('Customer', JSON.stringify(this.customer));
        this.getInventory(this.customer);  
    }
    loadfileIq(files: FileList) {
        this.loading = true;
        this.fileToUpload = files.item(0);
        this._fileService.loadFileInventory(this.fileToUpload, this.customer).subscribe(
            response => {
                this.loading = false;
                if (response.statusCode === '200 OK') {
                    this.getInventory(0);
                    location.reload();
                    this._alertService.open(response.statusCode, 'success');
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
    getInventory(clienteId) {
        this.loading = true;
        this._fileService.getInventory(clienteId).subscribe(
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
    deleteInventory() {
        this.loading = true;
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿ Desea eliminar los registros?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(res => {
            if (res) {
                this._tableService.deleteInventory(this.customer).subscribe(
                    response => {
                        this.loading = false;
                        alert('Registros borrados Correctamente');
                        this.getInventory(0);
                    },
                    error => {
                        this.loading = false;
                        console.log(<any>error);
                    }
                );

            }
        }, err => {
            this.loading = false;
            this._alertService.open(err.message, 'error');
        });
    }
}