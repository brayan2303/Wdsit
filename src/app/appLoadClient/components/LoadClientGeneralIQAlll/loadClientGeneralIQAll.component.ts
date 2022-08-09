import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { AlertService } from "src/app/shared/services/alert.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { MatPaginator } from "@angular/material/paginator";
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCountryEntity } from 'src/app/appGeneral/entities/genCountry.entity';
import { LoadClientRuleGeneralService } from '../../services/loadClientGeneralIQ.service';
import { LoadPersonCustomerService } from "../../services/loadPersonCustomer.service";
import { LoadClientParameterizationService } from "../../services/LoadClientParameterization.service";
import { PersonListModal } from "../modal/person/person.modal";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-loadClientGeneralIQAll',
  templateUrl: './loadClientGeneralIQAll.component.html',
  styleUrls: ['./loadClientGeneralIQAll.component.css']
})

export class LoadClientGeneralIQAllComponent implements OnInit {
  uploading: boolean;
  loading: boolean;
  columns: string[];
  fileList: File[];
  header: string[];
  dataSource: MatTableDataSource<any>;
  public listCustomers: GenCustomerEntity[];
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  person: GenPersonEntity;
  loadId: number;
  countryId: number;
  customer: GenCustomerEntity;
  customerList: GenCustomerEntity[];
  countryList: GenCountryEntity[];
  @Inject(MAT_DIALOG_DATA) public data: any
  verSeleccion: number = 0;
  opcionSeleccionado: number;
  personId: number;
  name: string;

  constructor(private dialog: MatDialog, private LoadClientParameterizationS: LoadClientParameterizationService, private LoadClientRuleGeneralS: LoadClientRuleGeneralService, private alertS: AlertService, private loadCustomerPersoS: LoadPersonCustomerService) {
    this.loading = false;
    this.columns = ['CLIENTE','SERIAL EQUIPO', 'CODIGO SAP', 'ESTADO', 'TIPOLOGIA'];
    this.header = ['customer','serial', 'codSap', 'status', 'typology'];
    this.dataSource = new MatTableDataSource([]);
    this.loadId = 0;
    this.uploading = false;
    this.fileList = [];
    this.customer = new GenCustomerEntity();
    this.countryId = 0;
    this.person = new GenPersonEntity();
    this.opcionSeleccionado = 0;
    this.personId = 0;
  }
  ngOnInit(): void {
    this.person = JSON.parse(localStorage.getItem('user'));
    this.customerSelect();
  }

  customerSelect() {
    this.person = JSON.parse(localStorage.getItem('user'));
    this.loadCustomerPersoS.findCustomerByPersonIdList(this.person.id).subscribe(res => {
      if (res.message === 'OK') {
        this.customerList = res.object;

      } else { this.alertS.open(res.message, 'error'); }
    }, err => {
      this.alertS.open(err.message, 'error');
    })

  }

  capturar() {
    this.verSeleccion = this.opcionSeleccionado;
  }

  getPerson() {
    const dialogRef = this.dialog.open(PersonListModal, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res['id'] != 0) {
        this.personId = res['id'];
        this.name = res['person'];
      }
    });
  }

  dataGeneral() {
    this.LoadClientRuleGeneralS.listGeneral().subscribe(res => {
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
  log(userId: number) {
    this.LoadClientParameterizationS.createLogDoc(userId).subscribe(resL => {
      if (resL.message === 'OK') {
        if (resL.object != 0) {

        } else {
          this.alertS.open(resL.message, 'error');
        }
      } else {
        this.alertS.open(resL.message, 'error');
      }
    }, err => {
      this.alertS.open(err.message, 'error');
    })
  }

}

