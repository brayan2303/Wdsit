import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { MatTableDataSource } from '@angular/material/table';
import { GenPersonService } from 'src/app/appGeneral/services/genPerson.service';
import { ActiveFixedAssigmentService } from 'src/app/appActiveFixed/services/activeFixedAssigment.service';
import { ActiveFixedAssigmentEntity } from 'src/app/appActiveFixed/entities/activeFixedAssigment.entity';
import { ActiveFixedProductService } from 'src/app/appActiveFixed/services/activeFixedProduct.service';
import { ActiveFixedProductEntity } from 'src/app/appActiveFixed/entities/ActiveFixedProduct.entity';
import { MatDialog } from '@angular/material/dialog';
import { ActDetailModal } from 'src/app/appActiveFixed/modals/viewFeatures/actProdSetail.modal';
import { ActiveFixedEntity } from 'src/app/appActiveFixed/entities/activeFixed.entity';
import { ActiveFixedService } from 'src/app/appActiveFixed/services/activeFixed.service';
import { ActiveFixedAssigSerialService } from 'src/app/appActiveFixed/services/activeFixedAssigSerial.service';
import { ActiveFixedAssigSerialEntity } from 'src/app/appActiveFixed/entities/ActiveFixedAssigSerial.entity';
import { ActiveFixedAssigListPersonModel } from 'src/app/appActiveFixed/models/ActiveFixedAssigListPerson.model';
@Component({
  selector: 'app-ActiveFixedAssigmentNew',
  templateUrl: './ActiveFixedAssigmentNew.component.html',
  styleUrls: ['./ActiveFixedAssigmentNew.component.css']
})
export class ActiveFixedAssigmentNewComponent implements OnInit {
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
  tracingList: GenPersonEntity[];
  featurList: ActiveFixedEntity[];
  personList: ActiveFixedAssigListPersonModel[];
  

  constructor(private activeFixedAssigS:ActiveFixedAssigSerialService, private dialog: MatDialog, private fb: FormBuilder, private genPersonS: GenPersonService, private alertS: AlertService, private activeFixedAsigmentS: ActiveFixedAssigmentService, private activeFixeProdS: ActiveFixedProductService, private activeFixeds: ActiveFixedService) {
    this.ActFixAsigformId = 0;
    this.productList = [];
    this.dataSource = new MatTableDataSource([]);
    this.fileList = [];
    this.featurList = [];
    this.personList = [];
  }
  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.formBuilders();
    this.form.controls.identification.setValue(this.form.get('identification').value);
    if (this.ActFixAsigformId != 0) {
      this.title = "Editar Registro";
      this.activeFixedAsigmentS.findById(this.ActFixAsigformId).subscribe(res => {
        if (res.message === 'OK') {
          this.activeFixedAsigE = res.object;
          this.form.setValue(
            {
              'id': this.activeFixedAsigE.id,
              'identification': this.activeFixedAsigE.identification,
              'name': this.activeFixedAsigE.name,
              'mail': this.activeFixedAsigE.mail,
              'costCenter': this.activeFixedAsigE.costCenter,
              'position': this.activeFixedAsigE.position,
              'city': this.activeFixedAsigE.city,
              'productEquip': this.activeFixedAsigE.productEquip,
              'serial': this.activeFixedAsigE.serial,
              'exitPermanent': this.activeFixedAsigE.exitPermanent,
              'personRes':this.activeFixedAsigE.personRes,
              'statusEquipament': this.activeFixedAsigE.statusEquipament,
              'active': this.activeFixedAsigE.active

            }
          );
        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.title = "Nuevo registro";
    }
    this.getProduct();
    this.getPerson();
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
      productEquip: [, []],
      serial: [, []],
      exitPermanent: [, []],
      personRes:[,[]],
      statusEquipament: [, []],
      active: [, []]
    })

  }
  save() {
    var identification = this.form.get('identification').value;
    this.form.controls.productEquip.setValue(this.form.controls.productEquip.value);
    if (this.ActFixAsigformId === 0) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.activeFixedAsigmentS.create(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.saveFeatures(res.object);
            if (this.fileList.length > 0) {
              var fecha = new Date();
              var fechaCreacion;
              fechaCreacion = fecha.getFullYear() + '-' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + ('0' + fecha.getDate()).slice(-2);
              this.loadFile(identification, fechaCreacion);
            }
            var variables: string[] = [];
            variables.push(res.object.toString().split('|', 2)[1]);
            this.form.reset()
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
      this.activeFixedAsigmentS.update(this.form.value, this.genPersonEntity.id).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro actualizado!', 'success');
            this.form.reset();
            this.closeDialog.emit();
            this.form.setValue({
              'id': 0,
              'identification': '',
              'name': '',
              'mail': '',
              'costCenter': '',
              'position': '',
              'city': '',
              'productEquip': '',
              'serial': '',
              'exitPermanent': '',
              'statusEquipament': '',
              'active': ''
            });
            this.closeDialog.emit();
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
  saveFeatures(assigmentId:number) {
    var prodFeatulist: ActiveFixedAssigSerialEntity[]=[];
    for (let i = 0; i < this.featurList.length; i++) {
      var featur=new ActiveFixedAssigSerialEntity();
      featur.assigmentId=assigmentId;
      featur.productfeaturId=this.featurList[i].id;
      featur.serial= (document.getElementById(String(this.featurList[i].id)) as HTMLInputElement).value;
      prodFeatulist.push(featur);
    }
    this.activeFixedAssigS.create(prodFeatulist).subscribe(resL => {
      if (resL.message === 'OK') {
        if (resL.object === 0) {
          this.alertS.open('Error al registrar seriales', 'error')
        }
      } else {
        this.alertS.open(resL.message, 'error')
      }
    }, error => {
      this.alertS.open(error.message, 'error')
    })

  }
  search() {
    this.tracingList = [];
    this.genPersonS.findByIdentification(this.form.get('identification').value).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != null) {

          this.form.get('name').setValue(res.object.firstName + ' ' + res.object.lastName);
          this.form.get('costCenter').setValue(res.object.centerCost);
          this.form.get('position').setValue(res.object.position)
          this.form.get('city').setValue(res.object.city)
          this.form.get('mail').setValue(res.object.mail);

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

  getProduct() {
    this.activeFixeProdS.list().subscribe(res => {
      if (res.message === 'OK') {
        this.productList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  actDetail() {
    if(this.form.controls.productEquip.value != ''){
    this.dialog.open(ActDetailModal, {
      width: '100%',
      data: { productEquip: this.form.controls.productEquip.value }
    });
  }else{
      this.alertS.open('Seleccione un equipo', 'warning')
  }
  }

  addFile(file: FileList) {
    if (file != undefined) {
      for (let i = 0; i < file.length; i++) {
        this.fileList.push(file[i]);
      }
    }
  }

  loadFile(identification: number, creationDate: String) {
    this.activeFixedAsigmentS.loadFile(identification, creationDate, this.fileList).subscribe(res => {
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

  getFeaturList() {
    if(this.form.controls.productEquip.value != ''){
    this.activeFixedAsigmentS.listFeatur(this.form.controls.productEquip.value).subscribe(res => {
      if (res.message === 'OK') {
        this.featurList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }else{
    this.alertS.open('Seleccione un equipo', 'warning')
  }
  }

  getPerson() {
    this.activeFixedAsigmentS.listPerson().subscribe(res => {
      if (res.message === 'OK') {
        this.personList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
}




