import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { LoadRuleOneEntity } from '../../entities/loadRuleOne.entity';
import { LoadRuleOneService } from '../../services/loadRuleOne.service';
import { LoadRulesOriginModal } from '../modal/loadRulesOrigin/loadRulesOrigin.modal';


@Component({
  selector: 'app-loadRuleGeneral',
  templateUrl: './loadRuleGeneral.component.html',
  styleUrls: ['./loadRuleGeneral.component.css']
})
export class LoadRuleGeneralComponent implements OnInit {
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
  LoadRuleOneE: LoadRuleOneEntity;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private alertS: AlertService, private LoadRuleOneS: LoadRuleOneService) {
    this.formId = 0;
    this.loading = false;
    this.columns = ['id', 'name', 'active', 'Acciones'];
    this.dataSource = new MatTableDataSource([]);
    this.editing = 0;

  }
  ngOnInit(): void {
    this.formBuilders();
    this.search();
    if (this.formId != 0) {
      this.title = "Editar Registro";
      this.LoadRuleOneS.findById(this.formId).subscribe(res => {
        if (res.message === 'OK') {
          this.LoadRuleOneE = res.object;
          this.form.setValue(
            {
              'id': this.LoadRuleOneE.id,
              'name': this.LoadRuleOneE.name,
              'active': this.LoadRuleOneE.active
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
      this.LoadRuleOneS.create(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.closeDialog.emit();
            this.alertS.open('Registro creado!', 'success');
            this.LoadRuleOneS.list().subscribe(res => {
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
      this.LoadRuleOneS.update(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.alertS.open('Registro actualizado!', 'success');
            this.form.setValue({
              'id': 0,
              'name': '',
              'active': ''
            });
            this.editing = 0;
            this.LoadRuleOneS.list().subscribe(res => {
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
  }
  search() {
    this.LoadRuleOneS.list().subscribe(res => {
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
  edit(item: LoadRuleOneEntity) {
    this.editing = item.id;
    this.form.setValue(
      {
        'id': item.id,
        'name': item.name,
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
        this.LoadRuleOneS.delete(value).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.alertS.open('Registro eliminado!', 'success');
              this.LoadRuleOneS.list().subscribe(res => {
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

  rule(id: number) {
    this.dialog.open(LoadRulesOriginModal, {
        width: '100%',
        data: { id: id }
    })
}

}
















