import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PriVariableEntity } from 'src/app/appPrint/entities/priVariable.entity';
import { MatSort } from '@angular/material/sort';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { PriOperatorService } from 'src/app/appPrint/services/priOperator.service';
import { PriOperatorEntity } from 'src/app/appPrint/entities/priOperator.entity';



@Component({
  selector: 'app-priOperatorNew',
  templateUrl: './priOperatorNew.component.html',
  styleUrls: ['./priOperatorNew.component.css']
})
export class PriOperatorNewComponent implements OnInit {
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
  priOperatorEn: PriOperatorEntity;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private alertS: AlertService, private priOperatorS: PriOperatorService) {
    this.formId = 0;
    this.loading = false;
    this.columns = ['name','description', 'active', 'Acciones'];
    this.dataSource = new MatTableDataSource([]);
    this.editing = 0;

  }
  ngOnInit(): void {
    this.formBuilders();
    this.search();
    if (this.formId != 0) {
      this.title = "Editar Registro";
      this.priOperatorS.findById(this.formId).subscribe(res => {
        if (res.message === 'OK') {
          this.priOperatorEn = res.object;
          this.form.setValue(
            {
              'id': this.priOperatorEn.id,
              'name': this.priOperatorEn.name,
              'description':this.priOperatorEn.description,
              'active': this.priOperatorEn.active
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
      description:[,[Validators.required]],
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
      this.priOperatorS.create(this.form.value).subscribe(res => {
        if (res.message === 'OK') {
          if (res.object != 0) {
            this.closeDialog.emit();
            this.alertS.open('Registro creado!', 'success');
            this.priOperatorS.list().subscribe(res => {
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
    this.priOperatorS.list().subscribe(res => {
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
        this.priOperatorS.delete(value).subscribe(res => {
          if (res.message === 'OK') {
            if (res.object != 0) {
              this.alertS.open('Registro eliminado!', 'success');
              this.priOperatorS.list().subscribe(res => {
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
















