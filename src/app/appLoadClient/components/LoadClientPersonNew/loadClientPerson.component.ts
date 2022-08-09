import { GenCustomerService } from 'src/app/appGeneral/services/genCustomer.service';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { AlertService } from "src/app/shared/services/alert.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { MatPaginator } from "@angular/material/paginator";
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCountryEntity } from 'src/app/appGeneral/entities/genCountry.entity';
import { LoadPersonCustomerService } from '../../services/loadPersonCustomer.service';
import { LoadClienPersontService } from '../../services/loadClientPersonService';
import { LoadClientPersonHistoryEntity } from '../../entities/loadClientPersonHistory.entity';
import { LoadClientPersonHistoryService } from '../../services/loadClientPersonHistory.service';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-loadClientPerson',
  templateUrl: './loadClientPerson.component.html',
  styleUrls: ['./loadClientPerson.component.css']
})

export class loadClientPersonComponent implements OnInit {
  uploading: boolean;
  loading: boolean;
  columns: string[];
  fileList: File[];
  genPersonEntity: GenPersonEntity;
  header: string[];
  @Output() closeDialog = new EventEmitter<any>();
  dataSource: MatTableDataSource<any>;
  public listCustomers: GenCustomerEntity[];  
  @ViewChild('paginator') paginator: MatPaginator;
  person: GenPersonEntity;
  loadId: number;
  countryId:number;
  customer: GenCustomerEntity;
  customerList: GenCustomerEntity[];
  countryList:GenCountryEntity[];
  @Inject(MAT_DIALOG_DATA) public data: any

  constructor(private loadClientS: LoadClienPersontService, private alertS: AlertService, private dialog: MatDialog,private loadCustomerPersoS:LoadPersonCustomerService, private loadCustomerHS:LoadClientPersonHistoryService) {
    this.loading = false;
    this.columns = ['Material','Texto breve de material', 'Número de serie', 'Fabricante número de serie', 'Almacén', 'Lote', 'Lote de stock', 'Status del sistema', 'Modificado el', 'Modificado por','Creado por', 'Creado el','Tp.stocks (contab.refer.)', 'Materiales'];
    this.header = ['material','textMaterial','numSerie','factoryNumSerie','warehouse', 'lot', 'lotStock', 'statusSystem', 'modificationDate', 'modificationUser', 'creation', 'creationDate', 'tpStock', 'materialTwo'];
    this.dataSource = new MatTableDataSource([]);
    this.loadId = 0;
    this.uploading = false;
    this.fileList = [];
    this.customer = new GenCustomerEntity();
    this.countryId = 0;
  }
  ngOnInit(): void {
    this.genPersonEntity = JSON.parse(localStorage.getItem('user'));
    this.loading = true;
    this.loadCustomerPersoS.findCustomerByPersonId(Number(JSON.parse(localStorage.getItem("user"))["id"])).subscribe(res =>{
      if (res.message === 'OK'){
        this.customer = res.object;
        this.loadClientS.list(this.customer.id).subscribe(resL => {
              if (resL.message === 'OK') {
                this.dataSource = new MatTableDataSource(resL.object);
                this.dataSource.paginator = this.paginator;
                this.loading = false;
              } else {
                this.alertS.open(resL.message, 'error');
                this.uploading = false;
              }
            }, err => {
              this.alertS.open(err.message, 'error');
              this.uploading = false;
            });
      } else {this.alertS.open(res.message, 'error');}
    },err =>{
      this.alertS.open(err.message, 'error');
    })
  }
  load(file: FileList) {
    this.loadId = Math.round(Math.random()*20);
    if (file.length > 0) {
      this.uploading = true;
      this.loadClientS.create(this.customer.description,this.customer.id, this.loadId, file[0]).subscribe(resC => {
        if (resC.message === 'OK') {
          if (resC.object != 0) {
            this.save();
            this.alertS.open('Archivo cargado!', 'success');
            this.loading = true;
            this.uploading = false;
            this.loadClientS.list(this.customer.id).subscribe(resL => {
              if (resL.message === 'OK') {
                this.dataSource = new MatTableDataSource(resL.object);
                this.dataSource.paginator = this.paginator;
                this.loading = false;
                this.uploading = false;
              } else {
                this.alertS.open(resL.message, 'error');
                this.uploading = false;
              }
            }, err => {
              this.alertS.open(err.message, 'error');
              this.uploading = false;
            });
          } else {
            this.alertS.open('Error al cargar el archivo!', 'error');
            this.uploading = false;
          }
        } else {
          this.alertS.open(resC.message, 'error');
          this.uploading = false;
        }
      }, err => {
        this.alertS.open(err.message, 'error');
        this.uploading = false;
      
      });
      (document.getElementById('serials')as HTMLInputElement).value=null;
    }
  }
  delete() {
    this.dialog.open(ConfirmationComponent, {
      data: { message: '¿Desea eliminar la carga?' },
      width: '400px',
      height: '250px'
    }).afterClosed().subscribe(resA => {
      if (resA) {
        this.loadClientS.delete(this.customer.id).subscribe(resD => {
          if (resD.message === 'OK') {
            if (resD.object != 0) {
        
              this.alertS.open('Carga eliminada!', 'success');
            } else {
              this.alertS.open('Error al eliminar la carga!', 'error');
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


  download() {
    let delimiter = "\t";
    let headers = '';
    let file = '';

    for (let i = 0; i < this.columns.length; i++) {
      headers = headers + this.columns[i];
      if (i < this.columns.length - 1) {
        headers = headers + delimiter;
      }
    }
    file = headers;
    for (let i = 0; i < this.dataSource.data.length; i++) {
      file = file + "\n";
      for (let j = 0; j < this.header.length; j++) {
        file = file + this.dataSource.data[i][this.header[j]];
        file = file + delimiter;
      }
    }
    let blob = new Blob(['\ufeff' + file], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(blob);
    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", url);
    downloadLink.setAttribute("download", "Listado.csv");
    downloadLink.style.visibility = "hidden";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  save(){

    this.loadCustomerHS.create(this.genPersonEntity.id, this.customer.id).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != 0) {
          this.closeDialog.emit();
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




