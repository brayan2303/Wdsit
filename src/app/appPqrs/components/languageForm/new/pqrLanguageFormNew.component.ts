import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PqrLenguageFormClientEntity } from 'src/app/appPqrs/entities/pqrLenguageFormClient.entity';
import { PqrLanguageFormService } from 'src/app/appPqrs/services/pqrLanguageForm.service';
import { PqrLanguageEntity } from 'src/app/appPqrs/entities/pqrLanguage.entity';


@Component({
  selector: 'app-pqrLanguageFormNew',
  templateUrl: './pqrLanguageFormNew.component.html',
  styleUrls: ['./pqrLanguageFormNew.component.css']
})
export class PqrLanguageFormNewComponent implements OnInit {
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  form: FormGroup;
  PqrLenguageFormClientE: PqrLenguageFormClientEntity;
  languageList: PqrLanguageEntity[];


  constructor(private fb: FormBuilder, private alertS: AlertService, private PqrLanguageS: PqrLanguageFormService) {
    this.formId = 0;
    this.languageList = []

  }
  ngOnInit(): void {
    this.formBuilders();
  this.getLanguage();
    if (this.formId != 0) {
      this.title = "Editar Registro";
      this.PqrLanguageS.findById(this.formId).subscribe(res => {
        if (res.message === 'OK') {
          this.PqrLenguageFormClientE = res.object;
          this.form.setValue(
            {
              'id': this.PqrLenguageFormClientE.id,
              'tittlePqr': this.PqrLenguageFormClientE.tittlePqr,
              'paragraphTittle': this.PqrLenguageFormClientE.paragraphTittle,
              'names': this.PqrLenguageFormClientE.names,
              'email': this.PqrLenguageFormClientE.email,
              'emailAnex': this.PqrLenguageFormClientE.emailAnex,
              'detailGeneral': this.PqrLenguageFormClientE.detailGeneral,
              'documents': this.PqrLenguageFormClientE.documents,
              'titleTable': this.PqrLenguageFormClientE.titleTable,
              'columOne': this.PqrLenguageFormClientE.columOne,
              'columTwo': this.PqrLenguageFormClientE.columTwo,
              'columTheer': this.PqrLenguageFormClientE.columTheer,
              'columFour': this.PqrLenguageFormClientE.columFour,
              'columFive': this.PqrLenguageFormClientE.columFive,
              'buttonSend': this.PqrLenguageFormClientE.buttonSend,
              'active': this.PqrLenguageFormClientE.active,
              'languageId': this.PqrLenguageFormClientE.languageId,
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
      tittlePqr: [, [Validators.required]],
      paragraphTittle: [, [Validators.required]],
      names: [, [Validators.required]],
      email: [, [Validators.required]],
      emailAnex: [, [Validators.required]],
      detailGeneral: [, [Validators.required]],
      documents: [, [Validators.required]],
      titleTable: [, [Validators.required]],
      columOne: [, [Validators.required]],
      columTwo: [, [Validators.required]],
      columTheer: [, [Validators.required]],
      columFour: [, [Validators.required]],
      columFive: [, [Validators.required]],
      buttonSend: [, [Validators.required]],
      languageId: [, [Validators.required]],
      active: [, []]
      //:[,[Validators.required]],
    })

  }

  save() {
    if (this.formId === 0) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.PqrLanguageS.create(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.closeDialog.emit();
            this.form.reset();
            this.alertS.open('Registro creado!', 'success');
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
      this.PqrLanguageS.update(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro actualizado!', 'success');
            this.form.setValue({
              'id': 0,
              'tittlePqr': '',
              'paragraphTittle': '',
              'names': '',
              'email': '',
              'emailAnex': '',
              'detailGeneral': '',
              'documents': '',
              'titleTable': '',
              'columOne': '',
              'columTwo': '',
              'columTheer': '',
              'columFour': '',
              'columFive': '',
              'buttonSend': '',
              'languageId': '',
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

  getLanguage() {
    this.PqrLanguageS.findAll(Number(localStorage.getItem('countryId'))).subscribe(res => {
      if (res.message === 'OK') {
        this.languageList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

}