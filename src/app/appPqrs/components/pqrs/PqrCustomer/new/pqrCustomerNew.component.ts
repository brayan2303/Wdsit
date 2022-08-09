
import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PqrCustomerEntity } from 'src/app/appPqrs/entities/pqrCustomer.entity';
import { PqrCustomerService } from 'src/app/appPqrs/services/pqrCustomer.service';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PqrFileModal } from 'src/app/appPqrs/modals/pqrFile/pqrFile.modal';
import { MatDialog } from '@angular/material/dialog';
import { SerialNewModal } from 'src/app/appPqrs/modals/serialNew/serialNew.modal';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { PqrsClientSerialService } from 'src/app/appPqrs/services/pqrsClientSerial.service';
import { PqrPqrsEntity } from 'src/app/appPqrs/entities/pqrPqrs.entity';
import { PqrLanguageFormService } from 'src/app/appPqrs/services/pqrLanguageForm.service';
import { PqrLenguageFormClientEntity } from 'src/app/appPqrs/entities/pqrLenguageFormClient.entity';
import { PqrPageClientInitService } from 'src/app/appPqrs/services/pqrPageClientInit.service';
import { PqrPageClientInitEntity } from 'src/app/appPqrs/entities/pqrPageClientInit.entity';
import { PqrFormTableEntity } from 'src/app/appPqrs/entities/PqrFormTable.entity';
import { PqrFormTableService } from 'src/app/appPqrs/services/pqrFormTable.service';
import { PqrTicketPersonService } from 'src/app/appPqrs/services/pqrTicketPerson.service';
import { PqrTicketPersonEntity } from 'src/app/appPqrs/entities/pqrTicketPerson.entity';


@Component({
  selector: 'app-pqrCustomerNew',
  templateUrl: './pqrCustomerNew.component.html',
  styleUrls: ['./pqrCustomerNew.component.css']

})
export class PqrCustomerNewComponent implements OnInit {

