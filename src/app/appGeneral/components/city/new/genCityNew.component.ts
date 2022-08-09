import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenCityService } from 'src/app/appGeneral/services/genCity.service';
import { GenCityEntity } from 'src/app/appGeneral/entities/genCity.entity';
import { GenCountryEntity } from 'src/app/appGeneral/entities/genCountry.entity';
import { GenDepartmentEntity } from 'src/app/appGeneral/entities/genDepartment.entity';
import { GenCountryService } from 'src/app/appGeneral/services/genCountry.service';
import { GenDepartmentService } from 'src/app/appGeneral/services/genDepartment.service';

@Component({
  selector: 'app-genCityNew',
  templateUrl: './genCityNew.component.html',
  styleUrls: ['./genCityNew.component.css']
})
export class GenCityNewComponent implements OnInit {
  @Input() cityId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  genCityEntity: GenCityEntity;
  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    active: new FormControl(''),
  });
  countryList:GenCountryEntity[];
  departmentList:GenDepartmentEntity[];
  countryId:number;
  departmentId:number;

  constructor(private genCountryS:GenCountryService,private genDepartmentS:GenDepartmentService,private genCityS: GenCityService, private alertS: AlertService) {
    this.cityId=0;
    this.countryId=0;
    this.departmentId=0;
    this.countryList=[];
    this.departmentList=[];
  }

  ngOnInit(): void {
    this.genCountryS.listActive().subscribe(res=>{
      if(res.message==='OK'){
        this.countryList=res.object;
      }else{
        this.alertS.open(res.message,'error');
      }
    },err=>{
      this.alertS.open(err.message,'error');
    });
    if (this.cityId != 0) {
      this.title = "Editar Ciudad";
      this.genCityS.findById(this.cityId).subscribe(res => {
        if (res.message === 'OK') {
          this.genCityEntity = res.object;
          this.form.setValue(
            {
              'id': this.genCityEntity.id,
              'name': this.genCityEntity.name,
              'departmentId':this.genCityEntity.departmentId,
              'active': this.genCityEntity.active,
            }
          );
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.title = "Nueva Ciudad";
    }
  }
  onClick() {
    if (this.cityId === 0) {
      this.genCityS.create(this.form.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Ciudad creada!', 'success');
          } else {
            this.alertS.open(res.message, 'error');
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.genCityS.update(this.form.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Ciudad actualizada!', 'success');
          } else {
            this.alertS.open(res.message, 'error');
          }
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    }
  }
  selectDepartment(){
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
}
