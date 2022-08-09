import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenCityEntity } from 'src/app/appGeneral/entities/genCity.entity';
import { GenCountryEntity } from 'src/app/appGeneral/entities/genCountry.entity';
import { GenDepartmentEntity } from 'src/app/appGeneral/entities/genDepartment.entity';
import { GenCountryService } from 'src/app/appGeneral/services/genCountry.service';
import { GenCountryAbbreviationEntity } from 'src/app/appGeneral/entities/genCountryAbbreviation.entity';
import { GenCountryAbbreviationService } from 'src/app/appGeneral/services/genCountryAbbreviation.service';

@Component({
  selector: 'app-genCountryAbbreviationNew',
  templateUrl: './genCountryAbbreviationNew.component.html',
  styleUrls: ['./genCountryAbbreviationNew.component.css']
})
export class GenCountryAbbreviationNewComponent implements OnInit {
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  genCityEntity: GenCityEntity;
  form = new FormGroup({
    id: new FormControl(''),
    countryId: new FormControl('', Validators.required),
    abbreviation: new FormControl('', Validators.required),
    active: new FormControl(''),
  });
  countryList:GenCountryEntity[];
  departmentList:GenDepartmentEntity[];
  countryId:number;
  departmentId:number;
  GenCountryAbbreviationE:GenCountryAbbreviationEntity;

  constructor(private genCountryS:GenCountryService,private GenCountryAbbreviationS:GenCountryAbbreviationService, private alertS: AlertService) {
    this.formId=0;
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
    if (this.formId != 0) {
      this.title = "Editar";
      this.GenCountryAbbreviationS.findById(this.formId).subscribe(res => {
        if (res.message === 'OK') {
          this.GenCountryAbbreviationE = res.object;
          this.form.setValue(
            {
              'id': this.GenCountryAbbreviationE.id,
              'countryId':this.GenCountryAbbreviationE.countryId,
              'abbreviation': this.GenCountryAbbreviationE.abbreviation,
              'active': this.GenCountryAbbreviationE.active,
            }
          );
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.title = "Nuevo";
    }
  }
  onClick() {
    if (this.formId === 0) {
      this.GenCountryAbbreviationS.create(this.form.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Abreviatura creada!', 'success');
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
      this.GenCountryAbbreviationS.update(this.form.value).subscribe(res => {
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
}
