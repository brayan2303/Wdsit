import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PriVariableDetailEntity } from "../../entities/priVariableDetail.entity";
import { PriVariableValueModel } from "../../models/priVariableValue.model";
import { PriVariableDetailService } from "../../services/priVariableDetail.service";

@Component({
    selector: 'modal-detailVariable',
    templateUrl: 'detailVariable.modal.html',
    styleUrls: ['./detailVariable.modal.css']
})
export class DetailVariableModal {
    variableList: PriVariableValueModel[];

    constructor(private priVariableDetailS: PriVariableDetailService, private alertS: AlertService,
        public dialogRef: MatDialogRef<DetailVariableModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.variableList = [];
    }
    ngOnInit(): void {
        this.priVariableDetailS.list(this.data.measurementDetailId).subscribe(res => {
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
        var array: PriVariableDetailEntity[] = [];
        for (let i = 0; i < this.variableList.length; i++) {
            if (this.variableList[i].type === 'Automactic') {
                operation = operation + '' + String((document.getElementById(this.variableList[i].variableId + '|' + this.variableList[i].description + '|' + this.variableList[i].detail) as HTMLInputElement).value);
                var b = new PriVariableDetailEntity();
                b.id = this.variableList[i].variableId;
                (b.value) = (document.getElementById(this.variableList[i].variableId + '|' + this.variableList[i].description + '|' + this.variableList[i].detail) as HTMLInputElement).value;
                array.push(b);
            } else {
                if (this.variableList[i].description === 'Suma') {
                    operation = operation + '+';
                } else if (this.variableList[i].description === 'Resta') {
                    operation = operation + '-';
                } else if (this.variableList[i].description === 'Multiplicacion') {
                    operation = operation + '*';
                } else if (this.variableList[i].description === 'Division') {
                    operation = operation + '/';
                }else if (this.variableList[i].description === 'Parentesis Apertura') {
                    operation = operation + '(';
                }else if (this.variableList[i].description === 'Parentesis Cierre') {
                    operation = operation + ')';
                }
            }
            if (this.variableList[i].type === 'Variable') {
                operation = operation + '' + String((document.getElementById(this.variableList[i].variableId + '|' + this.variableList[i].description + '|' + this.variableList[i].detail) as HTMLInputElement).value);
                var b = new PriVariableDetailEntity();
                b.id = this.variableList[i].variableId;
                (b.value) = (document.getElementById(this.variableList[i].variableId + '|' + this.variableList[i].description + '|' + this.variableList[i].detail) as HTMLInputElement).value;
                array.push(b);
            } else {
                if (this.variableList[i].description === 'Suma') {
                    operation = operation + '+';
                } else if (this.variableList[i].description === 'Resta') {
                    operation = operation + '-';
                } else if (this.variableList[i].description === 'Multiplicacion') {
                    operation = operation + '*';
                } else if (this.variableList[i].description === 'Division') {
                    operation = operation + '/';
                }else if (this.variableList[i].description === 'Parentesis Apertura') {
                    operation = operation + '(';
                }else if (this.variableList[i].description === 'Parentesis Cierre') {
                    operation = operation + ')';
                }
            }
            
        }
        this.priVariableDetailS.update(array).subscribe(resU => {
            if (resU.message === 'OK') {
                if (resU.object != 0) {
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