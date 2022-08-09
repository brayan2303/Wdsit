import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { WlsServerService } from "../../services/wlsServer.service";

@Component({
    selector: 'settingServer',
    templateUrl: 'settingServer.modal.html',
    styleUrls: ['./settingServer.modal.css']
})
export class SettingServerModal {
    title:string;
    form = new FormGroup({
        id: new FormControl(''),
        ip: new FormControl('', Validators.required),
        port: new FormControl('', Validators.required),
        userName: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        sgdb: new FormControl('', Validators.required),
        active: new FormControl('')
    });

    constructor(private wlsServerS:WlsServerService, private alertS: AlertService,
        public dialogRef: MatDialogRef<SettingServerModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title='';
    }
    ngOnInit(): void {
        if (this.data.serverEntity != null) {
            this.title="Editar Servidor";
            this.form.setValue(
                {
                    'id': this.data.serverEntity.id,
                    'ip':this.data.serverEntity.ip,
                    'port':this.data.serverEntity.port,
                    'userName': this.data.serverEntity.userName,
                    'password': this.data.serverEntity.password,
                    'type':this.data.serverEntity.type,
                    'sgdb':this.data.serverEntity.sgdb,
                    'active': this.data.serverEntity.active
                }
            );
        }else{
            this.title="Crear Servidor";
        }
    }
    save(){
        if(this.data.serverEntity===null){
            this.wlsServerS.create(this.form.value).subscribe(res=>{
                if(res.message==='OK'){
                    if(res.object!=0){
                        this.alertS.open('Servidor creado!','success');
                        this.close(true);
                    }else{
                        this.alertS.open('Error al guardar el servidor!','error');
                    }
                }else{
                    this.alertS.open(res.message,'error');
                }
            });
        }else{
            this.wlsServerS.update(this.form.value).subscribe(res=>{
                if(res.message==='OK'){
                    if(res.object!=0){
                        this.alertS.open('Servidor actualizado!','success');
                        this.close(true);
                    }else{
                        this.alertS.open('Error al actualizar el servidor!','error');
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