import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { YearEntity } from 'src/app/appCertificates/entities/yearEntity.entity';
import { CertYearService } from 'src/app/appCertificates/servicies/certYear.service';


@Component({
  selector: 'app-certYearNew',
  templateUrl: './YearNew.component.html',
  styleUrls: ['./YearNew.component.css']
})
export class CertificateYearNewComponent implements OnInit {
  public loading: boolean;
  @Input() YearId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  yearEntity:YearEntity;
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private YearS:CertYearService) {
    this.YearId = 0;
    
  }
  ngOnInit(): void {
    this.formBuilders();
    if(this.YearId != 0){
      this.title="Editar Registro";
      this.YearS.findById(this.YearId).subscribe(res=>{
        if(res.message==='OK'){
          this.yearEntity=res.object;
          this.form.setValue(
            {
              'id':this.yearEntity.id,
              'year':this.yearEntity.year,
              'active':this.yearEntity.active
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
      year:[,[Validators.required]],
      active: [,[]]
    })

  }
 
  save() {
    if(this.YearId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.YearS.create(this.form.value).subscribe(res=>{
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
      this.YearS.update(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.alertS.open('Registro actualizado!','success');
            this.form.setValue({
              'id': 0,
              'year': '',
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



