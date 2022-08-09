import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AnnexedNew } from "../annexedCov/annexedNew.modal";
import { DetailsAllInicialitation } from "../detailsAllInicialitation/detailsAllInicialitation.modal";
import { DetailsAnnexed } from "../detailsAnnexed/detailsAnnexed.modal";
import { DetailsFollowUp } from "../detailsFollowUp/detailsFollowUp.modal";
import { DetailsListAll } from "../detailsListAll/detailsListAll.modal";
import { DetailsObservation } from "../detailsObservation/detailsObservation.modal";
import { DetailsProofOne } from "../detailsProofOne/detailsProofOne.modal";
import { DetailsProofSecond } from "../detailsProofSecond/detailsProofSecond.modal";
import { DetailsProofThird } from "../detailsProofThird/detailsProofThird.modal";
import { DetailsWorking } from "../detailsWorking/detailsWorking.modal";
import { FollowUpNew } from "../followUp/followUpNew.modal";
import { InitializationNew } from "../initializationCov/initializationNew.modal";
import { ObservationNew } from "../observation/obervationNew.modal";
import { ProofOneNew } from "../proofOne/proofOneNew.modal";
import { ProofThirdNew } from "../proofThird/proofThirdNew.modal";
import { ProofTwoNew } from "../proofTwo/proofTwoNew.modal";
import { WorkingdNew } from "../working/workingdNew.modal";


@Component({
    selector: 'modal-detailResgisCov',
    templateUrl: 'detailResgisCov.modal.html',
    styleUrls: ['./detailResgisCov.modal.css']
})
export class DetailDetailRegisterModal {
    loading: boolean;
   

    constructor( private dialog: MatDialog, private alertS: AlertService,
        public dialogRef: MatDialogRef<DetailDetailRegisterModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.loading = false;
       
    }
    ngOnInit(): void {
    }

    register(id: number) {
        this.dialog.open(DetailsAllInicialitation, {
            width: '800px',
            data: { id: id, }
        });
    }
    annexed(id: number) {
        this.dialog.open(DetailsAnnexed, {
            width: '800px',
            data: { id: id, }
        });
    }
    proofOne(id: number) {
        this.dialog.open(DetailsProofOne, {
            width: '800px',
            data: { id: id, }
        });
    }
    proofTwo(id: number) {
        this.dialog.open(DetailsProofSecond, {
            width: '800px',
            data: { id: id, }
        });
    }
    proofThird(id: number) {
        this.dialog.open(DetailsProofThird, {
            width: '800px',
            data: { id: id, }
        });
    }
    followUp(id: number) {
        this.dialog.open(DetailsFollowUp, {
            width: '800px',
            data: { id: id, }
        });
    }
    working(id: number) {
        this.dialog.open(DetailsWorking, {
            width: '800px',
            data: { id: id, }
        });
    }
    observation(id: number) {
        this.dialog.open(DetailsObservation, {
            width: '800px',
            data: { id: id, }
        });
    }
    detailGeneral(id: number) {
        this.dialog.open(DetailsListAll, {
            width: '800px',
            data: { id: id, }
        });
    }
    close(status: boolean): void {
        this.dialogRef.close(status);
    }
}