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
import { PriFormulaService } from 'src/app/appPrint/services/priFormula.service';
import { PriFormulaEntity } from 'src/app/appPrint/entities/priFormula.enity';
import { calculationFormModal } from 'src/app/appPrint/modals/calculation/calculationForm.modal';



@Component({
  selector: 'app-priFormulaNew',
  templateUrl: './priFormulaNew.component.html',
  styleUrls: ['./priFormulaNew.component.css']
})
export class PriFormulaNewComponent implements OnInit {
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
  priFormulaEn: PriFormulaEntity;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private alertS: AlertService, private priFormulaS: PriFormulaService) {
    this.formId = 0;
    this.loading = false;
    this.columns = ['id', 'name', 'description', 'active', 'Acciones'];
    this.dataSource = new MatTableDataSource([]);
    this.editing = 0;

  }
  ngOnInit(): void {
    this.formBuilders();
    this.search();
    if (this.formId != 0) {
      this.title = "Editar Registro";
      this.priFormulaS.findById(this.formId).subscribe(res => {
        if (res.message === 'OK') {
          this.priFormulaEn = res.object;
          this.form.setValue(
            {
              'id': this.priFormulaEn.id,
              'name': this.priFormulaEn.name,
              'description': this.priFormulaEn.description,
              'active': this.priFormulaEn.active
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
      this.priFormulaS.create(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.closeDialog.emit();
            this.alertS.open('Registro creado!', 'success');
            this.priFormulaS.list().subscribe(res => {
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
      this.priFormulaS.update(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro actualizado!', 'success');
            this.form.setValue({
              'id': 0,
              'name': '',
              'description': '',
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
    this.priFormulaS.list().subscribe(res => {
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
        'active': ''
      }
    );
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
        this.priFormulaS.delete(value).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.alertS.open('Registro eliminado!', 'success');
              this.priFormulaS.list().subscribe(res => {
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

  calculate(id:number) {
    this.dialog.open(calculationFormModal, {
        data: { 'formulaId': id },
        width: '100%'
    });
}

}
















