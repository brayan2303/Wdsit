import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenSectionService } from '../../services/genSection.service';
import { GenModuleService } from '../../services/genModule.service';

@Component({
    selector: 'modal-module',
    templateUrl: 'module.modal.html',
    styleUrls: ['./module.modal.css']
})
export class ModuleModal {
    sectionId: number;
    sectionList: number;
    columns: string[];
    dataSource: any[];
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(private genSectionS: GenSectionService, private genModuleS: GenModuleService, private alertS: AlertService,
        public dialogRef: MatDialogRef<ModuleModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.sectionId = 0;
        this.columns = ['name', 'asignar'];
        this.dataSource = [];
    }
    ngOnInit(): void {
        this.genSectionS.findAll(this.data.applicationName, this.data.profileId).subscribe(res => {
            if (res.message === 'OK') {
                this.sectionList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

    search() {
        this.genModuleS.findAll(this.sectionId, this.data.profileId).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource = res.object;
                this.table.renderRows();
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    checked(input: HTMLInputElement, moduleId: number) {
        if (input.checked) {
            this.genModuleS.add(this.data.profileId, moduleId).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.genModuleS.findAll(this.sectionId, this.data.profileId).subscribe(res => {
                            if (res.message === 'OK') {
                                this.dataSource = res.object;
                                this.table.renderRows();
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
            this.genModuleS.remove(this.data.profileId, moduleId).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.genModuleS.findAll(this.sectionId, this.data.profileId).subscribe(res => {
                            if (res.message === 'OK') {
                                this.dataSource = res.object;
                                this.table.renderRows();
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
    }
    close(): void {
        this.dialogRef.close(this.sectionList);
    }
}