import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { MasAccountEntity } from 'src/app/appMassiveMail/entities/masAccount.entity';
import { MasAccountService } from 'src/app/appMassiveMail/services/masAccount.service';
import { MasMailService } from 'src/app/appMassiveMail/services/masMail.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'masMailNew',
    templateUrl: 'masMailNew.component.html',
    styleUrls: ['./masMailNew.component.css']
})
export class MasMailNewComponent implements OnInit {
    title:string;
    form=new FormGroup({
        id:new FormControl(''),
        subject:new FormControl('',Validators.required),
        message:new FormControl('',Validators.required),
        accountId:new FormControl('',Validators.required),
        creationUserId:new FormControl('')
    });
    person:GenPersonEntity;
    accountList:MasAccountEntity[];
    config: AngularEditorConfig;

    constructor(private masMailS:MasMailService,private masAccountS:MasAccountService,private alertS:AlertService,
        public dialogRef: MatDialogRef<MasMailNewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title='';
        this.accountList=[];
    }
    ngOnInit(): void {
        this.config ={
            editable: true,
            spellcheck: true,
            height: 'auto',
            minHeight: 'auto',
            maxHeight: 'auto',
            width: 'auto',
            minWidth: '0',
            translate: 'yes',
            enableToolbar: true,
            showToolbar: true,
            placeholder: 'Ingrese el mensage',
            defaultParagraphSeparator: '',
            defaultFontName: '',
            defaultFontSize: '',
            fonts: [
                { class: 'arial', name: 'Arial' },
                { class: 'times-new-roman', name: 'Times New Roman' },
                { class: 'calibri', name: 'Calibri' },
                { class: 'comic-sans-ms', name: 'Comic Sans MS' },
                { class: 'Roboto', name: 'Roboto' }
            ],
            sanitize: true,
            toolbarPosition: 'top',
        };
        this.person=JSON.parse(localStorage.getItem('user'));
        this.masAccountS.listActive().subscribe(res=>{
            if(res.message==='OK'){
                this.accountList=res.object;
            }else{
                this.alertS.open(res.message,'error');
            }
        },err=>{
            this.alertS.open(err.message,'error');
        });
        if(this.data.masMail!=null){
            this.title='Editar Correo';
            this.form.setValue({
                'id':this.data.masMail.id,
                'subject':this.data.masMail.subject,
                'message':this.data.masMail.message,
                'accountId':this.data.masMail.accountId,
                'creationUserId':this.data.masMail.creationUserId
            });
        }else{
            this.title='Crear Correo';
        }
    }
    save(){
        this.form.controls.creationUserId.setValue(this.person.id);
        if(this.data.masMail===null){
            this.masMailS.create(this.form.value).subscribe(res=>{
                if(res.message==='OK'){
                    if(res.object!=0){
                        this.alertS.open('Correo creado!','success');
                        this.close(true);
                    }else{
                        this.alertS.open('Error al crear el correo!','error');
                    }
                }else{
                    this.alertS.open(res.message,'error');
                }
            },err=>{
                this.alertS.open(err.message,'error');
            });
        }else{
            this.masMailS.update(this.form.value).subscribe(res=>{
                if(res.message==='OK'){
                    if(res.object!=0){
                        this.alertS.open('Correo actualizado!','success');
                        this.close(true);
                    }else{
                        this.alertS.open('Error al actualizar el correo!','error');
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