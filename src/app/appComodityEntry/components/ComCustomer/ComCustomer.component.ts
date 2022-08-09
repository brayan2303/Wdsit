import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { GenCustomerService } from 'src/app/appGeneral/services/genCustomer.service';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { ComCustomertService } from '../../services/ComCustomerService';
import { ComCustomerEntity } from '../../entities/ComCustomerEntity';


@Component({
  selector: 'app-ComCustomer',
  templateUrl: './ComCustomer.component.html',
  styleUrls: ['./ComCustomer.component.css']
})
export class ComCustomerComponent implements OnInit{
  public loading: boolean;
  @Input() ComCustomerId: number;
  editing: number;
  title:string;
  form: FormGroup;
  columns: string[];
  customerList: GenCustomerEntity[];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  unibytes: Uint8Array = null;
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private ComCustomerS:ComCustomertService, private dialog: MatDialog, private GenC:GenCustomerService) {
    this.editing = 0;
    this.ComCustomerId = 0;
    this.customerList=[];

    this.loading = false;
    this.columns = ['project', 'customer', 'active', 'creationDate', 'actions'];
    this.dataSource = new MatTableDataSource([]);
  }
  ngOnInit(): void {
    this.formBuilders();
    this.list();
    this.getAllCustomer();
    if(this.ComCustomerId != 0){
      this.title="Editar Proyecto";
    }else{
      this.title="Nuevo Proyecto";
    }
  }


  delete(comCustomerId:number){
      this.dialog.open(ConfirmationComponent, {
        data: { message: '¿ Desea eliminar el registro ?' },
        height: '250px',
        width: '400px'
      }).afterClosed().subscribe(res => {
          if (res) {
        this.ComCustomerS.delete(comCustomerId).subscribe(res => {
          if (res.message === 'OK') {
              this.alertS.open('Registro eliminado','success');
              this.list();
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

  /**
   * Obtener todos los clientes activos para listar
   */
  getAllCustomer(){
    this.GenC.findAll().subscribe(res => {
      if (res.message === 'OK') {
          this.customerList=res.object;
      } else {
          this.alertS.open(res.message, 'error');
      }
    }, err => {
        this.alertS.open(err.message, 'error');
    });
  }

  //Validacion del formulario
  formBuilders(){
    this.form= this.fb.group({
      project:[,[Validators.required]],
      customerId: [,[Validators.required]],
      active: new FormControl('')
    });
  }
 
  save() {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      if(this.editing == 0)
      {
        this.ComCustomerS.create((JSON.parse(localStorage.getItem("user"))["id"]),this.form.value).subscribe(res=>{
          if(res.message==='OK'){
            if(res.object !=0){
              this.alertS.open('Registro creado','success');
              this.list();
            }else{
              this.alertS.open(res.message,'error');
            }
          }else{
            this.alertS.open(res.message,'error');
          }        
        },err=>{
          this.alertS.open(err.message,'error');
        });
      } else {
        this.ComCustomerS.update(this.editing,this.form.value).subscribe(res=>{
          if(res.message==='OK'){
            if(res.object !=0){
              this.alertS.open('Registro actualizado','success');
              this.list();
            }else{
              this.alertS.open(res.message,'error');
            }
          }else{
            this.alertS.open(res.message,'error');
          }        
        },err=>{
          this.alertS.open(err.message,'error');
        });
      }
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Toda la paramtrizacion cargada
   */
  list(){
    this.ComCustomerS.list().subscribe(res => {
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

  edit(item:ComCustomerEntity){
    this.editing = item.id;
      this.form.setValue({
        'project': item.project,
        'customerId':item.customerId,
        'active': item.active
      });
      console.log(this.editing);
  }

}



