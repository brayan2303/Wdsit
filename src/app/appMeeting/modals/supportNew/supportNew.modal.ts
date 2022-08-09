import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MeeSupportService } from '../../services/meeSupport.service';
import * as moment from 'moment'; 
import { MeeGroupService } from '../../services/meeGroup.service';
import { MeeGroupEntity } from '../../entities/meeGroup.entity';
import { MeeGroupListPersonModel } from '../../models/meeGroupListPerson.model';
import { MeeMeetingService } from '../../services/meeMeeting.service';

@Component({
    selector: 'supportNew',
    templateUrl: 'supportNew.modal.html',
    styleUrls: ['./supportNew.modal.css']
})
export class SupportNewModal implements OnInit {
    title:string;
    form=new FormGroup({
        id:new FormControl(''),
        meetingId:new FormControl(''),
        status:new FormControl(''),
        support:new FormControl('',Validators.required),
        startDate:new FormControl(''),
        endDate:new FormControl(''),
        responsibleUserId:new FormControl('',Validators.required),
        creationUserId:new FormControl(''), 
        answerFinish: new FormControl('')
    });
    userList:MeeGroupListPersonModel[];
    groupId:number;
    groupList:MeeGroupEntity[];
    personId: number;
    person: GenPersonEntity

    constructor(private meeSupportS:MeeSupportService,private meeMeetingS:MeeMeetingService, private groupS:MeeGroupService,private alertS:AlertService,public dialogRef: MatDialogRef<SupportNewModal>,@Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title='';
        this.userList=[];
        this.groupList=[];
        this.groupId=0;
        this.personId=0;
        this.person = new GenPersonEntity();
    }
    ngOnInit(): void {
        
        this.meeMeetingS.listByUser(JSON.parse(localStorage.getItem("user"))["id"]).subscribe(res=>{
            if(res.message==='OK'){
                this.groupList=res.object;
                console.log(this.groupList)
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
        
        if(this.data.support!=null){
            this.form.setValue({
                'id':this.data.support.id,
                'meetingId':this.data.support.meetingId,
                'status':this.data.support.status,
                'support':this.data.support.support,
                'startDate':this.data.support.startDate,
                'endDate':this.data.support.endDate,
                'responsibleUserId':this.data.support.responsibleUserId,
                'creationUserId':this.data.support.creationUserId,
                'answerFinish': this.data.support.answerFinish,
            });
            this.title='Editar Apoyo';
        }else{
            this.title='Nuevo Apoyo';
        }
    }
    save(){
        this.form.controls.meetingId.setValue(this.data.meetingId);
        this.form.controls.startDate.setValue(this.form.controls.startDate.value!=''&&this.form.controls.startDate.value!=null?moment(this.form.controls.startDate.value).format('YYYY-MM-DD'):null);
        this.form.controls.endDate.setValue(this.form.controls.endDate.value!=''&&this.form.controls.endDate.value!=null?moment(this.form.controls.endDate.value).format('YYYY-MM-DD'):null);
        this.form.controls.creationUserId.setValue(Number(JSON.parse(localStorage.getItem('user'))['id']));
        if(this.data.support===null){
            this.form.controls.meetingId.setValue(this.data.meetingId);
            this.meeSupportS.create(this.form.value).subscribe(res=>{
                if(res.message==='OK'){
                    if(res.object!=0){
                        this.alertS.open('Apoyo creado!','success');
                        this.meeSupportS.sendEmail(res.object,this.form.controls.creationUserId.value,this.form.controls.responsibleUserId.value).subscribe(resS=>{
                            if(resS.message==='OK'){
                                if(resS.object===0){
                                    this.alertS.open('Error al enviar el correo de notificacion!','error');
                                }
                            }else{
                                this.alertS.open(resS.message,'error');
                            }
                        },err=>{
                            this.alertS.open(err.message,'error');
                        });
                        this.close(true);
                    }else{
                        this.alertS.open('Error al crear el apoyo!','error');
                    }
                }else{
                    this.alertS.open(res.message,'error');
                }
            },err=>{
                this.alertS.open(err.message,'error');
            });
        }else{
            this.meeSupportS.update(this.form.value).subscribe(res=>{
                if(res.message==='OK'){
                    if(res.object!=0){
                        this.alertS.open('Apoyo actualizado!','success');
                        this.close(true);
                        if(this.data.status = 'Terminado'){
                         this.meeSupportS.sendEmailStatus(this.data.support.id,this.form.controls.creationUserId.value,this.form.controls.responsibleUserId.value, this.form.controls.status.value).subscribe(res=>{
                                if(res.message === 'OK'){
                                 if(res.object ===0){
                                      this.alertS.open('Error al enviar el correo de notificacion!','error');   
                                    }
                              }else{
                                 this.alertS.open(res.message, 'error');
                              }
                        },err=>{
                               this.alertS.open(err.message, 'error');
                           }
                            )
                        }else{
                            this.alertS.open('estado no encontrado','error')
                        }
                    }else{
                        this.alertS.open('Error al actualizar el apoyo!','error');
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

    getGroup(groupId:number){
        
        this.meeMeetingS.listGroup(groupId,JSON.parse(localStorage.getItem("user"))["id"]).subscribe(res => {
          if (res.message === 'OK') {
              this.userList = res.object;
          } else {
              this.alertS.open(res.message, 'error');
          }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
      }
    
}