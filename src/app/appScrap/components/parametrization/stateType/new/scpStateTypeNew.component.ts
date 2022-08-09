import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ScpStateTypeService } from '../../../services/scpStateType.service';
import { ScpAuditStateTypeEntity } from 'src/app/appScrap/entities/scpAuditStateType.entity';


@Component({
  selector: 'app-scpStateTypeNew',
  templateUrl: './scpStateTypeNew.component.html',
  styleUrls: ['./scpStateTypeNew.component.css']
})
export class ScpStateTypeNewComponent implements OnInit{
  @Input() stateTypeId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  StateTypeEntity:ScpAuditStateTypeEntity;
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private StateTypeS:ScpStateTypeService) {
    this.stateTypeId = 0;
  }
  ngOnInit(): void {
    this.formBuilders();
    if(this.stateTypeId != 0){
      this.title="Editar Registro";
      this.StateTypeS.findById(this.stateTypeId).subscribe(res=>{
        if(res.message==='OK'){
          this.StateTypeEntity=res.object;
          this.form.setValue(
            {
              'code':this.StateTypeEntity.code,
              'description':this.StateTypeEntity.description,
              'active':this.StateTypeEntity.active
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
      code:[,[Validators.required]],
      description:[,[Validators.required]],
      active: [,[]]
    })

  }
 
  save() {
    if(this.stateTypeId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.StateTypeS.create(JSON.parse(localStorage.getItem('user')).id, this.form.value).subscribe(res=>{
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
      this.StateTypeS.update(this.StateTypeEntity.id,this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.alertS.open('Registro actualizado!','success');
            this.form.setValue({
              'code': '',
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



