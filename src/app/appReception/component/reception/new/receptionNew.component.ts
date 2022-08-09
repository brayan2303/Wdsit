
import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReceptionHomeEntity } from 'src/app/appReception/entities/receptionHome.entity';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { ReceptionHomeService } from 'src/app/appReception/services/receptionHome.service';
import { ReceptionMasterService } from 'src/app/appReception/services/receptionMaster.serivce';
import { ReceptionMasterEntity } from 'src/app/appReception/entities/receptionMaster.entity';
import { MatDialog } from '@angular/material/dialog';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import "jspdf-barcode";
import { PersonReception } from 'src/app/appReception/modals/personReception/PersonReception';


@Component({
  selector: 'app-receptionNew',
  templateUrl: './receptionNew.component.html',
  styleUrls: ['./receptionNew.component.css']
})
export class ReceptionNewComponent implements OnInit {

  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();
  personId: number;
  person: string;
  capture: boolean;
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  form: FormGroup;
  ReceptionHomeE: ReceptionHomeEntity;
  genPersonEntity: GenPersonEntity;
  identificationList: ReceptionMasterEntity[];
  epsList: ReceptionMasterEntity[];
  arlList: ReceptionMasterEntity[];
  typeVisitList: ReceptionMasterEntity[];
  team: string;
  fileList: File[];
  identification: number;
  image: string;
  imageSource;
  imageS;
  license: number;
  imagenCreate: string;
  type: string;
  active:boolean;

