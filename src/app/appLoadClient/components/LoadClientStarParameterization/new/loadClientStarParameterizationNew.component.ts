import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadClientStarParameterizationService } from 'src/app/appLoadClient/services/loadClientStarParameterization.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { LoadClientStarParameterizationEntity } from 'src/app/appLoadClient/entities/loadClientStarParameterization.entity';
import { LoadClientStarParameterizationModel } from 'src/app/appLoadClient/models/LoadClientStarParameterization.model';


@Component({
  selector: 'app-loadClientStarParameterizationNew',
  templateUrl: './loadClientStarParameterizationNew.component.html',
  styleUrls: ['./loadClientStarParameterizationNew.component.css']
})
export class LoadClientStarParameterizationNewComponent implements OnInit {
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  genPersonEntity: GenPersonEntity;
  LoadClientStarParameterizationE:LoadClientStarParameterizationEntity;
  customerList:LoadClientStarParameterizationModel[];
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private LoadClientStarParameterizationS:LoadClientStarParameterizationService) {
    this.formId = 0;
    this.customerList = [];

  }
  ngOnInit(): void {
    this.getCustomers();
    this.formBuilders();
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    if(this.formId != 0){
      this.title="Editar Registro";
      this.LoadClientStarParameterizationS.findById(this.formId).subscribe(res=>{
        if(res.message==='OK'){
          this.LoadClientStarParameterizationE=res.object;
          this.form.setValue(
            {
              'id':this.LoadClientStarParameterizationE.id,
              'customerId':this.LoadClientStarParameterizationE.customerId,
              'description':this.LoadClientStarParameterizationE.description,
              'active':this.LoadClientStarParameterizationE.active
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
      customerId:[,[Validators.required]],
      description:[,[Validators.required]],
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
      this.LoadClientStarParameterizationS.create(this.form.value, this.genPersonEntity.id).subscribe(res=>{
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
      this.LoadClientStarParameterizationS.update(this.form.value, this.genPersonEntity.id).subscribe(res=>{
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

 getCustomers(){
   this.LoadClientStarParameterizationS.listCustomer().subscribe(resC =>{
     if(resC.message === 'OK'){
      this.customerList = resC.object;
     }else{
       this.alertS.open(resC.message,'error')
     }
   },err=>{
        this.alertS.open(err.message, 'error')
   })
 } 
}




