import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PriCaracterEntity } from "../../entities/priCaracter.entity";
import { PriFormulaCreateEntity } from "../../entities/priFormulaCreate.entity";
import { PriOperatorEntity } from "../../entities/priOperator.entity";
import { PriVariableEntity } from "../../entities/priVariable.entity";
import { PriFormulaCreateService } from "../../services/priFormulaCreate.servicve";
import { PriOperatorService } from "../../services/priOperator.service";
import { PriVariableService } from "../../services/priVarible.service";
import { AutomaticModal } from "../automatic/automatic.modal";
import { CaracterModalForm } from "../caracter/caracter.modal";
import { VariableModalForm } from '../variable/variable.modal';

@Component({
    selector: 'modal-calculationForm',
    templateUrl: 'calculationForm.modal.html',
    styleUrls: ['./calculationForm.modal.css']
})
export class calculationFormModal implements OnInit {
    variable: string;
    variableList: PriVariableEntity[];
    operatorList:PriOperatorEntity[];
    caracterList:PriCaracterEntity[];
    calculationList: PriFormulaCreateEntity[];
    selectedVariableList: PriFormulaCreateEntity[];

    constructor(private bscVariableS: PriVariableService,private priOperatorS:PriOperatorService, private bscFormulaVariableS: PriFormulaCreateService, private dialog: MatDialog, private alertS: AlertService, private dialogRef: MatDialogRef<calculationFormModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.variable = '0';
        this.variableList = [];
        this.calculationList = [];
        this.selectedVariableList = [];
        this.operatorList= []
    }
    ngOnInit(): void {
        this.priOperatorS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.operatorList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
       
        this.bscVariableS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.variableList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.bscFormulaVariableS.findAllId(this.data.formulaId).subscribe(res => {
            if (res.message === 'OK') {
                this.calculationList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    add(id:number,variableId:number) {
        var calculationModelForm: PriFormulaCreateEntity = new PriFormulaCreateEntity();
        calculationModelForm.type = 'Operador';
        calculationModelForm.variableId = id;
        calculationModelForm.formulaId=this.data.formulaId
        this.bscFormulaVariableS.create(calculationModelForm).subscribe(resC => {
            if (resC.message === 'OK') {
                if (resC.object != 0) {
                    this.alertS.open('Operador agregado!', 'success');
                    this.bscFormulaVariableS.findAllId(this.data.formulaId).subscribe(res => {
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
                    this.bscFormulaVariableS.findAllId(this.data.formulaId).subscribe(res => {
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
        var dialogVariable = this.dialog.open(VariableModalForm, {
            width: '800px'
        });
        dialogVariable.afterClosed().subscribe(resA => {
            if (resA.id != 0) {
                var calculationModel: PriFormulaCreateEntity = new PriFormulaCreateEntity();
                calculationModel.type = 'Variable';
                calculationModel.variableId = resA.id;
                calculationModel.formulaId=this.data.formulaId
                this.bscFormulaVariableS.create(calculationModel).subscribe(resC => {
                    if (resC.message === 'OK') {
                        if (resC.object != 0) {
                            this.alertS.open('Variable agregada!', 'success');
                            this.bscFormulaVariableS.findAllId(this.data.formulaId).subscribe(res => {
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
    getCaracteres() {
        var dialogVariable = this.dialog.open(CaracterModalForm, {
            width: '800px'
        });
        dialogVariable.afterClosed().subscribe(resB => {
            if (resB.id != 0) {
                var calculationModel: PriFormulaCreateEntity = new PriFormulaCreateEntity();
                calculationModel.type = 'Caracter';
                calculationModel.variableId = resB.id;
                calculationModel.formulaId=this.data.formulaId
                this.bscFormulaVariableS.create(calculationModel).subscribe(resC => {
                    if (resC.message === 'OK') {
                        if (resC.object != 0) {
                            this.alertS.open('Caracter agregado!', 'success');
                            this.bscFormulaVariableS.findAllId(this.data.formulaId).subscribe(res => {
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
    getAutomatic(formulaId:number) {
        var dialogVariable = this.dialog.open(AutomaticModal, {
            data: {'formulaId':formulaId},
            width: '800px'
            
        });
        dialogVariable.afterClosed().subscribe(resA => {
            if (resA.id != 0) {
                var calculationModel: PriFormulaCreateEntity = new PriFormulaCreateEntity();
                calculationModel.type = 'Automatic';
                calculationModel.variableId = resA.id;
                calculationModel.formulaId=this.data.formulaId
                this.bscFormulaVariableS.create(calculationModel).subscribe(resC => {
                    if (resC.message === 'OK') {
                        if (resC.object != 0) {
                            this.alertS.open('Campo automatico agregado!', 'success');
                            this.bscFormulaVariableS.findAllId(this.data.formulaId).subscribe(res => {
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