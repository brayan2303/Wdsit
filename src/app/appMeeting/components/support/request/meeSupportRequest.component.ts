import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AlertService } from "src/app/shared/services/alert.service";
import * as moment from 'moment';
import { MatDialog } from "@angular/material/dialog";
import { MeeSupportService } from "src/app/appMeeting/services/meeSupport.service";
import { SupportNewModal } from "src/app/appMeeting/modals/supportNew/supportNew.modal";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { MeeMeetingService } from "src/app/appMeeting/services/meeMeeting.service";
import { SupportFileModal } from "src/app/appMeeting/modals/supportFile/supportFile.modal";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { MeeGroupEntity } from "src/app/appMeeting/entities/meeGroup.entity";


@Component({
    selector: 'app-meeSupportRequest',
    templateUrl: './meeSupportRequest.component.html',
    styleUrls: ['./meeSupportRequest.component.css']
})
export class MeeSupportRequestComponent {
    loadingMeeting: boolean;
    loadingSupport: boolean;
    columnsMeeting: string[];
    columnsSupport: string[];
    dataSourceMeeting: MatTableDataSource<any>;
    dataSourceSupport: MatTableDataSource<any>;
    @ViewChild('paginatorMeeting') paginatorMeeting: MatPaginator;
    @ViewChild('paginatorSupport') paginatorSupport: MatPaginator;
    date1: string;
    date2: string;
    meetingId: number;
    person: GenPersonEntity;
    group: MeeGroupEntity

    constructor(private meeSupportS: MeeSupportService, private meeMeetingS: MeeMeetingService, private alertS: AlertService, private dialog: MatDialog) {
        this.loadingMeeting = false;
        this.loadingSupport = false;
        this.columnsMeeting = ['name', 'periodicity', 'creationDate', 'creationUser', 'actions'];
        this.columnsSupport = ['support', 'status', 'creationDate', 'startDate', 'endDate', 'responsibleUser', 'actions'];
        this.dataSourceMeeting = new MatTableDataSource([]);
        this.dataSourceSupport = new MatTableDataSource([]);
        this.date1 = '';
        this.date2 = '';
        this.meetingId = 0;
        this.person = new GenPersonEntity();
        this.group = new MeeGroupEntity();
    }

    search() {
        this.meetingId = 0;
        this.loadingMeeting = true;
        this.meeMeetingS.list(this.date1 != '' && this.date1 != null ? moment(this.date1).format('YYYY-MM-DD') : '0', this.date2 != '' && this.date2 != null ? moment(this.date2).format('YYYY-MM-DD') : '0', this.person.id).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSourceMeeting = new MatTableDataSource(res.object);
                this.dataSourceMeeting.paginator = this.paginatorMeeting;
                this.loadingMeeting = false;
            } else {
                this.alertS.open(res.message, 'error');
                this.loadingMeeting = false;
            }
        }, err => {
            this.alertS.open(err.message, 'error');
            this.loadingMeeting = false;
        });
    }
    getSupport(meetingId: number) {
        this.meetingId = meetingId;
        this.loadingSupport = true;
        this.meeSupportS.listByCreationUserId(meetingId, Number(JSON.parse(localStorage.getItem('user'))['id'])).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSourceSupport = new MatTableDataSource(res.object);
                this.dataSourceSupport.paginator = this.paginatorSupport;
                this.loadingSupport = false;
            } else {
                this.alertS.open(res.message, 'error');
                this.loadingSupport = false;
            }
        }, err => {
            this.alertS.open(err.message, 'error');
            this.loadingSupport = false;
        });
    }
    create() {
        this.dialog.open(SupportNewModal, {
            data: { support: null ,meetingId:this.meetingId},
            width: '100%'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.getSupport(this.meetingId);
            }
        });
    }
    delete(supportId: number, status: string) {
        if (status === 'Pendiente') {
            this.dialog.open(ConfirmationComponent, {
                data: { message: '¿Esta seguro de eliminar el apoyo?' },
                width: '400px',
                height: '250px'
            }).afterClosed().subscribe(resA => {
                this.meeSupportS.delete(supportId).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Apoyo eliminado!', 'success');
                            this.getSupport(this.meetingId);
                        } else {
                            this.alertS.open('Error al eliminar el apoyo!', 'error');
                        }
                    } else {
                        this.alertS.open(res.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            });
        } else {
            this.alertS.open('El apoyo esta terminado, no se puede eliminar!', 'warning');
        }
    }
    getFiles(meetingId:number,supportId:number){
        this.dialog.open(SupportFileModal,{
            data:{meetingId:meetingId,supportId:supportId},
            width:'100%'
        });
    }
}