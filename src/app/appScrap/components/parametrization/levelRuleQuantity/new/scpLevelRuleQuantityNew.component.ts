import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ScpLevelRuleQuantityService } from '../../../services/scpLevelRuleQuantity.service';
import { ScpAuditLevelRuleQuantityEntity } from 'src/app/appScrap/entities/scpAuditLevelRuleQuantity.entity';
import { ScpLevelRuleService } from '../../../services/scpLevelRule.service';
import { ScpAuditLevelRuleEntity } from 'src/app/appScrap/entities/scpAuditLevelRule.entity';


@Component({
  selector: 'app-scpLevelRuleQuantityNew',
  templateUrl: './scpLevelRuleQuantityNew.component.html',
  styleUrls: ['./scpLevelRuleQuantityNew.component.css']
})
export class ScpLevelRuleQuantityNewComponent implements OnInit{
  @Input() levelRuleQuantityId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  LevelRuleQuantityEntity:ScpAuditLevelRuleQuantityEntity;
  levelRuleList:ScpAuditLevelRuleEntity[];
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private LevelRuleQuantityS:ScpLevelRuleQuantityService, private LevelRuleS:ScpLevelRuleService) {
    this.levelRuleQuantityId = 0;
    this.levelRuleList=[];
  }
  ngOnInit(): void {
    this.formBuilders();
    this.getAllLevelRule();
    if(this.levelRuleQuantityId != 0){
      this.title="Editar Registro de Nivel de Auditoria";
      this.getById(this.levelRuleQuantityId);
    }else{
      this.title="Nuevo registro de Nivel de Auditoria";
    }
  }

  getById(levelRuleQuantityId:number){
    this.LevelRuleQuantityS.findById(levelRuleQuantityId).subscribe(res=>{
      if(res.message==='OK'){
        this.LevelRuleQuantityEntity=res.object;
        this.form.setValue(
          {
            'levelRuleId':this.LevelRuleQuantityEntity.levelRuleId,
            'quantityMin':this.LevelRuleQuantityEntity.quantityMin,
            'quantityMax':this.LevelRuleQuantityEntity.quantityMax,
            'noveltyAccepted':this.LevelRuleQuantityEntity.noveltyAccepted,
            'noveltyRejected':this.LevelRuleQuantityEntity.noveltyRejected,
            'show':this.LevelRuleQuantityEntity.show,
            'active':this.LevelRuleQuantityEntity.active
          }
        );
      }else{
        this.alertS.open(res.message,'error');
      }
    },err=>{
      this.alertS.open(err.message,'error');
    });
  }

  formBuilders(){
    this.form= this.fb.group({
      levelRuleId:[,[Validators.required]],
      quantityMin:[,[Validators.required]],
      quantityMax:[,[Validators.required]],
      noveltyAccepted:[,[]],
      noveltyRejected:[,[]],
      show:[,[Validators.required]],
      active: [,[]]
    })

  }
 
  save() {
    if(this.levelRuleQuantityId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.LevelRuleQuantityS.create(JSON.parse(localStorage.getItem('user')).id, this.form.value).subscribe(res=>{
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
      this.LevelRuleQuantityS.update(this.LevelRuleQuantityEntity.id,this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.alertS.open('Registro actualizado!','success');
            this.form.setValue({
              'levelRuleId':'',
              'quantityMin':'',
              'quantityMax':'',
              'noveltyAccepted':'',
              'noveltyRejected':'',
              'show':'',
              'active':'',
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

  getAllLevelRule(){
    this.LevelRuleS.list().subscribe(res => {
      if (res.message === 'OK') {
        this.levelRuleList = res.object;
      } else {
          this.alertS.open(res.message, 'error');
      }
    }, err => {
        this.alertS.open(err.message, 'error');
    });
  }

}



