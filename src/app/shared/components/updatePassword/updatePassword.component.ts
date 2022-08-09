import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { GenPersonService } from "src/app/appGeneral/services/genPerson.service";
import { AlertService } from "../../services/alert.service";
import { createPasswordStrengthValidator } from "./validatePassword";

@Component({
    selector: 'updatePassword',
    templateUrl: './updatePassword.component.html',
    styleUrls: ['./updatePassword.component.css']
})
export class UpdatePasswordComponent implements OnInit {
    personEntity: GenPersonEntity;
    form: FormGroup;
    constructor(private fb: FormBuilder, private genPersonS: GenPersonService, private alerts: AlertService, public dialogRef: MatDialogRef<UpdatePasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
    }

    ngOnInit(): void {
        this.formBuilders();
    }
    formBuilders() {
        this.form = this.fb.group({
            currentPassword: ['', Validators.required],
            newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), createPasswordStrengthValidator()]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(16), createPasswordStrengthValidator()]]
        })
    }
    save() {
        this.personEntity = JSON.parse(localStorage.getItem('user'));
        if (this.form.value.newPassword === this.form.value.confirmPassword) {
            this.genPersonS.updatePassword(this.personEntity.id, this.form.value.newPassword, this.form.value.currentPassword).subscribe(res => {
                if (res.message === 'OK') {
                    this.alerts.open('Cambio de contraseña correcto!', 'success');
                    this.close();
                } else {
                    this.alerts.open(res.message, 'error');
                }
            }, err => {
                this.alerts.open(err.message, 'error');
            });
        } else {
            this.alerts.open('Las contraseñas no son iguales!', 'warning');
        }
    }
    close() {
        this.dialogRef.close();
    }

}