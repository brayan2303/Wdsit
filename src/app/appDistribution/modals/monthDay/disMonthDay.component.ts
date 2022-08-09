import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DisMonthDayService } from '../../services/disMonthDay.service';

@Component({
    selector: 'app-disMonthDay',
    templateUrl: './disMonthDay.component.html',
    styleUrls: ['./disMonthDay.component.css']
})
export class DisMonthDayComponent implements OnInit {
    daysList: number[];

    constructor(private disMonthDayS: DisMonthDayService, private alertS: AlertService, private dialogRef: MatDialogRef<DisMonthDayComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.daysList = [];
    }
    ngOnInit(): void {
        this.disMonthDayS.list(this.data.monthId, this.data.year, this.data.month).subscribe(res => {
            if (res.message === 'OK') {
                this.daysList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });

    }
    addRemove(day: number,active:boolean) {
        if(active){
            this.disMonthDayS.create(this.data.monthId, day).subscribe(resC => {
                if (resC.message === 'OK') {
                    if (resC.object != 0) {
                        this.alertS.open('Dia agregado!', 'success');
                        this.disMonthDayS.list(this.data.monthId, this.data.year, this.data.month).subscribe(res => {
                            if (res.message === 'OK') {
                                this.daysList = res.object;
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al agregar el dia!', 'error');
                    }
                } else {
                    this.alertS.open(resC.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }else{
            this.disMonthDayS.delete(this.data.monthId,day).subscribe(resD => {
                if (resD.message === 'OK') {
                    if (resD.object != 0) {
                        this.alertS.open('Dia removido!', 'success');
                        this.disMonthDayS.list(this.data.monthId, this.data.year, this.data.month).subscribe(res => {
                            if (res.message === 'OK') {
                                this.daysList = res.object;
                            } else {
                                this.alertS.open(res.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al remover el dia!', 'error');
                    }
                } else {
                    this.alertS.open(resD.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    close(status: boolean) {
        this.dialogRef.close(status);
    }
}