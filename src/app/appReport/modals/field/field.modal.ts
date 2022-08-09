import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepFieldService } from '../../services/repField.service';
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
        reportId: new FormControl(''),
        active: new FormControl('')
    });

    constructor(private repFieldS: RepFieldService, private alertS: AlertService,
        public dialogRef: MatDialogRef<FieldModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.editing = 0;
        this.columns = ['id', 'name', 'active', 'Acciones'];
        this.dataSource = [];
    }
    ngOnInit(): void {
        this.repFieldS.list(this.data.reportId).subscribe(res => {
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
            this.form.controls.reportId.setValue(this.data.reportId);
            if (this.editing === 0) {
                this.repFieldS.create(this.form.value).subscribe(resC => {
                    if (resC.message === 'OK') {
                        if (resC.object != 0) {
                            this.alertS.open('Campo creado!', 'success');
                            this.repFieldS.list(this.data.reportId).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = res.object;
                                    this.form.setValue(
                                        {
                                            'id': '',
                                            'name': '',
                                            'reportId': '',
                                            'active': ''
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
                        this.alertS.open(resC.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            } else {
                this.repFieldS.update(this.form.value).subscribe(resU => {
                    if (resU.message === 'OK') {
                        if (resU.object != 0) {
                            this.alertS.open('Campo actualizado!', 'success');
                            this.repFieldS.list(this.data.reportId).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = res.object;
                                    this.form.setValue(
                                        {
                                            'id': '',
                                            'name': '',
                                            'reportId': '',
                                            'active': ''
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
                        this.alertS.open(resU.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        } else {
            this.alertS.open('Ingrese un nombre!', 'warning');
        }
    }
    delete(value: number) {
        this.repFieldS.delete(value).subscribe(resD => {
            if (resD.message === 'OK') {
                if (resD.object != 0) {
                    this.alertS.open('Campo eliminado!', 'success');
                    this.repFieldS.list(this.data.reportId).subscribe(res => {
                        if (res.message === 'OK') {
                            this.dataSource = res.object;
                            this.form.setValue(
                                {
                                    'id': '',
                                    'name': '',
                                    'reportId': '',
                                    'active': ''
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
                this.alertS.open(resD.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    edit(id: number, name: string, active: boolean) {
        this.editing = id;
        this.form.setValue(
            {
                'id': id,
                'name': name,
                'reportId': this.data.reportId,
                'active': active
            }
        );
    }
    closeEditing() {
        this.editing = 0;
        this.form.setValue(
            {
                'id': '',
                'name': '',
                'reportId': '',
                'active': ''
            }
        );
    }
}