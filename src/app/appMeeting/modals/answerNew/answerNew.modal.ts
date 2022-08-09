import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MeeAnswerEntity } from '../../entities/meeAnswer.entity';
import { MeeAnswerService } from '../../services/meeAnswer.service';
import { MeeTopicEntity } from '../../entities/meeTopic.entity';
import { MatTableDataSource } from '@angular/material/table';
import { SupportNewModal } from '../supportNew/supportNew.modal';
import { MeeSupportService } from '../../services/meeSupport.service';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { SupportFileModal } from '../supportFile/supportFile.modal';
import { MeeSupportEntity } from '../../entities/meeSupport.entity';
import { MeeTopicService } from '../../services/meeTopic.service';
import { MeeTopicAnswerModel } from '../../models/meeTopicAnswer.model';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import * as moment from 'moment'; 

@Component({
    selector: 'answerNew',
    templateUrl: 'answerNew.modal.html',
    styleUrls: ['./answerNew.modal.css']
})
export class AnswerNewModal implements OnInit {
    topicList: MeeTopicAnswerModel[];
    answers: MeeAnswerEntity[];
    loading: boolean;
    columns: string[];
    dataSource: MatTableDataSource<any>;
    @ViewChild('paginator') paginator: MatPaginator;
    user: GenPersonEntity;
    answerDate: string;

    constructor(private meeTopicS: MeeTopicService, private meeAnswerS: MeeAnswerService, private meeSupportS: MeeSupportService, private alertS: AlertService, private dialog: MatDialog, public dialogRef: MatDialogRef<AnswerNewModal>, @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.topicList = [];
        this.answers = [];
        this.loading = false;
        this.columns = ['support', 'status', 'startDate', 'endDate', 'responsibleUser', 'actions'];
        this.dataSource = new MatTableDataSource([]);
        this.answerDate = '';
    }
    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user'));
        if (this.data.meetingType === 'Diaria') {
            this.search();
        }
    }
    search() {
        this.dataSource = new MatTableDataSource([]);
        this.topicList=[];
        var isOk: boolean = true;
        if (this.data.meetingType === 'Semanal' && this.answerDate === '') {
            isOk = false;
        }
        if (isOk) {
            this.meeTopicS.list(this.data.meetingType).subscribe(resL => {
                if (resL.message === 'OK') {
                    var topics: MeeTopicEntity[] = resL.object;
                    this.meeAnswerS.listByUserId(this.data.meetingId, this.data.meetingType, this.data.meetingType==='Diaria'?'0':moment(this.answerDate).format('YYYY-MM-DD'), this.data.userId === null ? this.user.id : this.data.userId).subscribe(res => {
                        if (res.message === 'OK') {
                            this.answers = res.object;
                            for (let i = 0; i < topics.length; i++) {
                                var topicAnswer = new MeeTopicAnswerModel();
                                topicAnswer.id = topics[i].id;
                                topicAnswer.title = topics[i].title;
                                topicAnswer.detail = topics[i].detail;
                                topicAnswer.description = topics[i].description;
                                topicAnswer.type = topics[i].type;
                                for (let j = 0; j < this.answers.length; j++) {
                                    if (topics[i].id === this.answers[j].topicId) {
                                        topicAnswer.answer = this.answers[j].answer;
                                    }
                                }
                                this.topicList.push(topicAnswer);
                            }
                        } else {
                            this.alertS.open(res.message, 'error');
                        }
                    }, err => {
                        this.alertS.open(err.message, 'error');
                    });
                } else {
                    this.alertS.open(resL.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
            this.getSupport();
        } else {
            this.alertS.open('Seleccione una fecha!', 'warning');
        }
    }
    getSupport() {
        this.loading = true;
        this.meeSupportS.listByCreationUserId(this.data.meetingId, this.data.userId === null ? this.user.id : this.data.userId).subscribe(res => {
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
    save() {
        var array: MeeAnswerEntity[] = [];
        var isOk: boolean = true;
        for (let i = 0; i < this.topicList.length; i++) {
            if ((this.topicList[i].title != 'Ronda 4' && this.topicList[i].type === 'Diaria') || (this.topicList[i].title != 'Ronda 3' && this.topicList[i].type === 'Semanal')) {
                if ((document.getElementById(String(this.topicList[i].id)) as HTMLTextAreaElement).value != '') {
                    var meeAnswer = new MeeAnswerEntity();
                    meeAnswer.meetingId = this.data.meetingId;
                    meeAnswer.topicId = this.topicList[i].id;
                    meeAnswer.answer = (document.getElementById(String(this.topicList[i].id)) as HTMLTextAreaElement).value;
                    meeAnswer.answerUserId = Number(JSON.parse(localStorage.getItem('user'))['id']);
                    array.push(meeAnswer);
                } else {
                    this.alertS.open('Debes diligenciar todos los campos!', 'warning');
                    isOk = false;
                    break;
                }
            }
        }
        if (isOk) {
            this.meeAnswerS.create(array).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Formulario Enviado!', 'success');
                        this.close();
                    } else {
                        this.alertS.open('Error al guardar las respuestas!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        }
    }
    requestSupport(support: MeeSupportEntity) {
        this.dialog.open(SupportNewModal, {
            data: { support: support, meetingId: this.data.meetingId },
            width: '100%'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.getSupport();
            }
        });
    }
    deleteSupport(supportId: number) {
        this.dialog.open(ConfirmationComponent, {
            data: { message: '¿Esta seguro de eliminar el apoyo?' },
            width: '400px',
            height: '250px'
        }).afterClosed().subscribe(resA => {
            if (resA) {
                this.meeSupportS.delete(supportId).subscribe(res => {
                    if (res.message === 'OK') {
                        if (res.object != 0) {
                            this.alertS.open('Apoyo eliminado!', 'success');
                            this.getSupport();
                        } else {
                            this.alertS.open('Error al eliminar el apoyo!', 'error');
                        }
                    } else {
                        this.alertS.open(res.message, 'error');
                    }
                }, err => {
                    this.alertS.open(err.message, 'error');
                });
            }
        });
    }
    getFiles(supportId: number) {
        this.dialog.open(SupportFileModal, {
            data: { meetingId: this.data.meetingId, supportId: supportId },
            width: '100%'
        });
    }
    close(): void {
        this.dialogRef.close();
    }
}