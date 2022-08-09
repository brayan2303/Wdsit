import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InvGeneralParametriEntity } from 'src/app/appInventory/entities/invGeneralParametri.entity';
import { InvGeneralParametriService } from 'src/app/appInventory/services/invGeneralParametri.service';


@Component({
  selector: 'app-invGeneralNew',
  templateUrl: './invGeneralNew.component.html',
  styleUrls: ['./invGeneralNew.component.css']
})
export class InvGeneralNewComponent implements OnInit {
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  InvGeneralParametriE:InvGeneralParametriEntity
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private invGeneralParametriS:InvGeneralParametriService) {
    this.formId = 0;

  }
  ngOnInit(): void {
    this.formBuilders();
    
    if(this.formId != 0){
      this.title="Editar Registro";
      this.invGeneralParametriS.findById(this.formId).subscribe(res=>{
        if(res.message==='OK'){
          this.InvGeneralParametriE=res.object;
          this.form.setValue(
            {
              'id':this.InvGeneralParametriE.id,
              'cod':this.InvGeneralParametriE.cod,
              'description':this.InvGeneralParametriE.description,
              'active':this.InvGeneralParametriE.active
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
      cod:[,[Validators.required]],
      description:[,[Validators.required]],
      countingType:[,[Validators.required]],
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
      this.invGeneralParametriS.create(this.form.value).subscribe(res=>{
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
      this.invGeneralParametriS.update(this.form.value).subscribe(res=>{
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




