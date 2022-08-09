import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { LoadClientPrefixService } from 'src/app/appLoadClient/services/loadClientPrifex.service';

@Component({
    selector: 'modal-loadPrifex',
    templateUrl: 'loadPrifex.modal.html',
    styleUrls: ['./loadPrifex.modal.css']
})
export class LoadPrifexModal implements OnInit {
    editing: number;
    columns: string[];
    dataSource: any[];
    genPersonEntity: GenPersonEntity;
    @ViewChild(MatTable) table: MatTable<any>;
    form = new FormGroup({
        id: new FormControl(''),
        prefix: new FormControl('', Validators.required),
        active: new FormControl('')
    });

    constructor(private LoadClientPrefixS: LoadClientPrefixService, private alertS: AlertService,
        public dialogRef: MatDialogRef<LoadPrifexModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.editing = 0;
        this.columns = ['id', 'prefix', 'active', 'Acciones'];
        this.dataSource = [];
    }
    ngOnInit(): void {
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        this.LoadClientPrefixS.list(this.data.id).subscribe(res => {
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
     
                this.LoadClientPrefixS.create(this.form.controls.prefix.value, this.data.id, this.genPersonEntity.id).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Campo creado!', 'success');
                            this.LoadClientPrefixS.list(this.data.id).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = res.object;
                                    this.form.reset();
                                    this.form.setValue(
                                        {
                                            'id': '',
                                            'prefix': '',
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
                console.log(this.editing);
                this.LoadClientPrefixS.update(this.editing,this.form.controls.prefix.value, this.form.controls.active.value, this.genPersonEntity.id).subscribe(resU => {
                    if (resU.message === 'OK') {
                        if (resU.object != 0) {
                            this.alertS.open('Campo actualizado!', 'success');
                            this.LoadClientPrefixS.list(this.data.id).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = res.object;
                                    this.form.setValue(
                                        {
                                            'id': '',
                                            'prefix': '',
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
        console.log(value)
        this.LoadClientPrefixS.delete(value).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.alertS.open('Campo eliminado!', 'success');
                    this.LoadClientPrefixS.list(this.data.id).subscribe(res => {
                        if (res.message === 'OK') {
                            this.dataSource = res.object;
                            this.form.setValue(
                                {
                                    'id': '',
                                    'prefix': '',
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
                    this.alertS.open(res.message, 'error');
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    edit(id: number, prefix: string, active: boolean,) {
        this.editing = id;
        this.form.setValue(
            {
                'id': id,
                'prefix': prefix,
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
                'prefix': '',
                'active': '',
            }
        );
    }
}