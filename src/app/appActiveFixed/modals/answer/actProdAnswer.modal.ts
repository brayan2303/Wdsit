import { Component, EventEmitter, Inject, Output } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ActiveFixedAssigmentService } from "../../services/activeFixedAssigment.service";

@Component({
    selector: 'modal-actProdAnswer',
    templateUrl: 'actProdAnswer.modal.html',
    styleUrls: ['./actProdAnswer.modal.css']
})
export class ActAnswerModal {
    answer: string;

    constructor(private activeFixedAsigmentS: ActiveFixedAssigmentService, private alertS: AlertService,
        public dialogRef: MatDialogRef<ActAnswerModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.answer = '';
    }
    ngOnInit(): void {

    }
    save() {
        if (this.answer != '') {
            this.activeFixedAsigmentS.updateAnswer(this.data.id, this.answer).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Registro actualizado!', 'success');
                        this.dialogRef.close(true);
                    } else {
                        this.alertS.open(res.message, 'error');
                    }
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
} 
    
