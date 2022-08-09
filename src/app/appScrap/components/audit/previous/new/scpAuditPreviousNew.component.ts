import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ScpAuditPreviousService } from '../../../services/scpAuditPrevious.service';
import { ScpAuditPreviousEntity } from 'src/app/appScrap/entities/scpAuditPrevious.entity';
import { GenPersonCustomerService } from 'src/app/appGeneral/services/genPersonCustomer.service';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';


@Component({
  selector: 'app-scpAuditPreviousNew',
  templateUrl: './scpAuditPreviousNew.component.html',
  styleUrls: ['./scpAuditPreviousNew.component.css']
})
export class ScpAuditPreviousNewComponent implements OnInit{
  @Input() auditPreviousId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  auditPreviousE:ScpAuditPreviousEntity;
  customerList:GenCustomerEntity[];
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private AuditPreviousS:ScpAuditPreviousService, private GenCustomerS:GenPersonCustomerService) {
    this.auditPreviousId = 0;
    this.customerList=[];
  }
  ngOnInit(): void {
    this.formBuilders();
    this.getAllCustomer();
    if(this.auditPreviousId != 0){
      this.title="Editar Registro";
      this.AuditPreviousS.findById(this.auditPreviousId).subscribe(res=>{
        if(res.message==='OK'){
          this.auditPreviousE=res.object;
          this.form.setValue(
            {
              'name':this.auditPreviousE.name,
              'customerId':this.auditPreviousE.customerId,
              'active':this.auditPreviousE.active
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
      customerId:[,[Validators.required]],
      active: [,[]]
    })

  }
 
  save() {
    if(this.auditPreviousId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.AuditPreviousS.create(JSON.parse(localStorage.getItem('user')).id, this.form.value).subscribe(res=>{
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
      this.AuditPreviousS.update(this.auditPreviousE.id,this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.alertS.open('Registro actualizado!','success');
            this.form.setValue({
              'name': '',
              'customerId': '',
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

getAllCustomer(){
  this.GenCustomerS.listCustomer(JSON.parse(localStorage.getItem('user')).id, Number(localStorage.getItem('countryId'))).subscribe(res=>{
    if(res.message==='OK'){
      this.customerList=res.object;
    }else{
      this.alertS.open(res.message,'error');
    }
  },err=>{
    this.alertS.open(err.message,'error');
  });
}

}



