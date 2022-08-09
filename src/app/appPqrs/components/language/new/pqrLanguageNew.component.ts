import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PqrLanguageEntity } from 'src/app/appPqrs/entities/pqrLanguage.entity';
import { PqrLanguageService } from 'src/app/appPqrs/services/pqrLanguage.service';


@Component({
  selector: 'app-pqrLanguageNew',
  templateUrl: './pqrLanguageNew.component.html',
  styleUrls: ['./pqrLanguageNew.component.css']
})
export class PqrLanguageNewComponent implements OnInit {
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  pqrLanguageE: PqrLanguageEntity;
  countryIdLocal:string;
  constructor(private fb: FormBuilder,private alertS: AlertService,private PqrLanguageS:PqrLanguageService) {
    this.formId = 0;
    this.countryIdLocal= '';

  }
  ngOnInit(): void {
    this.formBuilders();
    this.countryIdLocal=localStorage.getItem('countryId');
    if(this.formId != 0){
      this.title="Editar Registro";
      this.PqrLanguageS.findById(this.formId).subscribe(res=>{
        if(res.message==='OK'){
          this.pqrLanguageE=res.object;
          this.form.setValue(
            {
              'id':this.pqrLanguageE.id,
              'name':this.pqrLanguageE.name,
              'description':this.pqrLanguageE.description,
              'active':this.pqrLanguageE.active
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
      this.PqrLanguageS.create(this.form.value,Number(this.countryIdLocal)).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.form.reset();
            this.alertS.open('Registro creado!','success');
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
      this.PqrLanguageS.update(this.form.value).subscribe(res=>{
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




