import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BscAdvanceService } from 'src/app/appBalanceScoreCard/services/bscAdvance.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-bscAdvanceNew',
    templateUrl: './bscAdvanceNew.component.html',
    styleUrls: ['./bscAdvanceNew.component.css']
})
export class BscAdvanceNewComponent{
    description: string;

    constructor(private bscAdvanceS: BscAdvanceService, private alertS: AlertService, private dialogRef: MatDialogRef<BscAdvanceNewComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
    }
    save() {
        if (this.description != '' && this.description!=null) {
            this.bscAdvanceS.create(this.description, this.data.activityId, this.data.creationUserId).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.close(true);
                    } else {
                        this.alertS.open('Error al crear el avance!', 'error');
                    }
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('Ingrese una descripcion!', 'warning');
        }
    }
    close(status) {
        this.dialogRef.close(status);
    }
}