import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CovFormEntity } from '../../entities/covForm.entity';
import { covFormService } from '../../services/covFormReport.services';



@Component({
    selector: 'proofTwoNew',
    templateUrl: 'proofTwoNew.modal.html',
    styleUrls: ['./proofTwoNew.modal.css']
})
export class ProofTwoNew implements OnInit {
    title: string;
    form: FormGroup;
    genPersonEntity: GenPersonEntity;
    public loading: boolean;
    covFormEntity:CovFormEntity;
    formId:number;
    constructor(private fb: FormBuilder, private covFormS: covFormService, private alertS: AlertService, public dialogRef: MatDialogRef<ProofTwoNew>, @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
        this.title = '';
        this.formId= 0;
 
    }
    ngOnInit(): void {
        if (this.formId === 0) {
            this.covFormS.proofSecondFindById(this.data.id).subscribe(res => {
              if (res.message === 'OK') {
                this.covFormEntity = res.object;
                this.form.setValue(
                  {
                    'id': this.covFormEntity.id,
                    'dateSecondProof': this.covFormEntity.dateSecondProof,
                    'dateExecutionSecondProof':this.covFormEntity.dateExecutionSecondProof,
                    'resultSecondProof':this.covFormEntity.resultSecondProof,
                    'dateNotificationResultSecond': this.covFormEntity.dateNotificationResultSecond,
                  }
                );
              } else {
                this.alertS.open(res.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          } else {
            this.alertS.open('Sin registros', 'warning')
          }
        this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
        this.formBuilders();
    }


    formBuilders() {
        this.form = this.fb.group({
            id: [, []],
            dateSecondProof: [, []],
            dateExecutionSecondProof: [, []],
            resultSecondProof: [, []],
            dateNotificationResultSecond:[,[]]
            //[,[Validators.required]],
        })
    }
    save() {
        if (this.formId === 0) {
            this.form.markAllAsTouched();
            if (this.form.invalid) {
              return;
            }
            this.covFormS.updateProofSecond(this.data.id, this.form.value).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.alertS.open('Registro creado!', 'success');
                        this.dialogRef.close(true);
                        this.form.reset
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
    close(status: boolean): void {
        this.dialogRef.close(status);
    }
}