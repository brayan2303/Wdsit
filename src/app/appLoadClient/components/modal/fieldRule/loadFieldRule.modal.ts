import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { LoadClientRuleFieldsService } from 'src/app/appLoadClient/services/loadClientRuleFields.service';
import { FieldParametrizationRuleModal } from '../fieldParametrizationRule/fieldParametrizationRule.modal';
import { LoadClientFieldsService } from 'src/app/appLoadClient/services/loadClientFields.service';

@Component({
    selector: 'modal-loadFieldRule',
    templateUrl: 'loadFieldRule.modal.html',
    styleUrls: ['./loadFieldRule.modal.css']
})
export class LoadFieldRuleModal implements OnInit {
    editing: number;
    columns: string[];
    dataSource: any[];
    genPersonEntity: GenPersonEntity;
    parametrizationId:number;
    @ViewChild(MatTable) table: MatTable<any>;
    form = new FormGroup({
        id: new FormControl(''),
        field: new FormControl('', Validators.required),
        active: new FormControl('')
    });

    constructor( private LoadClientFieldsS: LoadClientFieldsService, private LoadClientRuleFieldsS: LoadClientRuleFieldsService,private dialog: MatDialog, private alertS: AlertService,
        public dialogRef: MatDialogRef<LoadFieldRuleModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.editing = 0;
        this.columns = ['id', 'field', 'active','Acciones'];
        this.dataSource = [];
        this.parametrizationId = 0;
    }
    ngOnInit(): void {
        this.parametrizationId = this.data.parameterizationId;
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        this.LoadClientRuleFieldsS.list(this.data.id).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource = res.object;
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
    onClick() {
        if (this.form.valid) {
            if (this.editing === 0) {
                this.LoadClientRuleFieldsS.create(this.form.controls.field.value, this.data.id).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Campo creado!', 'success');
                            this.LoadClientRuleFieldsS.list(this.data.id).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = res.object;
                                    this.form.reset();
                                    this.form.setValue(
                                        {
                                            'id': '',
                                            'field': '',
                                            'active': '',
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
            } else {
                this.LoadClientRuleFieldsS.update(this.editing,this.form.controls.field.value,  this.form.controls.active.value).subscribe(resU => {
                    if (resU.message === 'OK') {
                        if (resU.object != 0) {
                            this.alertS.open('Campo actualizado!', 'success');
                            this.LoadClientRuleFieldsS.list(this.data.id).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = res.object;
                                    this.form.setValue(
                                        {
                                            'id': '',
                                            'field': '',
                                            'active': '',
                                        }
                                    );
                                    this.form.reset();
                                    this.editing = 0;
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open(resU.message, 'error');
                        }
                    } else {
                        this.alertS.open(resU.message, 'error');
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
        this.LoadClientRuleFieldsS.delete(value).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.alertS.open('Campo eliminado!', 'success');
                    this.LoadClientRuleFieldsS.list(this.data.id).subscribe(res => {
                        if (res.message === 'OK') {
                            this.dataSource = res.object;
                            this.form.setValue(
                                {
                                    'id': '',
                                    'field': '',
                                    'active': '',
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
    edit(id: number, field: string, active: boolean,) {
        this.editing = id;
        this.form.setValue(
            {
                'id': id,
                'field': field,
                'active': active,

            }
        );
    }
    closeEditing() {
        this.editing = 0;
        this.form.reset();
        this.form.setValue(
            {
                'id': '',
                'field': '',
                'active': '',
            }
        );
    }

    rule(id:number) {
        this.dialog.open(FieldParametrizationRuleModal, {
            width: '100%',
            data: {id: id, parametrizationId:this.parametrizationId}
        });
    }
}