import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CertCertPeriodicityService } from "../../servicies/certCertPeriodicity.service";
import { CertMonthService } from "../../servicies/certMonth.service";
import { CertPeriodicityService } from "../../servicies/certPeriodicity.service";
import { CertPeriodicityMonthService } from "../../servicies/certPeriodicityMonth.service";


@Component({
    selector: 'modal-certPeriodicityMonth',
    templateUrl: './certPeriodicityMonth.modal.html',
    styleUrls: ['./certPeriodicityMonth.modal.css']
})
export class CertMonthModal {
    columns: string[];
    loading: boolean;
    @ViewChild(MatTable) table: MatTable<any>;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private CerMonthS:CertMonthService, private alertS: AlertService, private certPeriodicityMonthS:CertPeriodicityMonthService,
        public dialogRef: MatDialogRef<CertMonthModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['name', 'asignar'];
      
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.CerMonthS.findAll(this.data.id).subscribe(res => {
            this.dataSource = res.object;
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.search();
    }
    close(): void {
        this.dialogRef.close();
    }
    checked(input: HTMLInputElement,monthId:number) {
        if (input.checked) {
            this.certPeriodicityMonthS.create(this.data.id,monthId).subscribe(res => {
                this.CerMonthS.findAll(this.data.id).subscribe(res => {
                    this.dataSource = res.object;
                    this.table.renderRows();
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {            
            this.certPeriodicityMonthS.delete(this.data.id,monthId).subscribe(res => {
            
                this.CerMonthS.findAll(this.data.id).subscribe(res => {
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
        this.CerMonthS.findAll(this.data.id).subscribe(res => {
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