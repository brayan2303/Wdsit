import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { LoadClientFieldsParametrizationService } from 'src/app/appLoadClient/services/loadClientFieldsParametrization.service';
import { LoadClientFieldsService } from 'src/app/appLoadClient/services/loadClientFields.service';
import { LoadClientFieldsEntity } from 'src/app/appLoadClient/entities/loadClientFields.entity';
import { LoadRuleOneService } from 'src/app/appLoadClient/services/loadRuleOne.service';
import { LoadRuleTwoService } from 'src/app/appLoadClient/services/loadRuleTwo.service';
import { LoadRuleOneEntity } from 'src/app/appLoadClient/entities/loadRuleOne.entity';
import { LoadRuleTwoEntity } from 'src/app/appLoadClient/entities/loadRuleTwo.entity';

@Component({
    selector: 'modal-fieldParametrizationRule',
    templateUrl: 'fieldParametrizationRule.modal.html',
    styleUrls: ['./fieldParametrizationRule.modal.css']
})
export class FieldParametrizationRuleModal implements OnInit {
    editing: number;
    columns: string[];
    dataSource: any[];
    FieldsList: LoadClientFieldsEntity[];
    genPersonEntity: GenPersonEntity;
    ruleGeneralList:LoadRuleOneEntity[];
    ruleMasterList:LoadRuleTwoEntity[];
    ruleGenera:number;
    @ViewChild(MatTable) table: MatTable<any>;
    form = new FormGroup({
        id: new FormControl(''),
        parametrizationOne: new FormControl('', Validators.required),
        functionOne: new FormControl('',),
        resultOne: new FormControl('',),
        fieldParametrizationId: new FormControl('',),
        resultTwo:new FormControl('',)
    });

    constructor(private loadRuleOneS:LoadRuleOneService,private loadRuleTwoS:LoadRuleTwoService,private LoadClientFieldsS: LoadClientFieldsService, private LoadClientFieldsParametrizationS: LoadClientFieldsParametrizationService, private alertS: AlertService,
        public dialogRef: MatDialogRef<FieldParametrizationRuleModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.editing = 0;
        this.columns = ['metodo', 'funcion', 'resultOne', 'resultTwo','name','Acciones'];
        this.dataSource = [];
        this.FieldsList = [];
        this.ruleGenera = 0;
    }
    ngOnInit(): void {
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        this.LoadClientFieldsParametrizationS.list(this.data.id).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.field();
        this.ruleGeneral();
    }
    close(): void {
        this.dialogRef.close();
    }
    
    ruleGeneral(){
        this.loadRuleOneS.listName().subscribe(resL =>{
            if(resL.message  === 'OK'){
                this.ruleGeneralList=resL.object;
            }else{
                this.alertS.open(resL.message,'error');
            }
        }, err =>{
            this.alertS.open(err.message, 'error');
        })
    }

    ruleMaster(){
        this.loadRuleTwoS.listName(this.ruleGenera).subscribe(resR =>{
            if(resR.message === 'OK'){
                this.ruleMasterList = resR.object;
            }else{
                this.alertS.open(resR.message, 'error');
            }
        },err =>{
            this.alertS.open(err.message, 'error');
        })
    }


    onClick() {
        if (this.form.valid) {
            if (this.editing === 0) {
                this.LoadClientFieldsParametrizationS.create(this.form.controls.parametrizationOne.value, this.form.controls.functionOne.value, this.form.controls.resultOne.value, this.form.controls.resultTwo.value, this.form.controls.fieldParametrizationId.value,this.data.id).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Campo creado!', 'success');
                            this.LoadClientFieldsParametrizationS.list(this.data.id).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = res.object;
                                    this.form.reset();
                                    this.form.setValue(
                                        {
                                            'id': '',
                                            'parametrizationOne': '',
                                            'functionOne': '',
                                            'resultOne': '',
                                            'fieldParametrizationId': '',
                                        }
                                    );
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al guardar', 'error');
                        }
                    } else {
                        this.alertS.open(res.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        } else {
            this.alertS.open('Complete la informacion!', 'warning');
        }
    }
    delete(value: number) {
        this.LoadClientFieldsParametrizationS.delete(value).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.alertS.open('Campo eliminado!', 'success');
                    this.LoadClientFieldsParametrizationS.list(this.data.id).subscribe(res => {
                        if (res.message === 'OK') {
                            this.dataSource = res.object;
                            this.form.setValue(
                                {
                                    'id': '',
                                    'parametrizationOne': '',
                                    'functionOne': '',
                                    'resultOne': '',
                                    'fieldParametrizationId': '',
                                }
                            );
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open('Error al eliminar', 'error');
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    field() {
        this.LoadClientFieldsS.list(this.data.parametrizationId).subscribe(res => {
            if (res.message === 'OK') {
                this.FieldsList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

}