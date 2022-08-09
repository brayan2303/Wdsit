import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ExportType, MatTableExporterDirective } from "mat-table-exporter";
import { AlertService } from "src/app/shared/services/alert.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InvGeneraSerialService } from "../../services/invGeneraSerial.service";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { InvGeneralInitService } from "../../services/invGeneralInit.service";
import { InvGeneralInitEntity } from "../../entities/InvGeneralInit.entity";

@Component({
  selector: 'modal-invSerial',
  templateUrl: './invSerial.component.html',
  styleUrls: ['./invSerial.component.css']
})

export class InvSerialComponent implements OnInit {
  uploading: boolean;
  loading: boolean;
  columns: string[];
  header: string[];
  @ViewChild('serials') searchElement: ElementRef;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatTableExporterDirective, { static: true }) exporter: MatTableExporterDirective;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  fileType: string;
  genPersonEntity: GenPersonEntity;
  invGeneralInitE: InvGeneralInitEntity;
  form: FormGroup;
  serial: string

  constructor(private invGeneralInitS: InvGeneralInitService, private alertS: AlertService, private dialog: MatDialog, private invGeneraSerialS: InvGeneraSerialService, private fb: FormBuilder, public dialogRef: MatDialogRef<InvSerialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.loading = false;
    this.columns = ['conteo', 'codigo', 'goodDeft', 'serial', 'name', 'creationDate', 'active', 'Acciones']
    this.dataSource = new MatTableDataSource([]);
    dialogRef.disableClose = true;
    this.serial = '';
    this.invGeneralInitE = new InvGeneralInitEntity();
  }

  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.list();
    this.data.id
  }


  validador(event: KeyboardEvent) {
    if (event.key == 'Enter' || event.key == 'Tab') {
      if (event.key === 'Tab') {
        event.preventDefault();
      }
      const input: HTMLInputElement = this.searchElement.nativeElement as HTMLInputElement;
      input.value = '';
      input.focus();
      input.select();
      this.save();
    }
  }

  save() {
    if (this.serial != '') {
      var seri = this.serial;
      this.serial = '';
      this.invGeneralInitS.findByValidationSerial(seri, this.data.id).subscribe(resV => {
        if (resV.message === 'OK') {
          this.invGeneralInitE = resV.object;
          if (this.invGeneralInitE.validacionSerial != 'NO') {
            this.invGeneraSerialS.create(seri, this.data.id, this.genPersonEntity.id).subscribe(res => {
              if (res.message === 'OK') {
                if (res.object != 0) {
                  this.alertS.open('Registro creado', 'success');
                  this.list();
                  this.serial = '';
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
            this.alertS.open('El serial ya se encuentra registrado en la lista', 'warning');
          }
        } else {
          this.alertS.open(resV.message, 'warning');
        }
      }, err =>{
        this.alertS.open(err.message, 'error');
      });
    } else {
      this.alertS.open('¡Por favor ingrese un serial!', 'warning');
    }

  }
  list() {
    this.invGeneraSerialS.list(this.data.id).subscribe(res => {
      if (res.message === "OK") {
        this.loading = false;
        this.dataSource = new MatTableDataSource<any>(res.object);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      } else {
        this.alertS.open(res.message, 'error')
      }
    }, err => {
      this.alertS.open(err.message, 'error')

    }
    )
  }
  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(value: number) {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿ Desea eliminar el registro ?' },
      height: '250px',
      width: '400px'
    }).afterClosed().subscribe(res => {
      if (res) {
        this.invGeneraSerialS.delete(value).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.alertS.open('Registro eliminado!', 'success');
              this.invGeneraSerialS.list(this.data.id).subscribe(res => {
                this.loading = false;
                this.dataSource = new MatTableDataSource<any>(res.object);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }, err => {
                this.alertS.open(err, 'error');
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
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  close(): void {
    this.dialogRef.close();
  }
  init() {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿ Desea finalizar el conteo ?' },
      height: '250px',
      width: '400px'
    }).afterClosed().subscribe(res => {
      if (res) {
        this.invGeneralInitS.update(this.data.id).subscribe(resL => {
          if (resL.message === 'OK') {
            this.alertS.open('Conteo finalizado!', 'success');
            this.invGeneralInitS.updateCountingActive(this.data.id).subscribe(resP => {
              if (resP.message === 'OK') {
                this.invGeneralInitS.updateCounting(this.data.id).subscribe(resP => {
                  if (resP.message === 'OK') {
                    this.search();
                    this.dialogRef.close();
                  } else {
                    this.alertS.open(resP.message, 'warning')
                  }
                })
              } else {
                this.alertS.open(resP.message, 'warning')
              }
            })

          } else {
            this.alertS.open(res.message, 'error')
          }
          this.search();
        })
        this.search();
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }

  search() {
    this.invGeneralInitS.list().subscribe(res => {
      if (res.message === 'OK') {
        this.loading = false;
        this.dataSource = new MatTableDataSource<any>(res.object);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });


  }

}
