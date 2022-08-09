import { Component, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenApplicationEntity } from '../../entities/genApplication.entity';
import { GenApplicationService } from '../../services/genApplication.service';
import { GenApplicationPersonProfileService } from "../../services/genApplicationPersonProfile.service";

@Component({
    selector: 'modal-applicationPersonProfile',
    templateUrl: 'applicationPersonProfile.modal.html',
    styleUrls: ['./applicationPersonProfile.modal.css']
})
export class ApplicationPersonProfileModal {
    applicationId: number;
    applicationList: GenApplicationEntity[];
    columns: string[];
    dataSource: any[];
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(private genApplicationS: GenApplicationService, private genApplicationPersonProfileS: GenApplicationPersonProfileService, private alertS: AlertService,
        public dialogRef: MatDialogRef<ApplicationPersonProfileModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.applicationId = 0;
        this.columns = ['name', 'asign'];
        this.dataSource = [];
    }
    ngOnInit(): void {
        this.genApplicationS.findByPersonId(this.data.personId).subscribe(res => {
            if (res.message === 'OK') {
                this.applicationList = res.object;
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    search() {
        this.genApplicationPersonProfileS.list(this.applicationId, this.data.personId).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    checked(input: HTMLInputElement, applicationPersonProfileId: number, profileId: number, active: boolean) {
        if (input.checked) {
            if(!active){
                this.genApplicationPersonProfileS.create(this.applicationId, this.data.personId, profileId).subscribe(resC => {
                    if (resC.message === 'OK') {
                        if (resC.object != 0) {
                            this.alertS.open('Perfil agregado!', 'success');
                            this.search();
                        } else {
                            this.alertS.open('Error al agregar el perfil!', 'error');
                        }
                    } else {
                        this.alertS.open(resC.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        } else {
            if (active) {
                this.genApplicationPersonProfileS.delete(applicationPersonProfileId,this.applicationId,this.data.personId,profileId).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Perfil eliminado!', 'success');
                            this.search();
                        } else {
                            this.alertS.open('Error al eliminar el perfil!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            } else {
                this.genApplicationPersonProfileS.delete(applicationPersonProfileId,this.applicationId,this.data.personId,profileId).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Perfil eliminado!', 'success');
                            this.search();
                        } else {
                            this.alertS.open('Error al eliminar el perfil!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        }
    }
    close(): void {
        this.dialogRef.close();
    }
}