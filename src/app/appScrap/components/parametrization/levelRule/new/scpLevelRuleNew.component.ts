import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ScpLevelRuleService } from '../../../services/scpLevelRule.service';
import { ScpAuditLevelRuleEntity } from 'src/app/appScrap/entities/scpAuditLevelRule.entity';


@Component({
  selector: 'app-scpLevelRuleNew',
  templateUrl: './scpLevelRuleNew.component.html',
  styleUrls: ['./scpLevelRuleNew.component.css']
})
export class ScpLevelRuleNewComponent implements OnInit{
  @Input() levelRuleId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  LevelRuleEntity:ScpAuditLevelRuleEntity;
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private LevelRuleS:ScpLevelRuleService) {
    this.levelRuleId = 0;
  }
  ngOnInit(): void {
    this.formBuilders();
    if(this.levelRuleId != 0){
      this.title="Editar Registro";
      this.LevelRuleS.findById(this.levelRuleId).subscribe(res=>{
        if(res.message==='OK'){
          this.LevelRuleEntity=res.object;
          this.form.setValue(
            {
              'name':this.LevelRuleEntity.name,
              'active':this.LevelRuleEntity.active
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
      name:[,[Validators.required]],
      active: [,[]]
    })

  }
 
  save() {
    if(this.levelRuleId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.LevelRuleS.create(JSON.parse(localStorage.getItem('user')).id, this.form.value).subscribe(res=>{
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
      this.LevelRuleS.update(this.LevelRuleEntity.id,this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.alertS.open('Registro actualizado!','success');
            this.form.setValue({
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



