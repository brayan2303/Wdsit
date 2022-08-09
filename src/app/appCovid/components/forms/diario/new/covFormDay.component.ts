import { Router } from '@angular/router';
import { CovFormService } from './../../../../services/covForm.services';
import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CovFormDayEntity } from 'src/app/appCovid/entities/covFormDay.entity';
import { CovFormDayService } from 'src/app/appCovid/services/covFormDay.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GenSectionEntity } from 'src/app/appGeneral/entities/genSection.entity';
import { CovFormEntity } from 'src/app/appCovid/entities/covForm.entity';

@Component({
  selector: 'app-covFormDay',
  templateUrl: './covFormDay.component.html',
  styleUrls: ['./covFormDay.component.css']
})
export class CovFormDayComponent {
  public loading: boolean;
  @Input() formDayId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  covFormDayEntity: CovFormDayEntity;
  personList: GenPersonEntity[];
  fileList: File[];
  optionList: any[];
  tracingList: CovFormEntity[];
  sectionList: GenSectionEntity[];
  identification: number;
  id: number;
  form:FormGroup;
  date: boolean
 
  covFormEntity: any;
  genPersonEntity: any;


  constructor(private route:Router,private fb: FormBuilder,private covFormDayS: CovFormDayService,private alertS: AlertService, private covFormS:CovFormService) {
    this.formDayId = 0;
    this.fileList = [];
   
  }
  
  ngOnInit(): void {
    this.covFormEntity = (JSON.parse(localStorage.getItem('identificationUser')));
    this.formBuilders();
    this.covFormDayS.list().subscribe(res => {
      if (res.message === 'OK') {
        this.personList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
   
  }

  
  formBuilders(){
    this.form =this.fb.group({
      
      id:[,[]],
      identificationUser:[,[Validators.required]],
      hasSymptoms:[,[Validators.required]],
      name:[,[Validators.required]],
      symptomsDate:[,[]],
      descripSymptims:[,[Validators.required]],
      typeDocument:[,[Validators.required]],
      active:[,[]],

    })
  }

  save() { 
    var identificationUser = this.form.get('identificationUser').value;
    this.form.controls.identificationUser.setValue(this.form.get('identificationUser').value);
    if (this.formDayId === 0) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.covFormDayS.create(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            if (this.fileList.length > 0) {

              var fecha = new Date();
              var  fechaCreacion;
              
              fechaCreacion= fecha.getFullYear() + '-' + ('0'+(fecha.getMonth()+1)).slice(-2) + '-' +('0'+ fecha.getDate()).slice(-2);
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
      this.covFormDayS.update(this.form.value).subscribe(res => {
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

  loadFile(identificationUser: String, creationDate:String)  {
    this.covFormDayS.loadFile(identificationUser, "SEGUIMIENTO", creationDate, this.fileList).subscribe(res => {
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
  

  search() {
    this.tracingList = [];
    this.covFormS.findById(this.form.get('identificationUser').value).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != null) {

          this.form.get('name').setValue(res.object.creationUser);
          
        } else {
          this.alertS.open('Usuario No Encontrado', 'error');
          this.form.controls.name.enable();
        }
      } else {
        this.alertS.open(res.message, 'error');
        this.form.controls.Name.enable();
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
}

toggleShow() {
this.date = ! this.date;
}
}
