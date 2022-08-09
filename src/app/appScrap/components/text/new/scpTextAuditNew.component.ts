
import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ScpTextAudiService } from '../../services/scpTextAudi.service';
import { ScpTextAudiEntity } from 'src/app/appScrap/entities/scpTextAudi.entity';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';


@Component({
  selector: 'app-scpTextAuditNew',
  templateUrl: './scpTextAuditNew.component.html',
  styleUrls: ['./scpTextAuditNew.component.css']
})
export class ScpTextAuditNewComponent implements OnInit {
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  dataSource = new MatTableDataSource<any>();
  title:string;
  fileList: File[];
  form: FormGroup;
  scpTextAudiE:ScpTextAudiEntity
  genPersonEntity: GenPersonEntity;
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private scpTextAudiS:ScpTextAudiService) {
    this.formId = 0;
  }
  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.formBuilders();
    if(this.formId != 0){
      this.title="Editar Registro";
      this.scpTextAudiS.findById(this.formId).subscribe(res=>{
        if(res.message==='OK'){
          this.scpTextAudiE=res.object;
          this.form.setValue(
            {
              'id':this.scpTextAudiE.id,
              'name':this.scpTextAudiE.name,
              'description':this.scpTextAudiE.description,
              'active':this.scpTextAudiE.active
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
      description:[,[Validators.required]],
      active: [,[]]
      //[,[Validators.required]],
    })

  }
 
  save() {
    if(this.formId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.scpTextAudiS.create(this.genPersonEntity.id,this.form.controls.name.value, this.form.controls.description.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
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
      this.scpTextAudiS.update(this.formId,this.genPersonEntity.id,this.form.controls.name.value, this.form.controls.description.value, this.form.controls.active.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.alertS.open('Registro actualizado!','success');
            this.form.setValue({
              'id': 0,
              'name': '',
              'description': '',
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

}



