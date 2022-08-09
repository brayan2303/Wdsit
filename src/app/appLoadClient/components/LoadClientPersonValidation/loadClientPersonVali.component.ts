import { GenCustomerService } from 'src/app/appGeneral/services/genCustomer.service';
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
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

@Component({
  selector: 'app-loadClientPersonVali',
  templateUrl: './loadClientPersonVali.component.html',
  styleUrls: ['./loadClientPersonVali.component.css']
})

export class loadClientPersonValiComponent implements OnInit {
  uploading: boolean;
  loading: boolean;
  columns: string[];
  fileList: File[];
  header: string[];
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

  constructor(private loadClientS: LoadClienPersontService, private alertS: AlertService, private dialog: MatDialog,private loadCustomerPersoS:LoadPersonCustomerService) {
    this.loading = false;
    this.columns = ['Material','Texto breve de material', 'Número de serie', 'Fabricante número de serie', 'Almacén', 'Lote', 'Lote de stock', 'Status del sistema', 'Modificado el', 'Modificado por','Creado por', 'Creado el','Tp.stocks (contab.refer.)', 'Materiales', 'Estado de almacen', 'Estado Cod.Sap'];
    this.header = ['material','textMaterial','numSerie','factoryNumSerie','warehouse', 'lot', 'lotStock', 'statusSystem', 'modificationDate', 'modificationUser', 'creation', 'creationDate', 'tpStock', 'materialTwo', 'estadoUbicacion', 'estadoCodigoSap'];
    this.dataSource = new MatTableDataSource([]);
    this.loadId = 0;
    this.uploading = false;
    this.fileList = [];
    this.customer = new GenCustomerEntity();
    this.countryId = 0;
  }
  ngOnInit(): void {
    this.loading = true;
    this.loadCustomerPersoS.findCustomerByPersonId(Number(JSON.parse(localStorage.getItem("user"))["id"])).subscribe(res =>{
      if (res.message === 'OK'){
        this.customer = res.object;
        this.loadClientS.listCustomer(this.customer.id).subscribe(resL => {
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
  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
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
  
  
}

