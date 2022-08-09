import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { PqrPqrsService } from 'src/app/appPqrs/services/pqrPqrs.service';
import { PqrStatusService } from 'src/app/appPqrs/services/pqrStatus.service';
import { PqrTracingService } from 'src/app/appPqrs/services/pqrTracing.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PqrPqrsEditComponent } from '../edit/pqrPqrsEdit.component';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { AgentModal } from 'src/app/appPqrs/modals/agent/agent.modal';
import { DetailModal } from 'src/app/appPqrs/modals/detail/detail.modal';
import { ObservationsModal } from 'src/app/appPqrs/modals/observations/observations.modal';
import { PqrTracingEntity } from 'src/app/appPqrs/entities/pqrTracing.entity';
import { FinishModal } from 'src/app/appPqrs/modals/finish/finish.modal';
import { FilesModal } from 'src/app/appPqrs/modals/files/files.modal';
import { PqrMailService } from 'src/app/appPqrs/services/pqrMail.service';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PqrPqrsEntity } from 'src/app/appPqrs/entities/pqrPqrs.entity';

@Component({
    selector: 'app-pqrPqrsAdministration',
    templateUrl: './pqrPqrsAdministration.component.html',
    styleUrls: ['./pqrPqrsAdministration.component.css']
})
export class PqrPqrsAdministrationComponent implements OnInit {
    id: number;
    status: string;
    initialDate: string;
    finalDate: string;
    number:string;
    @ViewChild('paginator') paginator: MatPaginator;
    loading: boolean;
    loadingTracing: boolean;
    statusAssignedId: number;
    statusDeletedId: number;
    genPersonEntity: GenPersonEntity;
    pqrsList = new MatTableDataSource<PqrPqrsEntity>();
    tracingList: PqrTracingEntity[];
    list = new MatTableDataSource<PqrPqrsEntity>();

    constructor(private dialog: MatDialog, private pqrPqrsS: PqrPqrsService, private pqrStatusS: PqrStatusService, private pqrMailS: PqrMailService, private pqrTracingS: PqrTracingService, private alertS: AlertService) {
        this.id = 0;
        this.status = '0';
        this.initialDate = '';
        this.finalDate = '';
        this.number = '';
        this.loading = false;
        this.loadingTracing = false;
        this.pqrsList = new MatTableDataSource([]);
        this.tracingList = [];
        this.list = new MatTableDataSource([]);
        this.number='0';
    }

