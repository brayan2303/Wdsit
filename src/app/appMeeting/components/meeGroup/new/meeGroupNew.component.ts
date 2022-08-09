
import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActiveFixedSupplierEntity } from 'src/app/appActiveFixed/entities/activeFixedSupplier.entity';
import { MeeGroupEntity } from 'src/app/appMeeting/entities/meeGroup.entity';
import { MeeGroupService } from 'src/app/appMeeting/services/meeGroup.service';


@Component({
  selector: 'app-meeGroupNew',
  templateUrl: './meeGroupNew.component.html',
  styleUrls: ['./meeGroupNew.component.css']
})
export class MeeGroupNewComponent implements OnInit {
  public loading: boolean;
  @Input() meGroupformId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  meeGroupEntity:MeeGroupEntity;
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private meeGroupS:MeeGroupService, ) {
    this.meGroupformId = 0;

  }
  ngOnInit(): void {
    this.formBuilders();
    if(this.meGroupformId != 0){
      this.title="Editar Registro";
      this.meeGroupS.findById(this.meGroupformId).subscribe(res=>{
        if(res.message==='OK'){
          this.meeGroupEntity=res.object;
          this.form.setValue(
            {
              'id':this.meeGroupEntity.id,
              'name':this.meeGroupEntity.name,
              'description':this.meeGroupEntity.description,
              'active':this.meeGroupEntity.active
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
    if(this.meGroupformId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.meeGroupS.create(this.form.value).subscribe(res=>{
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
      this.meeGroupS.update(this.form.value).subscribe(res=>{
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



