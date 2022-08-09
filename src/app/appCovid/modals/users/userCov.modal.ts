import { CovFormService } from 'src/app/appCovid/services/covForm.services';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
    selector: 'modal-userCov',
    templateUrl: './userCov.modal.html',
    styleUrls: ['./userCov.modal.css']
})
export class UserCovModal implements OnInit {
    identification: number;
    covFormEntity: any;

    constructor(private alertS: AlertService, private covForms: CovFormService, private covFormS: CovFormService,
        public dialogRef: MatDialogRef<UserCovModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.identification = 0;
        dialogRef.disableClose = true;
    }
    ngOnInit(): void { }
    close(): void {
        this.dialogRef.close(this.covFormEntity);
    }
    search() {
        console.log(this.identification);
        this.covFormS.findById(this.identification).subscribe(res => {
            if (res.message === 'OK') {
                this.covFormEntity = res.object;
                
                this.close();
            } else {
                
                this.alertS.open(res.message, 'error');
            }
        }, err => {
            this.alertS.open(err.message, 'error');
        });
    }
}