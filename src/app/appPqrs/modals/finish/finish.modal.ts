import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrPqrsService } from '../../services/pqrPqrs.service';
import { PqrMasterEntity } from '../../entities/pqrMaster.entity';
import { PqrMasterService } from '../../services/pqrMaster.service';
import * as moment from 'moment';
import { PqrStatusService } from '../../services/pqrStatus.service';
import { PqrTracingService } from "../../services/pqrTracing.service";

@Component({
    selector: 'modal-finish',
    templateUrl: 'finish.modal.html',
    styleUrls: ['./finish.modal.css']
})
export class FinishModal {
    managementStatusId: number;
    finalContactMethodId: number;
    statusId: number;
    date: string;
    hour: number;
    minute: number;
    procedureId: number;
    observations: string;
    managementStatusList: PqrMasterEntity[];
    finalContactMethodList: PqrMasterEntity[];
    procedureList: PqrMasterEntity[];
    fileList: File[];
    countryIdLocal: string;

    constructor(private pqrPqrsS: PqrPqrsService, private pqrMasterS: PqrMasterService, private pqrStatusS: PqrStatusService, private pqrTracingS: PqrTracingService, private alertS: AlertService,
        public dialogRef: MatDialogRef<FinishModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.managementStatusId = 0;
        this.finalContactMethodId = 0;
        this.statusId = 0;
        this.date = '';
        this.hour = 0;
        this.minute = 0;
        this.observations = '0';
        this.procedureId = 0;
        this.managementStatusList = [];
        this.finalContactMethodList = [];
        this.procedureList = [];
        this.fileList = [];
        this.countryIdLocal = '';
    }
    ngOnInit(): void {
        this.countryIdLocal=localStorage.getItem('countryId');
        this.pqrPqrsS.listFile(this.data.number, 'FIN').subscribe(resL => {
            if (resL.message === 'OK') {
                this.fileList = resL.object;
            } else {
                this.alertS.open(resL.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrStatusS.findId(this.data.modalType).subscribe(res => {
            if (res.message === 'OK') {
                this.statusId = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrMasterS.findAll('ESTADOS GESTION', Number(this.countryIdLocal)).subscribe(res => {
            if (res.message === 'OK') {
                this.managementStatusList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrMasterS.findAll('TRAMITE', Number(this.countryIdLocal)).subscribe(res => {
            if (res.message === 'OK') {
                this.procedureList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrMasterS.findAll('METODOS CONTACTO', Number(this.countryIdLocal)).subscribe(res => {
            if (res.message === 'OK') {
                this.finalContactMethodList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    save() {
        if (this.managementStatusId != 0 && this.finalContactMethodId != 0 && this.date != '') {
            this.pqrPqrsS.finish(this.data.pqrsId, this.managementStatusId, moment(this.date).format('YYYY-MM-DD') + ' ' + this.hour + ':' + this.minute + ':00.000', this.finalContactMethodId, this.statusId, this.observations, this.procedureId).subscribe(resF => {
                if (resF.message === 'OK') {
                    if (resF.object != 0) {
                        this.alertS.open(this.data.modalType === 'Terminada' ? 'PQRS terminada!' : 'PQRS rechazada', 'success');
                        this.pqrTracingS.create(this.data.number, this.data.ticket, this.data.typeId, 'Estado', this.statusId, 'Pqrs Terminada', this.data.genPersonEntity.id).subscribe(resT => {
                            if (resT.message === 'OK') {
                                if (resT.object === 0) {
                                    this.alertS.open('Error al insertar el movimiento!', 'error');
                                }
                                if (this.data.ticket != 0 && this.data.number != '' && this.data.creationPersonId != 0) {
                                    if (this.data.openClose == false) {
                                        this.pqrPqrsS.sendEmail(this.data.ticket, this.data.number, this.data.creationPersonId).subscribe(resS => {
                                            if (resS.message === 'OK') {
                                                if (resS.object === 0) {
                                                    this.alertS.open('Error al enviar el correo de notificacion!', 'error');
                                                }
                                            } else {
                                                this.alertS.open(resS.message, 'error');
                                            }
                                        }, err => {
                                            this.alertS.open(err.message, 'error');
                                        });
                                    }
                                    else {

                                    }

                                }
                            }
                            else {
                                this.alertS.open(resT.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                        this.close(true);
                    } else {
                        this.alertS.open(this.data.modalType === 'Terminada' ? 'Error al terminar la PQRS!' : 'Error al rechazar la PQRS!', 'error');
                    }
                } else {
                    this.alertS.open(resF.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('Complete la informacion!', 'warning');
        }
    }
    loadFile(file: FileList) {
        if (file != undefined) {
            for (let i = 0; i < file.length; i++) {
                this.fileList.push(file[i]);
            }
            this.pqrPqrsS.loadFile(this.data.number, 'FIN', this.fileList).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.pqrPqrsS.listFile(this.data.number, 'FIN').subscribe(resL => {
                            if (resL.message === 'OK') {
                                this.fileList = resL.object;
                            } else {
                                this.alertS.open(resL.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else {
                        this.alertS.open('Error al cargar el archivo!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    deleteFile(name: string) {

        this.pqrPqrsS.deleteFile(this.data.number, 'FIN', name).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.pqrPqrsS.listFile(this.data.number, 'FIN').subscribe(resL => {
                        if (resL.message === 'OK') {
                            this.fileList = resL.object;
                        } else {
                            this.alertS.open(resL.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open('Error al eliminar el archivo!', 'error');
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    close(status: boolean): void {
        this.dialogRef.close(status);
    }

    getMaxDate() {
        let todays = new Date();
        var maxDate = new Date();
        maxDate.setDate(todays.getDate());
        return maxDate

    }
    getMinDate() {
        let todays = new Date();
        var minDate = new Date();
        minDate.setDate(todays.getDate() - 10);
        return minDate

    }
}