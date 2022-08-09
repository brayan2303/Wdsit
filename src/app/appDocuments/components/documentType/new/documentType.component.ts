import { Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { DocumentTypeEntity } from "src/app/appDocuments/entities/DocumentTypeEntity";
import { documentTypeModel } from "src/app/appDocuments/models/documentType.model";
import { DocumentsTypeService } from "src/app/appDocuments/services/DocumentType.Service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { GenPersonService } from "src/app/appGeneral/services/genPerson.service";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
  selector: 'app-documentType',
  templateUrl: './documentType.component.html',
  styleUrls: ['./documentType.component.css']
})
export class DocumentTypeComponent implements OnInit {
  public loading: boolean;
  @Input() docTypeformId: number;
  @Output() closeDialog = new EventEmitter<any>();
  dataSource = new MatTableDataSource<any>();
  TypeList: documentTypeModel[];
  LevelList: documentTypeModel[];
  form: FormGroup;
  tittle: string;
  genPersonEntity: GenPersonEntity;
  DocumentTypeE: DocumentTypeEntity;

  
  constructor(private fb: FormBuilder, private alertS: AlertService, private genPersonS: GenPersonService, private DocumentTypeS: DocumentsTypeService) {
    this.docTypeformId = 0;
    this.TypeList = [];
    this.LevelList = [];
    this.DocumentTypeE = new DocumentTypeEntity();
    this.dataSource = new MatTableDataSource([]);
  }
  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.formBuilders();
    this.listType();
    this.listLevel();
    if (this.docTypeformId != 0) {
      this.tittle = "Editar Tipo de Documento";
      this.findById();
    } else{
      this.tittle ="Nuevo Tipo de Documento";
    }
  }

  findById(){
    this.DocumentTypeS.findById(this.docTypeformId).subscribe(res => {
      if (res.message === 'OK') {
        this.DocumentTypeE = res.object;
        this.form.setValue(
          {
            'id':this.DocumentTypeE.id,
            'groupDocument':this.DocumentTypeE.groupDocument,
            'description':this.DocumentTypeE.description,
            'idGroup':this.DocumentTypeE.idGroup,
            'active':this.DocumentTypeE.active,
            'idCode': this.DocumentTypeE.idCode
          }
        );
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  listType(){
    this.DocumentTypeS.listType().subscribe(res => {
      if (res.message === 'OK') {
        this.TypeList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  listLevel(){
    this.DocumentTypeS.listLevel().subscribe(res => {
      if (res.message === 'OK') {
        this.LevelList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  formBuilders() {
    this.form = this.fb.group({
      id:[, []],
      groupDocument: [, [Validators.required]],
      description: [, [Validators.required]],
      idGroup: [, [Validators.required]],
      active: [, []],
      idCode: [,[Validators.required]]
    })
  }

  save() {
    if (this.docTypeformId === 0) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.DocumentTypeS.create(this.genPersonEntity.id, this.form.controls.groupDocument.value, this.form.controls.description.value,
        this.form.controls.idGroup.value,this.form.controls.idCode.value).subscribe(res => {
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
      this.DocumentTypeS.update(this.genPersonEntity.id, this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro actualizado!', 'success');
            this.form.setValue({
              'id': '',
              'groupDocument': '',
              'description': '',
              'idGroup': '',
              'active': '',
              'idCode': ''
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
