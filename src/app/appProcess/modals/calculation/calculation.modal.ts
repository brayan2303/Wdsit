import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProFormulaVariableEntity } from '../../entities/ProFormulaVariable.entity';
import { ProListEntity } from '../../entities/proList.entity';
import { ProVariableEntity } from '../../entities/proVariable.entity';
import { ProFormulaVariableService } from '../../services/proFormulaVariable.service';
import { ProListService } from '../../services/ProList.service';
import { ProVariableService } from '../../services/proVariable.service';
import { VariableModal } from '../variable/variable.modal';

@Component({
    selector: 'modal-calculation',
    templateUrl: 'calculation.modal.html',
    styleUrls: ['./calculation.modal.css']
})
export class CalculationModal implements OnInit {
    variable: string;
    operationList: ProListEntity[];
    variableList: ProVariableEntity[];
    calculationList: ProFormulaVariableEntity[];
    selectedVariableList: ProVariableEntity[];

    constructor(private proListadoS: ProListService, private proVariableS: ProVariableService, private proFormulaVariableS: ProFormulaVariableService, private dialog: MatDialog, private alertS: AlertService, private dialogRef: MatDialogRef<CalculationModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.variable = '0';
        this.operationList = [];
        this.variableList = [];
        this.calculationList = [];
        this.selectedVariableList = [];
    }
    ngOnInit(): void {
        this.proListadoS.findByListType('Operacion').subscribe(res => {
            if (res.message === 'OK') {
                this.operationList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.proVariableS.listActive().subscribe(res => {
            if (res.message === 'OK') {
                this.variableList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.proFormulaVariableS.list(this.data.formulaId).subscribe(res => {
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
        var calculationModel: ProFormulaVariableEntity = new ProFormulaVariableEntity();
        calculationModel.formulaId=this.data.formulaId;
        calculationModel.type = 'Operador';
        calculationModel.variableId = id;
        calculationModel.variable = name;
        this.proFormulaVariableS.create(calculationModel).subscribe(resC => {
            if (resC.message === 'OK') {
                if (resC.object != 0) {
                    this.alertS.open('Operador agregado!', 'success');
                    this.proFormulaVariableS.list(this.data.formulaId).subscribe(res => {
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
        this.proFormulaVariableS.delete(id).subscribe(resD => {
            if (resD.message === 'OK') {
                if (resD.object != 0) {
                    this.alertS.open(type === 'Operador' ? 'Operador eliminado!' : 'Variable eliminada!', 'success');
                    this.proFormulaVariableS.list(this.data.formulaId).subscribe(res => {
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
                var calculationModel: ProFormulaVariableEntity = new ProFormulaVariableEntity();
                calculationModel.formulaId=this.data.formulaId;
                calculationModel.type = 'Variable';
                calculationModel.variableId = resA.id;
                calculationModel.variable = resA.name;
                this.proFormulaVariableS.create(calculationModel).subscribe(resC => {
                    if (resC.message === 'OK') {
                        if (resC.object != 0) {
                            this.alertS.open('Variable agregada!', 'success');
                            this.proFormulaVariableS.list(this.data.formulaId).subscribe(res => {
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