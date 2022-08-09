
import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PqrFilesCategoryService } from 'src/app/appPqrs/services/pqrFilesCategory.service';
import { PqrFilesCategoryEntity } from 'src/app/appPqrs/entities/pqrFilesCategory.entity';

@Component({
  selector: 'app-pqrFileCategorysNew',
  templateUrl: './pqrFileCategorysNew.component.html',
  styleUrls: ['./pqrFileCategorysNew.component.css']
})
export class PqrFileCategorysNewComponent implements OnInit {
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  form: FormGroup;
  pqrFilesCategoryEntity: PqrFilesCategoryEntity;
  fileList: File[];
  countryIdLocal:string;

  constructor(private fb: FormBuilder, private alertS: AlertService, private pqrFilesCategoryS: PqrFilesCategoryService) {
    this.formId = 0;
    this.fileList = [];
    this.countryIdLocal = '';

  }
  ngOnInit(): void {
    this.countryIdLocal=localStorage.getItem('countryId');
    this.formBuilders();
    if (this.formId != 0) {
      this.title = "Editar Registro";
      this.pqrFilesCategoryS.findById(this.formId).subscribe(res => {
        if (res.message === 'OK') {
          this.pqrFilesCategoryEntity = res.object;
          this.form.setValue(
            {
              'id': this.pqrFilesCategoryEntity.id,
              'name': this.pqrFilesCategoryEntity.name,
              'description': this.pqrFilesCategoryEntity.description,
              'active': this.pqrFilesCategoryEntity.active
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
      description: [, [Validators.required]],
      active: [, []]
      //[,[Validators.required]],
    })

  }

  save() {
    var name = this.form.get('name').value;
    if (this.formId === 0) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.pqrFilesCategoryS.create(this.form.value, Number(this.countryIdLocal)).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.pqrFilesCategoryEntity = res.object
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
      this.pqrFilesCategoryS.update(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro actualizado!', 'success');
            this.form.setValue({
              'id': 0,
              'name': '',
              'description': '',
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



