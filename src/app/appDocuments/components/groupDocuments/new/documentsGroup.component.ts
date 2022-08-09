import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentsGroupEntity } from 'src/app/appDocuments/entities/DocumentsGroupEntity';
import { DocumentsGroupService } from 'src/app/appDocuments/services/DocumentsGroup.Service';
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
  selector: 'app-documentsGroup',
  templateUrl: './documentsGroup.component.html',
  styleUrls: ['./documentsGroup.component.css']
})
export class DocumentsGroupComponent implements OnInit {
  public loading: boolean;
  @Input() docGroupformId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  form: FormGroup;
  DocumentsGroupEntity: DocumentsGroupEntity

  constructor(private fb: FormBuilder, private alertS: AlertService, private DocumentsGroupS: DocumentsGroupService) {
    this.docGroupformId = 0;
  }
  ngOnInit(): void {
    this.formBuilders();
    if (this.docGroupformId != 0) {
      this.title = "Editar Grupo de Documentos";
      this.findById();
    } else {
      this.title = "Nuevo Grupo de Documentos"
    }
  }

  findById() {
    this.DocumentsGroupS.findById(this.docGroupformId).subscribe(res => {
      if (res.message === 'OK') {
        this.DocumentsGroupEntity = res.object;
        this.form.setValue(
          {
            'id': this.DocumentsGroupEntity.id,
            'code': this.DocumentsGroupEntity.code,
            'description': this.DocumentsGroupEntity.description,
            'active': this.DocumentsGroupEntity.active
          }
        );
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }



  formBuilders() {
    this.form = this.fb.group({
      id: [, []],
      code: [, [Validators.required]],
      description: [, [Validators.required]],
      active: [, []]
    })
  }

  save() {
    if (this.docGroupformId === 0) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.DocumentsGroupS.create(this.form.value).subscribe(res => {
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
      this.DocumentsGroupS.update(this.form.value).subscribe(res => {
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


