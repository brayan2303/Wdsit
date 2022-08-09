import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { AlertService } from "src/app/shared/services/alert.service";
import { MatPaginator } from "@angular/material/paginator";
import { LoadClientService } from "../../services/loadClient.service";
import { MatSort } from "@angular/material/sort";
import { ExportType, MatTableExporterDirective } from "mat-table-exporter";
import { LoadClientPersonHistoryService } from "../../services/loadClientPersonHistory.service";

@Component({
  selector: 'app-loadClientListCrossing',
  templateUrl: './loadClientListCrossing.component.html',
  styleUrls: ['./loadClientListCrossing.component.css']
})

export class loadClientListCrossingComponent implements OnInit {
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

  constructor(private loads: LoadClientPersonHistoryService, private alertS: AlertService) {
    this.loading = false;
    this.columns = ['CLIENTE', 'SERIAL EQUIPO', 'CODIGO SAP', 'ESTADO', 'TIPOLOGIA'];
    this.header = ['cliente', 'serial_equipo', 'codigo_sap', 'estado', 'tipologia'];
    this.dataSource = new MatTableDataSource([]);
    this.fileType="";
  }

  ngOnInit(): void {
    this.loading = true;
    this.list();
  }
 
  download() {
    let delimiter = ",";
    let headers = '';
    let file = '';
    for (let i = 0; i < this.columns.length; i++) {
      headers = headers + this.columns[i];
      if(i != 4)
      {
      if (i < this.columns.length - 1) {
        headers = headers + delimiter;
      }
    }
    }
    file = headers;
    for (let i = 0; i < this.dataSource.data.length; i++) {
      file = file + "\n";
      for (let j = 0; j < this.header.length; j++) {
        file = file + this.dataSource.data[i][this.header[j]];
        if(j != 4)
        {
          file = file + delimiter;
        }
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
    this.loads.list().subscribe(res => {
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

