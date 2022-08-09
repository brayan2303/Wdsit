import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CovFormEntity } from "../../entities/covForm.entity";
import { covFormService } from "../../services/covFormReport.services";
@Component({
    selector: 'modal-detailsAllInicialitation',
    templateUrl: 'detailsAllInicialitation.modal.html',
    styleUrls: ['./detailsAllInicialitation.modal.css']
})
export class DetailsAllInicialitation {

    loading: boolean;
    covFormEntity:CovFormEntity;
    constructor(private covFormS:covFormService , private alertS: AlertService,
        public dialogRef: MatDialogRef<DetailsAllInicialitation>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.loading = false;
        this.covFormEntity
     
    }
    ngOnInit(): void {
        this.loading = true;
        this.covFormS.initializatioFindByIdArray(this.data.id).subscribe(res => {
            if (res.message === 'OK') {
                this.loading = false;
                this.covFormEntity = res.object;
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
