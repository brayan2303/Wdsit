import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { AlertService } from "src/app/shared/services/alert.service";
import { GenPersonEntity } from "src/app/appGeneral/entities/genPerson.entity";
import { MatPaginator } from "@angular/material/paginator";
import { GenCustomerEntity } from 'src/app/appGeneral/entities/genCustomer.entity';
import { GenCountryEntity } from 'src/app/appGeneral/entities/genCountry.entity';
import { RepWolkboxLoadService } from '../../services/repWolkboxLoad.service';

@Component({
  selector: 'app-loadWolkbox',
  templateUrl: './loadWolkbox.component.html',
  styleUrls: ['./loadWolkbox.component.css']
})

export class LoadWolkboxComponent implements OnInit {
  uploading: boolean;
  loading: boolean;
  columns: string[];
  fileList: File[];
  header: string[];
  dataSource: MatTableDataSource<any>;
  public listCustomers: GenCustomerEntity[];
  private _alertService: AlertService
  @ViewChild('paginator') paginator: MatPaginator;
  person: GenPersonEntity;
  loadId: number;
  countryId: number;
  customer: GenCustomerEntity;
  customerList: GenCustomerEntity[];
  countryList: GenCountryEntity[];
  @Inject(MAT_DIALOG_DATA) public data: any

  constructor(private repWolkboxLoadS: RepWolkboxLoadService, private alertS: AlertService, private dialog: MatDialog) {
    this.loading = false;
    this.columns = ['ID CALL', 'AGENT NAME', 'ID CUSTOMER', 'DATE', 'DESCRIPTION COD1', 'CALL COMMENTS', 'TYPE OF CALL', 'TELEPHONE', 'DURATION(SEG)', 'ID CAMPAING'];
    this.header = ['idCall', 'agentName', 'id', 'date', 'description', 'callComents', 'typeOfCall', 'telephone', 'duration', 'idCampaing'];
    this.dataSource = new MatTableDataSource([]);
    this.loadId = 0;
    this.uploading = false;
    this.fileList = [];
    this.customer = new GenCustomerEntity();
    this.countryId = 0;
    this.person = new GenPersonEntity();
  }
  ngOnInit(): void {
    this.loading = true;
    this.repWolkboxLoadS.list().subscribe(resL => {
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

  }
  load(file: FileList) {
    this.loadId = Math.round(Math.random() * 20);
    if (file.length > 0) {
      this.uploading = true;
      this.repWolkboxLoadS.create(this.loadId, file[0]).subscribe(resC => {
        if (resC.message === 'OK') {
          if (resC.object != 0) {
            this.alertS.open('Archivo cargado!', 'success');
            this.loading = true;
            this.uploading = false;
            this.repWolkboxLoadS.list().subscribe(resL => {
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
      (document.getElementById('serials') as HTMLInputElement).value = null;
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

