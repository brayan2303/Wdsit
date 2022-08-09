import { Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MeeMeetingService } from "src/app/appMeeting/services/meeMeeting.service";
import { AlertService } from "src/app/shared/services/alert.service";
import * as moment from 'moment';
import { MatDialog } from "@angular/material/dialog";
import { AnswerNewModal } from "src/app/appMeeting/modals/answerNew/answerNew.modal";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { MeeGroupEntity } from "src/app/appMeeting/entities/meeGroup.entity";

@Component({
    selector: 'app-meeAnswerFillOut',
    templateUrl: './meeAnswerFillOut.component.html',
    styleUrls: ['./meeAnswerFillOut.component.css']
})
export class MeeAnswerFillOutComponent {
    loading: boolean;
    columns: string[];
    dataSource: MatTableDataSource<any>;
    @ViewChild('paginator') paginator: MatPaginator;
    date1: string;
    date2: string;
    id: number;
    person: GenPersonEntity;
    group: MeeGroupEntity;

    constructor(private meeMeetingS: MeeMeetingService, private alertS: AlertService, private dialog: MatDialog) {
        this.loading = false;
        this.columns = ['name', 'creationDate', 'creationUser','nameGroup' ,'actions'];
        this.dataSource = new MatTableDataSource([]);
        this.date1 = '';
        this.date2 = '';
        this.id = 0;
        this.person = new GenPersonEntity();
        this.group = new MeeGroupEntity();
    }

    search() {
        this.person = JSON.parse(localStorage.getItem('user'));
        this.id = 0;
        this.loading = true;
        this.meeMeetingS.list(this.date1 != '' && this.date1 != null ? moment(this.date1).format('YYYY-MM-DD') : '0', this.date2 != '' && this.date2 != null ?
         moment(this.date2).format('YYYY-MM-DD') : '0', this.person.id).subscribe(res => {
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
    fillOut(meetingId:number,name:string,periodicity:string) {
        this.dialog.open(AnswerNewModal, {
            data: { meetingId: meetingId,meetingName:name,meetingType:periodicity,userId:null},
            width: '100%'
        })
        
    }
}