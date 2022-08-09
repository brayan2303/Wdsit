import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'modal-observations',
    templateUrl: 'observations.modal.html',
    styleUrls: ['./observations.modal.css']
})
export class ObservationsModal {
    observations:string;

    constructor(private alertS: AlertService,
        public dialogRef: MatDialogRef<ObservationsModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.observations='';
    }
    save(){
        if(this.observations===''){
            this.alertS.open('Ingresa una observacion!','warning');
        }else{
            this.close();
        }
    }
    close(): void {
        this.dialogRef.close(this.observations);
    }
}