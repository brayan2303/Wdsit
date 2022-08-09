import { GenCustomerService } from 'src/app/appGeneral/services/genCustomer.service';
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ConfirmationComponent } from "src/app/shared/components/confirmation/confirmation.component";
import { AlertService } from "src/app/shared/services/alert.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { MatPaginator } from "@angular/material/paginator";
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { ValidateReportService } from '../../services/validateReport.service';
import { validateReportModel } from '../../models/validateReport.model';
import { ReportValidateLoadCountryService } from '../../services/report.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reportLoad',
  templateUrl: './reportLoad.component.html',
  styleUrls: ['./reportLoad.component.css']
})

export class ReportLoadComponent implements OnInit {
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
  constructor(private validateR: ValidateReportService, private alertS: AlertService, private reportValidateLoadCountryS: ReportValidateLoadCountryService) {
    this.loading = false;
    this.columns = ['COUNTRY', 'PROCESSED_DATE', 'MODEL_CODE', 'MODEL_DESCRIPTION', 'CPE_CATEGORY', 'SERIAL 1', 'LAB_PHASE'];
    this.header = ['country', 'processedDate', 'modelCode', 'modelDescription', 'cpeCategory', 'serialOne', 'ladPhase'];
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
    this.listCountryUser();
    this.proof();
  }

  captura() {
    this.country = this.countrySelect;
    this.list(this.country);
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

  list(country: string) {
    this.loading = true;
    this.dataSource = new MatTableDataSource([]);
    this.reportValidateLoadCountryS.listCountry(country).subscribe(res => {
      if (res.message === 'OK') {
        this.loading = false;
        this.dataSource = new MatTableDataSource<any>(res.object);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      } else {
        this.alertS.open(res.message, 'error');
      }
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

