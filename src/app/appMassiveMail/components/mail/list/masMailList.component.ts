import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { MasMailEntity } from "src/app/appMassiveMail/entities/masMail.entity";
import { MasRecipientEntity } from "src/app/appMassiveMail/entities/masRecipient.entity";
import { MasSendEntity } from "src/app/appMassiveMail/entities/masSend.entity";
import { MasApprovalService } from "src/app/appMassiveMail/services/masApproval.service";
import { MasMailService } from "src/app/appMassiveMail/services/masMail.service";
import { MasRecipientService } from "src/app/appMassiveMail/services/masRecipient.service";
import { MasSendService } from "src/app/appMassiveMail/services/masSend.service";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { AlertService } from "src/app/shared/services/alert.service";
import { MasMailNewComponent } from "../new/masMailNew.component";

@Component({
    selector: 'app-masMailList',
    templateUrl: './masMailList.component.html',
    styleUrls: ['./masMailList.component.css']
})
export class MasMailListComponent implements OnInit {
    mailId: number;
    loading1: boolean;
    loading2: boolean;
    columns1: string[];
    columns2: string[];
    dataSource1: MatTableDataSource<any>;
    dataSource2: MatTableDataSource<any>;
    @ViewChild('paginator1') paginator1: MatPaginator;
    @ViewChild('paginator2') paginator2: MatPaginator;
    person: GenPersonEntity;
    rotate: boolean;

