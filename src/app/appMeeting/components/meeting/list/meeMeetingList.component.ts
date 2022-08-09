import { ViewChild } from "@angular/core";
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MeeMeetingEntity } from "src/app/appMeeting/entities/meeMeeting.entity";
import { MeetingNewModal } from "src/app/appMeeting/modals/meetingNew/meetingNew.modal";
import * as moment from 'moment';
import { AlertService } from "src/app/shared/services/alert.service";
import { MeeMeetingService } from "src/app/appMeeting/services/meeMeeting.service";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { MeeSupportService } from "src/app/appMeeting/services/meeSupport.service";
import { SupportFileModal } from "src/app/appMeeting/modals/supportFile/supportFile.modal";
import { MeeAnswerService } from "src/app/appMeeting/services/meeAnswer.service";
import { AnswerNewModal } from "src/app/appMeeting/modals/answerNew/answerNew.modal";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { MeeGroupEntity } from "src/app/appMeeting/entities/meeGroup.entity";

@Component({
    selector: 'app-meeMeetingList',
    templateUrl: './meeMeetingList.component.html',
    styleUrls: ['./meeMeetingList.component.css']
})
export class MeeMeetingListComponent {
    loading: boolean;
    loadingResponse: boolean;
    loadingSupport: boolean;
    columns: string[];
    columnsResponse: string[];
    columnsSupport:string[];
    dataSource: MatTableDataSource<any>;
    @ViewChild('paginator') paginator: MatPaginator;
    dataResponse: MatTableDataSource<any>;
    @ViewChild('paginatorResponse') paginatorResponse: MatPaginator;
    dataSupport: MatTableDataSource<any>;
    @ViewChild('paginatorSupport') paginatorSupport: MatPaginator;
    date1: string;
    date2: string;
    id: number;
    meetingName:string;
    type:string;
    person: GenPersonEntity;
    group:MeeGroupEntity;
    constructor(private meeSupportS:MeeSupportService, private meeMeetingS: MeeMeetingService,private meeAnswerS:MeeAnswerService, private dialog: MatDialog, private alertS: AlertService) {
        this.loading = false;
        this.loadingResponse = false;
        this.loadingSupport = false;
        this.columns = ['name','periodicity','startHour','endHour', 'creationDate', 'creationUser','nameGroup' ,'actions'];
        this.columnsResponse = ['identification','firstName', 'lastName','userName', 'actions'];
        this.columnsSupport=['support','status','creationDate','startDate','endDate','creationUser','responsibleUser','actions'];
        this.dataSource = new MatTableDataSource([]);
        this.dataResponse = new MatTableDataSource([]);
        this.dataSupport=new MatTableDataSource([]);
        this.date1 = '';
        this.date2 = '';
        this.id = 0;
        this.person = new GenPersonEntity;
        this.group = new MeeGroupEntity();
    }
    create(meeting: MeeMeetingEntity) {
        this.dialog.open(MeetingNewModal, {
            data: { meeting: meeting },
            width: '100%'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.search();
            }
        })
    }
    delete(id: number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿Desea eliminar la reunión?' },
            height: '250px',
            width: '400px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.meeMeetingS.delete(id).subscribe(resD => {
                    if (resD.message === 'OK') {
                        if (resD.object != 0) {
                            this.alertS.open('Reunión eliminada!', 'success');
                            this.search();
                        } else {
                            this.alertS.open('Error el al eliminar la reunión!', 'error');
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
    search() {
        this.person = JSON.parse(localStorage.getItem('user'));
        this.id=0;
        this.loading = true;
        this.meeMeetingS.list(this.date1 != '' && this.date1 != null ? moment(this.date1).format('YYYY-MM-DD') : '0', this.date2 != '' && this.date2 != null ? moment(this.date2).format('YYYY-MM-DD') : '0', this.person.id).subscribe(res => {
            if (res.message === 'OK') {
                this.dataSource = new MatTableDataSource(res.object);
                this.dataSource.paginator = this.paginator;
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
    getInformation(id:number,meetingName:string,type:string){
        this.id=id;
        this.meetingName=meetingName;
        this.type=type;
        this.getSupport(id);
        this.getResponse(id);
    }
    getSupport(id:number){
        this.loadingSupport=true;
        this.meeSupportS.list(id).subscribe(res=>{
            if(res.message==='OK'){
                this.dataSupport=new MatTableDataSource(res.object);
                this.dataSupport.paginator=this.paginatorSupport;
                this.loadingSupport=false;
            }else{
                this.alertS.open(res.message,'error');
                this.loadingSupport=false;
            }
        },err=>{
            this.alertS.open(err.message,'error');
            this.loadingSupport=false;
        });
    }
    getResponse(id:number){
        this.loadingResponse=true;
        this.meeAnswerS.list(id).subscribe(res=>{
            if(res.message==='OK'){
                this.dataResponse=new MatTableDataSource(res.object);
                this.dataResponse.paginator=this.paginatorResponse;
                this.loadingResponse=false;
            }else{
                this.alertS.open(res.message,'error');
                this.loadingResponse=false;
            }
        },err=>{
            this.alertS.open(err.message,'error');
            this.loadingResponse=false;
        });
    }
    getFiles(meetingId:number,supportId:number){
        this.dialog.open(SupportFileModal,{
            data:{meetingId:meetingId,supportId:supportId},
            width:'100%'
        });
    }
    fillOut(userId:number) {
        this.dialog.open(AnswerNewModal, {
            data: { meetingId: this.id,meetingName:this.meetingName,meetingType:this.type,userId:userId},
            width: '100%'
        }).afterClosed().subscribe(resA => {
            if (resA) {

            }
        });
    }
}