import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadClientFieldsService } from 'src/app/appLoadClient/services/loadClientFields.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';

@Component({
    selector: 'modal-loadField',
    templateUrl: 'loadField.modal.html',
    styleUrls: ['./loadField.modal.css']
})
export class LoadFieldModal implements OnInit {
    editing: number;
    columns: string[];
    dataSource: any[];
    genPersonEntity: GenPersonEntity;
    @ViewChild(MatTable) table: MatTable<any>;
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        codigo: new FormControl('', Validators.required),
        active: new FormControl('')
    });

    constructor(private LoadClientFieldsS: LoadClientFieldsService, private alertS: AlertService,
        public dialogRef: MatDialogRef<LoadFieldModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.editing = 0;
        this.columns = ['id', 'name', 'codigo', 'active','Acciones'];
        this.dataSource = [];
    }
    ngOnInit(): void {
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        this.LoadClientFieldsS.list(this.data.id).subscribe(res => {
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
                this.LoadClientFieldsS.create(this.form.controls.name.value, this.form.controls.codigo.value, this.data.id, this.genPersonEntity.id).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Campo creado!', 'success');
                            this.LoadClientFieldsS.list(this.data.id).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = res.object;
                                    this.form.reset();
                                    this.form.setValue(
                                        {
                                            'id': '',
                                            'name': '',
                                            'code': '',
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
                this.LoadClientFieldsS.update(this.editing,this.form.controls.name.value, this.form.controls.codigo.value, this.form.controls.active.value, this.genPersonEntity.id).subscribe(resU => {
                    if (resU.message === 'OK') {
                        if (resU.object != 0) {
                            this.alertS.open('Campo actualizado!', 'success');
                            this.LoadClientFieldsS.list(this.data.id).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = res.object;
                                    this.form.setValue(
                                        {
                                            'id': '',
                                            'name': '',
                                            'codigo': '',
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
        this.LoadClientFieldsS.delete(value).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.alertS.open('Campo eliminado!', 'success');
                    this.LoadClientFieldsS.list(this.data.id).subscribe(res => {
                        if (res.message === 'OK') {
                            this.dataSource = res.object;
                            this.form.setValue(
                                {
                                    'id': '',
                                    'name': '',
                                    'codigo': '',
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
    edit(id: number, name: string, codigo: string,  active: boolean,) {
        this.editing = id;
        this.form.setValue(
            {
                'id': id,
                'name': name,
                'codigo': codigo,
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
                'code': '',
                'active': '',
            }
        );
    }
}