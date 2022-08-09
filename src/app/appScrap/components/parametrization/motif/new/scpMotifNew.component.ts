import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ScpMotifEntity } from 'src/app/appScrap/entities/scpMotif.entity';
import { ScpMotifService } from '../../../services/scpMotif.service';


@Component({
  selector: 'app-scpMotifNew',
  templateUrl: './scpMotifNew.component.html',
  styleUrls: ['./scpMotifNew.component.css']
})
export class ScpMotifNewComponent implements OnInit{
  @Input() motifId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  MotifEntity:ScpMotifEntity;
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private ScpMotifS:ScpMotifService) {
    this.motifId = 0;
  }
  ngOnInit(): void {
    this.formBuilders();
    if(this.motifId != 0){
      this.title="Editar Registro";
      this.ScpMotifS.findById(this.motifId).subscribe(res=>{
        if(res.message==='OK'){
          this.MotifEntity=res.object;
          this.form.setValue(
            {
              'type':this.MotifEntity.type,
              'code':this.MotifEntity.code,
              'description':this.MotifEntity.description,
              'active':this.MotifEntity.active
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
      type:[,[Validators.required]],
      code:[,[Validators.required]],
      description:[,[Validators.required]],
      active: [,[]]
    })

  }
 
  save() {
    if(this.motifId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.ScpMotifS.create(JSON.parse(localStorage.getItem('user')).id, this.form.value).subscribe(res=>{
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
      this.ScpMotifS.update(this.MotifEntity.id,this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.alertS.open('Registro actualizado!','success');
            this.form.setValue({
              'type': '',
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



