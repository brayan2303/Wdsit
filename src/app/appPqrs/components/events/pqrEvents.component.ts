import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PqrMasterService } from '../../services/pqrMaster.service';
import { PqrMasterEntity } from '../../entities/pqrMaster.entity';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { PqrMasterTypeService } from '../../services/pqrMasterType.service';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { PqrPqrsEntity } from '../../entities/pqrPqrs.entity';
import { PqrPqrsService } from '../../services/pqrPqrs.service';
import * as moment from 'moment';
import { PqrAgentEntity } from '../../entities/pqrAgent.entity';
import { PqrAgentService } from '../../services/pqrAgent.service';
import { PqrPqrsFileModel } from '../../models/pqrPqrsFile.model';
import { MatDialog } from '@angular/material/dialog';
import { FinishModal } from '../../modals/finish/finish.modal';
import { ConfirmationPqrs } from '../../modals/confirmation/confirmationPqrs.component';
import { PqrMessageService } from '../../services/pqrMessage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { confirmationFinishPqrs } from '../../modals/confirmationFinish/confirmationFinishPqrs.component';
import { DetailWMSModal } from '../../modals/detailWMS/detailWms.modal';
import { PqrCustomerService } from '../../services/pqrCustomer.service';
import { PqrCustomerFileModel } from '../../models/pqrCustomerFile.model';

@Component({
    selector: 'app-pqrEvents',
    templateUrl: './pqrEvents.component.html',
    styleUrls: ['./pqrEvents.component.css']
})
export class PqrEventsComponent implements OnInit, OnDestroy {
    isRelative: boolean;
    loading: boolean;
    title: string;
    genPersonEntity: GenPersonEntity;
    pqrsId: number;
    internalEscalationDate: string;
    internalEscalationHour: number;
    internalEscalationMinute: number;
    internalEscalationResponseDate: string;
    internalEscalationResponseHour: number;
    internalEscalationResponseMinute: number;
    customerEscalationDate: string;
    customerEscalationHour: number;
    customerEscalationMinute: number;
    customerEscalationResponseDate: string;
    customerEscalationResponseHour: number;
    customerEscalationResponseMinute: number;
    unitShipmentDate: string;
    unitShipmentHour: number;
    unitShipmentMinute: number;
    unitArrivalDate: string;
    unitArrivalHour: number;
    unitArrivalMinute: number;
    customerResponsePqrsDate: string;
    customerResponsePqrsHour: number;
    customerResponsePqrsMinute: number;
    pqrPqrsEntity: PqrPqrsEntity;
    finalStatusList: PqrMasterTypeService[];
    technicalList: GenPersonEntity[];
    agentList: PqrAgentEntity[];
    attributablePqrsList: PqrMasterEntity[];
    managementStatusList: PqrMasterEntity[];
    finalContactMethodList: PqrMasterEntity[];
    photographicRecordList: PqrMasterEntity[];
    technicalDiagnostic: PqrMasterEntity[];
    filesList: PqrPqrsFileModel[];
    files: File[];
    fileCustomerList: PqrCustomerFileModel[];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    ticket: number;
    filesId: string;
    datefiles: string;
    pqrPqrsEntityFiles: PqrPqrsEntity;
    countryIdLocal:string;

