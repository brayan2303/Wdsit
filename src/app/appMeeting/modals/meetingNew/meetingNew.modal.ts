import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MeeMeetingService } from '../../services/meeMeeting.service';
import * as moment from 'moment'; 
import { MeeGroupEntity } from '../../entities/meeGroup.entity';
import { MeeGroupService } from '../../services/meeGroup.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';

@Component({
    selector: 'meetingNew',
    templateUrl: 'meetingNew.modal.html',
    styleUrls: ['./meetingNew.modal.css']
})
export class MeetingNewModal implements OnInit {
    title:string;
    form=new FormGroup({
        id:new FormControl(''),
        name:new FormControl('',Validators.required),
        periodicity:new FormControl('',Validators.required),
        startHour:new FormControl(''),
        endHour:new FormControl(''),
        creationDate:new FormControl('',Validators.required),
        creationUserId:new FormControl(''),
        groupId:new FormControl('',Validators.required)
    });
    startHour:number;
    endHour:number;
    startMinute:number;
    endMinute:number;
    groupList:MeeGroupEntity[];
    person: GenPersonEntity
    constructor(private meeMeetingS:MeeMeetingService,private meeGruopS:MeeGroupService,private alertS:AlertService,public dialogRef: MatDialogRef<MeetingNewModal>,@Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title='';
        this.startHour=0;
        this.endHour=0;
        this.startMinute=0;
        this.endMinute=0;
        this.person = new GenPersonEntity;
    }
    ngOnInit(): void {
        this.meeMeetingS.listByUser(JSON.parse(localStorage.getItem("user"))["id"]).subscribe(res=>{
            if(res.message==='OK'){
                this.groupList=res.object;
            
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
        if(this.data.meeting!=null){
            this.form.setValue({
                'id':this.data.meeting.id,
                'name':this.data.meeting.name,
                'periodicity':this.data.meeting.periodicity,
                'startHour':this.data.meeting.startHour.split(':',2)[0],
                'endHour':this.data.meeting.endHour.split(':',2)[0],
                'creationDate':this.data.meeting.creationDate,
                'groupId':this.data.meeting.groupId,
                'creationUserId':this.data.meeting.creationUserId
            });
            this.startHour=this.data.meeting.startHour.split(':',2)[0],
            this.endHour=this.data.meeting.endHour.split(':',2)[0],
            this.startMinute=this.data.meeting.startHour.split(':',2)[1],
            this.endMinute=this.data.meeting.endHour.split(':',2)[1],
            this.title='Editar Reunión';
        }else{
            this.title='Nueva Reunión';
        }
    }
    save(){
        this.form.controls.creationDate.setValue(moment(this.form.controls.creationDate.value).format('YYYY-MM-DD'));
        this.form.controls.startHour.setValue((this.startHour>=0&&this.startHour<10?'0'+this.startHour:this.startHour)+':'+(this.startMinute>=0&&this.startMinute<10?'0'+this.startMinute:this.startMinute));
        this.form.controls.endHour.setValue((this.endHour>=0&&this.endHour<10?'0'+this.endHour:this.endHour)+':'+(this.endMinute>=0&&this.endMinute<10?'0'+this.endMinute:this.endMinute));
        if(this.data.meeting===null){
            this.form.controls.creationUserId.setValue(Number(JSON.parse(localStorage.getItem('user'))['id']));
            this.meeMeetingS.create(this.form.value).subscribe(res=>{
                console.log(res.object);
                if(res.message==='OK'){
                    if(res.object!=0){
                        this.alertS.open('Reunión creada!','success');
                        this.close(true);
                    }else{
                        this.alertS.open('Error al crear la reunión!','error');
                    }
                }else{
                    this.alertS.open(res.message,'error');
                }
            },err=>{
                this.alertS.open(err.message,'error');
            });
        }else{
            this.meeMeetingS.update(this.form.value).subscribe(res=>{
                if(res.message==='OK'){
                    if(res.object!=0){
                        this.alertS.open('Reunión actualizada!','success');
                        this.close(true);
                    }else{
                        this.alertS.open('Error al actualizar la reunión!','error');
                    }
                }else{
                    this.alertS.open(res.message,'error');
                }
            },err=>{
                this.alertS.open(err.message,'error');
            });
        }
    }
    close(status:boolean): void {
        this.dialogRef.close(status);
    }
}