  public loading: boolean;
  @Input() pqrCustformId: number;
  @Output() closeDialog = new EventEmitter<any>();
  dataSource: MatTableDataSource<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  title: string;
  fileList: File[];
  form: FormGroup;
  columns: string[];
  topicList: PqrCustomerEntity[];
  pqrCustomerEntity: PqrCustomerEntity;
  genPersonEntity: GenPersonEntity;
  destinatarioId: number;
  pqrPqrsEntity: PqrPqrsEntity
  ticket: string;
  userId: number;
  customerId: number;
  PqrPageClientInitE: PqrPageClientInitEntity;
  PqrFormTableE: PqrFormTableEntity;
  PqrTicketPersonE: PqrTicketPersonEntity[];
  ticketVoid: string
  name:string;
  email:string;
  detail:string;
  constructor(private dialog: MatDialog, private fb: FormBuilder, private pqrTicketPersonS: PqrTicketPersonService, private pqrsClientS: PqrsClientSerialService, private alertS: AlertService, private pqrCustomerS: PqrCustomerService, private pqrPageClientInitS: PqrPageClientInitService,
    private PqrFormTableService: PqrFormTableService) {
    this.destinatarioId = 0;
    this.pqrCustformId = 0;
    this.fileList = [];
    this.loading = false;
    this.topicList = [];
    this.columns = ['ticket', 'number', 'serial', 'summary', 'actions'];
    this.dataSource = new MatTableDataSource([]);
    this.ticket = '';
    this.userId = 0;
    this.customerId = 0;
    this.PqrPageClientInitE = new PqrPageClientInitEntity();
    this.PqrFormTableE = new PqrFormTableEntity();
    this.PqrTicketPersonE = [];
    this.ticketVoid = '';
    this.name = '';
    this.email = '';
    this.detail = '';

  }
  ngOnInit(): void {
    this.genPersonEntity = (JSON.parse(localStorage.getItem('user')));
    this.pqrPageClientInitS.findByUserId(this.genPersonEntity.id).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != 0) {
          this.PqrPageClientInitE = res.object;
        } else {
          this.alertS.open(res.message, 'error');
        }
      } else {
        this.alertS.open(res.message, 'error');
      }
    });
    this.PqrFormTableService.findByUserId(this.genPersonEntity.id).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != 0) {
          this.PqrFormTableE = res.object;
        } else {
          this.alertS.open(res.message, 'error');
        }
      } else {
        this.alertS.open(res.message, 'error');
      }
    });
    this.pqrTicketPersonS.listUserId(this.genPersonEntity.id).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != 0) {
          this.PqrTicketPersonE = res.object;
        } else {
        }
      } else {
      }
    });
    this.pqrCustomerS.createTicket(this.genPersonEntity.id).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != 0) {
          this.ticket = res.object;
        } else {
          this.alertS.open(res.message, 'error');
        }
      } else {
        this.alertS.open(res.message, 'error');
      }
    });
    this.formBuilders();

    if (this.pqrCustformId != 0) {
    } else {
      this.title = "Nueva PQRS";
    }
  }

  saveNewField(ticketVoid, name, email, detail) {
    console.log("searched Text", ticketVoid,  name, email, detail);
  }

  formBuilders() {
    this.form = this.fb.group({
      id: [, []],
      name: [, [Validators.required]],
      lastName: [, []],
      emails: [, [Validators.required]],
      emailAnnexed: [, []],
      identification: [, []],
      description: [, [Validators.required]],
      ticket: [, []],
      active: [, []]
      //:[,[Validators.required]],
    })

  }

  save() {
    if (this.pqrCustformId != 0) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.pqrCustomerS.create(this.form.controls.name.value, this.form.controls.lastName.value,
        this.form.controls.emails.value, this.form.controls.description.value, this.form.controls.identification.value, this.genPersonEntity.id, this.form.controls.ticket.value).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              var variables: string[] = [];
              variables.push(res.object.toString().split('|', 2)[1]);
              variables.push('Creada');
              this.form.reset();
              this.closeDialog.emit();
              this.search();
              this.alertS.open('Registro creado', 'success');
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
      this.pqrCustomerS.update(this.ticket, this.form.value, Number(localStorage.getItem('countryId'))).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro creado!', 'success');
            this.form.setValue({
              'id': 0,
              'name': '',
              'lastName': '',
              'emails': '',
              'identification': '',
              'description': '',
              'ticket': '',
              'active': '',
              'emailAnnexed': ''
            });
            if (this.fileList.length > 0) {
              var fecha = new Date();
              var fechaCreacion;
              fechaCreacion = fecha.getFullYear() + '-' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + ('0' + fecha.getDate()).slice(-2);
              this.loadFile(this.ticket, fechaCreacion);
            }
            this.closeDialog.emit();
            if (this.ticketVoid === '') {
              this.pqrCustomerS.sendEmail(this.ticket, this.genPersonEntity.id).subscribe(resS => {
                if (resS.message === 'OK') {
                  this.pqrCustomerS.emailLog(this.ticket, this.genPersonEntity.id, 'Enviado', 'Enviado').subscribe(resLo => {
                    if (resLo.message === 'OK') {
                    } else {
                    }
                  })
                } else {
                }
              }, err => {
                this.pqrCustomerS.emailLog(this.ticket, this.destinatarioId, 'Error al enviar el correo', 'Error al envio').subscribe(resLM => {
                  if (resLM.message === 'OK') {
                  } else {
                  }
                })
              });
            }
            else {
              this.pqrCustomerS.sendEmail(this.ticketVoid, this.genPersonEntity.id).subscribe(resS => {
                if (resS.message === 'OK') {
                  this.pqrCustomerS.emailLog(this.ticketVoid, this.genPersonEntity.id, 'Enviado', 'Enviado').subscribe(resLo => {
                    if (resLo.message === 'OK') {
                    } else {
                    }
                  })
                } else {
                }
              }, err => {
                this.pqrCustomerS.emailLog(this.ticketVoid, this.destinatarioId, 'Error al enviar el correo', 'Error').subscribe(resLM => {
                  if (resLM.message === 'OK') {
                  } else {
                  }
                })
              });
            }
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

  loadFile(ticket: string, creationDate: String) {
    this.pqrCustomerS.loadFile(ticket, creationDate, this.fileList).subscribe(res => {
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

  search() {
    this.dataSource = new MatTableDataSource([]);
    if (this.ticketVoid == '') {
      this.pqrsClientS.list(this.ticket + "", this.genPersonEntity.id).subscribe(res => {
        if (res.message === 'OK') {
          this.loading = false;
          this.dataSource = new MatTableDataSource<any>(res.object);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
        }
      }, err => {
      });
    } else {
      this.pqrsClientS.list(this.ticketVoid, this.genPersonEntity.id).subscribe(res => {
        if (res.message === 'OK') {
          this.loading = false;
          this.dataSource = new MatTableDataSource<any>(res.object);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
        }
      }, err => {
      });
    }
  }
  getRegisSerial() {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¡ Recuerde que al iniciar un Registro, ya crea una PQR ! ' },
      height: '250px',
      width: '400px'
    }).afterClosed().subscribe(res => {
      if (res) {
        if (this.ticketVoid == '') {
          const dialogRef = this.dialog.open(SerialNewModal, {
            data: {
              userId: this.genPersonEntity.id,
              ticket: this.ticket
            },
            width: '100%'
          }).afterClosed().subscribe(resA => {
            this.search();
          }, err => {
            this.alertS.open(err.message, 'error');
          })
        } else {
          const dialogRef = this.dialog.open(SerialNewModal, {
            data: {
              userId: this.genPersonEntity.id,
              ticket: this.ticketVoid
            },
            width: '100%'
          }).afterClosed().subscribe(resA => {
            this.search();
          }, err => {
            this.alertS.open(err.message, 'error');
          })

        };
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });

  }
  getFiles(number: number) {
    this.dialog.open(PqrFileModal, {
      data: { number: number },
      width: '100%'
    }).afterClosed().subscribe(res => {
      this.search();
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
}




