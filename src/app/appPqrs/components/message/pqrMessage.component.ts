import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PqrMessageService } from "../../services/pqrMessage.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { PqrMessageModal } from "../../modals/pqrMessageFile/pqrMessage.modal";
import { PqrMessageEntity } from "../../entities/pqrMessage.entity";
import { PqrEscalationService } from "../../services/pqrEscalation.service";
import { PqrEscalationEntity } from "../../entities/pqrEscalation.entity";
import { PqrPqrsService } from "../../services/pqrPqrs.service";
import { confirmationFinishPqrs } from "../../modals/confirmationFinish/confirmationFinishPqrs.component";
import { Router } from "@angular/router";



@Component({
  selector: 'app-pqrMessage',
  templateUrl: './pqrMessage.component.html',
  styleUrls: ['./pqrMessage.component.css']
})

export class PqrMessageComponent implements OnInit {
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  loading: boolean;
  columns: string[];
  id: number;
  number: string;
  form: FormGroup;
  message: string;
  agentId:number;
  genPersonEntity: GenPersonEntity;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Inject(MAT_DIALOG_DATA) public data: any
  @ViewChild(MatSort) sort: MatSort;
  unibytes: Uint8Array = null;
  resultsLength = 0;
  fileList: File[];
  messaList: PqrEscalationEntity[];
  pqrMessaggeEntity: PqrMessageEntity;
  pqrEscalationEntity: PqrEscalationEntity;
  loadingMessage: boolean;
  title: string;
  subtitle: string;
  creationDate: string;
  userId: number;
  customerId: number;
  active: boolean;
  ticket: string;

  constructor(private pqrPqrsS: PqrPqrsService,private dialog: MatDialog, private pqrEscalationS: PqrEscalationService, private pqrMessageS: PqrMessageService, private alertS: AlertService, private fb: FormBuilder, private route: Router) {
    this.formId = 0;
    this.message = '';
    this.loading = false;
    this.columns = ['number','ticket', 'nameUser', 'customerName', 'active'];
    this.dataSource = new MatTableDataSource([]);
    this.fileList = [];
    this.pqrMessaggeEntity = new PqrMessageEntity();
    this.pqrEscalationEntity = new PqrEscalationEntity();
    this.number = '';
    this.messaList = []
    this.loadingMessage = false
    this.title = '';
    this.subtitle = '';
    this.id = 0;
    this.creationDate = '';
    this.userId = 0;
    this.customerId = 0;
    this.ticket= '';
    this.agentId=0;
    
   
  }

  ngOnInit(): void {
    this.loading = true,
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.list();
    this.formBuilders();
    
  }
  formBuilders() {
    this.form = this.fb.group({

      message: [, [Validators.required]]
    })

  }

  list() {
    
    this.pqrMessageS.list(this.genPersonEntity.id).subscribe(res => {
      if (res.message === 'OK') {
        this.loading = false;
        this.dataSource = new MatTableDataSource<any>(res.object);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.alertS.open('El usuario no tiene escalaciones', 'error');
      }
    }, err => {
      this.alertS.open(err, 'error');
    });
  }

  findPermission(pqrsNumber:string){
    this.pqrPqrsS.escalationAgent(pqrsNumber).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != 0) {
          this.agentId = res.object;
          this.userId= this.genPersonEntity.id;
        } else {
          this.alertS.open(res.message, 'error');
        }
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  escalationFinish(ticket: string, number: string, creationPersonId: number) {
    const dialogRef = this.dialog.open(confirmationFinishPqrs, {
        data: { message: '¿ Desea terminar la escalacion ?' },
        height: '250px',
        width: '400px'
    });
    dialogRef.afterClosed().subscribe(res => {
      this.list();
        if (res) {
            this.pqrPqrsS.updateCustomerEscalationFinish(number).subscribe(res => {
                if (res.message === 'OK') {
                    if (res.object != 0) {
                        this.pqrMessageS.updateMessage(number).subscribe(res => {
                            if (res.message === 'OK') {
                                if (res.object != 0) {
                                    this.alertS.open('Finalizacion de la escalacion exitosa!', 'success');
                                    this.pqrMessageS.sendEmail(ticket, number, creationPersonId).subscribe(resS => {
                                        if (resS.message === 'OK') {
                                          this.route.navigate(['/wdcs/wdcs/management']);
                                            if (resS.object === 0) {
                                                this.alertS.open('Error al enviar el correo de notificacion!', 'error');
                                            }
                                        } else {
                                            this.alertS.open(resS.message, 'error');
                                        }
                                    }, err => {
                                        this.alertS.open(err.message, 'error');
                                    });
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
                        this.alertS.open(res.message, 'error')
                    }
                } else {
                    this.alertS.open(res.message, 'error')
                }
            }, err => {
                this.alertS.open(err.message, 'error')
            }

            );
        }
    }, err => {
        this.alertS.open(err.message, 'error');
    });
}


  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  loadFile(number: string, creationDate: String) {
    this.pqrMessageS.loadFile(number, creationDate, this.fileList).subscribe(res => {
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
  addFile(file: FileList) {
    if (file != undefined) {
      for (let i = 0; i < file.length; i++) {
        this.fileList.push(file[i]);
      }
    }
  }

  getFiles(number:string, creationDate: Date) {
    this.dialog.open(PqrMessageModal, {
      data: { number: number, creationDate: creationDate },
    
      width: '100%'
    });
  }

  getInformation(number: string, ticket: string, active:boolean) {
    this.number = number;
    this.ticket = ticket;
    this.active = active;
    this.detail(number, ticket, active);
    this.findPermission(number);
  }

  detail(number: string, ticket:string, active:boolean) {
    this.title = number; 
    this.subtitle = ticket;   
    this.messaList = []
    this.loadingMessage = true
    if(this.active!=false){
    this.pqrEscalationS.findById(number).subscribe(res => {
  
      if(this.pqrMessaggeEntity.active!=true){
       
      if (res.message === 'OK') {
        this.messaList = res.object;
        this.loadingMessage = false
      } else {
        this.alertS.open(res.message, 'error');
      }
    }
      else{
        this.alertS.open('La escalacion se encuentra terminada', 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }else{
    this.alertS.open('Escalacion terminada','warning')
  }
  
  }

  save() {
    if (this.formId === 0) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.pqrEscalationS.create(this.number, this.form.controls.message.value, this.genPersonEntity.id).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            if (this.fileList.length > 0) {
              var fecha = new Date();
              var fechaCreacion;
              fechaCreacion = fecha.getFullYear() + '-' + ('0' + (fecha.getMonth() + 1)).slice(-2) + '-' + ('0' + fecha.getDate()).slice(-2);
              this.loadFile(this.number, fechaCreacion);
            }
            this.closeDialog.emit();
            this.alertS.open('Envio de mensaje exitoso!', 'success');
            this.form.reset;
            this.pqrEscalationS.sendEmail(this.ticket,this.number, this.genPersonEntity.id).subscribe(resS => {
              if (resS.message === 'OK') {
                if (resS.object === 0) {
                  this.alertS.open('Error al enviar el correo de notificacion!', 'error');
                }
              } else {
                this.alertS.open(resS.message, 'error');
              }
            }, err => {
              this.alertS.open(err.message, 'error');
            });
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

