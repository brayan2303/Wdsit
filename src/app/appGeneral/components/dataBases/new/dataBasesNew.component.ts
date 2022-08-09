import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConnectioGeneralEntity } from 'src/app/appGeneral/entities/genDataBases.entity';
import { ConnectioGeneralService } from 'src/app/appGeneral/services/genDataBases.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCountryEntity } from 'src/app/appGeneral/entities/genCountry.entity';


@Component({
  selector: 'app-dataBasesNew',
  templateUrl: './dataBasesNew.component.html',
  styleUrls: ['./dataBasesNew.component.css']
})
export class DataBasesNewComponent implements OnInit {
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  form: FormGroup;
  ConnectioGeneralE:ConnectioGeneralEntity;
  genPersonEntity: GenPersonEntity;
  customerList:GenCustomerEntity[];
  countryList:GenCountryEntity[];
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private ConnectioGeneralS:ConnectioGeneralService) {
    this.formId = 0;
    this.customerList = [];

  }
  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.formBuilders();
    this.getCustomer();
    this.getCountry();
    
    if(this.formId != 0){
      this.title="Editar Registro";
      this.ConnectioGeneralS.findById(this.formId).subscribe(res=>{
        if(res.message==='OK'){
          this.ConnectioGeneralE=res.object;
          this.form.setValue(
            {
              'id':this.ConnectioGeneralE.id,
              'customerId':this.ConnectioGeneralE.customerId,
              'countryId':this.ConnectioGeneralE.countryId,
              'driver':this.ConnectioGeneralE.driver,
              'url':this.ConnectioGeneralE.url,
              'name':this.ConnectioGeneralE.name,
              'password':this.ConnectioGeneralE.password,
              'active':this.ConnectioGeneralE.active
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
      customerId:[,[]],
      countryId:[,[Validators.required]],
      driver:[,[Validators.required]],
      url:[,[Validators.required]],
      name:[,[Validators.required]],
      password:[,[Validators.required]],
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
      this.ConnectioGeneralS.create(this.form.value, this.genPersonEntity.id).subscribe(res=>{
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
      this.ConnectioGeneralS.update(this.form.value, this.genPersonEntity.id).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Registro actualizado!','success');
            this.form.setValue({
              'id': 0,
              'name': '',
              'description': '',
              'active': ''
            });
        
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

  getCustomer() {
    this.ConnectioGeneralS.findAll().subscribe(res => {
      if (res.message === 'OK') {
        this.customerList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  getCountry() {
    this.ConnectioGeneralS.listCountry().subscribe(res => {
      if (res.message === 'OK') {
        this.countryList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
}




