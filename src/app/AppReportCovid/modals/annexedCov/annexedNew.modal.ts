import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenCenterCostEntity } from 'src/app/appGeneral/entities/genCenterCost.entity';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { GenSegmentEntity } from 'src/app/appGeneral/entities/genSegment.entity';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CovFormEntity } from '../../entities/covForm.entity';
import { covFormService } from '../../services/covFormReport.services';



@Component({
  selector: 'annexedNew',
  templateUrl: 'annexedNew.modal.html',
  styleUrls: ['./annexedNew.modal.css']
})
export class AnnexedNew implements OnInit {
  title: string;
  form: FormGroup;
  genPersonEntity: GenPersonEntity;
  public loading: boolean;
  covFormEntity: CovFormEntity;
  customerList: GenCustomerEntity[];
  segmentList: GenSegmentEntity[];
  costCenterList: GenCenterCostEntity[];

  formId: number;
  constructor(private fb: FormBuilder, private covFormS: covFormService, private alertS: AlertService, public dialogRef: MatDialogRef<AnnexedNew>, @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
    this.title = '';
    this.formId = 0;
    this.customerList = [];
    this.segmentList = [];
    this.costCenterList = [];

  }
  ngOnInit(): void {
    if (this.formId === 0) {
      this.covFormS.annexedFindById(this.data.id).subscribe(res => {
        if (res.message === 'OK') {
          this.covFormEntity = res.object;
          this.form.setValue(
            {
              'id': this.covFormEntity.id,
              'contract': this.covFormEntity.contract,
              'segment': this.covFormEntity.segment,
              'customer': this.covFormEntity.customer,
              'costCenter': this.covFormEntity.costCenter,
              'noApply': this.covFormEntity.noApply,
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
    this.customer();
    this.segment();
    this.costCenter();
  }


  formBuilders() {
    this.form = this.fb.group({
      id: [, []],
      contract: [, []],
      segment: [, []],
      customer: [, []],
      costCenter: [, []],
      noApply: [, []]
      //[,[Validators.required]],
    })
  }
  save() {
    if (this.formId === 0) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.covFormS.updateAnnexed(this.data.id, this.form.value).subscribe(res => {

        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro creado!', 'success');
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
  close(status: boolean): void {
    this.dialogRef.close(status);
  }
  customer() {
    this.covFormS.listCustomer().subscribe(res => {
      if (res.message === "OK") {
        this.customerList = res.object
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  segment(){
    this.covFormS.listSegment().subscribe(res =>{
      if(res.message === "OK"){
        this.segmentList = res.object
      }else{
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  } 
  costCenter(){
    this.covFormS.listCostCenter().subscribe(res =>{
      if(res.message === "OK"){
        this.costCenterList = res.object
      }else{
        this.alertS.open(res.message, 'error');
      }
    }, err =>{
      this.alertS.open(err.message, 'error');
    });
  }
}