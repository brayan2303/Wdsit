import { ActiveFixedTypeEntryService } from './../../../services/activeFixedTypeEntry.service';
import { ActiveFixedTypeEntryEntity } from './../../../entities/activeFixedTypeEntry.entity';
import { ActiveFixedProductEntity } from './../../../entities/ActiveFixedProduct.entity';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActiveFixedProductService } from 'src/app/appActiveFixed/services/activeFixedProduct.service';
import { ActiveFixedSupplierService } from 'src/app/appActiveFixed/services/activeFixedSupplier.service';
import { ActiveFixedSupplierEntity } from 'src/app/appActiveFixed/entities/activeFixedSupplier.entity';


@Component({
  selector: 'app-actFeaturesProductNew',
  templateUrl: './actFeaturesProductNew.component.html',
  styleUrls: ['./actFeaturesProductNew.component.css']
})
export class ActFeaturesProductComponent implements OnInit {
  public loading: boolean;
  @Input() ActFixProductformId: number;
  @Output() closeDialog = new EventEmitter<any>();
  dataSource = new MatTableDataSource<any>();
  title:string;
  typeProductList : ActiveFixedTypeEntryEntity[];
  supplierListt: ActiveFixedSupplierEntity[];
  fileList: File[];
  dataSourceCouting = new MatTableDataSource<any>();
  dataSourceSerials = new MatTableDataSource<any>();
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorCouting') paginatorCouting: MatPaginator;
  @ViewChild('paginatorSerials') paginatorSerials: MatPaginator;
  form: FormGroup;
  activeFixedProductEntity:ActiveFixedProductEntity;
  
  constructor(private fb: FormBuilder,private alertS: AlertService,private ActiveFixedProductS:ActiveFixedProductService, private activeFixedTypeProfS:ActiveFixedTypeEntryService, private activeFixedSupplier :ActiveFixedSupplierService) {
    this.ActFixProductformId = 0;
    this.typeProductList = [];
  
    this.dataSource = new MatTableDataSource([]);
  }
  ngOnInit(): void {
    this.formBuilders();
    this.activeFixedTypeProfS.list().subscribe(res => {
      if (res.message === 'OK') {
        this.typeProductList = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
    this.activeFixedSupplier.list().subscribe(res => {
      if (res.message === 'OK') {
        this.supplierListt = res.object;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
    if(this.ActFixProductformId != 0){
      this.title="Editar Registro";
      this.ActiveFixedProductS.findById(this.ActFixProductformId).subscribe(res=>{
        if(res.message==='OK'){
          this.activeFixedProductEntity=res.object;
          this.form.setValue(
            {
              'id':this.activeFixedProductEntity.id,
              'name':this.activeFixedProductEntity.name,
              'description':this.activeFixedProductEntity.description,
              'type':this.activeFixedProductEntity.type,
              'supplier':this.activeFixedProductEntity.supplier,
              'multipleAssignment':this.activeFixedProductEntity.multipleAssignment,
              'active':this.activeFixedProductEntity.active
            }
          );
        }else{
          this.alertS.open(res.message,'error');
        }
      },err=>{
        this.alertS.open(err.message,'error');
      });
    }else{
      this.title="Nuevo registro";
    }
  }

  formBuilders(){
    this.form= this.fb.group({
      id: [,[]],
      name:[,[Validators.required]],
      description:[,[Validators.required]],
      type:[,[Validators.required]],
      supplier:[,[Validators.required]],
      multipleAssignment:[,[]],
      active: [,[]]
      //[,[Validators.required]],
    })

  }
 
  save() {
    if(this.ActFixProductformId===0){
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
      this.ActiveFixedProductS.create(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.closeDialog.emit();
            this.alertS.open('Registro creado','success');
          }else{
            this.alertS.open(res.message,'error');
          }
        }else{
          this.alertS.open(res.message,'error');
        }        
      },err=>{
        this.alertS.open(err.message,'error');
      });
    }else{
      this.ActiveFixedProductS.update(this.form.value).subscribe(res=>{
        if(res.message==='OK'){
          if(res.object !=0){
            this.alertS.open('Registro actualizado!','success');
            this.form.setValue({
              'id': 0,
              'name': '',
              'description': '',
              'type': '',
              'supplier':'',
              'multipleAssignment':'',
              'active': ''
            });
            this.closeDialog.emit();
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

}