    constructor(private masMailS: MasMailService, private masRecipientS: MasRecipientService, private masSendS: MasSendService, private masApprovalS: MasApprovalService, private alertS: AlertService, private dialog: MatDialog) {
        this.mailId = 0;
        this.loading1 = false;
        this.loading2 = false;
        this.columns1 = ['subject', 'message', 'creationDate', 'creationUser', 'actions'];
        this.columns2 = ['mail', 'type'];
        this.dataSource1 = new MatTableDataSource([]);
        this.dataSource2 = new MatTableDataSource([]);
        this.rotate = false;
    }
    ngOnInit(): void {
        this.person = JSON.parse(localStorage.getItem('user'));
        this.loading1 = true;
        this.masMailS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource1 = new MatTableDataSource(res.object);
                this.dataSource1.paginator = this.paginator1;
                this.loading1 = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    create(masMail: MasMailEntity) {
        this.dialog.open(MasMailNewComponent, {
            data: { masMail: masMail },
            width: '100%'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.loading1 = true;
                this.masMailS.list().subscribe(res => {
                    if (res.message === 'OK') {
                        this.dataSource1 = new MatTableDataSource(res.object);
                        this.dataSource1.paginator = this.paginator1;
                        this.loading1 = false;
                    } else {
                        this.alertS.open(res.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
    delete(id: number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿Desea eliminar el correo?' },
            width: '400px',
            height: '250px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.masMailS.delete(id).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Correo eliminado!', 'success');
                            this.loading1 = true;
                            this.masMailS.list().subscribe(res => {
                                if (res.message === 'OK') {
                                    this.dataSource1 = new MatTableDataSource(res.object);
                                    this.dataSource1.paginator = this.paginator1;
                                    this.loading1 = false;
                                } else {
                                    this.alertS.open(res.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        } else {
                            this.alertS.open('Error al eliminar el correo!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
    loadRepients(mailId: number, file: FileList) {
        if (file.length > 0) {
            this.masRecipientS.create(mailId, this.person.id, file[0]).subscribe(resL => {
                if (resL.message === 'OK') {
                    if (resL.object != 0) {
                        this.alertS.open('Archivo cargado!', 'success');
                        this.getRecipients(mailId);
                    } else {
                        this.alertS.open('Error al cargar el archivo!', 'error');
                    }
                } else {
                    this.alertS.open(resL.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    send(mailId: number) {
        this.masSendS.find(mailId).subscribe(resF => {
            if (resF.message === 'OK') {
                if (resF.object === null) {
                    this.masApprovalS.find(mailId).subscribe(resFI => {
                        if (resFI.message === 'OK') {
                            if (resFI.object != null) {
                                this.dialog.open(ConfirmationComponent, {
                                    data: { message: '¿Desea crear el envio para aprobacion?' },
                                    width: '400px',
                                    height: '250px'
                                }).afterClosed().subscribe(resA => {
                                    if (resA) {
                                        var sendEntity: MasSendEntity = new MasSendEntity();
                                        sendEntity.mailId = mailId;
                                        sendEntity.creationUserId = this.person.id;
                                        sendEntity.approvalUserId = resFI.object['approvalUserId'];
                                        this.masSendS.create(sendEntity).subscribe(resC => {
                                            if (resC.message === 'OK') {
                                                if (resC.object != 0) {
                                                    this.alertS.open('Envio creado!', 'success');
                                                } else {
                                                    this.alertS.open('Error al crear el envio!', 'error');
                                                }
                                            } else {
                                                this.alertS.open(resC.message, 'error');
                                            }
                                        }, err => {
                                            this.alertS.open(err.message, 'error');
                                        });
                                    }
                                });
                            } else {
                                this.alertS.open('Este correo no tiene una aprobacion configurada!', 'warning');
                            }
                        } else {
                            this.alertS.open(resFI.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    if (resF.object['message'] === 'Aprobado') {
                        this.rotate = true;
                        this.masRecipientS.list(mailId).subscribe(resL => {
                            if (resL.message === 'OK') {
                                var recipients: MasRecipientEntity[] = resL.object;
                                if (recipients.length > 0) {
                                    this.masMailS.send(mailId, this.person.id).subscribe(resS => {
                                        if (resS.message === 'OK') {
                                            if (resS.object != 0) {
                                                this.alertS.open('Correo masivo enviado!', 'success');
                                                this.rotate = false;
                                            } else {
                                                this.alertS.open('Error al enviar el correo masivo!', 'error');
                                                this.rotate = false;
                                            }
                                        } else {
                                            this.alertS.open(resS.message, 'error');
                                            this.rotate = false;
                                        }
                                    }, err => {
                                        this.alertS.open(err.message, 'error');
                                        this.rotate = false;
                                    });
                                } else {
                                    this.alertS.open('No hay destinatarios cargados!', 'warning');
                                    this.rotate = false;
                                }
                            } else {
                                this.alertS.open(resL.message, 'error');
                            }
                        }, err => {
                            this.alertS.open(err.message, 'error');
                        });
                    } else if (resF.object['message'] === 'Pendiente') {
                        this.alertS.open('El envio esta pendiente por aprobacion!', 'warning');
                    } else if (resF.object['message'] != 'Pendiente' && resF.object['message'] != 'Aprobado') {
                        this.dialog.open(ConfirmationComponent, {
                            data: { message: 'El correo ya fue enviado.\n¿Desea crear otro envio para aprobacion?' },
                            width: '400px',
                            height: '250px'
                        }).afterClosed().subscribe(resA => {
                            if (resA) {
                                this.masApprovalS.find(mailId).subscribe(resFI => {
                                    if (resFI.message === 'OK') {
                                        if (resFI.object != null) {
                                            var sendEntity: MasSendEntity = new MasSendEntity();
                                            sendEntity.mailId = mailId;
                                            sendEntity.creationUserId = this.person.id;
                                            sendEntity.approvalUserId = resFI.object['approvalUserId'];
                                            this.masSendS.create(sendEntity).subscribe(resC => {
                                                if (resC.message === 'OK') {
                                                    if (resC.object != 0) {
                                                        this.alertS.open('Envio creado!', 'success');
                                                    } else {
                                                        this.alertS.open('Error al crear el envio!', 'error');
                                                    }
                                                } else {
                                                    this.alertS.open(resC.message, 'error');
                                                }
                                            }, err => {
                                                this.alertS.open(err.message, 'error');
                                            });
                                        } else {
                                            this.alertS.open('Este correo no tiene una aprobacion configurada!', 'warning');
                                        }
                                    } else {
                                        this.alertS.open(resFI.message, 'error');
                                    }
                                }, err => {
                                    this.alertS.open(err.message, 'error');
                                });
                            }
                        });
                    }
                }
            } else {
                this.alertS.open(resF.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    getRecipients(mailId: number) {
        this.mailId = mailId;
        this.loading2 = true;
        this.masRecipientS.list(mailId).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource2 = new MatTableDataSource(res.object);
                this.dataSource2.paginator = this.paginator2;
                this.loading2 = false;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    deleteRecipients() {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿Desea eliminar los destinatarios?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.masRecipientS.delete(this.mailId).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Destinatarios eliminados!', 'success');
                            this.getRecipients(this.mailId);
                        } else {
                            this.alertS.open('Error al eliminar los destinatarios!', 'error');
                        }
                    } else {
                        this.alertS.open(resD.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
}