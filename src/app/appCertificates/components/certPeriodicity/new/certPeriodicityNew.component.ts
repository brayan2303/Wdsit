import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CertPeriodicityService } from 'src/app/appCertificates/servicies/certPeriodicity.service';
import { PeriodicityEntity } from 'src/app/appCertificates/entities/periodicityEntity.entity';


@Component({
  selector: 'app-certPeriodicityNew',
  templateUrl: './certPeriodicityNew.component.html',
  styleUrls: ['./certPeriodicityNew.component.css']
})
export class CertificatePeriodicityNewComponent implements OnInit{
  public loading: boolean;
  @Input() PeriodicityId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  PeriodicityEntity:PeriodicityEntity;
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private PeriodicityS:CertPeriodicityService) {
    this.PeriodicityId = 0;
  }
  ngOnInit(): void {
    this.formBuilders();
    if(this.PeriodicityId != 0){
      this.title="Editar Registro";
      this.PeriodicityS.findById(this.PeriodicityId).subscribe(res=>{
        if(res.message==='OK'){
          this.PeriodicityEntity=res.object;
          this.form.setValue(
            {
              'id':this.PeriodicityEntity.id,
              'periodicity':this.PeriodicityEntity.periodicity,
              'active':this.PeriodicityEntity.active
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
      periodicity:[,[Validators.required]],
      active: [,[]]
    })

  }
 
  save() {
    if(this.PeriodicityId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.PeriodicityS.create(this.form.value).subscribe(res=>{
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
      this.PeriodicityS.update(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.alertS.open('Registro actualizado!','success');
            this.form.setValue({
              'id': 0,
              'periodicity': '',
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



