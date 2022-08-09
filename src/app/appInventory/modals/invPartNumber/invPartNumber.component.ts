import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ExportType, MatTableExporterDirective } from "mat-table-exporter";
import { AlertService } from "src/app/shared/services/alert.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { InvGeneralInitService } from "../../services/invGeneralInit.service";
import { InvGeneralInitEntity } from "../../entities/InvGeneralInit.entity";
import { InvPartNumberDeftGeneralService } from "../../services/invPartNumberDeftGeneral.service";

@Component({
  selector: 'modal-invPartNumber',
  templateUrl: './invPartNumber.component.html',
  styleUrls: ['./invPartNumber.component.css']
})

export class InvPartNumberComponent implements OnInit {
  uploading: boolean;
  loading: boolean;
  columns: string[];
  header: string[];
  @ViewChild('serials') searchElement: ElementRef;
  @ViewChild('pn') searchElementPN: ElementRef;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatTableExporterDirective, { static: true }) exporter: MatTableExporterDirective;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  fileType: string;
  genPersonEntity: GenPersonEntity;
  invGeneralInitE: InvGeneralInitEntity;
  form: FormGroup;
  partNumber: string
  serial: string;

  constructor(private invGeneralInitS: InvGeneralInitService, private alertS: AlertService, private dialog: MatDialog, private InvPartNumberDeftGeneralS: InvPartNumberDeftGeneralService, private fb: FormBuilder, public dialogRef: MatDialogRef<InvPartNumberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.loading = false;
    this.columns = ['conteo', 'codigo', 'goodDeft', 'serial', 'name', 'creationDate', 'active','Acciones']
    this.dataSource = new MatTableDataSource([]);
    dialogRef.disableClose = true;
    this.partNumber = '';
    this.serial = '';
    this.invGeneralInitE = new InvGeneralInitEntity();
  }

  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.search()
  }
  

  validador(event: KeyboardEvent) {
    if (event.key == 'Tab' || event.key == 'Enter') {
      if(this.partNumber != '' && this.serial == '')
        {
          if(event.key === 'Tab'){
            event.preventDefault();
            const input: HTMLInputElement = this.searchElementPN.nativeElement as HTMLInputElement;
            input.focus();
          } else {
            const input: HTMLInputElement = this.searchElementPN.nativeElement as HTMLInputElement;
            input.select();
          }
          
        } else if(this.partNumber != '' && this.serial != ''){
          if(event.key === 'Tab'){
            event.preventDefault();
            const input: HTMLInputElement = this.searchElement.nativeElement as HTMLInputElement;
            input.focus();
          } else {
            const input: HTMLInputElement = this.searchElement.nativeElement as HTMLInputElement;
            input.select();
          }
          this.save();
        }
    }
  }

  save() {
    if (this.partNumber != '') {
      if (this.serial != '') {
        var part = this.partNumber;
        var seri = this.serial;
        this.partNumber = '';
        this.serial = '';
        this.invGeneralInitS.findByValidationPartNumber(part).subscribe(resV => {
          if (resV.message === 'OK') {
            this.invGeneralInitE = resV.object;
            if (this.invGeneralInitE.validacionPart == 'NO') {
              this.InvPartNumberDeftGeneralS.create(this.data.id, part, seri, this.genPersonEntity.id).subscribe(res => {
                if (res.message === 'OK') {
                  if (res.object != 0) {
                    this.alertS.open('Registro creado', 'success');
                    this.search();
                    this.partNumber = '';
                    this.serial = '';
                  } else {
                    this.alertS.open(res.message, 'error');
                    this.partNumber = '';
                    this.serial = '';
                  }
                } else {
                  this.alertS.open(res.message, 'error');
                }
              }, err => {
                this.alertS.open(err.message, 'error');
              });
            } else {
              this.alertS.open('El parte numero no es encuentra registrado', 'warning');
              this.partNumber = '';
              this.serial = '';
            }
          } else {
            this.alertS.open(resV.message, 'warning');
          }
        }, err => {
          this.alertS.open(err.message, 'error');
        });
      } else {
        this.alertS.open('¡Por favor ingrese un serial!', 'warning');
        this.partNumber = '';
        this.serial = '';
      }

    } else {
      this.alertS.open('¡Por favor ingrese un Parte numero!', 'warning');
      this.partNumber = '';
      this.serial = '';
    }
  }
  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
            this.invGeneralInitS.updateCounting(this.data.id).subscribe(resP => {
              if (resP.message === 'OK') {
                this.search();
                this.dialogRef.close();
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
    this.InvPartNumberDeftGeneralS.list(this.data.id).subscribe(res => {
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
  delete(value: number) {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿ Desea eliminar el registro ?' },
      height: '250px',
      width: '400px'
    }).afterClosed().subscribe(res => {
      if (res) {
        this.InvPartNumberDeftGeneralS.delete(value).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.alertS.open('Registro eliminado!', 'success');
              this.InvPartNumberDeftGeneralS.list(this.data.id).subscribe(res => {
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

}
