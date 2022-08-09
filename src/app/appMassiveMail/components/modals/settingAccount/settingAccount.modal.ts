import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { MasAccountService } from 'src/app/appMassiveMail/services/masAccount.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'settingAccount',
    templateUrl: 'settingAccount.modal.html',
    styleUrls: ['./settingAccount.modal.css']
})
export class SettingAccountModal implements OnInit {
    title:string;
    form=new FormGroup({
        id:new FormControl(''),
        mail:new FormControl('',Validators.required),
        name:new FormControl('',Validators.required),
        position:new FormControl('',Validators.required),
        provider:new FormControl('',Validators.required),
        port:new FormControl('',Validators.required),
        password:new FormControl('',Validators.required),
        creationUserId:new FormControl(''),
        active:new FormControl('')
    });
    providerName:string;
    person:GenPersonEntity;

    constructor(private masAccountS:MasAccountService,private alertS:AlertService,
        public dialogRef: MatDialogRef<SettingAccountModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title='';
        this.providerName='';
    }
    ngOnInit(): void {
        this.person=JSON.parse(localStorage.getItem('user'));
        if(this.data.masAccount!=null){
            this.title='Editar Cuenta';
            this.form.setValue({
                'id':this.data.masAccount.id,
                'mail':this.data.masAccount.mail,
                'name':this.data.masAccount.name,
                'position':this.data.masAccount.position,
                'provider':this.data.masAccount.provider,
                'port':this.data.masAccount.port,
                'password':this.data.masAccount.password,
                'creationUserId':this.data.masAccount.creationUserId,
                'active':this.data.masAccount.active
            });
            this.providerName=this.data.masAccount.provider+';'+this.data.masAccount.port;
        }else{
            this.title='Crear Cuenta';
        }
    }
    save(){
        if(this.data.masAccount===null){
            this.form.controls.creationUserId.setValue(this.person.id);
            this.masAccountS.create(this.form.value).subscribe(res=>{
                if(res.message==='OK'){
                    if(res.object!=0){
                        this.alertS.open('Cuenta creada!','success');
                        this.close(true);
                    }else{
                        this.alertS.open('Error al crear la cuenta!','error');
                    }
                }else{
                    this.alertS.open(res.message,'error');
                }
            },err=>{
                this.alertS.open(err.message,'error');
            });
        }else{
            this.masAccountS.update(this.form.value).subscribe(res=>{
                if(res.message==='OK'){
                    if(res.object!=0){
                        this.alertS.open('Cuenta actualizada!','success');
                        this.close(true);
                    }else{
                        this.alertS.open('Error al actualizar la cuenta!','error');
                    }
                }else{
                    this.alertS.open(res.message,'error');
                }
            },err=>{
                this.alertS.open(err.message,'error');
            });
        }
    }
    selectProvider(){
        this.form.controls.provider.setValue(this.providerName.split(';')[0]);
        this.form.controls.port.setValue(Number(this.providerName.split(';')[1]));
    }
    close(status:boolean): void {
        this.dialogRef.close(status);
    }
}