import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActiveFixedExitService } from 'src/app/appActiveFixed/services/activeFixedExit.service';
import { ActiveFixedEntryService } from 'src/app/appActiveFixed/services/activeFixedEntry.service';
import { ActiveFixedAssigmentEntity } from 'src/app/appActiveFixed/entities/activeFixedAssigment.entity';
import { ActiveFixedExitEntity } from 'src/app/appActiveFixed/entities/activeFixedExit.entity';
import { ActiveFixedAssigmentService } from 'src/app/appActiveFixed/services/activeFixedAssigment.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { MatDialog } from '@angular/material/dialog';
import { ObservationExit } from 'src/app/appActiveFixed/modals/observationExit/observationExit.modal';
import { ObservationEntry } from 'src/app/appActiveFixed/modals/observationEntry/observationEntry.modal';
import { ActiveFixedEntryEntity } from 'src/app/appActiveFixed/entities/activeFixedEntry.entity';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
@Component({
  selector: 'app-actProductExitNew',
  templateUrl: './actProductExitNew.component.html',
  styleUrls: ['./actProductExitNew.component.css']
})
export class ActProductExitNewComponent implements OnInit {
  public loading: boolean;
  public data: any;
  public product: Number;
  @Input() ActFixExitformId: number;
  @Output() closeDialog = new EventEmitter<any>();
  genPersonEntity: GenPersonEntity;
  title: string;
  form: FormGroup;
  tracingList: ActiveFixedAssigmentEntity[];
  serial: string;
  serialEquipment: string;
  act: ActiveFixedExitEntity
  name: string;
  identification: string;
  area: string;
  position: string;
  equipment: string;
  activeFixedAssigmentEntity: ActiveFixedAssigmentEntity;
  notEqual: boolean;
  exitEntry: boolean;
  exit: boolean;
  id: number;
  ActiveFixedEntryEntity: ActiveFixedEntryEntity;

