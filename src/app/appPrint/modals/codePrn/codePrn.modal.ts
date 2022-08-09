import { Component, ViewChild, Inject, OnInit, ElementRef } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PriPrnCodeService } from '../../services/priPrnCode.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'modal-codePrn',
    templateUrl: 'codePrn.modal.html',
    styleUrls: ['./codePrn.modal.css']
})
export class CodePrnModal implements OnInit {
    editing: number;
    columns: string[];
    dataSource: any[];
    @ViewChild(MatTable) table: MatTable<any>;
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        codePrn: new FormControl('', Validators.required),
        labelId: new FormControl('')
    });

    constructor(private priPrnCodeS: PriPrnCodeService, private alertS: AlertService,
        public dialogRef: MatDialogRef<CodePrnModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.editing = 0;
        this.columns = ['Id', 'Nombre', 'Acciones'];
        this.dataSource = [];
    }
    ngOnInit(): void {
        this.priPrnCodeS.findByLabelId(this.data.labelId).subscribe(res => {
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
                this.priPrnCodeS.create(this.form.value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Codigo prn guardado!', 'success');
                            this.priPrnCodeS.findByLabelId(this.data.labelId).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = res.object;
                                    this.form.setValue(
                                        {
                                            'id': '',
                                            'name': '',
                                            'codePrn': '',
                                            'labelId': ''
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
                this.priPrnCodeS.update(this.form.value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Codigo prn actualizado!', 'success');
                            this.priPrnCodeS.findByLabelId(this.data.labelId).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = res.object;
                                    this.form.setValue(
                                        {
                                            'id': '',
                                            'name': '',
                                            'codePrn': '',
                                            'labelId': ''
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
        this.priPrnCodeS.delete(value).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.alertS.open('Codigo prn eliminado!', 'success');
                    this.form.setValue(
                        {
                            'id': '',
                            'name': '',
                            'codePrn': '',
                            'labelId': ''
                        }
                    );
                    this.priPrnCodeS.findByLabelId(this.data.labelId).subscribe(res => {
                        if (res.message === 'OK') {
                            this.dataSource = res.object;
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
    edit(id: number,name:number,codePrn:string) {
        this.editing = id;
        this.form.setValue(
            {
                'id':id,
                'name':name,
                'codePrn':codePrn,
                'labelId':this.data.labelId
            }
        );
    }
    closeEditing() {
        this.editing = 0;
        this.form.setValue(
            {
                'id':'',
                'name':'',
                'codePrn':'',
                'labelId':''
            }
        );
    }
}