import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { DisHeadCountService } from 'src/app/appDistribution/services/disHeadCount.service';

@Component({
    selector: 'app-disParameterizationHeadCount',
    templateUrl: './disParameterizationHeadCount.component.html',
    styleUrls: ['./disParameterizationHeadCount.component.css']
})
export class DisParameterizationHeadCountComponent implements OnInit {
    loading: boolean;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    yearList: number[];
    monthList: any[];
    year: number;
    month: number;

    constructor(private disHeadCountS: DisHeadCountService, public dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.columns = ['year','monthName', 'quantity', 'acciones'];
        this.dataSource = new MatTableDataSource([]);
        this.yearList = [];
        this.monthList = [];
        this.year = 0;
        this.month = 0;
    }
    ngOnInit(): void {
        this.loading = true;
        this.disHeadCountS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource = new MatTableDataSource(res.object);
                this.loading = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        for (let i = 2000; i < 2051; i++) {
            this.yearList.push(i);
        }
        this.monthList.push({ 'id': 1, 'name': 'Enero' });
        this.monthList.push({ 'id': 2, 'name': 'Febrero' });
        this.monthList.push({ 'id': 3, 'name': 'Marzo' });
        this.monthList.push({ 'id': 4, 'name': 'Abril' });
        this.monthList.push({ 'id': 5, 'name': 'Mayo' });
        this.monthList.push({ 'id': 6, 'name': 'Junio' });
        this.monthList.push({ 'id': 7, 'name': 'Julio' });
        this.monthList.push({ 'id': 8, 'name': 'Agosto' });
        this.monthList.push({ 'id': 9, 'name': 'Septiembre' });
        this.monthList.push({ 'id': 10, 'name': 'Octubre' });
        this.monthList.push({ 'id': 11, 'name': 'Noviembre' });
        this.monthList.push({ 'id': 12, 'name': 'Diciembre' });
    }
    load(file: FileList) {
        if (this.year != 0 && this.month != 0) {
            if (file[0] != null && file[0] != undefined) {
                this.disHeadCountS.create(this.year, this.month, file[0]).subscribe(resC => {
                    if (resC.message === 'OK') {
                        this.alertS.open('Head Count cargado!', 'success');
                        this.loading = true;
                        this.disHeadCountS.list().subscribe(resL => {
                            if (resL.message === 'OK') {
                                this.dataSource = new MatTableDataSource(resL.object);
                                this.loading = false;
                            } else {
                                this.alertS.open(resL.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open(resC.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        } else {
            this.alertS.open('Complete la informacion!', 'warning');
        }
    }
    delete(year: number, month: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿Desea eliminar el head count?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.disHeadCountS.delete(year, month).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Head count eliminado!', 'success');
                            this.loading = true;
                            this.disHeadCountS.list().subscribe(resL => {
                                if (resL.message === 'OK') {
                                    this.dataSource = new MatTableDataSource(resL.object);
                                    this.loading = false;
                                } else {
                                    this.alertS.open(resL.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al eliminar el head count!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
}