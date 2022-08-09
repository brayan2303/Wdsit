
import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ScpTextAudiService } from '../../services/scpTextAudi.service';
import { ScpTextAudiEntity } from 'src/app/appScrap/entities/scpTextAudi.entity';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { ScpCertificateEntity } from 'src/app/appScrap/entities/scpCertificate.entity';
import { ScpCertificateService } from '../../services/scpCertificate.service';


@Component({
  selector: 'app-scpCertificateNew',
  templateUrl: './scpCertificateNew.component.html',
  styleUrls: ['./scpCertificateNew.component.css']
})
export class ScpCertificateNewComponent implements OnInit {
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  dataSource = new MatTableDataSource<any>();
  title:string;
  fileList: File[];
  form: FormGroup;
  scpCertificateE:ScpCertificateEntity
  genPersonEntity: GenPersonEntity;
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private scpCertificateS:ScpCertificateService) {
    this.formId = 0;
  }
  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.formBuilders();
    if(this.formId != 0){
      this.title="Editar Registro";
      this.scpCertificateS.findById(this.formId).subscribe(res=>{
        if(res.message==='OK'){
          this.scpCertificateE=res.object;
          this.form.setValue(
            {
              'id':this.scpCertificateE.id,
              'name':this.scpCertificateE.name,
              'description':this.scpCertificateE.description,
              'active':this.scpCertificateE.active
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
      this.scpCertificateS.create(this.genPersonEntity.id,this.form.controls.name.value, this.form.controls.description.value).subscribe(res=>{
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
      this.scpCertificateS.update(this.formId,this.genPersonEntity.id,this.form.controls.name.value, this.form.controls.description.value, this.form.controls.active.value).subscribe(res=>{
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



