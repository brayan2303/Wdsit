import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ExportType, MatTableExporterDirective } from "mat-table-exporter";
import { AlertService } from "src/app/shared/services/alert.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { ReceptionTypeMasterService } from "../../services/receptionTypeMaster.service";
@Component({
  selector: 'modal-receptionTypeMaster',
  templateUrl: './receptionTypeMaster.component.html',
  styleUrls: ['./receptionTypeMaster.component.css']
})

export class ReceptionTypeMasterComponent implements OnInit {
  uploading: boolean;
  loading: boolean;
  columns: string[];
  header: string[];
  @Input() formId: number;
  @ViewChild('serials') searchElement: ElementRef;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatTableExporterDirective, { static: true }) exporter: MatTableExporterDirective;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  fileType: string;
  genPersonEntity: GenPersonEntity;
  form: FormGroup;
  serial: string

  constructor(private alertS: AlertService, private dialog: MatDialog, private ReceptionTypeMasterS: ReceptionTypeMasterService, private fb: FormBuilder, public dialogRef: MatDialogRef<ReceptionTypeMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.loading = false;
    this.columns = ['name', 'creationDate', 'active', 'Acciones']
    this.dataSource = new MatTableDataSource([]);
    dialogRef.disableClose = true;
    this.serial = '';
    this.formId = 0;
  }

  ngOnInit(): void {
    this.formBuilders();
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.list();
    this.data.id
  }

  formBuilders() {
    this.form = this.fb.group({
      id: [, []],
      name: [, [Validators.required]],
      active: [, []]
      //[,[Validators.required]],
    })

  }

  save() {
    if (this.formId === 0) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.ReceptionTypeMasterS.create(this.form.value, this.genPersonEntity.id).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.form.reset();
            this.list();
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
      this.ReceptionTypeMasterS.update(this.form.value, this.genPersonEntity.id).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro actualizado!', 'success');
            this.form.setValue({

            });
            this.form.reset();
            this.list();
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
  list() {
    this.ReceptionTypeMasterS.list().subscribe(res => {
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
        this.ReceptionTypeMasterS.delete(value).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.alertS.open('Registro eliminado!', 'success');
              this.ReceptionTypeMasterS.list().subscribe(res => {
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


  search() {
    this.ReceptionTypeMasterS.list().subscribe(res => {
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