  constructor(private sanitizer: DomSanitizer, private dialog: MatDialog, private fb: FormBuilder, private alertS: AlertService, private receptionHomeS: ReceptionHomeService, private ReceptionMasterS: ReceptionMasterService) {
    this.formId = 0;
    this.identificationList = [];
    this.epsList = [];
    this.arlList = [];
    this.personId = 0;
    this.person = '';
    this.typeVisitList = [];
    this.capture = false;
    this.team = '';
    this.fileList = [];
    this.identification = 0;
    this.image = '';
    this.license = 0;
    this.imagenCreate = '';
    this.type = '';
    this.active = false;
  }
  ngOnInit(): void {
    this.active = false;
    this.formBuilders();
    this.getIdentification();
    this.getArl();
    this.getEps();
    this.getTypeVisit();
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    if (this.formId != 0) {
      this.title = "Editar Registro";
      this.receptionHomeS.findById(this.formId).subscribe(res => {
        if (res.message === 'OK') {
          this.ReceptionHomeE = res.object;
          this.form.setValue(
            {
              'id': this.ReceptionHomeE.id,
              'typeDocument': this.ReceptionHomeE.typeDocument,
              'identification': this.ReceptionHomeE.identification,
              'name': this.ReceptionHomeE.name,
              'lastName': this.ReceptionHomeE.lastName,
              'phone': this.ReceptionHomeE.phone,
              'email': this.ReceptionHomeE.email,
              'entity': this.ReceptionHomeE.entity,
              'eps': this.ReceptionHomeE.eps,
              'arl': this.ReceptionHomeE.arl,
              'visit': this.ReceptionHomeE.visit,
              'license': this.ReceptionHomeE.license,
              'typeVisit': this.ReceptionHomeE.typeVisit,
              'team': this.ReceptionHomeE.team,
              'brand': this.ReceptionHomeE.brand,
              'serial': this.ReceptionHomeE.serial
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
  }

  serachIdentificacion(identification: number) {
    if (identification != null && identification != 0 && String(identification) != '') {
      this.receptionHomeS.findByIdentification(String(identification)).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != null) {
            const image = res.object.image;
            this.ReceptionHomeE = res.object;
            this.active =this.ReceptionHomeE.active;
            this.imagenCreate = this.ReceptionHomeE.image;
            this.form.get('typeDocument').setValue(res.object.typeDocument);
            this.form.get('identification').setValue(res.object.identification)
            this.form.get('name').setValue(res.object.name)
            this.form.get('lastName').setValue(res.object.lastName);
            this.form.get('phone').setValue(res.object.phone);
            this.form.get('email').setValue(res.object.email)
            this.form.get('eps').setValue(res.object.eps);
            this.form.get('arl').setValue(res.object.arl);
            this.form.get('license').setValue(res.object.license);
            this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64, ${image}`);
          } else {
            this.receptionHomeS.findByIdentificationPerson(String(identification)).subscribe(resF => {
              if (resF.message === 'OK') {
                if (resF.object != null) {
                  this.ReceptionHomeE = resF.object;
                  this.form.get('identification').setValue(resF.object.identification)
                  this.form.get('name').setValue(resF.object.name)
                  this.form.get('lastName').setValue(resF.object.lastName);
                  this.form.get('email').setValue(resF.object.email);
                } else {
                  this.alertS.open('No se encontro informacion', 'warning')
                  this.identification = 0;
                  this.webcamImage = null;
                  this.form.reset();
                }
              } else {
                this.alertS.open(resF.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error')
            });
          }

        } else {
          this.alertS.open(res.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.alertS.open('Por favor ingrese una identificacion', 'warning')
    }

  }


  formBuilders() {
    this.form = this.fb.group({
      id: [, []],
      typeDocument: [, [Validators.required]],
      identification: [, [Validators.required]],
      name: [, [Validators.required]],
      lastName: [, [Validators.required]],
      phone: [, [Validators.required]],
      email: [, [Validators.required]],
      entity: [, [Validators.required]],
      eps: [, []],
      arl: [, []],
      visit: [, []],
      license: [, [Validators.required]],
      typeVisit: [, [Validators.required]],
      team: [, [Validators.required]],
      brand: [, []],
      serial: [, []],
      //[,[Validators.required]],
    })

  }

  saveExit() {
        this.receptionHomeS.createExit(this.form.controls.typeDocument.value, this.form.controls.identification.value, this.form.controls.name.value,
          this.form.controls.lastName.value, this.form.controls.phone.value, this.form.controls.email.value, this.form.controls.entity.value,
          this.form.controls.eps.value, this.form.controls.arl.value, this.form.controls.visit.value, this.form.controls.license.value,
          this.form.controls.typeVisit.value, this.form.controls.team.value, this.form.controls.brand.value, this.form.controls.serial.value, this.imagenCreate, this.genPersonEntity.id).subscribe(res => {
            if (res.message === 'OK') {
              if (res.object != 0) {
                this.closeDialog.emit();
                this.alertS.open('Registro creado', 'success');
                this.form.reset();
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

  

  save() {
    if (this.formId === 0) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      if (this.webcamImage != null) {
        this.receptionHomeS.create(this.form.controls.typeDocument.value, this.form.controls.identification.value, this.form.controls.name.value,
          this.form.controls.lastName.value, this.form.controls.phone.value, this.form.controls.email.value, this.form.controls.entity.value,
          this.form.controls.eps.value, this.form.controls.arl.value, this.form.controls.visit.value, this.form.controls.license.value,
          this.form.controls.typeVisit.value, this.form.controls.team.value, this.form.controls.brand.value, this.form.controls.serial.value, this.webcamImage.imageAsBase64, this.genPersonEntity.id).subscribe(res => {
            if (res.message === 'OK') {
              if (res.object != 0) {
                this.closeDialog.emit();
                this.imageSource = '';
                this.alertS.open('Registro creado', 'success');
                this.print(this.form.controls.identification.value, this.webcamImage.imageAsBase64, this.form.controls.typeVisit.value);
                this.form.reset();
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
        this.receptionHomeS.create(this.form.controls.typeDocument.value, this.form.controls.identification.value, this.form.controls.name.value,
          this.form.controls.lastName.value, this.form.controls.phone.value, this.form.controls.email.value, this.form.controls.entity.value,
          this.form.controls.eps.value, this.form.controls.arl.value, this.form.controls.visit.value, this.form.controls.license.value,
          this.form.controls.typeVisit.value, this.form.controls.team.value, this.form.controls.brand.value, this.form.controls.serial.value, this.imagenCreate, this.genPersonEntity.id).subscribe(res => {
            if (res.message === 'OK') {
              if (res.object != 0) {
                this.closeDialog.emit();
                this.alertS.open('Registro creado', 'success');
                this.print(this.form.controls.identification.value, this.imagenCreate, this.form.controls.typeVisit.value);
                this.form.reset();
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

    } else {
      this.receptionHomeS.update(this.form.value, this.genPersonEntity.id).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro actualizado!', 'success');
            this.form.setValue({
              'id': 0,
              'typeDocument': '',
              'identification': '',
              'name': '',
              'lastName': '',
              'phone': '',
              'email': '',
              'entity': '',
              'eps': '',
              'arl': '',
              'visit': '',
              'license': '',
              'typeVisit': '',
              'team': '',
              'brand': '',
              'serial': ''
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
  getIdentification() {
    this.ReceptionMasterS.findByName('IDENTIFICACION').subscribe(resI => {
      if (resI.message === 'OK') {
        this.identificationList = resI.object;
      } else {
        this.alertS.open(resI.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    })
  }

  getEps() {
    this.ReceptionMasterS.findByName('EPS').subscribe(resE => {
      if (resE.message === 'OK') {
        this.epsList = resE.object;
      } else {
        this.alertS.open(resE.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    })
  }

  getArl() {
    this.ReceptionMasterS.findByName('ARL').subscribe(resA => {
      if (resA.message === 'OK') {
        this.arlList = resA.object;
      } else {
        this.alertS.open(resA.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    })
  }

  getTypeVisit() {
    this.ReceptionMasterS.findByName('TIPO VISITA').subscribe(resA => {
      if (resA.message === 'OK') {
        this.typeVisitList = resA.object;
      } else {
        this.alertS.open(resA.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    })
  }

  getPerson() {
    const dialogRef = this.dialog.open(PersonReception, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res['id'] != 0) {
        this.personId = res['id'];
        this.person = res['person'];
      }
    });
  }
  getFile() {
    this.capture = true;
  }

  /**  openPdf(visit: string, identification: string, name: string, lastName: string, eps: string, arl: string, typeVisit: string, imageView: string) {
      console.log(visit, identification, name, lastName, eps, arl, typeVisit)
      var fecha = new Date();
      var fechaCreacion;
      var horaCreacion;
      fechaCreacion = fecha.getFullYear() + '-' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + ('0' + fecha.getDate()).slice(-2);
      horaCreacion = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
      const doc = new jsPDF();
  
      doc.text(fechaCreacion + '', 20, 10);
      doc.text(horaCreacion + '', 50, 10);
      doc.text(typeVisit + '', 20, 15);
      doc.text('WODEN COLOMBIA SAS', 70, 17, {});
      doc.text('Documento: ' + identification + '', 90, 26);
      doc.text('Nombre: ' + name + '' + ' ' + lastName + '', 90, 32);
      doc.text('EPS: ' + eps + '', 90, 39);
      doc.text('ARL: ' + arl + '', 90, 45);
      doc.text('Visita a: ' + visit + '', 90, 51);
      const image = imageView;
      doc.addImage(imageView, 'jpeg', 20, 20, 60, 55);
      doc.barcode(identification, {
        fontSize: 60,
        textColor: "#000000",
        x: 85,
        y: 75
      })
      doc.autoPrint();
    }
  */

  print(identification: string, imageView: string, typeVisit: string): void {
    this.receptionHomeS.findType(Number(typeVisit)).subscribe(resT => {
      if (resT.message === 'OK') {
        this.ReceptionHomeE = resT.object
        this.type = this.ReceptionHomeE.name
      } else {
        this.alertS.open(resT.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    })
    this.receptionHomeS.findByIdentificationTicket(identification).subscribe(resF => {
      if (resF.message === 'OK') {
        this.ReceptionHomeE = resF.object;
        const image = imageView;
        this.imageS = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64, ${image}`);
        let popupWin;
        var printContents;
        printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', 'my_print', 'top=0,left=0,height=100%,width=100%');
        popupWin.document.write(`
        <html>
        <style>
          .recep-group{
          display: flex;
          flex-direction: column;
          width: calc(70% - 20px);
          font-size:7px;
          color:blue;
          }
          .recep-group-two{
          display: flex;
          flex-direction: column;
          width: calc(30% - 20px);
          }
          .recep-container{
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          }
          .recep-form{
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          }
          .recep-group-theer{
          display: flex;
          flex-direction: column;
          width: calc(100%);
          font-size:3px;
          text-aling:center;
          }
          img {
          float: left;
          }
        </style>
        <body>
          <p style=" font-size:10px; margin-left:20%;style="margin:1cm 0;"><strong>WODEN COLOMBIA S.A.S</strong></p>
            <div class="recep-container">
              <div class="recep-form">
                <div clas="recep-group-two">
                  <p style="font-size:6px;"><strong>${this.type}</strong></p>
                    ${printContents}
                  </div>
                <div class="recep-group">
                  <p><strong>Documento: </strong>${this.ReceptionHomeE.identification}</p>
                    <p style="margin:-2.5% 0;"><strong>Nombre: </strong>${this.ReceptionHomeE.name + ' ' + this.ReceptionHomeE.lastName}</p>
                    <p><strong>EPS: </strong>${this.ReceptionHomeE.eps}</p>
                    <p style="margin:-2.5% 0;"><strong>ARL: </strong>${this.ReceptionHomeE.arl}</p>
                    <p><strong>Visita a: </strong>${this.ReceptionHomeE.visit}</p>   
                    </div>
                  </div>
                </div>
            </body>
        </html>
        `);
        popupWin.print();
        popupWin.close();
        this.identification = 0;
        this.imageSource = null;
        this.webcamImage = null;
      } else {
        this.alertS.open(resF.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    })
  }
  getLicence() {
    this.license = Math.round(Math.random() * 800);
  }


  triggerSnapshot(): void {
    this.trigger.next();
    this.capture = false;
    this.imageSource = '';
  }
  handleImage(webcamImage: WebcamImage): void {
    console.info('Saved webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.imageSource = '';
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}



