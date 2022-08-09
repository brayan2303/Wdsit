import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DisMonthService } from 'src/app/appDistribution/services/disMonth.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { DisMonthDayComponent } from 'src/app/appDistribution/modals/monthDay/disMonthDay.component';

@Component({
    selector: 'app-disParameterizationMonth',
    templateUrl: './disParameterizationMonth.component.html',
    styleUrls: ['./disParameterizationMonth.component.css']
})
export class DisParameterizationMonthComponent implements OnInit {
    loading: boolean;
    editing: number;
    columns: string[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    yearList: number[];
    monthList: any[];
    year: number;
    month: number;

    constructor(private disMonthS: DisMonthService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.editing = 0;
        this.columns = ['id', 'year', 'month', 'acciones'];
        this.dataSource = new MatTableDataSource([]);
        this.yearList = [];
        this.monthList = [];
        this.year = 0;
        this.month = 0;
    }
    ngOnInit(): void {
        this.loading = true;
        this.disMonthS.list().subscribe(res => {
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
    save() {
        if (this.editing === 0) {
            this.disMonthS.create(this.year, this.month).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Mes creado!', 'success');
                        this.loading = true;
                        this.disMonthS.list().subscribe(resL => {
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
                        this.alertS.open('Error al crear el mes', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }else{
            this.disMonthS.update(this.editing,this.year,this.month).subscribe(resU=>{
                if(resU.message==='OK'){
                    if(resU.object!=0){
                        this.alertS.open('Mes actualizado!','success');
                        this.loading = true;
                        this.disMonthS.list().subscribe(resL => {
                            if (resL.message === 'OK') {
                                this.dataSource = new MatTableDataSource(resL.object);
                                this.loading = false;
                            } else {
                                this.alertS.open(resL.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    }else{
                        this.alertS.open('Error al actualizar el mes!','error');
                    }
                }else{
                    this.alertS.open(resU.message,'error');
                }
            },err=>{
                this.alertS.open(err.message,'error');
            });
        }
    }
    edit(id: number, year: number, month: number) {
        this.editing = id;
        this.year = year;
        this.month = month;
    }
    delete(id: number) {
        this.dialog.open(ConfirmationComponent,{
            data:{message:'¿Desea eliminar el mes?'},
            height:'250px',
            width:'400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.disMonthS.delete(id).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Mes eliminado!', 'success');
                            this.loading = true;
                            this.disMonthS.list().subscribe(resL => {
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
                            this.alertS.open('Error al eliminar el mes!', 'error');
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
    closeEditing() {
        this.editing = 0;
        this.year = 0;
        this.month = 0;
    }
    getDays(monthId:number,year:number,month:number){
        var dialogMonth = this.dialog.open(DisMonthDayComponent, {
            data: {'monthId':monthId,'year':year,'month':month},
            width: '100%'
        });
    }
}