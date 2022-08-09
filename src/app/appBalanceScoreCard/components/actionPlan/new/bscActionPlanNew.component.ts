import { Component, Inject, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import * as moment from 'moment';
import { BscActionPlanService } from 'src/app/appBalanceScoreCard/services/bscActionPlan.service';
import { BscActionPlanEntity } from 'src/app/appBalanceScoreCard/entities/bscActionPlan.entity';
import { BscNotificationService } from 'src/app/appBalanceScoreCard/services/bscNotification.service';
import { BscNotificationUserService } from 'src/app/appBalanceScoreCard/services/bscNotificationUser.service';

@Component({
  selector: 'app-bscActionPlanNew',
  templateUrl: './bscActionPlanNew.component.html',
  styleUrls: ['./bscActionPlanNew.component.css']
})
export class BscActionPlanNewComponent implements OnInit {
  title: string;
  bscActionPlanEntity: BscActionPlanEntity;
  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    objetive: new FormControl('', Validators.required),
    endDate: new FormControl(''),
    analysisId: new FormControl(''),
    responsibleUserId: new FormControl('', Validators.required),
    statusId: new FormControl('')
  });
  responsibleUserList: GenPersonEntity[];

  constructor(private bscActionPlanS: BscActionPlanService, private genPersonS: GenPersonService, private alertS: AlertService, private bscNotificationS: BscNotificationService, private bscNotificationUserS: BscNotificationUserService, private dialogRef: MatDialogRef<BscActionPlanNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
    this.title = '';
    this.responsibleUserList = [];
  }

  ngOnInit() {
    this.genPersonS.list().subscribe(res => {
      if (res.message === 'OK') {
        this.responsibleUserList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
    if (this.data.actionPlanId != 0) {
      this.title = 'Editar Plan de Accion';
      this.bscActionPlanS.findById(this.data.actionPlanId).subscribe(res => {
        if (res.message === 'OK') {
          this.bscActionPlanEntity = res.object;
          this.form.setValue({
            'id': this.bscActionPlanEntity.id,
            'name': this.bscActionPlanEntity.name,
            'objetive': this.bscActionPlanEntity.objetive,
            'endDate': this.bscActionPlanEntity.endDate,
            'analysisId': this.bscActionPlanEntity.analysisId,
            'responsibleUserId': this.bscActionPlanEntity.responsibleUserId,
            'statusId': this.bscActionPlanEntity.statusId
          });
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.title = 'Nuevo Plan de Accion';
    }
  }
  save() {
    this.form.controls.endDate.setValue(moment(this.form.controls.endDate.value).format('YYYY-MM-DD'));
    if (this.data.actionPlanId === 0) {
      this.form.controls.analysisId.setValue(this.data.analysisId);
      this.bscActionPlanS.create(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Plan de accion creado!', 'success');
            var variables: string[] = [];
            variables.push(this.form.controls.name.value);
            variables.push(moment(new Date()).format('YYYY-MM-DD'));
            variables.push(this.data.measurement.perspective);
            variables.push(this.data.measurement.strategicObjetive);
            variables.push(this.data.measurement.indicator);
            this.bscNotificationUserS.list('Creacion plan de accion').subscribe(resL => {
              if (resL.message === 'OK') {
                var mails = resL.object;
                this.bscNotificationS.send('Creacion plan de accion', mails,variables).subscribe(resS => {
                  if (resS.message === 'OK') {
                    if (resS.object === 0) {
                      this.alertS.open('Error al enviar la notificacion!', 'error');
                    }
                  } else {
                    this.alertS.open(resS.message, 'error');
                  }
                }, err => {
                  this.alertS.open(err.message, 'error');
                });
                this.close(true);
              } else {
                this.alertS.open(resL.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
          } else {
            this.alertS.open('Error al crear el plan de accion!', 'error');
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.bscActionPlanS.update(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Plan de accion actualizado!', 'success');
            this.close(true);
          } else {
            this.alertS.open('Error al actualizar el plan de accion!', 'error');
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    }
  }
  close(status: boolean) {
    this.dialogRef.close(status);
  }
}
