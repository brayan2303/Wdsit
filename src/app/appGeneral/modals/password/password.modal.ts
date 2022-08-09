import { CovFormService } from 'src/app/appCovid/services/covForm.services';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ConnectionPasswordService } from '../../services/genDataBasesPassword.service';
import { ConnectionGeneralLogModel } from '../../models/GenDataBases.model';
import { Router } from '@angular/router';


@Component({
    selector: 'modal-password',
    templateUrl: './password.modal.html',
    styleUrls: ['./password.modal.css']
})
export class PasswordModal implements OnInit {
    view:boolean;
    passwords: string;
    ConnectionGeneralLogModel: any;
    hide = true;
    ConnectionGeneralLogM:ConnectionGeneralLogModel;
    validation: string;

    constructor(private alertS: AlertService,  private route: Router, private ConnectionPasswordS: ConnectionPasswordService,
        public dialogRef: MatDialogRef<PasswordModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.passwords = '';
        dialogRef.disableClose = true;
        this.ConnectionGeneralLogM = new ConnectionGeneralLogModel();
        this.validation = '';
    }
    ngOnInit(): void { }
    close(): void {
        this.dialogRef.close(this.ConnectionGeneralLogM);
    }
    search() {
        this.ConnectionPasswordS.password(this.passwords).subscribe(res => {
            if (res.message === 'OK') {
                this.ConnectionGeneralLogM = res.object;
                
                if(this.ConnectionGeneralLogM.validation == 'OK'){
                    this.close();
                    this.ConnectionGeneralLogModel = res.object;
                }else{
                    this.alertS.open('Contraseña incorrecta','warning');
                }              
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }

     mostrarContrasena(){
        var tipo = document.getElementById("password")  as unknown as HTMLInputElement;
        if(tipo.type == "password"){
            tipo.type = "text";
            this.view = false;
        }else{
            tipo.type = "password";
            this.view = true;
        }
    }

    closehome(): void {
        this.dialogRef.close();
    }
}