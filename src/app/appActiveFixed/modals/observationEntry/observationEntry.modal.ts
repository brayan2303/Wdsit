import { Component, EventEmitter, Inject, Output } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ActiveFixedAssigmentService } from "../../services/activeFixedAssigment.service";
import { ActiveFixedEntryService } from "../../services/activeFixedEntry.service";

@Component({
    selector: 'modal-observationEntry',
    templateUrl: 'observationEntry.modal.html',
    styleUrls: ['./observationEntry.modal.css']
})
export class ObservationEntry {
    observation: string;

    constructor(private activeFixedEntryS: ActiveFixedEntryService, private alertS: AlertService,
        public dialogRef: MatDialogRef<ObservationEntry>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.observation = '';
    }
    ngOnInit(): void {
        console.log(this.data.id)

    }
    save() {
        if (this.observation != '') {
            this.activeFixedEntryS.updateObservation(this.data.id, this.observation).subscribe(res => {
                if (res.message === 'OK') {
                 this.alertS.open('Observacion cargada', 'success' )
                   
                } else {
                    this.alertS.open(res.message, 'error');
                }
            }, err => {
                this.alertS.open(err.message, 'error');
            });
        } else {
            this.alertS.open('Escriba una respuesta', 'warning');
        }

    }
    close(): void {
        this.dialogRef.close();
    }
} 
    
