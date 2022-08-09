import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { MatTableDataSource } from '@angular/material/table';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { ActiveFixedAssigmentEntity } from 'src/app/appActiveFixed/entities/activeFixedAssigment.entity';
import { ActiveFixedProductEntity } from 'src/app/appActiveFixed/entities/ActiveFixedProduct.entity';
import { ActiveFixedEntity } from 'src/app/appActiveFixed/entities/activeFixed.entity';
import { ActiveFixedAssigListPersonModel } from 'src/app/appActiveFixed/models/ActiveFixedAssigListPerson.model';
import { ActiveFixedReturnService } from 'src/app/appActiveFixed/services/activeFixedReturn.service';
import { ActiveFixedAssigmentService } from 'src/app/appActiveFixed/services/activeFixedAssigment.service';
@Component({
  selector: 'app-activeFixedReturntNew',
  templateUrl: './activeFixedReturntNew.component.html',
  styleUrls: ['./activeFixedReturntNew.component.css']
})
export class ActiveFixedReturntNewComponent implements OnInit {
  public loading: boolean;
  public data: any;
  public product: Number;
  @Input() ActFixAsigformId: number;
  @Output() closeDialog = new EventEmitter<any>();
  dataSource = new MatTableDataSource<any>();
  title: string;
  fileList: File[];
  productList: ActiveFixedProductEntity[];
  form: FormGroup;
  activeFixedAsigE: ActiveFixedAssigmentEntity;
  genPersonEntity: GenPersonEntity;
  tracingList: ActiveFixedEntity[];
  featurList: ActiveFixedEntity[];
  personList: ActiveFixedAssigListPersonModel[];
  serial:string;




  constructor(private activeFixedRetunS: ActiveFixedReturnService, private fb: FormBuilder, private alertS: AlertService, private activeAssigmentS: ActiveFixedAssigmentService) {
    this.ActFixAsigformId = 0;
    this.productList = [];
    this.dataSource = new MatTableDataSource([]);
    this.fileList = [];
    this.featurList = [];
    this.personList = [];
    this.serial = '';
  }
  ngOnInit(): void {
    this.formBuilders();
    this.form.controls.identification.setValue(this.form.get('identification').value);
  }

  formBuilders() {
    this.form = this.fb.group({
      id: [, []],
      identification: [, [Validators.required]],//
      name: [, [Validators.required]],
      mail: [, [Validators.required]],
      costCenter: [, [Validators.required]],
      position: [, [Validators.required]],
      city: [, [Validators.required]],
      personRes: [, [Validators.required]],
      equipment: [, [Validators.required]],
      serial: [, [Validators.required]],
      commentary: [, [Validators.required]],
      active: [, []]
    })

  }
  save() {
    var identification = this.form.get('identification').value;
     var serial = this.form.get('serial').value;
     this.updateSerial(serial)
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.activeFixedRetunS.create(this.form.value).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != 0) {
          if (this.fileList.length > 0) {
            var fecha = new Date();
            var fechaCreacion;
            
            fechaCreacion = fecha.getFullYear() + '-' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + ('0' + fecha.getDate()).slice(-2);
            this.loadFile(identification, fechaCreacion);
            this.form.reset();
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
  }

  search() {
    this.tracingList = [];
    this.activeAssigmentS.findByIdentification(this.form.get('serial').value).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != null) {
          this.form.get('name').setValue(res.object.name);
          this.form.get('costCenter').setValue(res.object.costCenter);
          this.form.get('position').setValue(res.object.position)
          this.form.get('city').setValue(res.object.city)
          this.form.get('mail').setValue(res.object.mail);
          this.form.get('personRes').setValue(res.object.person);
          this.form.get('equipment').setValue(res.object.product);
          this.form.get('identification').setValue(res.object.identification);

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
  addFile(file: FileList) {
    if (file != undefined) {
      for (let i = 0; i < file.length; i++) {
        this.fileList.push(file[i]);
      }
    }
  }

  loadFile(identification: number, creationDate: String) {
    this.activeFixedRetunS.loadFile(identification, creationDate, this.fileList).subscribe(res => {
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
  removeFile(i: number) {
    this.fileList.splice(i, 1);
  }
  updateSerial(serial: string) {
    this.activeFixedRetunS.updateSerial(serial).subscribe(res => {
      if (res.message == 'OK') {
        if (res.object != 0) {
        } else {
          this.alertS.open(res.message, 'error');
        }
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    })
  }
}




