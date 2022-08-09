import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ActiveFixedSupplierEntity } from 'src/app/appActiveFixed/entities/activeFixedSupplier.entity';
import { ActiveFixedSupplierService } from 'src/app/appActiveFixed/services/activeFixedSupplier.service';


@Component({
  selector: 'app-actSuppliersNew',
  templateUrl: './actSuppliersNew.component.html',
  styleUrls: ['./actSuppliersNew.component.css']
})
export class ActSuppliersNewComponent implements OnInit {
  public loading: boolean;
  @Input() ActFixformId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  activeFixedEntity:ActiveFixedSupplierEntity
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private ActiveFixedS:ActiveFixedSupplierService) {
    this.ActFixformId = 0;

  }
  ngOnInit(): void {
    this.formBuilders();
    
    if(this.ActFixformId != 0){
      this.title="Editar Registro";
      this.ActiveFixedS.findById(this.ActFixformId).subscribe(res=>{
        if(res.message==='OK'){
          this.activeFixedEntity=res.object;
          this.form.setValue(
            {
              'id':this.activeFixedEntity.id,
              'name':this.activeFixedEntity.name,
              'description':this.activeFixedEntity.description,
              'active':this.activeFixedEntity.active
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
    if(this.ActFixformId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.ActiveFixedS.create(this.form.value).subscribe(res=>{
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
      this.ActiveFixedS.update(this.form.value).subscribe(res=>{
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




