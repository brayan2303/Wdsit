
import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GenPlantEntity } from 'src/app/appGeneral/entities/genPlant.entity';
import { GenPlantService } from 'src/app/appGeneral/services/genPlant.service';

import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { GenHolidaysEntity } from 'src/app/appGeneral/entities/genHolidays.entity';
import { GenHolidaysService } from 'src/app/appGeneral/services/genHolidays.service';



@Component({
  selector: 'app-genHolidaysNew',
  templateUrl: './genHolidaysNew.component.html',
  styleUrls: ['./genHolidaysNew.component.css']
})
export class GenHolidaysNewComponent implements OnInit {
  public loading: boolean;
  @Input() genHolidaysformId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  form: FormGroup;
  genHolidaysEntity: GenHolidaysEntity;
  genPersonEntity: GenPersonEntity;
  constructor(private fb: FormBuilder, private alertS: AlertService, private genHolidayS: GenHolidaysService,) {
    this.genHolidaysformId = 0;

  }
  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.formBuilders();
    if (this.genHolidaysformId != 0) {
      this.title = "Editar Registro";
      this.genHolidayS.findById(this.genHolidaysformId).subscribe(res => {
        if (res.message === 'OK') {
          this.genHolidaysEntity = res.object;
          this.form.setValue(
            {
              'id': this.genHolidaysEntity.id,
              'holidays': this.genHolidaysEntity.holidays,
              'active': this.genHolidaysEntity.active
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
      holidays: [, [Validators.required]],
      active: [, []]
      //[,[Validators.required]],
    })

  }

  save() {
    if (this.genHolidaysformId === 0) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.genHolidayS.create(this.genPersonEntity.id, this.form.controls.holidays.value).subscribe(res => {
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
      this.genHolidayS.update(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro actualizado!', 'success');
            this.form.setValue({
              'id': 0,
              'holidays': '',
              'active': ''
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

}



