import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GenCustomerService } from "src/app/appGeneral/services/genCustomer.service";
import { LoadPersonCustomerService } from "src/app/appLoadClient/services/loadPersonCustomer.service";
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
    selector: 'modal-loadPersonCustomer',
    templateUrl: 'loadPersonCustomer.modal.html',
    styleUrls: ['./loadPersonCustomer.modal.css']
})
export class LoadPersonCustomerModal {
    columns: string[];
    loading: boolean;
    @ViewChild(MatTable) table: MatTable<any>;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private alertS: AlertService, private loadPersonCustomerS:LoadPersonCustomerService,private customerS:GenCustomerService,
        public dialogRef: MatDialogRef<LoadPersonCustomerModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['id', 'name', 'asignar'];
      
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.loadPersonCustomerS.findAll(this.data.personId).subscribe(res => {
            
            this.dataSource = res.object;
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.search();
    }
    close(): void {
        this.dialogRef.close();
    }
    checked(input: HTMLInputElement,customerId:number) {
        if (input.checked) {
            this.loadPersonCustomerS.create(this.data.personId, customerId).subscribe(res => {
                this.loadPersonCustomerS.findAll(this.data.personId).subscribe(res => {
                    this.dataSource = res.object;
                    this.table.renderRows();
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.loadPersonCustomerS.delete(this.data.personId,customerId).subscribe(res => {
                this.loadPersonCustomerS.findAll(this.data.personId).subscribe(res => {
                    this.dataSource = res.object;
                    this.table.renderRows();
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    search(){
        this.loadPersonCustomerS.findAll(this.data.personId).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
 
    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}