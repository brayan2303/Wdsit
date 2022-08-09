import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentLevelAccessEntity } from 'src/app/appDocuments/entities/DocumentLevelAccessEntity';
import { DocumentLevelAccessService } from 'src/app/appDocuments/services/DocumentLevelAccess.Service';
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
  selector: 'app-documentLevelAccess',
  templateUrl: './documentLevelAccess.component.html',
  styleUrls: ['./documentLevelAccess.component.css']
})
export class DocumentLevelAccessComponent implements OnInit {
  public loading: boolean;
  @Input() docLevelformId: number;
  @Output() closeDialog = new EventEmitter<any>();
  tittle: string;
  form: FormGroup;
  DocumentLevelE: DocumentLevelAccessEntity;

  constructor(private fb: FormBuilder, private alertS: AlertService, private DocumentLevelS: DocumentLevelAccessService) {
    this.docLevelformId = 0;
  }
  ngOnInit(): void {
    this.formBuilders();
    if (this.docLevelformId != 0) {
      this.tittle = "Editar Nivel de Acceso";
      this.findById();
    }else{
      this.tittle = "Nuevo Acceso";
    }
  }

  formBuilders() {
    this.form = this.fb.group({
      id: [, []],
      code: [,[Validators.required]],
      description: [,[Validators.required]],
      active: [, []],
    })
  }

 
  findById() {
    this.DocumentLevelS.findById(this.docLevelformId).subscribe(res => {
      if (res.message === 'OK') {
        this.DocumentLevelE = res.object;      
        this.form.setValue(
          {
            'id': this.DocumentLevelE.id,
            'code': this.DocumentLevelE.code,
            'description': this.DocumentLevelE.description,
            'active': this.DocumentLevelE.active
          }
        );
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  save() {
    if (this.docLevelformId === 0) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.DocumentLevelS.create(this.form.value).subscribe(res => {
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
      this.DocumentLevelS.update(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro actualizado!', 'success');
            this.form.setValue({
              'id': '',
              'code': '',
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

