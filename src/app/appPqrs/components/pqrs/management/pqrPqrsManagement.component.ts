import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { PqrPqrsService } from 'src/app/appPqrs/services/pqrPqrs.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { PqrStatusService } from 'src/app/appPqrs/services/pqrStatus.service';
import { PqrTracingService } from 'src/app/appPqrs/services/pqrTracing.service';
import { Router } from '@angular/router';
import { AgentModal } from 'src/app/appPqrs/modals/agent/agent.modal';
import { DetailModal } from 'src/app/appPqrs/modals/detail/detail.modal';
import { FinishModal } from 'src/app/appPqrs/modals/finish/finish.modal';
import { ObservationsModal } from 'src/app/appPqrs/modals/observations/observations.modal';
import { PqrPqrsEntity } from 'src/app/appPqrs/entities/pqrPqrs.entity';
import { PqrTracingEntity } from 'src/app/appPqrs/entities/pqrTracing.entity';
import { FilesModal } from 'src/app/appPqrs/modals/files/files.modal';
import * as moment from 'moment';
import { PqrMailService } from 'src/app/appPqrs/services/pqrMail.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PqrCustomerService } from 'src/app/appPqrs/services/pqrCustomer.service';

@Component({
    selector: 'app-pqrPqrsManagement',
    templateUrl: './pqrPqrsManagement.component.html',
    styleUrls: ['./pqrPqrsManagement.component.css']
})
export class PqrPqrsManagementComponent implements OnInit {
    id: number;
    status: string;
    initialDate: string;
    finalDate: string;
    @ViewChild('paginator') paginator: MatPaginator;
    loading: boolean;
    loadingTracing: boolean;
    genPersonEntity: GenPersonEntity;
    statusRejectId: number;
    statusScaleId: number;
    statusFinish: number;
    pqrsList = new MatTableDataSource<PqrPqrsEntity>();
    tracingList: PqrTracingEntity[];
    list = new MatTableDataSource<PqrPqrsEntity>();
    fileList
    number:string;

    constructor(private meeSupportS: PqrCustomerService,private router: Router, private dialog: MatDialog, private pqrPqrsS: PqrPqrsService, private pqrMailS: PqrMailService,private pqrStatusS: PqrStatusService, private pqrTracingS: PqrTracingService, private alertS: AlertService) {
        this.id = 0;
        this.status = '0';
        this.initialDate = '';
        this.finalDate = '';
        this.loading = false;
        this.loadingTracing = false;
        this.pqrsList = new MatTableDataSource([]);
        this.tracingList = [];
        this.list = new MatTableDataSource([]);
        this.number= '0';
    }

