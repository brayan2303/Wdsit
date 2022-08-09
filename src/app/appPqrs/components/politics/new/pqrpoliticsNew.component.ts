import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PqrLanguageEntity } from 'src/app/appPqrs/entities/pqrLanguage.entity';
import { PqrLanguageFormService } from 'src/app/appPqrs/services/pqrLanguageForm.service';
import { PqrMessageSendService } from 'src/app/appPqrs/services/pqrMessageSend.service';
import { PqrMessageSendEntity } from 'src/app/appPqrs/entities/pqrMessageSend.entity';


@Component({
  selector: 'app-pqrpoliticsNew',
  templateUrl: './pqrpoliticsNew.component.html',
  styleUrls: ['./pqrpoliticsNew.component.css']
})
export class PqrpoliticsNewComponent implements OnInit {
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  form: FormGroup;
  PqrMessageSendE: PqrMessageSendEntity;
  languageList: PqrLanguageEntity[];

  constructor(private fb: FormBuilder, private alertS: AlertService,  private PqrLanguageFormS: PqrLanguageFormService,private PqrMessageSendS: PqrMessageSendService) {
    this.formId = 0;
    this.languageList = [];

  }
  ngOnInit(): void {
    this.formBuilders();
    this.getLanguage();
    if (this.formId != 0) {
      this.title = "Editar Registro";
      this.PqrMessageSendS.findById(this.formId).subscribe(res => {
      
        if (res.message === 'OK') {
          this.PqrMessageSendE = res.object;
          this.form.setValue(
            {
              'id': this.PqrMessageSendE.id,
              'name': this.PqrMessageSendE.name,
              'description': this.PqrMessageSendE.description,
              'languageId':this.PqrMessageSendE.languageId,
              'active': this.PqrMessageSendE.active
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
      languageId:[,[Validators.required]],
      active: [, []]
      //[,[Validators.required]],
    })

  }

  save() {
    if(this.formId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.PqrMessageSendS.create(this.form.value, Number(localStorage.getItem('countryId'))).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){ 
            this.closeDialog.emit();
            this.form.reset();
            this.alertS.open('Registro creado!','success');
          }else{
            this.alertS.open(res.message,'error');
          }
        }else{
          this.alertS.open(res.message,'error');
        }        
      },err=>{
        this.alertS.open(err.message,'error');
      });
    }else {
      this.PqrMessageSendS.update(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro actualizado!', 'success');
            this.form.setValue({
              'id': 0,
              'name': '',
              'description': '',
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
    this.PqrLanguageFormS.findAll(Number(localStorage.getItem('countryId'))).subscribe(res => {
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




