import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PriFieldService } from '../../services/priField.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'modal-field',
    templateUrl: 'field.modal.html',
    styleUrls: ['./field.modal.css']
})
export class FieldModal implements OnInit {
    editing: number;
    columns: string[];
    dataSource: any[];
    @ViewChild(MatTable) table: MatTable<any>;
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        code: new FormControl('', Validators.required),
        position: new FormControl('', Validators.required),
        automatic: new FormControl(''),
        manual: new FormControl(''),
        labelId: new FormControl(''),
        active: new FormControl('')
    });

    constructor(private priFieldS: PriFieldService, private alertS: AlertService,
        public dialogRef: MatDialogRef<FieldModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.editing = 0;
        this.columns = ['id', 'name', 'code', 'position', 'Acciones'];
        this.dataSource = [];
    }
    ngOnInit(): void {
        this.priFieldS.list(this.data.labelId).subscribe(res => {
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
            this.form.controls.labelId.setValue(this.data.labelId);
            if (this.editing === 0) {
                if (this.form.controls.automatic.value == '') {
                    this.form.controls.automatic.setValue(false);
                } if (this.form.controls.manual.value == '') {
                    this.form.controls.manual.setValue(false);
                }
                this.priFieldS.create(this.form.value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Campo creado!', 'success');
                            this.priFieldS.list(this.data.labelId).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = res.object;
                                    this.form.setValue(
                                        {
                                            'id': '',
                                            'name': '',
                                            'code': '',
                                            'position': '',
                                            'labelId': '',
                                            'active': '',
                                            'automatic': '',
                                            'manual': ''
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
                this.priFieldS.update(this.form.value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Campo actualizado!', 'success');
                            this.priFieldS.list(this.data.labelId).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = res.object;
                                    this.form.setValue(
                                        {
                                            'id': '',
                                            'name': '',
                                            'code': '',
                                            'position': '',
                                            'labelId': '',
                                            'active': '',
                                            'automatic': '',
                                            'manual': ''
                                        }
                                    );
                                    this.editing = 0;
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al actualizar', 'error');
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
        this.priFieldS.delete(value).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.alertS.open('Campo eliminado!', 'success');
                    this.priFieldS.list(this.data.labelId).subscribe(res => {
                        if (res.message === 'OK') {
                            this.dataSource = res.object;
                            this.form.setValue(
                                {
                                    'id': '',
                                    'name': '',
                                    'code': '',
                                    'position': '',
                                    'labelId': '',
                                    'active': '',
                                    'automatic': '',
                                    'manual': ''
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
    edit(id: number, name: string, code: string, position: number, active: boolean, automatic: boolean, manual: boolean) {
        this.editing = id;
        this.form.setValue(
            {
                'id': id,
                'name': name,
                'code': code,
                'position': position,
                'labelId': this.data.labelId,
                'active': active,
                'automatic': automatic,
                'manual': manual

            }
        );
    }
    closeEditing() {
        this.editing = 0;
        this.form.setValue(
            {
                'id': '',
                'name': '',
                'code': '',
                'position': '',
                'labelId': '',
                'active': '',
                'automatic': '',
                'manual': ''
            }
        );
    }
}