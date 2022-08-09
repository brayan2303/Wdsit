import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { RepReportCountryService } from "../../services/repReportCountry.service";

@Component({
    selector: 'modal-countryReport',
    templateUrl: 'countryReport.modal.html',
    styleUrls: ['./countryReport.modal.css']
})
export class CountryReportModal {
    applicationList: number;
    columns: string[];
   
    @ViewChild(MatTable) table: MatTable<any>;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private RepReportCountryS: RepReportCountryService, private alertS: AlertService,
        public dialogRef: MatDialogRef<CountryReportModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['name', 'asignar'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.RepReportCountryS.findAll(this.data.reportId).subscribe(res => {
            this.dataSource = res.object;
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.search();
    }
    close(): void {
        this.dialogRef.close(this.applicationList);
    }
    checked(input: HTMLInputElement, countryId: number) {
        if (input.checked) {
            this.RepReportCountryS.create(this.data.reportId, countryId).subscribe(res => {
                this.RepReportCountryS.findAll(this.data.reportId).subscribe(res => {
                    this.dataSource = res.object;
                    this.table.renderRows();
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.RepReportCountryS.delete(this.data.reportId, countryId).subscribe(res => {
                this.RepReportCountryS.findAll(this.data.reportId).subscribe(res => {
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
        this.RepReportCountryS.findAll(this.data.reportId).subscribe(res => {
            if (res.message === 'OK') {
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
}