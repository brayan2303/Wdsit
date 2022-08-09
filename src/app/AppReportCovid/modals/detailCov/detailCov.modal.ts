import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AnnexedNew } from "../annexedCov/annexedNew.modal";
import { FollowUpNew } from "../followUp/followUpNew.modal";
import { InitializationNew } from "../initializationCov/initializationNew.modal";
import { ObservationNew } from "../observation/obervationNew.modal";
import { ProofOneNew } from "../proofOne/proofOneNew.modal";
import { ProofThirdNew } from "../proofThird/proofThirdNew.modal";
import { ProofTwoNew } from "../proofTwo/proofTwoNew.modal";
import { WorkingdNew } from "../working/workingdNew.modal";


@Component({
    selector: 'modal-detailCov',
    templateUrl: 'detailCov.modal.html',
    styleUrls: ['./detailCov.modal.css']
})
export class DetailRegisterModal {
    loading: boolean;
   

    constructor( private dialog: MatDialog, private alertS: AlertService,
        public dialogRef: MatDialogRef<DetailRegisterModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.loading = false;
       
    }
    ngOnInit(): void {
    }

    register(id: number) {
        this.dialog.open(InitializationNew, {
            width: '800px',
            data: { id: id, }
        });
    }
    annexed(id: number) {
        this.dialog.open(AnnexedNew, {
            width: '800px',
            data: { id: id, }
        });
    }
    proofOne(id: number) {
        this.dialog.open(ProofOneNew, {
            width: '800px',
            data: { id: id, }
        });
    }
    proofTwo(id: number) {
        this.dialog.open(ProofTwoNew, {
            width: '800px',
            data: { id: id, }
        });
    }
    proofThird(id: number) {
        this.dialog.open(ProofThirdNew, {
            width: '800px',
            data: { id: id, }
        });
    }
    followUp(id: number) {
        this.dialog.open(FollowUpNew, {
            width: '800px',
            data: { id: id, }
        });
    }
    working(id: number) {
        this.dialog.open(WorkingdNew, {
            width: '800px',
            data: { id: id, }
        });
    }
    observation(id: number) {
        this.dialog.open(ObservationNew, {
            width: '800px',
            data: { id: id, }
        });
    }
    close(status: boolean): void {
        this.dialogRef.close(status);
    }
}