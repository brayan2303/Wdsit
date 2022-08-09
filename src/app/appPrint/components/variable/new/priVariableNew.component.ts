import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ActiveFixedSupplierEntity } from 'src/app/appActiveFixed/entities/activeFixedSupplier.entity';
import { ActiveFixedSupplierService } from 'src/app/appActiveFixed/services/activeFixedSupplier.service';
import { PriVariableEntity } from 'src/app/appPrint/entities/priVariable.entity';
import { PriVariableService } from 'src/app/appPrint/services/priVarible.service';
import { MatSort } from '@angular/material/sort';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { PriVaribleEditComponent } from '../edit/priVaribleEdit.component';


@Component({
  selector: 'app-priVariableNew',
  templateUrl: './priVariableNew.component.html',
  styleUrls: ['./priVariableNew.component.css']
})
export class PriVariableNewComponent implements OnInit {
  public loading: boolean;
  @Input() formId: number;
  @Output() closeDialog = new EventEmitter<any>();
  title: string;
  form: FormGroup;
  columns: string[];
  editing: number;
  id: number;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  unibytes: Uint8Array = null;
  priVaribleEn: PriVariableEntity;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private alertS: AlertService, private priVaribleS: PriVariableService) {
    this.formId = 0;
    this.loading = false;
    this.columns = ['id', 'name', 'description', 'value','active', 'Acciones'];
    this.dataSource = new MatTableDataSource([]);
    this.editing = 0;

  }
  ngOnInit(): void {
    this.formBuilders();
    this.search();
    if (this.formId != 0) {
      this.title = "Editar Registro";
      this.priVaribleS.findById(this.formId).subscribe(res => {
        if (res.message === 'OK') {
          this.priVaribleEn = res.object;
          this.form.setValue(
            {
              'id': this.priVaribleEn.id,
              'name': this.priVaribleEn.name,
              'description': this.priVaribleEn.description,
              'value':this.priVaribleEn.value,
              'active': this.priVaribleEn.active
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
  formBuilders() {
    this.form = this.fb.group({
      id: [0, []],
      name: [, [Validators.required]],
      description: [, [Validators.required]],
      value:[,[Validators.required]],
      active: [, []]
      //[,[Validators.required]],
    })
  }
  save() {
    if (this.editing === 0) {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.priVaribleS.create(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.closeDialog.emit();
            this.alertS.open('Registro creado!', 'success');
            this.priVaribleS.list().subscribe(res => {
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
    } else {
      this.priVaribleS.update(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro actualizado!', 'success');
            this.form.setValue({
              'id': 0,
              'name': '',
              'description': '',
              'value': '',
              'active': ''
            });
            this.editing = 0;
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
  search() {
    this.priVaribleS.list().subscribe(res => {
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
  edit(item: PriVariableEntity) {
    this.editing = item.id;
    this.form.setValue(
      {
        'id': item.id,
        'name': item.name,
        'description': item.description,
        'value': item.value,
        'active': item.active
      }
    );
  }
  closeEditing() {
    this.editing = 0;
    this.form.setValue(
      {
        'id': '',
        'name': '',
        'description': '',
        'value':'',
        'active': ''
      }
    );
  }
  edits(value: number) {
    const dialogRef = this.dialog.open(PriVaribleEditComponent, {
      data: { formId: value }
    });
    dialogRef.afterClosed().subscribe(resA => {
      this.priVaribleS.list().subscribe(resL => {
        if (resL.message === 'OK') {
          this.loading = false;
          this.dataSource = new MatTableDataSource<any>(resL.object);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.alertS.open(resL.message, 'error');
        }
      }, err => {
        this.alertS.open(err.message, 'error');
      });
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

  delete(value: number) {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿ Desea eliminar el registro ?' },
      height: '250px',
      width: '400px'
    }).afterClosed().subscribe(res => {
      if (res) {
        this.priVaribleS.delete(value).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.alertS.open('Registro eliminado!', 'success');
              this.priVaribleS.list().subscribe(res => {
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
















