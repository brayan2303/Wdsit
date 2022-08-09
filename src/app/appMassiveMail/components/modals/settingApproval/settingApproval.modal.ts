import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasMailEntity } from 'src/app/appMassiveMail/entities/masMail.entity';
import { MasApprovalService } from 'src/app/appMassiveMail/services/masApproval.service';
import { MasMailService } from 'src/app/appMassiveMail/services/masMail.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ApprovalUserModal } from '../approvalUser/approvalUser.modal';

@Component({
    selector: 'settingApproval',
    templateUrl: 'settingApproval.modal.html',
    styleUrls: ['./settingApproval.modal.css']
})
export class SettingApprovalModal implements OnInit {
    title:string;
    form=new FormGroup({
        id:new FormControl(''),
        mailId:new FormControl('',Validators.required),
        approvalUserId:new FormControl(''),
        approvalUser:new FormControl(''),
        active:new FormControl('')
    });
    mailList:MasMailEntity[];

    constructor(private masApprovalS:MasApprovalService,private masMailS:MasMailService,private alertS:AlertService,private dialog:MatDialog,
        public dialogRef: MatDialogRef<SettingApprovalModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title='';
        this.mailList=[];
    }
    ngOnInit(): void {
        this.masMailS.list().subscribe(res=>{
            if(res.message==='OK'){
                this.mailList=res.object;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
        if(this.data.masApproval!=null){
            this.title='Editar Aprobacion';
            this.form.setValue({
                'id':this.data.masApproval.id,
                'mailId':this.data.masApproval.mailId,
                'approvalUserId':this.data.masApproval.approvalUserId,
                'approvalUser':this.data.masApproval.approvalUser,
                'active':this.data.masApproval.active
            });
        }else{
            this.title='Crear Aprobacion';
        }
    }
    getUser(){
        this.dialog.open(ApprovalUserModal,{
            width:'100%'
        }).afterClosed().subscribe(resA=>{
            if(resA){
                this.form.controls.approvalUserId.setValue(resA['id']);
                this.form.controls.approvalUser.setValue(resA['firstName']+' '+resA['lastName']);
            }
        });
    }
    save(){
        if(this.data.masApproval===null){
            this.masApprovalS.create(this.form.value).subscribe(res=>{
                if(res.message==='OK'){
                    if(res.object!=0){
                        this.alertS.open('Aprobacion creada!','success');
                        this.close(true);
                    }else{
                        this.alertS.open('Error al crear la aprobacion!','error');
                    }
                }else{
                    this.alertS.open(res.message,'error');
                }
            },err=>{
                this.alertS.open(err.message,'error');
            });
        }else{
            this.masApprovalS.update(this.form.value).subscribe(res=>{
                if(res.message==='OK'){
                    if(res.object!=0){
                        this.alertS.open('Aprobacion actualizada!','success');
                        this.close(true);
                    }else{
                        this.alertS.open('Error al actualizar la aprobacion!','error');
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