    ngOnInit(): void {
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        this.pqrStatusS.findId('Rechazada').subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.statusRejectId = res.object;
                } else {
                    this.alertS.open('Error al encontrar el estado!', 'error');
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrStatusS.findId('Escalada').subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.statusScaleId = res.object;
                } else {
                    this.alertS.open('Error al encontrar el estado!', 'error');
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrStatusS.findId('Terminada').subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.statusFinish = res.object;
                } else {
                    this.alertS.open('Error al encontrar el estado!', 'error');
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    select(id: number) {
        this.id = id;
    }
    search() {

        this.id = 0;
        this.tracingList=[];
        this.initialDate = (document.getElementById('startDate') as HTMLInputElement).value != '' ? moment((document.getElementById('startDate') as HTMLInputElement).value).format('YYYY-DD-MM') : '0';
        this.finalDate = (document.getElementById('endDate') as HTMLInputElement).value != '' ? moment((document.getElementById('endDate') as HTMLInputElement).value).format('YYYY-DD-MM') : '0';
        this.loading = true;
        this.pqrPqrsS.listPerson(this.genPersonEntity.id,this.status, this.initialDate, this.finalDate,this.number,Number(localStorage.getItem('countryId'))).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.pqrsList = new MatTableDataSource(res.object);
                this.list.data = this.pqrsList.data;
                this.pqrsList.paginator = this.paginator;
                if (this.paginator.pageIndex === 0) {
                    this.list.data = this.list.data.slice(0, this.paginator.pageSize);
                } else {
                    this.list.data = this.list.data.slice((this.paginator.pageIndex * this.paginator.pageSize), (this.paginator.pageIndex * this.paginator.pageSize) + this.paginator.pageSize);
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    scale(pqrsId: string, number: string, ticket: string, typeId: number, status: string) {
        if (status != 'Terminada') {
            const dialogRef = this.dialog.open(AgentModal, {
                width: '800px'
            });
            dialogRef.afterClosed().subscribe(resp => {
                if (resp.personId != 0) {
                    this.dialog.open(ObservationsModal).afterClosed().subscribe(resO => {
                        if (resO != '') {
                            this.pqrPqrsS.manage(pqrsId, resp.personId, this.statusScaleId, 'Escalar').subscribe(resS => {
                                if (resS.message === 'OK') {
                                    if (resS.object != 0) {
                                        this.alertS.open('PQRS escalada!', 'success');
                                        this.pqrTracingS.create(number, ticket, typeId, 'Estado', this.statusScaleId, 'Pqrs Escalada', this.genPersonEntity.id).subscribe(resT => {
                                            if (resT.message === 'OK') {
                                                if (resT.object != 0) {
                                                    this.search();
                                                    var variables: string[] = [];
                                                    variables.push(number);
                                                    variables.push('Escalada');
                                                    variables.push(moment(new Date()).format('YYYY-MM-DD hh:mm:ss.sss'));
                                                    variables.push(this.genPersonEntity.firstName + ' ' + this.genPersonEntity.lastName);
                                                    this.pqrMailS.send(this.statusScaleId, variables).subscribe(resM => {
                                                        if (resM.message != 'OK') {
                                                            this.alertS.open(resM.message, 'error');
                                                        }
                                                    }, err => {
                                                        this.alertS.open(err.message, 'error');
                                                    });
                                                }
                                                else {
                                                    this.alertS.open('Error al insertar el movimiento!', 'error');
                                                }
                                            }
                                            else {
                                                this.alertS.open(resT.message, 'error');
                                            }
                                        }, err => {
                                            this.alertS.open(err.message, 'error');
                                        });
                                        this.search();
                                    }
                                    else {
                                        this.alertS.open('Error al escalar la PQRS!', 'error');
                                    }
                                }
                                else {
                                    this.alertS.open(resS.message, 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        }
                    });
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('La PQRS tiene el estado: ' + status + ', no se puede escalar!', 'warning');
        }
    }
    reject(pqrsId: string, number: string, ticket: string, typeId: number, status: string) {
        if (status != 'Terminada') {
            this.dialog.open(ConfirmationComponent,{
                data:{message:'¿ Desea rechazar la pqrs?'},
                height:'250px',
                width:'400px'
            }).afterClosed().subscribe(resC => {
                if (resC) {
                    this.dialog.open(ObservationsModal).afterClosed().subscribe(resO => {
                        if (resO != '') {
                            this.pqrPqrsS.manage(pqrsId, 0, this.statusRejectId, 'Rechazar').subscribe(resA => {
                                if (resA.message === 'OK') {
                                    if (resA.object != 0) {
                                        this.alertS.open('PQRS rechazada!', 'success');
                                        this.pqrTracingS.create(number, ticket, typeId, 'Estado', this.statusRejectId, 'Pqrs Rechazada', this.genPersonEntity.id).subscribe(resT => {
                                            if (resT.message === 'OK') {
                                                if (resT.object != 0) {
                                                    var variables: string[] = [];
                                                    variables.push(number);
                                                    variables.push('Rechazada');
                                                    variables.push(moment(new Date()).format('YYYY-MM-DD hh:mm:ss.sss'));
                                                    variables.push(this.genPersonEntity.firstName + ' ' + this.genPersonEntity.lastName);
                                                    this.pqrMailS.send(this.statusRejectId, variables).subscribe(resM => {
                                                        if (resM.message != 'OK') {
                                                            this.alertS.open(resM.message, 'error');
                                                        }
                                                    }, err => {
                                                        this.alertS.open(err.message, 'error');
                                                    });
                                                } else {
                                                    this.alertS.open('Error al insertar el movimiento!', 'error');
                                                }
                                            } else {
                                                this.alertS.open(resT.message, 'error');
                                            }
                                        }, err => {
                                            this.alertS.open(err.message, 'error');
                                        });
                                        this.search();
                                    } else {
                                        this.alertS.open(resA.message, 'error');
                                    }
                                } else {
                                    this.alertS.open('Error al rechazar la PQRS!', 'error');
                                }
                            }, err => {
                                this.alertS.open(err.message, 'error');
                            });
                        }
                    });
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('La PQRS tiene el estado: ' + status + ', no se puede rechazar!', 'warning');
        }
    }
    manageEvents(pqrsId: number, pqrsNumber: number, status: string) {
        if (status != 'Terminada') {
            this.router.navigate(['wdcs/wdcs/events/' + pqrsId + '/' + pqrsNumber]);
        } else {
            this.alertS.open('La PQRS tiene el estado: ' + status + ', no se pueden administrar mas eventos!', 'warning');
        }
    }
    finish(pqrsId: number, number: string, type: string, ticket: number, status: string) {
        if (status != 'Terminada') {
            const dialogRef = this.dialog.open(FinishModal, {
                width: '800px',
                data: { modalType: 'Terminada', pqrsId: pqrsId, number: number, type: type, ticket: ticket, genPersonEntity: this.genPersonEntity }
            });
            dialogRef.afterClosed().subscribe(res => {
                if (res) {
                    var variables: string[] = [];
                    variables.push(number);
                    variables.push('Terminada');
                    variables.push(moment(new Date()).format('YYYY-MM-DD hh:mm:ss.sss'));
                    variables.push(this.genPersonEntity.firstName + ' ' + this.genPersonEntity.lastName);
                    this.pqrMailS.send(this.statusFinish, variables).subscribe(resM => {
                        if (resM.message != 'OK') {
                            this.alertS.open(resM.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                    this.search();
                }
            });
        } else {
            this.alertS.open('La PQRS ya esta terminada!', 'warning');
        }
    }
    detail(pqrsId:number) {
        this.dialog.open(DetailModal, {
            data: {pqrsId:pqrsId},
            width: '100%'
           
        });
    }
    tracing(number: string) {
        this.tracingList = [];
        this.pqrTracingS.list(number).subscribe(res => {
            if (res.message === 'OK') {
                this.tracingList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    files(number: string) {
        this.dialog.open(FilesModal, {
            width: '800px',
            data: { number: number }
        });
    }
    paginate(e) {
        this.list.data = this.pqrsList.data;
        if (e.pageIndex === 0) {
            this.list.data = this.list.data.slice(0, e.pageSize);
        } else {
            this.list.data = this.list.data.slice((e.pageIndex * e.pageSize), (e.pageIndex * e.pageSize) + e.pageSize);
        }
    }
    download(data: MatTableDataSource<any>) {
        let dataSource = data;
        let delimiter = "\\";
        let headers = '';
        let file = '';
        let columns = ['ticket', 'number', 'type','status','proyect','category','customerType','creationDate', 'tat', 'tatAcido', 'assignedPerson'];
        let columnsName = ['Ticket','Numero','Tipo','Estado','Proyecto','Categoria','Tipo de cliente','Fecha creación','Tat','Tat Acido','Usuario de creación'];

        for (let i = 0; i < columns.length; i++) {
            headers = headers + columnsName[i];
            if (i < columns.length - 1) {
                headers = headers + delimiter;
            }
        }
        file = headers;
        for (let i = 0; i < dataSource.data.length; i++) {
            file = file + "\n";
            for (let j = 0; j < columns.length; j++) {
                file = file + dataSource.data[i][columns[j]];
                file = file + delimiter;
            }
        }
        let blob = new Blob(['\ufeff' + file], { type: 'text/csv;charset=utf-8;' });
        let url = URL.createObjectURL(blob);
        let downloadLink = document.createElement("a");
        downloadLink.setAttribute("href", url);
        downloadLink.setAttribute("download", this.status==='0'?'Listado PQRS.csv':this.status + ".csv");
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}