    ngOnInit(): void {
        
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        this.pqrStatusS.findId('Asignada').subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.statusAssignedId = res.object;
                }
                else {
                    this.alertS.open('Error al encontrar el estado!', 'error');
                }
            }
            else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.pqrStatusS.findId('Eliminada').subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.statusDeletedId = res.object;
                }
                else {
                    this.alertS.open('Error al encontrar el estado!', 'error');
                }
            }
            else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        
    }
    select(id: number) {
        this.id = id
    }
    

    search() {
        this.id = 0;
        this.tracingList=[];
        this.initialDate = (document.getElementById('startDate') as HTMLInputElement).value != '' ? moment((document.getElementById('startDate') as HTMLInputElement).value).format('YYYY-DD-MM') : '0';
        this.finalDate = (document.getElementById('endDate') as HTMLInputElement).value != '' ? moment((document.getElementById('endDate') as HTMLInputElement).value).format('YYYY-DD-MM') : '0';
        this.loading = true;
        this.pqrPqrsS.list(0,this.status, this.initialDate, this.finalDate, this.number,Number(localStorage.getItem('countryId'))).subscribe(res => {
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
    assign(pqrsId: string, number: string, ticket: string, typeId: number, status: string) {
        if (status === 'Creada' || status === 'Rechazada') {
            const dialogRef = this.dialog.open(AgentModal, {
                width: '800px'
            });
            dialogRef.afterClosed().subscribe(resp => {
                if (resp.personId != 0) {
                    this.pqrPqrsS.manage(pqrsId, resp.personId, this.statusAssignedId, 'Asignar').subscribe(res => {
                        if (res.message === 'OK') {
                            if (res.object != 0) {
                                this.alertS.open('PQRS asignada!', 'success');
                                this.pqrTracingS.create(number, ticket, typeId,'Estado',this.statusAssignedId,'Pqrs Asignada a: ' + resp.firstName + ' ' + resp.lastName,this.genPersonEntity.id).subscribe(resT => {
                                    if (resT.message === 'OK') {
                                        if (resT.object != 0) {
                                            this.search();
                                            var variables: string[] = [];
                                            variables.push(number);
                                            variables.push('Asignada');
                                            variables.push(moment(new Date()).format('YYYY-MM-DD hh:mm:ss.sss'));
                                            variables.push(this.genPersonEntity.firstName + ' ' + this.genPersonEntity.lastName);
                                            this.pqrMailS.send(this.statusAssignedId, variables).subscribe(resM => {
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
                                this.alertS.open('Error al asignar la PQRS!', 'error');
                            }
                        }
                        else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
        else {
            this.alertS.open('La PQRS tiene el estado: ' + status + ', no se puede asignar!', 'warning');
        }
    }
    edit(pqrsId: number, status: string) {
        if (status === 'Creada' || status === 'Asignada' || status === 'En Proceso') {
            const dialogRef = this.dialog.open(PqrPqrsEditComponent, {
                data: { pqrsId: pqrsId }
            });
            dialogRef.afterClosed().subscribe(res => {
                this.search();
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('La PQRS tiene el estado: ' + status + ', no se puede editar!', 'warning');
        }
    }
    delete(pqrsId: number, number: string, ticket: string, typeId: number, status: string) {
        if (status === 'Creada' || status === 'Rechazada') {
            this.dialog.open(ConfirmationComponent,{
                data:{message:'¿ Desea de eliminar la pqrs?'},
                height:'250px',
                width:'400px'
            }).afterClosed().subscribe(resC => {
                if (resC) {
                    this.dialog.open(ObservationsModal).afterClosed().subscribe(resO => {
                        if (resO != '') {
                            this.pqrPqrsS.delete(pqrsId).subscribe(resD => {
                                if (resD.message === 'OK') {
                                    if (resD.object != 0) {
                                        this.alertS.open('PQRS eliminada!', 'success');
                                        this.pqrPqrsS.deleteFileByPqrs(number).subscribe(resE => {
                                            if (resE.message != 'OK') {
                                                this.alertS.open(resE.message, 'error');
                                            }
                                        }, err => {
                                            this.alertS.open(err.message, 'error');
                                        });
                                        this.pqrTracingS.create(number, ticket, typeId,'Estado',this.statusDeletedId, 'Pqrs Eliminada',this.genPersonEntity.id).subscribe(resT => {
                                            if (resT.message === 'OK') {
                                                if (resT.object != 0) {
                                                    var variables: string[] = [];
                                                    variables.push(number);
                                                    variables.push('Eliminada');
                                                    variables.push(moment(new Date()).format('YYYY-MM-DD hh:mm:ss.sss'));
                                                    variables.push(this.genPersonEntity.firstName + ' ' + this.genPersonEntity.lastName);
                                                    this.pqrMailS.send(this.statusDeletedId, variables).subscribe(resM => {
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
                                        this.alertS.open('Error al eliminar la PQRS!', 'error');
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
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('La PQRS tiene el estado: ' + status + ', no se puede eliminar!', 'warning');
        }
    }
    finish(pqrsId: number, number: string, type: string, ticket: number,status:string) {
        if(status==='Creada'){
            const dialogRef = this.dialog.open(FinishModal, {
                width: '800px',
                data: { typeModal: 'Rechazada', pqrsId: pqrsId, number: number, type: type, ticket: ticket, genPersonEntity: this.genPersonEntity }
            });
            dialogRef.afterClosed().subscribe(res => {
                if (res) {
                    this.search();
                }
            });
        }else{
            this.alertS.open('La PQRS tiene el estado: '+status+', no se puede rechazar!','warning');
        }        
    }
    detail(pqrsId: number) {
        this.dialog.open(DetailModal, {
            width: '100%',
            data: {pqrsId:pqrsId}
        });
    }
    tracing(number: string) {
        this.tracingList = [];
        this.loadingTracing = true;
        this.pqrTracingS.list(number).subscribe(res => {
            if (res.message === 'OK') {
                this.tracingList = res.object;
                this.loadingTracing = false;
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
