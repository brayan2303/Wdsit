import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BscMeasurementDetailVariableEntity } from '../../entities/bscMeasurementDetailVariable.entity';
import { BscVariableValueModel } from "../../models/bscVariableValue.model";
import { BscMeasurementDetailService } from '../../services/bscMeasurementDetail.service';
import { BscMeasurementDetailVariableService } from '../../services/bscMeasurementDetailVariable.service';

@Component({
    selector: 'modal-detailVariable',
    templateUrl: 'detailVariable.modal.html',
    styleUrls: ['./detailVariable.modal.css']
})
export class DetailVariableModal {
    variableList: BscVariableValueModel[];

    constructor(private bscMeasurementDetailS: BscMeasurementDetailService, private bscMeasurementDetailVariableS: BscMeasurementDetailVariableService, private alertS: AlertService,
        public dialogRef: MatDialogRef<DetailVariableModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.variableList = [];
    }
    ngOnInit(): void {
        this.bscMeasurementDetailVariableS.list(this.data.measurementDetailId).subscribe(res => {
            if (res.message === 'OK') {
                this.variableList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    close(): void {
        this.dialogRef.close();
    }
    save() {
        var operation = '';
        var array: BscMeasurementDetailVariableEntity[] = [];
        for (let i = 0; i < this.variableList.length; i++) {
            if (this.variableList[i].type === 'Variable') {
                operation = operation + '' + Number((document.getElementById(this.variableList[i].formulaVariableId + '|' + this.variableList[i].name + '|' + this.variableList[i].detailVariableId) as HTMLInputElement).value);
                var b = new BscMeasurementDetailVariableEntity();
                b.id = this.variableList[i].detailVariableId;
                b.value = Number((document.getElementById(this.variableList[i].formulaVariableId + '|' + this.variableList[i].name + '|' + this.variableList[i].detailVariableId) as HTMLInputElement).value);
                array.push(b);
            } else {
                if (this.variableList[i].name === 'Suma') {
                    operation = operation + '+';
                } else if (this.variableList[i].name === 'Resta') {
                    operation = operation + '-';
                } else if (this.variableList[i].name === 'Multiplicacion') {
                    operation = operation + '*';
                } else if (this.variableList[i].name === 'Division') {
                    operation = operation + '/';
                }else if (this.variableList[i].name === 'Parentesis Apertura') {
                    operation = operation + '(';
                }else if (this.variableList[i].name === 'Parentesis Cierre') {
                    operation = operation + ')';
                }
            }
        }
        this.bscMeasurementDetailVariableS.update(array).subscribe(resU => {
            if (resU.message === 'OK') {
                if (resU.object != 0) {
                    this.bscMeasurementDetailS.update(this.data.measurementDetailId, 'Result', Number(eval(operation))).subscribe(res => {
                        if (res.message === 'OK') {
                            if (res.object != 0) {
                                this.alertS.open('Resultado actualizado!', 'success');
                                this.close();
                            } else {
                                this.alertS.open('Error al actualizar el resultado!', 'error');
                            }
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open('Error al actualizar las variables!', 'error');
                }
            } else {
                this.alertS.open(resU.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
}