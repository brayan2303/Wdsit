import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CertEntity } from 'src/app/appCertificates/entities/certEntity.entity';
import { CertCertService } from 'src/app/appCertificates/servicies/certCert.service';


@Component({
  selector: 'app-certCertNew',
  templateUrl: './certCertNew.component.html',
  styleUrls: ['./certCertNew.component.css']
})
export class CertificateCertNewComponent implements OnInit{
  public loading: boolean;
  @Input() CertId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  CertEntity:CertEntity;
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private CertS:CertCertService) {
    this.CertId = 0;
  }
  ngOnInit(): void {
    this.formBuilders();
    if(this.CertId != 0){
      this.title="Editar Registro";
      this.CertS.findById(this.CertId).subscribe(res=>{
        if(res.message==='OK'){
          this.CertEntity=res.object;
          this.form.setValue(
            {
              'id':this.CertEntity.id,
              'name':this.CertEntity.name,
              'porcentaje':this.CertEntity.porcentaje,
              'active':this.CertEntity.active
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
      porcentaje:[,[Validators.required]],
      active: [,[]]
    })

  }
 
  save() {
    if(this.CertId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.CertS.create(this.form.value).subscribe(res=>{
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
      this.CertS.update(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.alertS.open('Registro actualizado!','success');
            this.form.setValue({
              'id': 0,
              'name': '',
              'porcentaje': '',
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



