import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RepReportService } from 'src/app/appReport/services/repReport.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'modal-report',
    templateUrl: 'report.modal.html',
    styleUrls: ['./report.modal.css']
})
export class ReportModal implements OnInit {
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private repReportS: RepReportService, private alertS: AlertService,
        public dialogRef: MatDialogRef<ReportModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.columns = ['name', 'section', 'Asignar'];
        this.dataSource = new MatTableDataSource([]);
    }
    ngOnInit(): void {
        this.repReportS.findAll(this.data.personId).subscribe(res => {
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
    filter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    close(): void {
        this.dialogRef.close();
    }
    checked(input: HTMLInputElement, reportId: number) {
        if (input.checked) {
            this.repReportS.add(this.data.personId, reportId).subscribe(res => {
                if (res.message === 'OK') {
                    this.repReportS.findAll(this.data.personId).subscribe(res => {
                        if (res.message === 'OK') {
                            this.dataSource = new MatTableDataSource<any>(res.object);
                            this.dataSource.paginator = this.paginator;
                            this.dataSource.sort = this.sort;
                            this.table.renderRows();
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.repReportS.remove(this.data.personId, reportId).subscribe(res => {
                if (res.message === 'OK') {
                    this.repReportS.findAll(this.data.personId).subscribe(res => {
                        if (res.message === 'OK') {
                            this.dataSource = new MatTableDataSource<any>(res.object);
                            this.dataSource.paginator = this.paginator;
                            this.dataSource.sort = this.sort;
                            this.table.renderRows();
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
}