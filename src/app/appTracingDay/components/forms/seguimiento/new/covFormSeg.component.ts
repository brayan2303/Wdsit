import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CovFormDayEntity } from 'src/app/appCovid/entities/covFormDay.entity';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenSectionEntity } from 'src/app/appGeneral/entities/genSection.entity';
import { CovFormEntity } from 'src/app/appCovid/entities/covForm.entity';
import { GenDepartmentService } from 'src/app/appGeneral/services/genDepartment.service';
import { GenCityService } from 'src/app/appGeneral/services/genCity.service';
import { GenDepartmentEntity } from 'src/app/appGeneral/entities/genDepartment.entity';
import { GenCityEntity } from 'src/app/appGeneral/entities/genCity.entity';
import { CovFormSegPerService } from 'src/app/appCovid/services/covFomSegPer.service';
import { GenPositionEntity } from 'src/app/appGeneral/entities/genPosition.entity';
import { GenCountryEntity } from 'src/app/appGeneral/entities/genCountry.entity';
import { GenPositionService } from 'src/app/appGeneral/services/genPosition.service';
import { GenCountryService } from 'src/app/appGeneral/services/genCountry.service';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';

@Component({
  selector: 'app-covFormSeg',
  templateUrl: './covFormSeg.component.html',
  styleUrls: ['./covFormSeg.component.css'],

})
export class covFormSegComponent implements OnInit{
  public loading: boolean;
  countryId: number;
  departmentId: number;
  @Input() formSeg: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  covFormDayEntity: CovFormDayEntity;
  personList: GenPersonEntity[];
  fileList: File[];
  optionList: any[];
  tracingList: CovFormEntity[];
  sectionList: GenSectionEntity[];
  departmentList: GenDepartmentEntity[];
  cityList: GenCityEntity[];
  identification: number;
  id: number;
  form:FormGroup;
  date: boolean
  positionList: GenPositionEntity[];
  countryList:GenCountryEntity[];
 
  
  constructor(private genPersonS: GenPersonService,private genPositionS: GenPositionService,private genCountryS:GenCountryService, private genDepartmentS: GenDepartmentService, private genCityS: GenCityService, private route:Router,private fb: FormBuilder,private covFormSegS: CovFormSegPerService,private alertS: AlertService) {
    this.formSeg = 0;
    this.fileList = [];
    this.countryList=[];
   
  }
  
  ngOnInit(): void {
    this.formBuilders();
    this.covFormSegS.list().subscribe(res => {
      if (res.message === 'OK') {
        this.personList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
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
    this.genCountryS.listActive().subscribe(res=>{
      if(res.message==='OK'){
        this.countryList=res.object;
      }else{
        this.alertS.open(res.message,'error');
      }
    },err=>{
      this.alertS.open(err.message,'error');
    });
   
  }


  formBuilders(){
    this.form =this.fb.group({
      
      id:[,[]],
      identificationUser:[,[]],
      name:[,[]],
      creationUser:[,[]],
      creationDate:[,[]],   
      position:[,[]],
      carPosition:[,[]],
      area:[,[]],
      cityId:[,[]],
      city:[,[]],
      meetingPlace:[,[]],
      bodyPain:[,[]],
      fatigue:[,[]],
      soreThroat:[,[]],
      headache:[,[]],
      runnyNose:[,[]],
      respiratoryDistress :[,[]],
      smellStaste:[,[]],
      temperature:[,[]],
      contactPerson:[,[]],
      closeContact:[,[]],
      bloodTest:[,[]],
      noseTest:[,[]],
      positiveIsolation:[,[]],
      positiveDisability:[,[]],
      placeOutside:[,[]],
      placeInside:[,[]],
      cough:[,[]],    
      persons:[,[]],
      active:[,[]],

    })
  }

  save() {
  if(this.formSeg===0){
    this.covFormSegS.create(this.form.value).subscribe(res=>{
      if(res.message==='OK'){
          this.closeDialog.emit();
          this.alertS.open('Registro creado!','success');
      }else{
        this.alertS.open(res.message,'error');
      }        
    },err=>{
      this.alertS.open(err.message,'error');
    });
  }else{
   
  }    
}
  

getDepartment() {
  this.genDepartmentS.listActive(this.countryId).subscribe(res => {
    if (res.message === 'OK') {
      this.departmentList = res.object;
    } else {
      this.alertS.open(res.message, 'error');
    }
  }, err => {
    this.alertS.open(err.message, 'error');
  });
}

getCity() {
  this.genCityS.listActive(this.departmentId).subscribe(res => {
    if (res.message === 'OK') {
      this.cityList = res.object;
    } else {
      this.alertS.open(res.message, 'error');
    }
  }, err => {
    this.alertS.open(err.message, 'error');
  });
}

search() {
  this.tracingList = [];
  this.genPersonS.findByIdentification(this.form.get('identificationUser').value).subscribe(res => {
    if (res.message === 'OK') {
      if (res.object != null) {
        this.form.get('name').setValue(res.object.firstName + ' ' + res.object.lastName);
      } else {
        this.form.controls.Name.enable();
      }
    } else {
      this.alertS.open(res.message, 'error');
      this.form.controls.Name.enable();
    }
  }, err => {
    this.alertS.open(err.message, 'error');
  });
}

}
