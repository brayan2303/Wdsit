import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FilFilesModal } from 'src/app/appFile/modals/files/filFiles.modal';
import { FileSerialSearchModel } from 'src/app/appFile/models/fileSerialSearch.model';
import { FilSerialService } from 'src/app/appFile/services/filSerial.service';
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenPersonEntity } from 'src/app/appGeneral/entities/genPerson.entity';
import { GenCustomerService } from 'src/app/appGeneral/services/genCustomer.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-filSerialNew',
  templateUrl: './filSerialNew.component.html',
  styleUrls: ['./filSerialNew.component.css']
})
export class FilSerialNewComponent implements OnInit {
  loading: boolean;
  customerId2: number;
  serial: string;
  genPersonEntity: GenPersonEntity;
  customerList: GenCustomerEntity[];
  columns: string[];
  dataSource:MatTableDataSource<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  file: boolean;
  serialModel: FileSerialSearchModel;


  constructor(private filSerialS: FilSerialService, private genCustomerS: GenCustomerService, private alertS: AlertService, private dialog: MatDialog) {
    this.loading = false;
    this.customerId2 = 0;
    this.serial = '';
    this.customerList = [];
    this.columns = ['serial', 'country', 'customer', 'user', 'creationDate', 'actions'];
    this.dataSource = new MatTableDataSource([]);
    this.serialModel = null;
    this.file= false;
  }

  ngOnInit() {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.genCustomerS.findAll().subscribe(res => {
      if (res.message === 'OK') {
        this.customerList = res.object;
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }


  save() {
    this.filSerialS.create(this.serial, Number(localStorage.getItem('countryId')), this.serialModel.cardNameId, this.genPersonEntity.id).subscribe(resC => {
      if (resC.message === 'OK') {
        if (resC.object != 0) {
          this.alertS.open('Serial creado!', 'success');
          this.serial = '';
          this.search();
        } else {
          this.alertS.open('Error al crear el serial!', 'error');
        }
      } else {
        this.alertS.open(resC.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  delete(customer: string, serialId: string) {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿Desea eliminar el serial?' },
      height: '250px',
      width: '400px'
    }).afterClosed().subscribe(resA => {
      if (resA) {
        this.filSerialS.delete(Number(serialId)).subscribe(resD => {
          if (resD.message === 'OK') {
            if (resD.object != 0) {
              this.alertS.open('Serial eliminado!', 'success');
              this.search();
              this.filSerialS.deleteFileBySerial(customer, serialId).subscribe(resDF => {
                if (resDF.message != 'OK') {
                  this.alertS.open(resDF.message, 'error');
                } else {
                  if (resDF.object === 0) {
                    this.alertS.open('Error al eliminar los archivos!', 'error');
                  }
                }
              }, err => {
                this.alertS.open(err.message, 'error');
              });
            } else {
              this.alertS.open('Error al eliminar el serial!', 'error');
            }
          } else {
            this.alertS.open(resD.message, 'error');
          }
        }, err => {
          this.alertS.open(err.message, 'error');
        });
      }
    });
  }
  files(serialId: string, customerId:string) {
    this.dialog.open(FilFilesModal, {
      width: '800px',
      data: { 'serialId': serialId, 'customerId': customerId }
    });
  }
  search() {
    this.loading = true;
    this.filSerialS.list(Number(localStorage.getItem('countryId')), this.customerId2).subscribe(res => {
      if (res.message === 'OK') {

        this.loading = false;
        this.dataSource = new MatTableDataSource<any>(res.object);
        this.dataSource.paginator = this.paginator;
      } else {
        this.alertS.open(res.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }
  serialSearch() {
    this.loading = true;
    this.filSerialS.serialSearch(this.serial).subscribe(res=>{
      if(res.message==='OK'){
        if(res.object!=null){
          this.serialModel=res.object;
        }else{
          this.alertS.open('Serial no encontrado!','warning');
        }
      }else{
        this.alertS.open(res.message,'error');
      }
    },err=>{
      this.alertS.open(err.message,'error');
    });
  }
  load(file: File[]) {
    if (file != undefined) {
        for (let i = 0; i < file.length; i++) {
          this.filSerialS.loadFile(String(this.serialModel.id), String(this.serialModel.cardNameId), 'INICIO', file).subscribe(res => {
            if (res.message === 'OK') {
                if (res.object != 0) {
                  this.alertS.open('Archivo cargado!', 'success');
                  this.file = true;
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

    }
    
}
}
