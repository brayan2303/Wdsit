import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { CovFormService } from 'src/app/appCovid/services/covForm.services';
import { CovFormEntity } from 'src/app/appCovid/entities/covForm.entity';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { GenCountryService } from 'src/app/appGeneral/services/genCountry.service';
import { GenDepartmentService } from 'src/app/appGeneral/services/genDepartment.service';
import { GenCityService } from 'src/app/appGeneral/services/genCity.service';
import { GenDepartmentEntity } from 'src/app/appGeneral/entities/genDepartment.entity';
import { GenCityEntity } from 'src/app/appGeneral/entities/genCity.entity';
import { GenPositionService } from 'src/app/appGeneral/services/genPosition.service';
import { GenPositionEntity } from 'src/app/appGeneral/entities/genPosition.entity';

@Component({
  selector: 'app-covFormNew',
  templateUrl: './covFormNew.component.html',
  styleUrls: ['./covFormNew.component.css']
})
export class CovFormNewComponent implements OnInit {
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  dataSource = new MatTableDataSource<any>();
  id: number;
  type: String;
  title: string;
  loadingTracing: boolean;
  initialDate: string;
  identification: number;
  document: string;
  searchType: string;
  searchData: string;
  loadingPerson: boolean;
  countryId: number;
  departmentId: number;
  covFormEntity: CovFormEntity;
  personList: GenPersonEntity[];
  date: boolean;
  
  fileList: File[];
  dataSourceCouting = new MatTableDataSource<any>();
  dataSourceSerials = new MatTableDataSource<any>();
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorCouting') paginatorCouting: MatPaginator;
  @ViewChild('paginatorSerials') paginatorSerials: MatPaginator;
  list = new MatTableDataSource<CovFormEntity>()
  covList = new MatTableDataSource<CovFormEntity>();
  form: FormGroup;

  genPersonEntity: GenPersonEntity;
  List: CovFormEntity[];
  covForm: CovFormEntity[];
  countryList: CovFormEntity[];
  tracingList: GenPersonEntity[];
  departmentList: GenDepartmentEntity[];
  cityList: GenCityEntity[];
  positionList: GenPositionEntity[];
  message: any;


  constructor(private fb: FormBuilder, private covFormS: CovFormService, private genPersonS: GenPersonService, private genPositionS: GenPositionService, private genCountryS: GenCountryService, private alertS: AlertService, private genDepartmentS: GenDepartmentService, private genCityS: GenCityService, private formBuilder: FormBuilder) {
    this.identification = 0;
    this.formId = 0;
    this.fileList = [];
    this.countryId = 0;
    this.departmentId = 0;
    this.countryList = [];
    this.departmentList = [];
    this.cityList = [];
    this.dataSource = new MatTableDataSource([]);
  }
  ngOnInit(): void {
    this.formBuilders();
    this.form.controls.identificationUser.setValue(this.form.get('identificationUser').value);
    this.genCountryS.listActive().subscribe(res => {
      if (res.message === 'OK') {
        this.countryList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
    this.covFormS.list().subscribe(res => {
      if (res.message === 'OK') {
        this.personList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
    this.genPositionS.findAll().subscribe(res => {
      if (res.message === 'OK') {
        this.positionList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  formBuilders(){
    this.form= this.fb.group({
      id: [,[]],
      identificationUser:[,[Validators.required]],//
      hasSymptoms:[,[Validators.required]],//
      symptomsDate:[,[]],
      descripSymptims:[,[Validators.required]],//
      concatPerson:[,[Validators.required]],//
      parentsPerson:[,[]],
      cuarentDate:[,[]],
      famBusiness:[,[Validators.required]],//
      famParents:[,[]],
      documentHos:[,[]],
      name:[,[Validators.required]],//
      company:[,[Validators.required]],//
      typeDocument:[,[Validators.required]],//
      position:[,[Validators.required]],//
      bossName:[,[Validators.required]],//
      eps:[,[Validators.required]],//
      direction:[,[Validators.required]],//
      phone :[,[]],
      mobile:[,[Validators.required]],//
      email:[,[Validators.required, Validators.email]],//
      placeSymptoms:[,[]],
      statedAnswer:[,[]],
      publicAnswer:[,[]],
      cityId: [,[Validators.required]],//
      city:[,[]],
      positions:[,[]],
      active: [,[]]
    })

  }
  save() {
    var identificationUser = this.form.get('identificationUser').value;
    this.form.controls.hasSymptoms.value===false?this.form.controls.hasSymptoms.setValue('Si'):this.form.controls.hasSymptoms.setValue('No');
    this.form.controls.identificationUser.setValue(this.form.get('identificationUser').value);
    if (this.formId === 0) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.covFormS.create(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            if (this.fileList.length > 0) {
              var fecha = new Date();
              var fechaCreacion;
              fechaCreacion = fecha.getFullYear() + '-' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + ('0' + fecha.getDate()).slice(-2);
              this.loadFile( identificationUser , fechaCreacion);
            }
            var variables: string[] = [];
            variables.push(res.object.toString().split('|', 2)[1]);
            variables.push('Creada');
            this.alertS.open('Registro realizado!', 'success');
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
      this.covFormS.update(this.form.value).subscribe(res => {
        this.closeDialog.emit();
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro actualizado!', 'success');
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

  addFile(file: FileList) {
    if (file != undefined) {
      for (let i = 0; i < file.length; i++) {
        this.fileList.push(file[i]);
      }
    }
  }
  removeFile(i: number) {
    this.fileList.splice(i, 1);
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  search() {
    this.tracingList = [];
    this.genPersonS.findByIdentification(this.form.get('identificationUser').value).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != null) {

          this.form.get('name').setValue(res.object.firstName + ' ' + res.object.lastName);
          this.form.get('email').setValue(res.object.mail);
        } else {
          this.form.controls.Name.enable();
          this.form.controls.email.enable();
        }
      } else {
        this.alertS.open(res.message, 'error');
        this.form.controls.Name.enable();
        this.form.controls.email.enable();
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
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

  loadFile(identification: number, creationDate: String) {
    this.covFormS.loadFile(identification , "INICIO", creationDate, this.fileList).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != 0) {
          this.fileList = [];
        } else {
          this.alertS.open('Error al cargar el archivo!', 'error');
        }
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
  toggleShow() {
    this.date = ! this.date;
    }
}




