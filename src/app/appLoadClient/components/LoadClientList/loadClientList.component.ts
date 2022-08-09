import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from "src/app/shared/services/alert.service";
import { MatPaginator } from "@angular/material/paginator";
import { LoadClientService } from "../../services/loadClient.service";
import { MatSort } from "@angular/material/sort";
import { ExportType, MatTableExporterDirective } from "mat-table-exporter";

@Component({
  selector: 'app-loadClientList',
  templateUrl: './loadClientList.component.html',
  styleUrls: ['./loadClientList.component.css']
})

export class loadClientListAllComponent implements OnInit {
  uploading: boolean;
  loading: boolean;
  columns: string[];
  header: string[];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatTableExporterDirective, { static: true }) exporter: MatTableExporterDirective;
  @ViewChild('paginator') paginator: MatPaginator;
  @Inject(MAT_DIALOG_DATA) public data: any
  @ViewChild(MatSort) sort: MatSort;
  fileType: string;

  constructor(private loads: LoadClientService, private alertS: AlertService) {
    this.loading = false;
    this.columns = ['CLIENTE', 'SERIAL EQUIPO', 'CODIGO SAP', 'ESTADO', 'TIPOLOGIA'];
    this.header = ['cliente', 'serial_EQUIPO', 'codigo_SAP', 'estado', 'tipologia'];
    this.dataSource = new MatTableDataSource([]);
    this.fileType="";
  }

  ngOnInit(): void {
    this.list();
  }
  export(){
    var type:ExportType;
    if(this.fileType==='csv'){
      type=ExportType.CSV;
    }else if(this.fileType==='json'){
      type=ExportType.JSON;
    }else if(this.fileType==='txt'){
      type=ExportType.TXT;
    }else if(this.fileType==='xlsx'){
      type=ExportType.XLSX;
    }
    this.exporter.exportTable(type, {
      fileName: "carga clientes"
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
  list() {
    this.loads.listAll().subscribe(res => {
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

}