    constructor(private meeSupportS: PqrCustomerService, private pqrMessageS: PqrMessageService, private params: ActivatedRoute, private route: Router, private pqrAgentS: PqrAgentService, private pqrPqrsS: PqrPqrsService, private pqrMasterS: PqrMasterService, private genPersonS: GenPersonService, private dialog: MatDialog, private alertS: AlertService) {
        this.isRelative = true;
        this.loading = false;
        this.pqrsId = 0;
        this.pqrPqrsEntity = new PqrPqrsEntity();
        this.finalStatusList = [];
        this.technicalList = [];
        this.agentList = [];
        this.attributablePqrsList = [];
        this.managementStatusList = [];
        this.finalContactMethodList = [];
        this.photographicRecordList = [];
        this.technicalDiagnostic = [];
        this.filesList = [];
        this.files = [];
        this.fileCustomerList = [];
        this.ticket = 0;
        this.filesId = '';
        this.datefiles = '';
        this.pqrPqrsEntityFiles = new PqrPqrsEntity();
        this.countryIdLocal = '';
    }
    ngOnDestroy(): void {
        window.removeEventListener('scroll', this.scroll, true);
    }
    ngOnInit(): void {
        this.countryIdLocal=localStorage.getItem('countryId');
        window.addEventListener('scroll', this.scroll, true);
        this.genPersonEntity = (JSON.parse(localStorage.getItem('user')));
        this.params.paramMap.subscribe((p: Params) => {
            this.title = p.get('pqrsNumber');
            this.pqrsId = p.get('pqrsId');
            this.pqrPqrsS.findById(this.pqrsId).subscribe(res => {
                if (res.message === 'OK') {
                    this.pqrPqrsEntity = res.object;
                    this.internalEscalationDate = this.pqrPqrsEntity.internalEscalationDate != null ? this.pqrPqrsEntity.internalEscalationDate.substring(0, 10) : null;
                    this.internalEscalationHour = this.pqrPqrsEntity.internalEscalationDate != null ? Number(this.pqrPqrsEntity.internalEscalationDate.substring(11, 13)) : 0;
                    this.internalEscalationMinute = this.pqrPqrsEntity.internalEscalationDate != null ? Number(this.pqrPqrsEntity.internalEscalationDate.substring(14, 16)) : 0;
                    this.internalEscalationResponseDate = this.pqrPqrsEntity.internalEscalationResponseDate != null ? this.pqrPqrsEntity.internalEscalationResponseDate.substring(0, 10) : null;
                    this.internalEscalationResponseHour = this.pqrPqrsEntity.internalEscalationResponseDate != null ? Number(this.pqrPqrsEntity.internalEscalationResponseDate.substring(11, 13)) : 0;
                    this.internalEscalationResponseMinute = this.pqrPqrsEntity.internalEscalationResponseDate != null ? Number(this.pqrPqrsEntity.internalEscalationResponseDate.substring(14, 16)) : 0;
                    this.customerEscalationDate = this.pqrPqrsEntity.customerEscalationDate != null ? this.pqrPqrsEntity.customerEscalationDate.substring(0, 10) : null;
                    this.customerEscalationHour = this.pqrPqrsEntity.customerEscalationDate != null ? Number(this.pqrPqrsEntity.customerEscalationDate.substring(11, 13)) : 0;
                    this.customerEscalationMinute = this.pqrPqrsEntity.customerEscalationDate != null ? Number(this.pqrPqrsEntity.customerEscalationDate.substring(14, 16)) : 0;
                    this.customerEscalationResponseDate = this.pqrPqrsEntity.customerEscalationResponseDate != null ? this.pqrPqrsEntity.customerEscalationResponseDate.substring(0, 10) : null;
                    this.customerEscalationResponseHour = this.pqrPqrsEntity.customerEscalationResponseDate != null ? Number(this.pqrPqrsEntity.customerEscalationResponseDate.substring(11, 13)) : 0;
                    this.customerEscalationResponseMinute = this.pqrPqrsEntity.customerEscalationResponseDate != null ? Number(this.pqrPqrsEntity.customerEscalationResponseDate.substring(14, 16)) : 0;
                    this.unitShipmentDate = this.pqrPqrsEntity.unitShipmentDate != null ? this.pqrPqrsEntity.unitShipmentDate.substring(0, 10) : null;
                    this.unitShipmentHour = this.pqrPqrsEntity.unitShipmentDate != null ? Number(this.pqrPqrsEntity.unitShipmentDate.substring(11, 13)) : 0;
                    this.unitShipmentMinute = this.pqrPqrsEntity.unitShipmentDate != null ? Number(this.pqrPqrsEntity.unitShipmentDate.substring(14, 16)) : 0;
                    this.unitArrivalDate = this.pqrPqrsEntity.unitArrivalDate != null ? this.pqrPqrsEntity.unitArrivalDate.substring(0, 10) : null;
                    this.unitArrivalHour = this.pqrPqrsEntity.unitArrivalDate != null ? Number(this.pqrPqrsEntity.unitArrivalDate.substring(11, 13)) : 0;
                    this.unitArrivalMinute = this.pqrPqrsEntity.unitArrivalDate != null ? Number(this.pqrPqrsEntity.unitArrivalDate.substring(14, 16)) : 0;
                    this.customerResponsePqrsDate = this.pqrPqrsEntity.responseDateCustomerPqrs != null ? this.pqrPqrsEntity.responseDateCustomerPqrs.substring(0, 10) : null;
                    this.customerResponsePqrsHour = this.pqrPqrsEntity.responseDateCustomerPqrs != null ? Number(this.pqrPqrsEntity.responseDateCustomerPqrs.substring(11, 13)) : 0;
                    this.customerResponsePqrsMinute = this.pqrPqrsEntity.responseDateCustomerPqrs != null ? Number(this.pqrPqrsEntity.responseDateCustomerPqrs.substring(14, 16)) : 0;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
            this.pqrPqrsS.listFile(p.get('pqrsNumber'), 'INICIO').subscribe(resL => {
                if (resL.message === 'OK') {
                    this.filesList = resL.object;
                    this.pqrPqrsS.searchTypeTicket(p.get('pqrsNumber')).subscribe(resA=>{
                        if(resA.message === 'OK'){
                            this.pqrPqrsEntityFiles = resA.object
                            this.meeSupportS.listFile(this.pqrPqrsEntityFiles.numberId, this.pqrPqrsEntityFiles.dateFile).subscribe(res => {
                                if (res.message === 'OK') {
                                    this.fileCustomerList = res.object;
                                    this.loading = false;
                                } else {
                                    this.alertS.open(res.message, 'error');
                                    this.loading = false;
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                                this.loading = false;
                            });
                        }

                    })
                    
                    
                } else {
                    this.alertS.open(resL.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
            this.pqrMasterS.findAll('ESTADOS FINALES', Number(this.countryIdLocal)).subscribe(res => {
                if (res.message === 'OK') {
                    this.finalStatusList = res.object;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
            this.genPersonS.findByPosition('TECNICO').subscribe(res => {
                if (res.message === 'OK') {
                    this.technicalList = res.object;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
            this.pqrAgentS.list(Number(this.countryIdLocal)).subscribe(res => {
                if (res.message === 'OK') {
                    this.agentList = res.object;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
            this.pqrMasterS.findAll('PQRS ATRIBUIBLES',Number(this.countryIdLocal)).subscribe(res => {
                if (res.message === 'OK') {
                    this.attributablePqrsList = res.object;
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
            this.pqrMasterS.findAll('ESTADOS GESTION', Number(this.countryIdLocal)).subscribe(res => {
                if (res.message === 'OK') {
                    this.managementStatusList = res.object;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
            this.pqrMasterS.findAll('REGISTRO FOTOGRAFICO', Number(this.countryIdLocal)).subscribe(res => {
                if (res.message === 'OK') {
                    this.photographicRecordList = res.object;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
            this.pqrMasterS.findAll('DIAGNOSTICO TECNICO', Number(this.countryIdLocal)).subscribe(res => {
                if (res.message === 'OK') {
                    this.technicalDiagnostic = res.object;
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        });
    }
    scroll = (event: any): void => {
        if (event.srcElement.scrollTop >= 50) {
            this.isRelative = false;
        } else {
            this.isRelative = true;
        }
    }
    update() {
        this.pqrPqrsEntity.customerEscalationDate = this.customerEscalationDate != null ? moment(this.customerEscalationDate).format('YYYY-MM-DD') + " " + this.customerEscalationHour + ":" + this.customerEscalationMinute + ":00" : null;
        this.pqrPqrsEntity.customerEscalationResponseDate = this.customerEscalationResponseDate != null ? moment(this.customerEscalationResponseDate).format('YYYY-MM-DD') + " " + this.customerEscalationResponseHour + ":" + this.customerEscalationResponseMinute + ":00" : null;
        this.pqrPqrsEntity.internalEscalationDate = this.internalEscalationDate != null ? moment(this.internalEscalationDate).format('YYYY-MM-DD') + " " + this.internalEscalationHour + ":" + this.internalEscalationMinute + ":00" : null;
        this.pqrPqrsEntity.internalEscalationResponseDate = this.internalEscalationResponseDate != null ? moment(this.internalEscalationResponseDate).format('YYYY-MM-DD') + " " + this.internalEscalationResponseHour + ":" + this.internalEscalationResponseMinute + ":00" : null;
        this.pqrPqrsEntity.unitShipmentDate = this.unitShipmentDate != null ? moment(this.unitShipmentDate).format('YYYY-MM-DD') + " " + this.unitShipmentHour + ":" + this.unitShipmentMinute + ":00" : null;
        this.pqrPqrsEntity.unitArrivalDate = this.unitArrivalDate != null ? moment(this.unitArrivalDate).format('YYYY-MM-DD') + " " + this.unitArrivalHour + ":" + this.unitArrivalMinute + ":00" : null;
        this.pqrPqrsEntity.responseDateCustomerPqrs = this.customerResponsePqrsDate != null ? moment(this.customerResponsePqrsDate).format('YYYY-MM-DD') + " " + this.customerResponsePqrsHour + ":" + this.customerResponsePqrsMinute : null;
        this.pqrPqrsS.eventUpdate(this.pqrPqrsEntity).subscribe(resU => {
            if (resU.message === 'OK') {
                if (resU.object != 0) {
                    this.alertS.open('Eventos actualizados!', 'success');
                    this.loading = true;
                    this.pqrPqrsS.findById(this.pqrsId).subscribe(resF => {
                        if (resF.message === 'OK') {
                            this.pqrPqrsEntity = resF.object;
                            this.internalEscalationDate = this.pqrPqrsEntity.internalEscalationDate != null ? this.pqrPqrsEntity.internalEscalationDate.substring(0, 10) : null;
                            this.internalEscalationHour = this.pqrPqrsEntity.internalEscalationDate != null ? Number(this.pqrPqrsEntity.internalEscalationDate.substring(11, 13)) : 0;
                            this.internalEscalationMinute = this.pqrPqrsEntity.internalEscalationDate != null ? Number(this.pqrPqrsEntity.internalEscalationDate.substring(14, 16)) : 0;
                            this.internalEscalationResponseDate = this.pqrPqrsEntity.internalEscalationResponseDate != null ? this.pqrPqrsEntity.internalEscalationResponseDate.substring(0, 10) : null;
                            this.internalEscalationResponseHour = this.pqrPqrsEntity.internalEscalationResponseDate != null ? Number(this.pqrPqrsEntity.internalEscalationResponseDate.substring(11, 13)) : 0;
                            this.internalEscalationResponseMinute = this.pqrPqrsEntity.internalEscalationResponseDate != null ? Number(this.pqrPqrsEntity.internalEscalationResponseDate.substring(14, 16)) : 0;
                            this.customerEscalationDate = this.pqrPqrsEntity.customerEscalationDate != null ? this.pqrPqrsEntity.customerEscalationDate.substring(0, 10) : null;
                            this.customerEscalationHour = this.pqrPqrsEntity.customerEscalationDate != null ? Number(this.pqrPqrsEntity.customerEscalationDate.substring(11, 13)) : 0;
                            this.customerEscalationMinute = this.pqrPqrsEntity.customerEscalationDate != null ? Number(this.pqrPqrsEntity.customerEscalationDate.substring(14, 16)) : 0;
                            this.customerEscalationResponseDate = this.pqrPqrsEntity.customerEscalationResponseDate != null ? this.pqrPqrsEntity.customerEscalationResponseDate.substring(0, 10) : null;
                            this.customerEscalationResponseHour = this.pqrPqrsEntity.customerEscalationResponseDate != null ? Number(this.pqrPqrsEntity.customerEscalationResponseDate.substring(11, 13)) : 0;
                            this.customerEscalationResponseMinute = this.pqrPqrsEntity.customerEscalationResponseDate != null ? Number(this.pqrPqrsEntity.customerEscalationResponseDate.substring(14, 16)) : 0;
                            this.unitShipmentDate = this.pqrPqrsEntity.unitShipmentDate != null ? this.pqrPqrsEntity.unitShipmentDate.substring(0, 10) : null;
                            this.unitShipmentHour = this.pqrPqrsEntity.unitShipmentDate != null ? Number(this.pqrPqrsEntity.unitShipmentDate.substring(11, 13)) : 0;
                            this.unitShipmentMinute = this.pqrPqrsEntity.unitShipmentDate != null ? Number(this.pqrPqrsEntity.unitShipmentDate.substring(14, 16)) : 0;
                            this.unitArrivalDate = this.pqrPqrsEntity.unitArrivalDate != null ? this.pqrPqrsEntity.unitArrivalDate.substring(0, 10) : null;
                            this.unitArrivalHour = this.pqrPqrsEntity.unitArrivalDate != null ? Number(this.pqrPqrsEntity.unitArrivalDate.substring(11, 13)) : 0;
                            this.unitArrivalMinute = this.pqrPqrsEntity.unitArrivalDate != null ? Number(this.pqrPqrsEntity.unitArrivalDate.substring(14, 16)) : 0;
                            this.customerResponsePqrsDate = this.pqrPqrsEntity.responseDateCustomerPqrs != null ? this.pqrPqrsEntity.responseDateCustomerPqrs.substring(0, 10) : null;
                            this.customerResponsePqrsHour = this.pqrPqrsEntity.responseDateCustomerPqrs != null ? Number(this.pqrPqrsEntity.responseDateCustomerPqrs.substring(11, 13)) : 0;
                            this.customerResponsePqrsMinute = this.pqrPqrsEntity.responseDateCustomerPqrs != null ? Number(this.pqrPqrsEntity.responseDateCustomerPqrs.substring(14, 16)) : 0;
                        } else {
                            this.alertS.open(resF.message, 'error');
                        }
                        this.loading = false;
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open('Error al actualizar los eventos!', 'error');
                }
            } else {
                this.alertS.open(resU.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    download(file: PqrPqrsFileModel) {
        var downloadLink = document.createElement("a");
        if (file.type === 'imagen') {
            downloadLink.setAttribute("href", "data:image/png;base64," + file.file);
        } else {
            var binary = window.atob(file.file);
            var binaryLength = binary.length;
            var bytes = new Uint8Array(binaryLength);
            for (var i = 0; i < binaryLength; i++) {
                var ascii = binary.charCodeAt(i);
                bytes[i] = ascii;
            }
            var blob = new Blob([bytes], { type: "application/" + file.type });
            downloadLink.href = window.URL.createObjectURL(blob);
        }
        downloadLink.setAttribute("download", file.name + '.' + file.type);
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    delete(name: string) {
        this.pqrPqrsS.deleteFile(this.title, 'INICIO', name).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.pqrPqrsS.listFile(this.pqrPqrsEntity.number, 'INICIO').subscribe(resL => {
                        if (resL.message === 'OK') {
                            this.filesList = resL.object;
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
    finish() {
        const dialogRef = this.dialog.open(FinishModal, {
            width: '800px',
            data: { modalType: 'Terminada', pqrsId: this.pqrPqrsEntity.id, number: this.pqrPqrsEntity.number, type: this.pqrPqrsEntity.type, typeId: this.pqrPqrsEntity.typeId, ticket: this.pqrPqrsEntity.ticket, genPersonEntity: this.genPersonEntity, creationPersonId: this.pqrPqrsEntity.creationPersonId, openClose : this.pqrPqrsEntity.automaticManual }
        });
        dialogRef.afterClosed().subscribe(res => {
            if (res == true) {
                this.route.navigate(['/wdcs/wdcs/management']);
            }
        });
    }
    attachFile(file: FileList) {
        if (file != undefined) {
            for (let i = 0; i < file.length; i++) {
                this.files.push(file[i]);
            }
            if (this.files.length > 0) {
                this.pqrPqrsS.loadFile(this.pqrPqrsEntity.number, 'INICIO', this.files).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.files = [];
                            this.pqrPqrsS.listFile(this.pqrPqrsEntity.number, 'INICIO').subscribe(resL => {
                                if (resL.message === 'OK') {
                                    this.filesList = resL.object;
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
    }

    escalation(number: string, assignedPersonId: number, creationPersonId: number) {
        const dialogRef = this.dialog.open(ConfirmationPqrs, {
            data: { message: '¿ Desea escalar con el cliente ?' },
            height: '250px',
            width: '400px'
        });
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.pqrPqrsS.eventUpdate(this.pqrPqrsEntity).subscribe(resU => {
                    if (resU.message === 'OK') {
                        if (resU.object != 0) {
                            this.alertS.open('Eventos actualizados!', 'success');
                            this.loading = true;
                            this.pqrPqrsS.findById(this.pqrsId).subscribe(resF => {
                                if (resF.message === 'OK') {
                                    this.pqrPqrsEntity = resF.object;
                                    this.internalEscalationDate = this.pqrPqrsEntity.internalEscalationDate != null ? this.pqrPqrsEntity.internalEscalationDate.substring(0, 10) : null;
                                    this.internalEscalationHour = this.pqrPqrsEntity.internalEscalationDate != null ? Number(this.pqrPqrsEntity.internalEscalationDate.substring(11, 13)) : 0;
                                    this.internalEscalationMinute = this.pqrPqrsEntity.internalEscalationDate != null ? Number(this.pqrPqrsEntity.internalEscalationDate.substring(14, 16)) : 0;
                                    this.internalEscalationResponseDate = this.pqrPqrsEntity.internalEscalationResponseDate != null ? this.pqrPqrsEntity.internalEscalationResponseDate.substring(0, 10) : null;
                                    this.internalEscalationResponseHour = this.pqrPqrsEntity.internalEscalationResponseDate != null ? Number(this.pqrPqrsEntity.internalEscalationResponseDate.substring(11, 13)) : 0;
                                    this.internalEscalationResponseMinute = this.pqrPqrsEntity.internalEscalationResponseDate != null ? Number(this.pqrPqrsEntity.internalEscalationResponseDate.substring(14, 16)) : 0;
                                    this.customerEscalationDate = this.pqrPqrsEntity.customerEscalationDate != null ? this.pqrPqrsEntity.customerEscalationDate.substring(0, 10) : null;
                                    this.customerEscalationHour = this.pqrPqrsEntity.customerEscalationDate != null ? Number(this.pqrPqrsEntity.customerEscalationDate.substring(11, 13)) : 0;
                                    this.customerEscalationMinute = this.pqrPqrsEntity.customerEscalationDate != null ? Number(this.pqrPqrsEntity.customerEscalationDate.substring(14, 16)) : 0;
                                    this.customerEscalationResponseDate = this.pqrPqrsEntity.customerEscalationResponseDate != null ? this.pqrPqrsEntity.customerEscalationResponseDate.substring(0, 10) : null;
                                    this.customerEscalationResponseHour = this.pqrPqrsEntity.customerEscalationResponseDate != null ? Number(this.pqrPqrsEntity.customerEscalationResponseDate.substring(11, 13)) : 0;
                                    this.customerEscalationResponseMinute = this.pqrPqrsEntity.customerEscalationResponseDate != null ? Number(this.pqrPqrsEntity.customerEscalationResponseDate.substring(14, 16)) : 0;
                                    this.unitShipmentDate = this.pqrPqrsEntity.unitShipmentDate != null ? this.pqrPqrsEntity.unitShipmentDate.substring(0, 10) : null;
                                    this.unitShipmentHour = this.pqrPqrsEntity.unitShipmentDate != null ? Number(this.pqrPqrsEntity.unitShipmentDate.substring(11, 13)) : 0;
                                    this.unitShipmentMinute = this.pqrPqrsEntity.unitShipmentDate != null ? Number(this.pqrPqrsEntity.unitShipmentDate.substring(14, 16)) : 0;
                                    this.unitArrivalDate = this.pqrPqrsEntity.unitArrivalDate != null ? this.pqrPqrsEntity.unitArrivalDate.substring(0, 10) : null;
                                    this.unitArrivalHour = this.pqrPqrsEntity.unitArrivalDate != null ? Number(this.pqrPqrsEntity.unitArrivalDate.substring(11, 13)) : 0;
                                    this.unitArrivalMinute = this.pqrPqrsEntity.unitArrivalDate != null ? Number(this.pqrPqrsEntity.unitArrivalDate.substring(14, 16)) : 0;
                                    this.customerResponsePqrsDate = this.pqrPqrsEntity.responseDateCustomerPqrs != null ? this.pqrPqrsEntity.responseDateCustomerPqrs.substring(0, 10) : null;
                                    this.customerResponsePqrsHour = this.pqrPqrsEntity.responseDateCustomerPqrs != null ? Number(this.pqrPqrsEntity.responseDateCustomerPqrs.substring(11, 13)) : 0;
                                    this.customerResponsePqrsMinute = this.pqrPqrsEntity.responseDateCustomerPqrs != null ? Number(this.pqrPqrsEntity.responseDateCustomerPqrs.substring(14, 16)) : 0;
                                } else {
                                    this.alertS.open(resF.message, 'error');
                                }
                                this.loading = false;
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al actualizar los eventos!', 'error');
                        }
                    } else {
                        this.alertS.open(resU.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
                this.pqrPqrsS.updateCustomerEscalation(number).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Inicio de escalacion exitosa!', 'success');
                            this.pqrMessageS.create(number, assignedPersonId, creationPersonId).subscribe(res => {
                                if (res.message === 'OK') {
                                    if (res.object != 0) {
                                        

                                    } else {
                                        this.alertS.open('La escalacion ya esta creada', 'error');
                                    }
                                } else {
                                    this.alertS.open('La escalacion ya esta creada', 'error');
                                }
                            }, err => {
                                this.alertS.open('La escalacion ya esta creada', 'error');
                            });
                        } else {
                            this.alertS.open('La escalacion ya esta creada', 'error');
                        }
                    } else {
                        this.alertS.open('La escalacion ya esta creada', 'error');
                    }
                }, err => {
                    this.alertS.open('La escalacion ya esta creada', 'error');
                });
            }
        }, err => {
            this.alertS.open('La escalacion ya esta creada', 'error');
        });
    }


    escalationFinish(ticket: string, number: string, creationPersonId: number) {
        const dialogRef = this.dialog.open(confirmationFinishPqrs, {
            data: { message: '¿ Desea terminar la escalacion ?' },
            height: '250px',
            width: '400px'
        });
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.pqrPqrsS.updateCustomerEscalationFinish(number).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.pqrMessageS.updateMessage(number).subscribe(res => {
                                if (res.message === 'OK') {
                                    if (res.object != 0) {
                                        this.alertS.open('Finalizacion de la escalacion exitosa!', 'success');
                                        this.pqrMessageS.sendEmail(ticket, number, creationPersonId).subscribe(resS => {
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
                                    } else {
                                        this.alertS.open(res.message, 'error');
                                    }
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open(res.message, 'error')
                        }
                    } else {
                        this.alertS.open(res.message, 'error')
                    }
                }, err => {
                    this.alertS.open(err.message, 'error')
                }

                );
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    detail(detail: string) {
        this.dialog.open(DetailWMSModal, {
            width: '100%',
            data: { detail: detail }
        });
    }


}