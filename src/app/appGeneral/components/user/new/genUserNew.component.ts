import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GenCenterCostService } from '../../../services/genCenterCost.service';
import { GenPositionService } from '../../../services/genPosition.service';
import { GenCityService } from '../../../services/genCity.service';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { GenCenterCostEntity } from 'src/app/appGeneral/entities/genCenterCost.entity';
import { GenPositionEntity } from 'src/app/appGeneral/entities/genPosition.entity';
import { GenCityEntity } from 'src/app/appGeneral/entities/genCity.entity';
import { GenCountryService } from 'src/app/appGeneral/services/genCountry.service';
import { GenDepartmentService } from 'src/app/appGeneral/services/genDepartment.service';
import { GenCountryEntity } from 'src/app/appGeneral/entities/genCountry.entity';
import { GenDepartmentEntity } from 'src/app/appGeneral/entities/genDepartment.entity';
import { createPasswordStrengthValidator } from 'src/app/shared/components/updatePassword/validatePassword';

@Component({
  selector: 'app-genUserNew',
  templateUrl: './genUserNew.component.html',
  styleUrls: ['./genUserNew.component.css']
})
export class GenUserNewComponent implements OnInit {
  @Input()personId:number;
  @Output() closeDialog = new EventEmitter<any>();
  title:string;
  genPersonEntity:GenPersonEntity;
  newForm = new FormGroup({
    id: new FormControl(''),
    identification: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(16), createPasswordStrengthValidator()]),
    mail: new FormControl(''),
    centerCostId: new FormControl('', Validators.required),
    positionId: new FormControl('', Validators.required),
    cityId: new FormControl('', Validators.required),
    active: new FormControl('')
  });
  centerCostList: GenCenterCostEntity[];
  positionList: GenPositionEntity[];
  countryList:GenCountryEntity[];
  departmentList:GenDepartmentEntity[];
  cityList: GenCityEntity[];
  countryId:number;
  departmentId:number;

  constructor(private genPersonS:GenPersonService,private genCenterCostS: GenCenterCostService, private genPositionS: GenPositionService,private genCountryS:GenCountryService,private genDepartmentS:GenDepartmentService, private genCityS: GenCityService,private alertS:AlertService) {
    this.personId=0;
    this.countryId=0;
    this.departmentId=0;
    this.countryList=[];
    this.departmentList=[];
    this.cityList=[];
  }
  ngOnInit() {
    this.genCountryS.listActive().subscribe(res=>{
      if(res.message==='OK'){
        this.countryList=res.object;
      }else{
        this.alertS.open(res.message,'error');
      }
    },err=>{
      this.alertS.open(err.message,'error');
    });
    this.genCenterCostS.findAll().subscribe(res => {
      if(res.message==='OK'){
        this.centerCostList = res.object;
      }else{
        this.alertS.open(res.message,'error');
      }
    }, err => {
      this.alertS.open(err.message,'error');
    });
    this.genPositionS.findAll().subscribe(res => {
      if(res.message==='OK'){
        this.positionList = res.object;
      }else{
        this.alertS.open(res.message,'error');
      }
    }, err => {
      this.alertS.open(err.message,'error');
    });
    if(this.personId != 0){
      this.title="Editar Usuario";
      this.genPersonS.findById(this.personId).subscribe(res=>{
        if(res.message==='OK'){
          this.genPersonEntity=res.object;
          this.newForm.setValue(
            {
              'id':this.genPersonEntity.id,
              'identification':this.genPersonEntity.identification,
              'firstName':this.genPersonEntity.firstName,
              'lastName':this.genPersonEntity.lastName,
              'userName':this.genPersonEntity.userName,
              'password':this.genPersonEntity.password,
              'mail':this.genPersonEntity.mail,
              'centerCostId':this.genPersonEntity.centerCostId,
              'positionId':this.genPersonEntity.positionId,
              'cityId':this.genPersonEntity.cityId,
              'active':this.genPersonEntity.active
            }
          );
          this.countryId=this.genPersonEntity.countryId;
          this.departmentId=this.genPersonEntity.departmentId;
          this.getDepartment();
          this.getCity();
        }else{
          this.alertS.open(res.message,'error');
        }
      },err=>{
        this.alertS.open(err.message,'error');
      });
    }else{
      this.title="Nuevo Usuario";
    }
  }
  onClick(){
    if(this.personId===0){
      this.genPersonS.create(this.newForm.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Usuario creado!','success');
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
      this.genPersonS.update(this.newForm.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Usuario actualizado!','success');
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
  getDepartment(){
    this.genDepartmentS.listActive(this.countryId).subscribe(res=>{
      if(res.message==='OK'){
        this.departmentList=res.object;
      }else{
        this.alertS.open(res.message,'error');
      }
    },err=>{
      this.alertS.open(err.message,'error');
    });
  }
  getCity(){
    this.genCityS.listActive(this.departmentId).subscribe(res=>{
      if(res.message==='OK'){
        this.cityList=res.object;
      }else{
        this.alertS.open(res.message,'error');
      }
    },err=>{
      this.alertS.open(err.message,'error');
    });
  }
}
