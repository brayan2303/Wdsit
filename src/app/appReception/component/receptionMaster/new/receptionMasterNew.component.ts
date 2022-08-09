
import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { ReceptionMasterEntity } from 'src/app/appReception/entities/receptionMaster.entity';
import { ReceptionMasterService } from 'src/app/appReception/services/receptionMaster.serivce';
import { ReceptionTypeMasterService } from 'src/app/appReception/services/receptionTypeMaster.service';
import { ReceptionTypeMasterEntity } from 'src/app/appReception/entities/receptionMasterType.entity';
import { MatDialog } from '@angular/material/dialog';
import { ReceptionTypeMasterComponent } from 'src/app/appReception/modals/receptionTypeMaster/receptionTypeMaster.component';


@Component({
  selector: 'app-receptionMasterNew',
  templateUrl: './receptionMasterNew.component.html',
  styleUrls: ['./receptionMasterNew.component.css']
})
export class ReceptionMasterNewComponent implements OnInit {
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  form: FormGroup;
  ReceptionMasterE: ReceptionMasterEntity;
  genPersonEntity: GenPersonEntity;
  masterList: ReceptionTypeMasterEntity[];

  constructor(private dialog: MatDialog,private fb: FormBuilder, private alertS: AlertService, private receptionMasterS: ReceptionMasterService, private receptionTypeMasterS: ReceptionTypeMasterService) {
    this.formId = 0;
    this.masterList = [];

  }
  ngOnInit(): void {
    this.getType();
    this.formBuilders();
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    if (this.formId != 0) {
      this.title = "Editar Registro";
      this.receptionMasterS.findById(this.formId).subscribe(res => {
        if (res.message === 'OK') {
          this.ReceptionMasterE = res.object;
          this.form.setValue(
            {
              'id': this.ReceptionMasterE.id,
              'name': this.ReceptionMasterE.name,
              'receptionMasterTypeId': this.ReceptionMasterE.receptionMasterTypeId,
              'active': this.ReceptionMasterE.active
            }
          );
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.title = "Nuevo registro";
    }
  }

  formBuilders() {
    this.form = this.fb.group({
      id: [, []],
      name: [, [Validators.required]],
      receptionMasterTypeId: [, [Validators.required]],
      active: [, []]
      //[,[Validators.required]],
    })

  }

  save() {
    if (this.formId === 0) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.receptionMasterS.create(this.form.value, this.genPersonEntity.id).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.closeDialog.emit();
            this.alertS.open('Registro creado', 'success');
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
      this.receptionMasterS.update(this.form.value, this.genPersonEntity.id).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro actualizado!', 'success');
            this.form.setValue({
              
            });
            this.closeDialog.emit();
          } else {
            this.alertS.open(res.message, 'error');
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    }

  }
  getType() {
    this.receptionTypeMasterS.list().subscribe(resT => {
      if (resT.message === 'OK') {
        this.masterList = resT.object;
      } else {
        this.alertS.open(resT.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    })
  }

  getfeatures(){
    this.dialog.open(ReceptionTypeMasterComponent, {
        width: '80%'
    }).afterClosed().subscribe(res => {
      this.getType();
  });
}

}



