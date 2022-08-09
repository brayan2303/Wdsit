
import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PqrFilesService } from 'src/app/appPqrs/services/pqrFiles.service';
import { PqrFilesCategoryService } from 'src/app/appPqrs/services/pqrFilesCategory.service';
import { PqrFilesCategoryEntity } from 'src/app/appPqrs/entities/pqrFilesCategory.entity';
import { PqrFilesEntity } from 'src/app/appPqrs/entities/pqrFiles.entity';

@Component({
  selector: 'app-pqrFilesNew',
  templateUrl: './pqrFilesNew.component.html',
  styleUrls: ['./pqrFilesNew.component.css']
})
export class PqrFilesNewComponent implements OnInit {
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  pqrFilesEnity:PqrFilesEntity;
  fileList: File[];
  pqrFilesList: PqrFilesCategoryEntity[];
  countryIdLocal:string;
  constructor(private pqrFilesCategoryS: PqrFilesCategoryService,private fb: FormBuilder,private alertS: AlertService, private PqrFilesS:PqrFilesService) {
    this.formId = 0;
    this.fileList = [];
    this.pqrFilesList = [];
    this.countryIdLocal = '';

  }
  ngOnInit(): void {
    this.countryIdLocal=localStorage.getItem('countryId');
    this.pqrFilesCategoryS.listAll(Number(this.countryIdLocal)).subscribe(res => {
      if (res.message === 'OK') {
        this.pqrFilesList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
    this.formBuilders();
    if(this.formId != 0){
      this.title="Editar Registro";
      this.PqrFilesS.findById(this.formId).subscribe(res=>{
        if(res.message==='OK'){
          this.pqrFilesEnity=res.object;
          this.form.setValue(
            {
              'id':this.pqrFilesEnity.id,
              'name':this.pqrFilesEnity.name,
              'typeClient': this.pqrFilesEnity.typeClient,
              'description':this.pqrFilesEnity.description,
              'active':this.pqrFilesEnity.active,
              'categoryId':this.pqrFilesEnity.categoryId
            }
          );
        }else{
          this.alertS.open(res.message,'error');
        }
      },err=>{
        this.alertS.open(err.message,'error');
      });
    }else{
      this.title="Nuevo registro";
    }
  }

  formBuilders(){
    this.form= this.fb.group({
      id: [,[]],
      name:[,[Validators.required]],
      typeClient:[,[Validators.required]],
      description:[,[Validators.required]],
      categoryId:[,[Validators.required]],
      active: [,[]]
      //[,[Validators.required]],
    })

  }
 
  save() {
    var name = this.form.get('name').value;
    if(this.formId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.PqrFilesS.create(this.form.value,Number(this.countryIdLocal)).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.pqrFilesEnity= res.object
            this.loadFile(name);
            this.closeDialog.emit();
            this.alertS.open('Registro creado','success');
          }else{
            this.alertS.open(res.message,'error');
          }
        }else{
          this.alertS.open(res.message,'error');
        }        
      },err=>{
        this.alertS.open(err.message,'error');
      });
    }else{
      this.PqrFilesS.update(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.alertS.open('Registro actualizado!','success');
            this.form.setValue({
              'id': 0,
              'name': '',
              'typeClient': '',
              'description': '',
              'categoryId':0,
              'active': ''
            });
            this.closeDialog.emit();
          }else{
            this.alertS.open(res.message,'error');
          }
        }else{
          this.alertS.open(res.message,'error');
        }        
      },err=>{
        this.alertS.open(err.message,'error');
      });
    }       
 
}
loadFile(name: string)  {
  this.PqrFilesS.loadFile(name, this.fileList).subscribe(res => {
    if (res.message === 'OK') {

      if (res.object != 0) {
        this.fileList = [];
      } else {
        this.alertS.open('Error al cargar el archivo!', 'error');
      }
    } else {
      this.alertS.open(res.message, 'error');
    }
  }, err => {
    this.alertS.open(err.message, 'error');
  });
}
addFile(file: FileList) {
  if (file != undefined) {
    for (let i = 0; i < file.length; i++) {
      this.fileList.push(file[i]);
    }
  }
}

removeFile(i: number) {
  this.fileList.splice(i, 1);
}


}



