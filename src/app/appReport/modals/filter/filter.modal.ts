import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RepFilterService } from '../../services/repFilter.service';

@Component({
    selector: 'modal-filter',
    templateUrl: 'filter.modal.html',
    styleUrls: ['./filter.modal.css']
})
export class FilterModal implements OnInit {
    editing: number;
    columns: string[];
    dataSource: any[];
    @ViewChild(MatTable) table: MatTable<any>;
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        query: new FormControl(''),
        reportId: new FormControl(''),
        active: new FormControl('')
    });

    constructor(private repFilterS: RepFilterService, private alertS: AlertService,
        public dialogRef: MatDialogRef<FilterModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.editing = 0;
        this.columns = ['id', 'name','type','query','active', 'Acciones'];
        this.dataSource = [];
    }
    ngOnInit(): void {
        this.repFilterS.list(this.data.reportId).subscribe(res => {
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
                this.repFilterS.create(this.form.value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Filtro guardado!', 'success');
                            this.repFilterS.list(this.data.reportId).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = res.object;
                                    this.form.setValue(
                                        {
                                            'id': '',
                                            'name': '',
                                            'type': '',
                                            'query':'',
                                            'reportId': '',
                                            'active':''
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
                this.repFilterS.update(this.form.value).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Filtro actualizado!', 'success');
                            this.repFilterS.list(this.data.reportId).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource = res.object;
                                    this.form.setValue(
                                        {
                                            'id': '',
                                            'name': '',
                                            'type': '',
                                            'query':'',
                                            'reportId': '',
                                            'active':''
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
        this.repFilterS.delete(value).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.alertS.open('Filtro eliminado!', 'success');
                    this.repFilterS.list(this.data.reportId).subscribe(res => {
                        if (res.message === 'OK') {
                            this.dataSource = res.object;
                            this.form.setValue(
                                {
                                    'id': '',
                                    'name': '',
                                    'type': '',
                                    'query':'',
                                    'reportId': '',
                                    'active':''
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
    edit(id: number, name: string, type: string,query:string, active: boolean) {
        this.editing = id;
        this.form.setValue(
            {
                'id': id,
                'name': name,
                'type': type,
                'query':query,
                'reportId': this.data.reportId,
                'active':active
            }
        );
    }
    closeEditing() {
        this.editing = 0;
        this.form.setValue(
            {
                'id': '',
                'name': '',
                'type': '',
                'query':'',
                'reportId': '',
                'active':''
            }
        );
    }
}