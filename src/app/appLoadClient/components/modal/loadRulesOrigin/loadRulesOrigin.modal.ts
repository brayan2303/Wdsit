import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { LoadRuleTwoService } from 'src/app/appLoadClient/services/loadRuleTwo.service';

@Component({
    selector: 'modal-loadRulesOrigin',
    templateUrl: 'loadRulesOrigin.modal.html',
    styleUrls: ['./loadRulesOrigin.modal.css']
})
export class LoadRulesOriginModal implements OnInit {
    editing: number;
    columns: string[];
    dataSource: any[];
    genPersonEntity: GenPersonEntity;
    @ViewChild(MatTable) table: MatTable<any>;
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        active: new FormControl('')
    });

    constructor(private LoadRuleTwoS: LoadRuleTwoService, private alertS: AlertService,
        public dialogRef: MatDialogRef<LoadRulesOriginModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.editing = 0;
        this.columns = ['id', 'name', 'active','Acciones'];
        this.dataSource = [];
    }
    ngOnInit(): void {
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        this.LoadRuleTwoS.list(this.data.id).subscribe(res => {
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
                this.LoadRuleTwoS.create(this.form.controls.name.value,  this.data.id).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Campo creado!', 'success');
                            this.LoadRuleTwoS.list(this.data.id).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = res.object;
                                    this.form.reset();
                                    this.form.setValue(
                                        {
                                            'id': '',
                                            'name': '',
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
                this.LoadRuleTwoS.update(this.editing,this.form.controls.name.value, this.form.controls.active.value).subscribe(resU => {
                    if (resU.message === 'OK') {
                        if (resU.object != 0) {
                            this.alertS.open('Campo actualizado!', 'success');
                            this.LoadRuleTwoS.list(this.data.id).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = res.object;
                                    this.form.setValue(
                                        {
                                            'id': '',
                                            'name': '',
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
        this.LoadRuleTwoS.delete(value).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.alertS.open('Campo eliminado!', 'success');
                    this.LoadRuleTwoS.list(this.data.id).subscribe(res => {
                        if (res.message === 'OK') {
                            this.dataSource = res.object;
                            this.form.setValue(
                                {
                                    'id': '',
                                    'name': '',
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
    edit(id: number, name: string, active: boolean,) {
        this.editing = id;
        this.form.setValue(
            {
                'id': id,
                'name': name,
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
                'name': '',
                'active': '',
            }
        );
    }
}