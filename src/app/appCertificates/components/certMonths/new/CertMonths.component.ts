import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { YearEntity } from 'src/app/appCertificates/entities/yearEntity.entity';
import { CertYearService } from 'src/app/appCertificates/servicies/certYear.service';
import { CertMonthService } from 'src/app/appCertificates/servicies/certMonth.service';
import { MonthEntity } from 'src/app/appCertificates/entities/monthEntity.entity';


@Component({
  selector: 'app-certMonthsNew',
  templateUrl: './CertMonths.component.html',
  styleUrls: ['./CertMonths.component.css']
})
export class CertificateMonthsNewComponent implements OnInit {
  public loading: boolean;
  @Input() MonthId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  monthEntity:MonthEntity;
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private MonthS:CertMonthService) {
    this.MonthId = 0;
    
  }
  ngOnInit(): void {
    this.formBuilders();
    if(this.MonthId != 0){
      this.title="Editar Registro";
      this.MonthS.findById(this.MonthId).subscribe(res=>{
        if(res.message==='OK'){
          this.monthEntity=res.object;
          this.form.setValue(
            {
              'id':this.monthEntity.id,
              'name':this.monthEntity.name,
              'active':this.monthEntity.active
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
      active: [,[]]
    })

  }
 
  save() {
    if(this.MonthId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.MonthS.create(this.form.value).subscribe(res=>{
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
      this.MonthS.update(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.alertS.open('Registro actualizado!','success');
            this.form.setValue({
              'id': 0,
              'name': '',
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



