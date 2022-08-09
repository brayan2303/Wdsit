import { Component, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { EventEmitter } from "protractor";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { ValidateReportEntity } from "src/app/appLoadValidateReport/entities/validateReportEntity";
import { validateReportModel } from "src/app/appLoadValidateReport/models/validateReport.model";
import { ValidateReportService } from "src/app/appLoadValidateReport/services/validateReport.service";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
  selector: 'app-validateReport',
  templateUrl: './validateReport.component.html',
  styleUrls: ['./validateReport.component.css']
})
export class ValidateReportComponent implements OnInit {
  public loading: boolean;
  CountryList: validateReportModel[];
  genPersonE: GenPersonEntity;
  validateEn: ValidateReportEntity;
  files: File[];
  form: FormGroup;
  tittle: string;
  availableDate: string;
  uploading: boolean;
  validate: number;
  countryId: number;
  @Input() validateReportFormId: number;


  constructor(private alertS: AlertService, private valReportS: ValidateReportService, private fb: FormBuilder) {
    this.CountryList = [];
    this.validateReportFormId = 0;
    this.availableDate = '';
    this.validateEn = new ValidateReportEntity();
    this.uploading = false;
    this.files = [];
    this.countryId = 0;

  }
  ngOnInit(): void {
    this.formBuilders();
    this.genPersonE = JSON.parse(localStorage.getItem('user'));
    
    if (this.validateReportFormId != null && this.countryId != 0) {
      this.tittle = "Editar Columnas Archivo";
     
    } 
   else {
      this.tittle = "Nuevo Columnas Archivo";
      this.listCountryUser();
    }
  }

  formBuilders() {
    this.form = this.fb.group({
      idCountry: [, [Validators.required]],
      modelCode: [, [Validators.required]],
      modelDescription: [, [Validators.required]],
      dxType: [, [Validators.required]],
      serialEquipo: [, [Validators.required]],
      address: [, [Validators.required]],
      region: [, [Validators.required]],
      city: [, [Validators.required]],
      department: [, [Validators.required]]
    });
  }


  save() {
    if (this.validateReportFormId === 0) {
      console.log(this.validateReportFormId);
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.valReportS.create(this.form.controls.idCountry.value, this.form.controls.modelCode.value.toUpperCase(), this.form.controls.modelDescription.value.toUpperCase(), this.form.controls.dxType.value.toUpperCase(),
        this.form.controls.serialEquipo.value.toUpperCase(), this.form.controls.address.value.toUpperCase(), this.form.controls.region.value.toUpperCase(),
        this.form.controls.city.value.toUpperCase(), this.form.controls.department.value.toUpperCase(), this.genPersonE.id).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.form.reset();
              this.alertS.open('Registro creado!', 'success');
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
      this.updateColumn();
    }
  }

  listColumns() {
    this.valReportS.listColumns(this.countryId).subscribe(resA => {
      if (resA.message === 'OK') {
        if (resA.object != 0) {
          this.validateEn = resA.object;
          this.form.setValue({
            'idCountry': this.validateEn.idCountry,
            'modelCode': this.validateEn.modelCode,
            'modelDescription': this.validateEn.modelDescription,
            'dxType': this.validateEn.dxType,
            'serialEquipo': this.validateEn.serialEquipo,
            'address': this.validateEn.address,
            'region': this.validateEn.region,
            'city': this.validateEn.city,
            'department': this.validateEn.department,
          });
        } else {
          this.alertS.open(resA.message, 'error');
        }
      } else {
        this.alertS.open(resA.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');

    });

  }

  listCountryUser() {
    this.valReportS.ListCountry(this.genPersonE.id).subscribe(res => {
      if (res.message === 'OK') {
        this.CountryList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }

    });
  }
  updateColumn() {
    this.valReportS.updateColumn(
      this.form.controls.idCountry.value, this.form.controls.modelCode.value.toUpperCase(), this.form.controls.modelDescription.value.toUpperCase(), this.form.controls.dxType.value.toUpperCase(),
        this.form.controls.serialEquipo.value.toUpperCase(), this.form.controls.address.value.toUpperCase(), this.form.controls.region.value.toUpperCase(),
        this.form.controls.city.value.toUpperCase(), this.form.controls.department.value.toUpperCase(), this.genPersonE.id).subscribe(resA => {
      if (resA.message === 'OK') {
        if (resA.object != 0) {
          this.form.reset();
          this.alertS.open('Registro actualizado!', 'success');
          this.form.setValue({
            'idCountry': '',
            'modelCode': '',
            'modelDescription': '',
            'dxType': '',
            'serialEquipo': '',
            'address': '',
            'region': '',
            'city': '',
            'department': '',
          });
          
        } else {
          this.alertS.open(resA.message, 'error');
        }
      } else {
        this.alertS.open(resA.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
}
