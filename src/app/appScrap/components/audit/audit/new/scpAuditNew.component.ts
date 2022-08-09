import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GenPersonCustomerService } from 'src/app/appGeneral/services/genPersonCustomer.service';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { ScpAuditEntity } from 'src/app/appScrap/entities/scpAudit.entity';
import { ScpAuditPreviousService } from '../../../services/scpAuditPrevious.service';
import { ScpAuditPreviousEntity } from 'src/app/appScrap/entities/scpAuditPrevious.entity';
import { ScpAuditService } from '../../../services/scpAudit.service';
import { ScpLevelRuleService } from '../../../services/scpLevelRule.service';
import { ScpStateTypeService } from '../../../services/scpStateType.service';
import { ScpAuditStateTypeEntity } from 'src/app/appScrap/entities/scpAuditStateType.entity';
import { ScpAuditLevelRuleEntity } from 'src/app/appScrap/entities/scpAuditLevelRule.entity';


@Component({
  selector: 'app-scpAuditNew',
  templateUrl: './scpAuditNew.component.html',
  styleUrls: ['./scpAuditNew.component.css']
})
export class ScpAuditNewComponent implements OnInit{
  @Input() auditId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  auditE:ScpAuditEntity;
  auditPreviousList:ScpAuditPreviousEntity[];
  typeAuditList:ScpAuditStateTypeEntity[];
  levelRuleList:ScpAuditLevelRuleEntity[];
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private AuditS:ScpAuditService, private AuditPreviousS:ScpAuditPreviousService, private levelRuleS:ScpLevelRuleService, private typeAuditS:ScpStateTypeService) {
    this.auditId = 0;
    this.auditPreviousList=[];
    this.typeAuditList=[];
    this.levelRuleList=[];
  }
  ngOnInit(): void {
    this.formBuilders();
    this.getAllAuditPrevious();
    this.getAllLevelRule();
    this.getAllTypeAudit();
    if(this.auditId != 0){
      this.title="Editar Registro";
      this.getAllAuditPreviousAll();
      this.AuditS.findById(this.auditId).subscribe(res=>{
        if(res.message==='OK'){
          this.auditE=res.object;
          this.form.setValue(
            {
              'auditPreviousId':this.auditE.auditPreviousId,
              'levelRuleId':this.auditE.levelRuleId,
              'typeAudit':this.auditE.typeAudit,
              'active':this.auditE.active
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
      auditPreviousId:[,[Validators.required]],
      levelRuleId:[,[Validators.required]],
      typeAudit:[,[Validators.required]],
      active: [,[]]
    })

  }
 
  save() {
    console.log(this.form.value);
    if(this.auditId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.AuditS.create(JSON.parse(localStorage.getItem('user')).id, this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Registro creado','success');
            this.auditPreviousList=[];
            this.typeAuditList=[];
            this.levelRuleList=[];
            this.getAllAuditPrevious();
            this.getAllLevelRule();
            this.getAllTypeAudit();
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
      this.AuditS.update(this.auditE.id,this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.alertS.open('Registro actualizado!','success');
            this.form.setValue({
              'auditPreviousId':'',
              'levelRuleId':'',
              'typeAudit':'',
              'active':''
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

getAllAuditPrevious(){
  this.AuditPreviousS.listAudit().subscribe(res=>{
    if(res.message==='OK'){
      this.auditPreviousList=res.object;
    }else{
      this.alertS.open(res.message,'error');
    }
  },err=>{
    this.alertS.open(err.message,'error');
  });
}

getAllAuditPreviousAll(){
  this.AuditPreviousS.list().subscribe(res=>{
    if(res.message==='OK'){
      this.auditPreviousList=res.object;
    }else{
      this.alertS.open(res.message,'error');
    }
  },err=>{
    this.alertS.open(err.message,'error');
  });
}

getAllLevelRule(){
  this.levelRuleS.list().subscribe(res=>{
    if(res.message==='OK'){
      this.levelRuleList=res.object;
    }else{
      this.alertS.open(res.message,'error');
    }
  },err=>{
    this.alertS.open(err.message,'error');
  });
}


getAllTypeAudit(){
  this.typeAuditS.list().subscribe(res=>{
    if(res.message==='OK'){
      this.typeAuditList=res.object;
    }else{
      this.alertS.open(res.message,'error');
    }
  },err=>{
    this.alertS.open(err.message,'error');
  });
}

}



