import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { AlertService } from "src/app/shared/services/alert.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { MatPaginator } from "@angular/material/paginator";
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { ValidateReportService } from '../../services/validateReport.service';
import { validateReportModel } from '../../models/validateReport.model';
import { ReportValidateLoadCountryService } from '../../services/report.service';
import { MatSort } from '@angular/material/sort';
import { ReportValidateLoadWfsmService } from "../../services/reportWfsm.service";

@Component({
  selector: 'app-reportWfsm',
  templateUrl: './reportWfsm.component.html',
  styleUrls: ['./reportWfsm.component.css']
})

export class ReportWfsmComponent implements OnInit {
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
  countryId: number;
  customer: GenCustomerEntity;
  customerList: GenCustomerEntity[];
  @Inject(MAT_DIALOG_DATA) public data: any
  countryList: validateReportModel[];
  @ViewChild(MatSort) sort: MatSort;
  country: string;
  countrySelect: string;
  constructor(private validateR: ValidateReportService, private alertS: AlertService, private reportValidateLoadCountryS: ReportValidateLoadCountryService, private reportValidateLoadWfsmS:ReportValidateLoadWfsmService) {
    this.loading = false;
    this.columns = ['modelCode', 'modelDescription', 'dxType', 'serialOne', 'address', 'region', 'city', 'departement', 'country'];
    this.header = ['modelCode', 'modelDescription', 'dxType', 'serialOne', 'address', 'region', 'city', 'departement', 'country'];
    this.dataSource = new MatTableDataSource([]);
    this.loadId = 0;
    this.uploading = false;
    this.fileList = [];
    this.customer = new GenCustomerEntity();
    this.countryId = 0;
    this.person = new GenPersonEntity();
    this.country = "";
    this.countrySelect = "";
  }
  ngOnInit(): void {
    this.person = JSON.parse(localStorage.getItem('user'));
    this.listWfsm();
  }

  captura() {
    this.country = this.countrySelect;
  }

  listCountryUser() {
    this.validateR.ListCountry(this.person.id).subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != 0) {
          this.countryList = res.object;

        } else {
          this.alertS.open(res.message, 'error');
        }
      } else {
        this.alertS.open(res.message, 'error');
      }

    });
  }
  proof() {
    this.reportValidateLoadCountryS.wfsm().subscribe(res => {
      if (res.message === 'OK') {
        if (res.object != 0) {
          this.countryList = res.object;

        } else {
          this.alertS.open(res.message, 'error');
        }
      } else {
        this.alertS.open(res.message, 'error');
      }

    });
  }

  listWfsm(){
    this.loading = true;
    this.reportValidateLoadWfsmS.wfsm('2022-02-21', '2022-02-20', 'COLOMBIA').subscribe(res => {
        console.log(res.object)
        this.loading = false;
        this.dataSource = new MatTableDataSource<any>(res.object);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
  
    }, err => {
      this.alertS.open(err.message, 'error');
    });
  }




  download() {
    let delimiter = "\;";
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

