import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PriPrinterService } from "../../services/priPrinter.service";
import { GenPersonService } from "src/app/appGeneral/services/genPerson.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { PriLabelService } from "../../services/priLabel.service";

@Component({
    selector: 'administrationPermission',
    templateUrl: 'administrationPermission.modal.html',
    styleUrls: ['./administrationPermission.modal.css']
})
export class AdministrationPermissionModal {
    title: string;
    userId: number;
    form = new FormGroup({
        userId: new FormControl('',)
    });
    personList: GenPersonEntity[];

    constructor(private priLabelS: PriLabelService, private genPersonS: GenPersonService,private alertS: AlertService,
        public dialogRef: MatDialogRef<AdministrationPermissionModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title = '';
        this.personList = [];
        this.userId=0;
    }
    ngOnInit(): void {
        this.genPersonS.list().subscribe(res => {
            if (res.message === 'OK') {
                this.personList = res.object;
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
        this.title = "Crear Impresora";
    }

    save() {
        this.priLabelS.createPermissionUser(this.form.controls.userId.value).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                    this.alertS.open('Usuario creado!', 'success');
                    this.close(true);
                } else {
                    this.alertS.open('Error al crear el Usuario!', 'error');
                }
            } else {
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
    close(status: boolean): void {
        this.dialogRef.close(status);
    }
}