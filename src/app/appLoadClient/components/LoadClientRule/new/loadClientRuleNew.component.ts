import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadClientRuleInitService } from 'src/app/appLoadClient/services/loadClientRule.service';
import { LoadClientRuleEntity } from 'src/app/appLoadClient/entities/loadClientRule.entity';
import { LoadClientStarParameterizationService } from 'src/app/appLoadClient/services/loadClientStarParameterization.service';
import { LoadClientStarParameterizationEntity } from 'src/app/appLoadClient/entities/loadClientStarParameterization.entity';


@Component({
  selector: 'app-loadClientRuleNew',
  templateUrl: './loadClientRuleNew.component.html',
  styleUrls: ['./loadClientRuleNew.component.css']
})
export class LoadClientRuleNewComponent implements OnInit {
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  LoadClientRuleEntity:LoadClientRuleEntity;
  parametrizationList:LoadClientStarParameterizationEntity[];
  constructor(private fb: FormBuilder,private alertS: AlertService,private LoadClientRuleInitS:LoadClientRuleInitService, private LoadClientStarParameterizationS:LoadClientStarParameterizationService) {
    this.formId = 0;
    this.parametrizationList = [];

  }
  ngOnInit(): void {
    this.formBuilders();
    this.parametrization();
    if(this.formId != 0){
      this.title="Editar Registro";
      this.LoadClientRuleInitS.findById(this.formId).subscribe(res=>{
        if(res.message==='OK'){
          this.LoadClientRuleEntity=res.object;
          this.form.setValue(
            {
              'id':this.LoadClientRuleEntity.id,
              'name':this.LoadClientRuleEntity.name,
              'description':this.LoadClientRuleEntity.description,
              'customerId':this.LoadClientRuleEntity.customerId,
              'active':this.LoadClientRuleEntity.active
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
      customerId:[,[Validators.required]],
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
      this.LoadClientRuleInitS.create(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
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
      this.LoadClientRuleInitS.update(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.alertS.open('Registro actualizado!','success');
            this.form.setValue({
              'id': 0,
              'name': '',
              'description': '',
              'customerId': 0,
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
 
  parametrization(){
   this.LoadClientStarParameterizationS.list().subscribe(resP =>{
     if(resP.message === 'OK'){
        if(resP.object !=0){
          this.parametrizationList= resP.object;
        }else{
          this.alertS.open(resP.message, 'error');
        }
     }else{
       this.alertS.open(resP.message, 'error');
     }
   },err=>{
    this.alertS.open(err.message, 'error');
   });   
  }
}