  constructor(private dialog: MatDialog, private activeFixedAssigmentS: ActiveFixedAssigmentService, private activeFixedEntryS: ActiveFixedEntryService, private activeFixedExitS: ActiveFixedExitService, private fb: FormBuilder, private alertS: AlertService) {
    this.ActFixExitformId = 0;
    this.serial = '';
    this.serialEquipment = '';
    this.name = '';
    this.identification = '';
    this.area = '';
    this.position = '';
    this.equipment = '';
    this.activeFixedAssigmentEntity = new ActiveFixedAssigmentEntity();
    this.exitEntry = false;
    this.id = 0;
    this.ActiveFixedEntryEntity = new ActiveFixedEntryEntity();


  }
  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.formBuilders();
  }
  formBuilders() {
    this.form = this.fb.group({

      id: [, []],
      identification: [, [Validators.required]],
      name: [, [Validators.required]],
      area: [, [Validators.required]],
      position: [, [Validators.required]],
      equipment: [, [Validators.required]],
      serial: [, [Validators.required]],
      associatedSerial: [, []],
      serialEquipment: [, []]
    })

  }

  save() {
    /*  if (this.form.controls.associatedSerial.value === this.form.controls.serialEquipment.value) {*/
      if (this.form.controls.associatedSerial.value === this.form.controls.serialEquipment.value)  {
      console.log(this.form.get('serialEquipment').value )
      if (this.ActFixExitformId === 0) {
        this.form.markAllAsTouched();
        if (this.form.invalid) {
          return;
        }
        this.activeFixedExitS.create(this.genPersonEntity.id, this.form.controls.serial.value, this.form.controls.name.value,
          this.form.controls.identification.value, this.form.controls.area.value, this.form.controls.position.value, this.form.controls.equipment.value,
          this.form.controls.associatedSerial.value).subscribe(res => {
            if (res.message === 'OK') {
              if (res.object != 0) {
                this.id = res.object;
                this.closeDialog.emit();
                this.updatexit();
                this.form.reset()
    
                this.alertS.open('Salida de equipo exitosa!', 'success');
                this.activeFixedAssigmentEntity = new ActiveFixedAssigmentEntity();
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
        this.alertS.open('Error al registrar', 'error');
      }
    } else {
       this.dialog.open(ConfirmationComponent, {
        data: { message: '¿ Desea hacer el resgistro de observacion ?' },
        height: '250px',
        width: '400px'
    }).afterClosed().subscribe(res => {
      if (res) {
      if (this.ActFixExitformId === 0) {
        this.form.markAllAsTouched();
        if (this.form.invalid) {
          return;
        }
        this.activeFixedExitS.create(this.genPersonEntity.id, this.form.controls.serial.value, this.form.controls.name.value,
          this.form.controls.identification.value, this.form.controls.area.value, this.form.controls.position.value, this.form.controls.equipment.value,
          this.form.controls.associatedSerial.value).subscribe(res => {
            if (res.message === 'OK') {
              if (res.object != 0) {
                this.id = res.object;
                this.closeDialog.emit();
                this.updatexit();
                this.form.reset()
                this.exitExit()
                this.alertS.open('Salida de equipo exitosa!', 'success');
                this.activeFixedAssigmentEntity = new ActiveFixedAssigmentEntity();
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
        this.alertS.open('Error al registrar', 'error');
      }
    }else{
      this.form.reset();
    }
    });
    }
    
    /*} else {
      this.alertS.open('El serial del cargador no es el asignado, por favor verificar', 'warning');
    }*/
  }
  updatexit() {
    this.activeFixedAssigmentS.entryExit(this.form.controls.serial.value, true).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != 0) {
          this.alertS.open('Salida confirmada', 'success');
        } else {
          this.alertS.open(res.message, 'error');
        }

      } else {
        this.alertS.open(res.message, 'error');
      }
    }), err => {
      this.alertS.open('error al registrar', 'error')
    }
  }

  search() {
    this.tracingList = [];
    this.activeFixedEntryS.findByIdentification(this.form.get('serial').value).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != null) {
          if (res.object.approvedRejected == true) {
            if (res.object.exitEntry == false || res.object.exitEntry == null) {
              this.activeFixedAssigmentEntity = res.object;
              this.activeFixedAssigmentEntity.exitEntry = false;
              this.form.get('name').setValue(res.object.name);
              this.form.get('area').setValue(res.object.costCenter);
              this.form.get('position').setValue(res.object.position);
              this.form.get('equipment').setValue(res.object.product);
              this.form.get('identification').setValue(res.object.identification);
              this.form.get('associatedSerial').setValue(res.object.nameProduct);
            } else {
              this.alertS.open('El equipo ya registra una salida', 'warning');
              this.activeFixedAssigmentEntity = new ActiveFixedAssigmentEntity();
              this.form.reset();
            }
          } else {
            this.alertS.open('El equipo NO tiene permiso de salida habilitado', 'warning');
            this.activeFixedAssigmentEntity = new ActiveFixedAssigmentEntity();
            this.form.reset();
          }
        } else {
          this.alertS.open('Equipo bajo el serial: ' + this.form.get('serial').value + ' NO esta creado !', 'warning');
          this.form.controls.Name.enable();
          this.form.controls.email.enable();
        }
      } else {
        this.alertS.open(res.message, 'error');
        this.form.controls.Name.enable();
        this.form.controls.email.enable();
      }

    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  searchEntry() {
    this.tracingList = [];
    this.activeFixedEntryS.findBySerial(this.form.get('serial').value).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != null) {
          if (res.object.approvedRejected == true) {
            this.activeFixedAssigmentEntity = res.object;
            this.form.get('name').setValue(res.object.name);
            this.form.get('area').setValue(res.object.costCenter);
            this.form.get('position').setValue(res.object.position);
            this.form.get('equipment').setValue(res.object.product);
            this.form.get('identification').setValue(res.object.identification);
            this.form.get('associatedSerial').setValue(res.object.nameProduct);
          } else {
            this.form.controls.Name.enable();
            this.form.controls.email.enable();
          }
        } else {
          this.alertS.open('El equipo NO tiene permiso de salida habilitado', 'warning');
          this.activeFixedAssigmentEntity = new ActiveFixedAssigmentEntity();
          this.form.reset();
        }
      } else {
        this.alertS.open(res.message, 'error');
        this.form.reset();
      }
    }, err => {
      this.alertS.open(err.message, 'error');
      this.activeFixedAssigmentEntity = new ActiveFixedAssigmentEntity();
      this.form.reset();
    });
  }

  saves() {
    /*  if (this.form.controls.associatedSerial.value === this.form.controls.serialEquipment.value) {*/
      if (this.form.controls.associatedSerial.value === this.form.controls.serialEquipment.value) {
       
      if (this.ActFixExitformId === 0) {
        this.form.markAllAsTouched();
        if (this.form.invalid) {
          return;
        }
        this.activeFixedEntryS.create(this.genPersonEntity.id, this.form.controls.serial.value, this.form.controls.name.value,
          this.form.controls.identification.value, this.form.controls.area.value, this.form.controls.position.value, this.form.controls.equipment.value, this.form.controls.associatedSerial.value).subscribe(res => {
            if (res.message === 'OK') {
              if (res.object != 0) {
                this.id = res.object;
                this.closeDialog.emit();
                this.updatexits();
                this.form.reset()
                this.alertS.open('Entrada de equipo exitosa!', 'success');
                this.activeFixedAssigmentEntity = new ActiveFixedAssigmentEntity();

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
        this.alertS.open('Error al registrar', 'error');
      }
    } else {
      this.dialog.open(ConfirmationComponent, {
        data: { message: '¿Desea hacer el registro de observación?' },
        height: '250px',
        width: '400px'
    }).afterClosed().subscribe(res => {
      if (res) {
      if (this.ActFixExitformId === 0) {
        this.form.markAllAsTouched();
        if (this.form.invalid) {
          return;
        }
        this.activeFixedEntryS.create(this.genPersonEntity.id, this.form.controls.serial.value, this.form.controls.name.value,
          this.form.controls.identification.value, this.form.controls.area.value, this.form.controls.position.value, this.form.controls.equipment.value, this.form.controls.associatedSerial.value).subscribe(res => {
            if (res.message === 'OK') {
              if (res.object != 0) {
                this.id = res.object;
                this.closeDialog.emit();
                this.updatexits();
                this.form.reset()
                this.entry()
                this.alertS.open('Entrada de equipo exitosa!', 'success');
                this.activeFixedAssigmentEntity = new ActiveFixedAssigmentEntity();

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
        this.alertS.open('Error al registrar', 'error');
      }
    }else{
      this.form.reset();
    }
    });
    }
    /* } else {
       this.alertS.open('El serial del cargador no es el asignado, por favor verificar', 'warning');
     }*/
  }
  updatexits() {
    this.activeFixedAssigmentS.entryExit(this.form.controls.serial.value, false).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != 0) {
          this.alertS.open('Ingreso confirmado', 'success');
        } else {
          this.alertS.open(res.message, 'error');
        }

      } else {
        this.alertS.open(res.message, 'error');
      }
    }), err => {
      this.alertS.open('errror al registrar', 'error')
    }
  }

  entry() {
    this.dialog.open(ObservationEntry, {
      width: '100%',
      data: { id: this.id }
    });
  }

  exitExit() {
    this.dialog.open(ObservationExit, {
      width: '100%',
      data: { id: this.id }
    });
  }
}




