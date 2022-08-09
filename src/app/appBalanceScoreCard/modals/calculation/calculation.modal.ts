import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BscFormulaVariableEntity } from '../../entities/bscFormulaVariable.entity';
import { BscListEntity } from '../../entities/bscList.entity';
import { BscVariableEntity } from '../../entities/bscVariable.entity';
import { BscFormulaVariableService } from '../../services/bscFormulaVariable.service';
import { BscListService } from '../../services/bscList.service';
import { BscVariableService } from '../../services/bscVariable.service';
import { VariableModal } from '../variable/variable.modal';

@Component({
    selector: 'modal-calculation',
    templateUrl: 'calculation.modal.html',
    styleUrls: ['./calculation.modal.css']
})
export class CalculationModal implements OnInit {
    variable: string;
    operationList: BscListEntity[];
    variableList: BscVariableEntity[];
    calculationList: BscFormulaVariableEntity[];
    selectedVariableList: BscVariableEntity[];

    constructor(private bscListadoS: BscListService, private bscVariableS: BscVariableService, private bscFormulaVariableS: BscFormulaVariableService, private dialog: MatDialog, private alertS: AlertService, private dialogRef: MatDialogRef<CalculationModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.variable = '0';
        this.operationList = [];
        this.variableList = [];
        this.calculationList = [];
        this.selectedVariableList = [];
    }
    ngOnInit(): void {
        this.bscListadoS.findByListType('Operacion').subscribe(res => {
            if (res.message === 'OK') {
                this.operationList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.bscVariableS.listActive().subscribe(res => {
            if (res.message === 'OK') {
                this.variableList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.bscFormulaVariableS.list(this.data.formulaId).subscribe(res => {
            if (res.message === 'OK') {
                this.calculationList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    add(id: number, name: string) {
        var calculationModel: BscFormulaVariableEntity = new BscFormulaVariableEntity();
        calculationModel.formulaId=this.data.formulaId;
        calculationModel.type = 'Operador';
        calculationModel.variableId = id;
        calculationModel.variable = name;
        this.bscFormulaVariableS.create(calculationModel).subscribe(resC => {
            if (resC.message === 'OK') {
                if (resC.object != 0) {
                    this.alertS.open('Operador agregado!', 'success');
                    this.bscFormulaVariableS.list(this.data.formulaId).subscribe(res => {
                        if (res.message === 'OK') {
                            this.calculationList = res.object;
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open('Error al agregar el operador!', 'error');
                }
            } else {
                this.alertS.open(resC.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    remove(id: number, type: string) {
        this.bscFormulaVariableS.delete(id).subscribe(resD => {
            if (resD.message === 'OK') {
                if (resD.object != 0) {
                    this.alertS.open(type === 'Operador' ? 'Operador eliminado!' : 'Variable eliminada!', 'success');
                    this.bscFormulaVariableS.list(this.data.formulaId).subscribe(res => {
                        if (res.message === 'OK') {
                            this.calculationList = res.object;
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open(type === 'Operador' ? 'Error al eliminar el operador!' : 'Error al eliminar la variable!', 'error');
                }
            } else {
                this.alertS.open(resD.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getVariable() {
        var dialogVariable = this.dialog.open(VariableModal, {
            width: '800px'
        });
        dialogVariable.afterClosed().subscribe(resA => {
            if (resA.id != 0) {
                var calculationModel: BscFormulaVariableEntity = new BscFormulaVariableEntity();
                calculationModel.formulaId=this.data.formulaId;
                calculationModel.type = 'Variable';
                calculationModel.variableId = resA.id;
                calculationModel.variable = resA.name;
                this.bscFormulaVariableS.create(calculationModel).subscribe(resC => {
                    if (resC.message === 'OK') {
                        if (resC.object != 0) {
                            this.alertS.open('Variable agregada!', 'success');
                            this.bscFormulaVariableS.list(this.data.formulaId).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.calculationList = res.object;
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al agregar la variable!', 'error');
                        }
                    } else {
                        this.alertS.open(resC.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
    close(): void {
        this.dialogRef.close();
    }
}